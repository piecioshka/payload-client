const { resolvePromises } = require('../helpers/promise-helper');

class PayloadList {
    /**
     * Resolve all list of payloads.
     *
     * @returns {Promise}
     */
    static resolve() {
        const payloads = PayloadList.findPayloads(window);
        return resolvePromises(payloads);
    }

    /**
     * Search in passed scope all definition of Payloads.
     *
     * @param {Object} scope
     * @returns {Array<Function>}
     */
    static findPayloads(scope) {
        const payloads = [];

        for (const prop in scope) {
            if (scope.hasOwnProperty(prop)) {
                const payload = scope[prop];
                const isFn = (typeof payload === 'function');
                const hasValidName = PayloadList.isPayloadTest.test(prop);

                if (isFn && hasValidName) {
                    payloads.push(() => {
                        return (new payload).launch();
                    });
                }
            }
        }

        return payloads;
    }

    /**
     * RegExp which is use to test name of find member in scope.
     *
     * @type {RegExp}
     */
    static get isPayloadTest() {
        return (/\w+Payload$/);
    }
}

module.exports = { PayloadList };
