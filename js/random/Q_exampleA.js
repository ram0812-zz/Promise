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
        firstThen = thennable.then(function () {
            console.log('Q 1 started');

            wait(5000).done(function () {
                console.log('Q 1 ended');
            });
        });
    firstThen.then(function () {
        console.log('Q 2 started');

        wait(2000).done(function () {
            console.log('Q 2 ended');
        });
    });

    // Resolve the promise
    job.resolve();
}());
