const { v4 } = require('uuid');
const WebSocket = require('ws/index');

class PayloadServer {
    // Using: https://github.com/websockets/ws
    // ---------------------------------------
    constructor() {
        const wss = new WebSocket.Server({ port: 8080 });

        const clients = {};
        const messages = [];

        wss.on('connection', (ws) => {
            const uuid = v4();
            clients[uuid] = ws;

            // Push all messages since server started to each new client.
            messages.forEach((message) => {
                ws.send(message);
            });

            // console.log(`[SERVER] [WSS] on connection`);
            // console.log('[SERVER] [WSS] [CONNECTION] number of args ' + [].slice.call(arguments).length);
            // PayloadServer.printArguments.apply(this, arguments);

            ws.on('message', (message) => {
                // console.log(`[SERVER] [WS] on message: ${message}`);
                // console.log('[SERVER] [WS] [MESSAGE] number of args ' + [].slice.call(arguments).length);
                // PayloadServer.printArguments.apply(this, arguments);

                messages.push(message);

                for (const id in clients) {
                    if (clients.hasOwnProperty(id)) {
                        const client = clients[id];

                        if (client && client.readyState === client.OPEN) {
                            client.send(message);
                        } else {
                            delete clients[id];
                        }
                    }
                }
            });
            // ws.on('close', (number: Number, string) => {
            // console.log(`[SERVER] [WS] on close`);
            // console.log('[SERVER] [WS] [CLOSE] number of args ' + [].slice.call(arguments).length);
            // PayloadServer.printArguments.apply(this, arguments);
            // });
            //ws.on('ping', () => {
            //    console.log(`[SERVER] [WS] [${uuid}] on ping`);
            //});
            //ws.on('pong', () => {
            //    console.log(`[SERVER] [WS] [${uuid}] on pong`);
            //});
            //ws.on('open', () => {
            //    console.log(`[SERVER] [WS] [${uuid}] on open`);
            //});
            //ws.on('error', () => {
            //    console.log(`[SERVER] [WS] [${uuid}] on error`);
            //});
        });

        // wss.on('error', function () {
        // console.log(`[SERVER] [WSS] on error`);
        // });

        // wss.on('headers', function (client) {
        // console.log(`[SERVER] [WSS] on headers`);
        // console.log('[SERVER] [WSS] [HEADERS] number of args ' + [].slice.call(arguments).length);
        // PayloadServer.printArguments.apply(this, arguments);
        // });
    }

    static printArguments(...args) {
        [...args].forEach((arg) => {
            if (Object.prototype.toString.call(arg) === '[object Object]') {
                console.log('{');
                for (const key in arg) {
                    const value = arg[key];
                    let label = arg[key];

                    if (typeof value === 'function') {
                        label = '[Function]';
                    }

                    console.log(`\t ${key}: {${typeof value}} ${label}`);
                }
                console.log('}');
            } else {
                console.log(`\t {${typeof arg}} ${arg}`);
            }
        });
    }
}

module.exports = { PayloadServer };
