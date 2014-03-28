 /*global Q*/
(function () {
    'use strict';
    function wait(ms) {
        var deferred = Q.defer();
        setTimeout(deferred.resolve, ms);
        return deferred.promise;
    }
    var job = Q.defer(),
        thennable = job.promise,
        firstJob = thennable.then(function () {
            console.log('Q 1 started');

            wait(5000).done(function () {
                console.log('Q 1 ended');
            });
        });
        // After secondManualDeferred is resolved
    firstJob.then(function (val) {
        console.log(val);
        console.log('Q 2 started');

        wait(2000).done(function () {
            console.log('Q 2 ended');
        });
    });

    // Resolve the first promise
    job.resolve();

}());
