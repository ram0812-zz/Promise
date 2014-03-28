/*jslint nomen: true, plusplus: true, regexp: true*/

(function () {
    'use strict';
    var Promise = require('rsvp').Promise,
        util    = require('util'),

        LazyPromise = function (factory) {
            this._factory = factory;
            this._started = false;
        },
        list = function (promises) {
            var listPromise = new Promise(),
                k,
                results = [], done = 0;
            for (k in listPromise) {
                promises[k] = listPromise[k];
            }

            promises.forEach(function (promise, i) {
                promise.then(function (result) {
                    results[i] = result;
                    done += 1;
                    if (done === promises.length) {
                        promises.resolve(results);
                    }
                }, function (error) {
                    promises.reject(error);
                });
            });

            if (promises.length === 0) {
                promises.resolve(results);
            }
            return promises;
        },
        DELAY = 1000,
        delayed,
        Module, A, B, C, D;
    util.inherits(LazyPromise, Promise);

    LazyPromise.prototype = Promise.prototype;
    // LazyPromise.prototype.then1 = function () {

    //     if (!this._started) {
    //         this._started = true;
    //         var self = this;

    //         this._factory(function (error, result) {
    //             if (error) {
    //                 self.reject(error);
    //             }
    //             else {
    //                 self.resolve(result);
    //             }
    //         });
    //     }
    //     return Promise.prototype.then.apply(this, arguments);
    // };

    delayed = new Promise(function (callback) {
        console.log('Started');
        setTimeout(function () {
            console.log('Done');
            callback(42);
        }, 1000);
    });
    delayed.then(console.log);

    delayed.then(console.log);
    delayed.then(console.log);
    delayed.then(console.log);

    Module = function (name, deps, factory) {
        this._factory = function (callback) {
            list(deps).then(function (apis) {
                console.log('-- module LOAD: ' + name);
                setTimeout(function () {
                    console.log('-- module done: ' + name);
                    var api = factory.apply(this, apis);
                    callback(api);
                }, DELAY);
            });
        };
    };
    util.inherits(Module, Promise);

    A = new Module('A', [], function () {
        return {
            logBase: function (x, y) {
                return Math.log(x) / Math.log(y);
            }
        };
    });

    B = new Module('B', [A], function (a) {
        return {
            doMath: function (x, y) {
                return 'B result is: ' + a.logBase(x, y);
            }
        };
    });

    C = new Module('C', [A], function (a) {
        return {
            doMath: function (x, y) {
                return 'C result is: ' + a.logBase(y, x);
            }
        };
    });

    D = new Module('D', [B, C], function (b, c) {
        return {
            run: function (x, y) {
                console.log(b.doMath(x, y));
                console.log(c.doMath(x, y));
            }
        };
    });


    //D.then(function (d) { d.run(1000, 2); });
}());
