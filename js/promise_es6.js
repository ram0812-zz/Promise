/*global Promise */

(function () {
    'use strict';
    (function () {
        var promise = new Promise(function (resolve, reject) {
            resolve(1);
        });

        promise.then(function (val) {
            console.log('resolve = ', val); // 1
            return val + 2;
        }).then(function (val) {
            console.log('resolve', val); // 3
        });
    }());

    setTimeout(function () {
        var promise = new Promise(function (resolve, reject) {
            reject('Error');
        });

        promise.then(function (val) {
            console.log('reject', val);
            return val;
        }).catch(function (val) {
            console.log('reject catch = ' + val);
        });
    });
}());
