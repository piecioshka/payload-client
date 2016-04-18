const { TestCase } = require('./test-case');
const { resolvePromises } = require('../helpers/promise-helper');

class Payload {
    constructor() {
        this.testCases = [];
    }

    addTestCase(name, keys, callback) {
        this.testCases.push({
            name,
            keys,
            callback
        });
    }

    launch() {
        const testCases = this.testCases;
        return resolvePromises(this.transform(testCases));
    }

    transform(testCases) {
        const self = this;
        const result = [];

        testCases.forEach((testCaseMap) => {
            result.push(((testCaseMap) => {
                return () => {
                    const testCase = new TestCase({
                        keys: testCaseMap.keys,
                        payload: self.name,
                        name: testCaseMap.name
                    });

                    testCaseMap.callback(testCase);

                    return testCase.launch();
                };
            })(testCaseMap));
        });

        return result;
    }
}

module.exports = { Payload };
