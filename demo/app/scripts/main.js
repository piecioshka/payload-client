window.addEventListener('load', function () {
    PayloadList.resolve().then(function () {
        console.info('Integration test completed.');
    });
});
