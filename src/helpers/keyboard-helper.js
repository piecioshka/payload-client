/**
 * Wiem, że http://stackoverflow.com/questions/11857524/working-with-initkeyboardevent
 * ale na dzień dzisiejszy nie ma dobrze uzgodnionego interfejsu
 * i gdzieś będzie krzyczało błędem:
 *  - albo w DevTools - gdy się zrobi zgodnie z DefinitelyTyped,
 *  - albo czerwono w kodzie - gdy się zrobi tak, aby w DevTools nie rzucało wyjątkami.
 * Dlatego też zostawiamy 'po staremu'.
 *
 * @param {string} keyName
 * @param {number} keyCode
 */
function trigger(keyName, keyCode) {
    const evt = document.createEvent('KeyboardEvent');

    const properties = {
        get: () => {
            return keyCode;
        }
    };

    Object.defineProperty(evt, 'keyCode', properties);
    Object.defineProperty(evt, 'which', properties);

    if (evt.initKeyboardEvent) {
        evt.initKeyboardEvent('keydown', true, true, document.defaultView, '', 0, '', false, keyName);
    } else {
        // event.initKeyEvent('keydown', true, true, document.defaultView, false, false, false, false, keyCode, 0);
    }

    document.dispatchEvent(evt);
}

class KeyboardHelper {
    /**
     * Odpala maszynę wciskająca klawisze.
     *
     * @param {Object} keyList
     * @param {string[]} keys
     */
    static keypress(keyList, keys) {
        keys.forEach((keyName) => {
            const keyCode = keyList[keyName];

            if (typeof keyCode !== 'number') {
                throw new ReferenceError('KeyboardHelper#keypress: not recognized "' + keyName + '" key');
            }

            trigger(keyName, keyCode);
        });
    }

}

module.exports = { KeyboardHelper };
