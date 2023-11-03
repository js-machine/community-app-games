const prod = 'prod';
const dev = 'dev';

function buildConfig({prod, dev}) {
    let config;

    if (prod) {
        console.info('Production configuration is running...');
        config = require('./config/webpack.prod.js');
    } else if (dev) {
        console.info('Development configuration is running...');
        config = require('./config/webpack.dev.js');
    } else {
        console.warn('Unknown configuration is running...');
        config = require('./config/webpack.dev.js');
    }

    return config;
}

module.exports = buildConfig;