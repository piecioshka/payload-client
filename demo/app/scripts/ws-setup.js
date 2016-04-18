document.addEventListener('keydown', function (evt) {
    const code = evt.keyCode;
    const map = {
        39: 1,
        37: 2
    };

    window.foo = map[code] || 0;
});

function PayloadPlanterSuccess(data) {
    console.info('PayloadPlanterSuccess: ' + data.name + ': ' + data.msg);

    const ws = new WebSocket('ws://localhost:8080');

    ws.addEventListener('open', function () {
        ws.send(JSON.stringify(data));
    });
}

function PayloadPlanterFailed(data) {
    console.warn('PayloadPlanterFailed: ' + data.msg);
}
