let LocalStrategy = require('passport-local').Strategy;
let db = require('../models');
let config = require('../config/config.json');

let JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;

let opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
opts.secretOrKey = config.secret;

module.exports = function (passport) {
    // used to serialize the user for the session
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function (id, done) {
        db.users.findOne({
            where: {
                id: id,
                isActive: 1
            }
        }).then(function (row) {
            return done(null, row.dataValues);
        });
    });

    // =========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================
    passport.use(
        'local-login-create',
        new LocalStrategy({
            // by default, local strategy uses username and password, we will override with email
            usernameField: 'name',
            passwordField: 'password',
            passReqToCallback: true // allows us to pass back the entire request to the callback
        },
            function (req, username, password, done) {
                db.users.findOne({
                    where: {
                        name: username,
                        isActive: 1
                    }
                }).then(function (row) {
                    if (!row) {
                        if (!req.body.userMode) {
                            return done(null, false);
                        }
                        
                        db.users.upsert({
                            name: req.body.name,
                            password: req.body.password
                        })
                            .then(function () {
                                db.users.findAll({
                                    where: {
                                        name: req.body.name
                                    }
                                }).then(function (user) {
                                    db.roles.findAll({
                                        where: {
                                            name: "user"
                                        }
                                    }).then(function (role) {
                                        db.userRoles.upsert({
                                            userId: user[0].dataValues.id,
                                            roleId: role[0].dataValues.id
                                        }).then(function () {
                                            return done(null, user[0].dataValues);
                                        });
                                    });
                                });
                            });
                    } else if (row.dataValues.name === username && row.dataValues.password === password) {
                        if (req.body.userMode) {
                            return done(null, row.dataValues);
                        } else {
                            db.roles.findAll({
                                where: {
                                    name: "admin"
                                }
                            }).then(function (role) {
                                db.userRoles.findOne({
                                    where: {
                                        userId: row.dataValues.id
                                    }
                                }).then(function (userRole) {
                                    if (userRole.dataValues.roleId === role[0].dataValues.id) {
                                        return done(null, row.dataValues);
                                    } else {
                                        return done(null, false);
                                    }
                                });
                            });
                        }
                    } else {
                        return done(null, false);
                    }
                }).catch(function (err) {
                    if (err)
                        return done(err);
                });
            })
    );

    passport.use(new JwtStrategy(opts, function (jwt_payload, done) {
        db.connection.sync().then(function () {
            db.users.findAll({
                where: {
                    id: jwt_payload.id,
                    isActive: 1
                }
            })
                .then(function (rows) {
                    if (rows[0].dataValues.id === jwt_payload.id) {
                        return done(null, rows[0].dataValues);
                    }
                })
                .catch(function (err) {
                    return done(err, false);
                })
        });

    }));
};
