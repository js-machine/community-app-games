const threads = require('threads');
const spawn = threads.spawn;

class Tester {
    testJSCode(userCode, tests) {

        if (userCode.match(/((console.log\(.*?\))|(require\(.*?\)));?/ig)) {
            return Promise.resolve(false);
        }

        return new Promise((resolve, reject) => {
            let testsPuss = 0;

            const thread = spawn((data, done) => {
                const userFunction = eval('(' + data.userCode + ')');
                if (JSON.stringify(userFunction(...data.test.input)) === data.test.output) {
                    done(true);
                } else {
                    done(false);
                }
            });

            const timer = setTimeout(() => {
                thread.kill();
            }, 5000);

            tests.reduce((thread, test) => {
                return thread.send({userCode: userCode, test: test});
            }, thread)
                .on('message', (res) => {
                    if(res) {
                        testsPuss++;
                        if(testsPuss >= tests.length) {
                            thread.kill();
                        }
                    } else {
                        thread.kill();
                    }
                })
                .on('error', (err) => {
                    console.log(err);
                    thread.kill();
                })
                .on('exit', () => {
                    clearTimeout(timer);
                    console.log(testsPuss >= tests.length);
                    resolve(testsPuss >= tests.length);
                });
        })
    }
}

module.exports = new Tester();

/*
new Tester().testJSCode('function rectSquare(a,b){ return a + b; }', [
    {input: [1, 2], output: 3},
    {input: [2, 5], output: 7},
    {input: [5, 5], output: 10}
]);*/
