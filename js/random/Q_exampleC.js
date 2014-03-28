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

            var def = Q.defer();
            setTimeout(function () {
                def.resolve('some json');
            }, 2000);
            return def.promise;
        });
        // After secondManualDeferred is resolved
    firstJob.then(function (val) {
        console.log(val);
        console.log('Q 2 started');
        Q.all([func1(val), func2(val)]).spread(function (val, val2) {
            console.log('All done = ' + val + ' ' + val2);
        }, function (val, val2) {
            console.log('Error = ' + val, val2);
        });

        // wait(2000).done(function () {
            // console.log('Q 2 ended');
        // });
    });

    // Resolve the first promise
    job.resolve();

    function func1(val) {
        console.log('func1 val = ' + val);
        var def = Q.defer();
        window.setTimeout(function () {
            //console.log('func1');
            def.resolve(8);
        }, 1000);

        return def.promise;
    }
    function func2(val) {
        //console.log(val);
        console.log('func2 val = ' + val);
        var def = Q.defer();
        window.setTimeout(function () {
            //console.log('func1');
            def.resolve(9);
        }, 2000);

        return def.promise;
    }
    //Q.all([func1(), func2()]).spread(function () {
        //console.log('done');
    //},
    //function () {
        //console.log('Error');
    //});
}());
