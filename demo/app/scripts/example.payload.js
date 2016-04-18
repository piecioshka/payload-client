class ExamplePayload extends Payload {
    constructor(props) {
        super(props);
        this.name = 'ExamplePayload';
        this.testCase1();
        this.testCase2();
    }

    testCase1() {
        this.addTestCase('testCase1', BrowserKeys, (testCase) => {
            let oldFoo;

            testCase.custom(function () {
                oldFoo = window.foo;
            });
            testCase.check(function () {
                return (window.foo === 0);
            });
            testCase.keypress('Left');
            testCase.check(function () {
                return (window.foo === 2);
            });
            testCase.custom(function () {
                window.foo = oldFoo;
            });
        });
    };

    testCase2() {
        this.addTestCase('testCase2', BrowserKeys, (testCase) => {
            let cachedFoo;

            testCase.custom(function () {
                cachedFoo = window.foo;
            });
            testCase.check(function () {
                return (window.foo === 0);
            });
            testCase.keypress('Right');
            testCase.check(function () {
                return (window.foo === 1);
            });
            testCase.custom(function () {
                window.foo = cachedFoo;
            });
        });
    }
}

window.ExamplePayload = ExamplePayload;
