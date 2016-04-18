const { KeyboardHelper } = require('../helpers/keyboard-helper');
const { resolvePromises } = require('../helpers/promise-helper');

class TestCase {
    static get MAX_TIMEOUT_TO_CHECK_VALUE() {
        return 5000;
    }

    constructor(options) {
        this.keys = options.keys;
        this.name = options.name;
        this.payload = options.payload;
        this.tasks = [];
        // console.group(this.name);
    }

    keypress(...keys) {
        this.tasks.push(() => {
            // console.debug('[%s] [%s] keypress(): %s', this.payload, this.name, keys.join(', '));

            return new Promise((resolve, reject) => {
                try {
                    KeyboardHelper.keypress(this.keys, keys);
                } catch (err) {
                    return reject(err.message);
                }

                resolve();
            });
        });
    }

    sleep(milliseconds) {
        this.tasks.push(() => {
            // console.debug('[%s] [%s] sleep(): %sms', this.payload, this.name, milliseconds);

            return new Promise((resolve) => {
                setTimeout(resolve, milliseconds);
            });
        });
    }

    wait(callback) {
        this.tasks.push(() => {
            // console.debug('[%s] [%s] wait()', this.payload, this.name);

            return new Promise((resolve, reject) => {
                let triggered = false;

                const clock = setInterval(() => {
                    const status = callback();

                    if (status) {
                        triggered = true;
                        clearInterval(clock);
                        resolve();
                    }
                }, 0);

                setTimeout(() => {
                    if (!triggered) {
                        clearInterval(clock);
                        return reject('Failed: timeout occurred when waiting for callback!');
                    }
                }, TestCase.MAX_TIMEOUT_TO_CHECK_VALUE);
            });
        });
    }

    check(callback) {
        this.tasks.push(() => {
            // console.debug('[%s] [%s] check()', this.payload, this.name);

            return new Promise((resolve, reject) => {
                const status = callback();

                if (status) {
                    resolve();
                } else {
                    return reject('Failed: callback returns falsy value!');
                }
            });
        });
    }

    custom(callback) {
        this.tasks.push(() => {
            // console.debug('[%s] [%s] custom()', this.payload, this.name);

            return new Promise((resolve, reject) => {
                try {
                    callback();
                } catch (err) {
                    return reject('Failed: callback throws error: ' + err.message);
                }

                resolve();
            });
        });
    }

    launch() {
        const taskList = this.tasks;

        return resolvePromises(taskList)
            .catch((msg) => {
                TestCase.failed({
                    type: 'error',
                    name: this.payload + ': ' + this.name,
                    msg: msg
                });
            })
            .then(() => {
                // console.debug('[%s] [%s] finished!', this.payload, this.name);
                // console.groupEnd();
                TestCase.success({
                    type: 'ok',
                    name: this.payload + ': ' + this.name,
                    msg: 'Completed successfully!'
                });
            });
    }

    static failed(data) {
        if ('PayloadPlanterFailed' in window) {
            PayloadPlanterFailed(data);
        } else {
            console.error(data);
        }
    }

    static success(data) {
        if ('PayloadPlanterSuccess' in window) {
            PayloadPlanterSuccess(data);
        } else {
            console.info(data);
        }
    }
}

module.exports = { TestCase };
