 /*global Q*/
(function () {
    'use strict';
    function func1() {
        var def = Q.defer();
        setTimeout(function () {
            def.resolve(1);
        }, 750);

        return def.promise;
    }

    function func2() {
        var def = Q.defer();
        setTimeout(function () {
            def.resolve(2);
        }, 2000);

        return def.promise;
    }

    var job = Q.defer(),
        thennable = job.promise,
        firstJob = thennable.then(function () {
            console.log('Q 1 started');

            var def = Q.defer();
            setTimeout(function () {
                def.resolve('Q some value');
            }, 2000);
            return def.promise;
        },
        function () {
            console.log('Q 1 rejected');

        });

    firstJob.then(function (val) {
        console.log('Executes second then');
        Q.all([func1(val), func2(val)]).spread(function (val, val2) {
            console.log('Q All done = ' + val + ' ' + val2);
        }, function (val, val2) {
            console.log('Q Error = ' + val, val2);
        });
    },
    function () {
        console.log('Q 1 rejected');
    });
    firstJob.catch(function () {
        console.log('Job rejected');
    });
    // Reject the job
    job.reject(); //first example
    //job.resolve(); //second example
}());
