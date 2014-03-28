/*global $*/
(function () {
    'use strict';
    function func1() {
        var def = $.Deferred();
        setTimeout(function () {
            def.resolve(1);
        }, 1000);

        return def.promise();
    }

    function func2() {
        var def = $.Deferred();
        setTimeout(function () {
            def.resolve(2);
        }, 2000);

        return def.promise();
    }

    var job = $.Deferred(),
        thennable = job.promise(),
        firstJob = thennable.then(function () {
            console.log('$ 1 started');

            var def = $.Deferred();
            setTimeout(function () {
                def.resolve('$ some value');
            }, 2000);
            return def.promise();
        },
        function () {
            console.log('$ 1 rejected');
        });

    firstJob.then(function (val) {
        console.log('Executes second then');
        $.when(func1(val), func2(val)).then(function (val, val2) {
            console.log('$ All done = ' + val + ' ' + val2);
        }, function (val, val2) {
            console.log('$ Error = ' + val, val2);
        });
    },
    function () {
        console.log('$ 2 rejected');
    });
    firstJob.fail(function () {
        console.log('Job rejected');
    });
    // Reject the job
    job.reject(); //first example
    //job.resolve(); //second example
}());
