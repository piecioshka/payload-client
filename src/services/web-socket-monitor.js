// Using: http://www.w3.org/TR/websockets/
// --------------------------------------

class WebSocketMonitor {
    constructor() {
        this.ws = new WebSocket('ws://localhost:8080');

        this.ws.addEventListener('error', () => {
            console.log('[CLIENT] on error');
        });

        this.ws.addEventListener('open', () => {
            console.log('[CLIENT] on open');
        });

        this.ws.addEventListener('close', () => {
            console.log('[CLIENT] on close');
        });

        this.ws.addEventListener('message', (event) => {
            console.log('[CLIENT] on message: ' + event.data);
        });
    }
}

module.exports = { WebSocketMonitor };
