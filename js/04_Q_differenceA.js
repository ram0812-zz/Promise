/*global Q*/
(function () {
    'use strict';
    var deferred = Q.defer();
    deferred.promise.then(
        function success() {
            // This is for success - async doesn't succeed.
            return 'Success';
        },
        function error(e) {
            // Try to handle the error.
            return e;
        }
    ).then(
        function success() {
            // Non-jQuery implementations will reach this.
            console.log('Success called by Q');
            return 'Q, When, RSVP etc';
        },
        function error() {
            //jQuery will reach this.
            console.log('Error called by jQuery');
        }
    );
    deferred.reject('Something went wrong');
}());

