/*global $*/
(function () {
    'use strict';
    var deferred = $.Deferred();
    deferred.then(
        function success() {
            // This is for success - async doesn't succeed.
            return 'Success';
        },
        function error(e) {
            // Called! Returns the error.
            return e;
        }
    ).then(
        function success() {
            //Other libs will reach this function.
            console.log('Q, When, RSVP etc');
            return 'Q, When, RSVP etc';
        },
        function error() {
            // jQuery will reach this.
            console.log('Error called by jQuery');
        }
    );
    deferred.reject('Something went wrong');
}());

