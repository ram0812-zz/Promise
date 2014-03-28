/*global Q*/
(function () {
    'use strict';
    var deferred = Q.defer();
    deferred.promise.then(
        function success(val1, val2) {
            //Q accepts only one value (val2 === undefined)
            console.log('Q returns val1 = ', val1, 'val2 = ', val2);
        },
        function error(val1, val2) {
            //Q accepts only one value (val2 === undefined)
            console.log('Q returns val1 = ', val1, 'val2 = ', val2);
        }
    );
    deferred.resolve(1, 2);
}());

