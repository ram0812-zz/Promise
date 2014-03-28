/*global $*/
(function () {
    'use strict';
    var deferred = $.Deferred();
    deferred.then( //<= defered and deferred.promise both have a then method! STRANGE
        function success(val1, val2) {
            //$ accepts many values (both val1 and val2 are found)
            console.log('$ returns val1 = ', val1, 'val2 = ', val2);
        },
        function error(val1, val2) {
            //$ accepts many values (both val1 and val2 are found)
            console.log('$ returns val1 = ', val1, 'val2 = ', val2);
        }
    );
    deferred.resolve(1, 2);
}());

