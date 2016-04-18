function resolvePromises(listOfPromise) {
    return new Promise((resolve, reject) => {
        function step(index) {
            const promise = listOfPromise[index];

            if (!promise) {
                resolve();
                return;
            }

            promise()
                .catch(reject)
                .then(function () {
                    step(index + 1);
                });
        }

        step(0);
    });
}

module.exports = {
    resolvePromises
};
