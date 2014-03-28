(function () {
    'use strict';
    var deferred = $.Deferred();
    deferred.then(
        function success() {
            // This is for success - async doesn't succeed.
            return 'Success';
        },
        function error(e) {
            // Called! Returns a new Deferred object
            return $.Deferred(function (newDeferred) {
                //New deferred that is resolved
                return newDeferred.resolve(e);
            });
        }
    ).then(
        function success() {
            //Other libs will reach this function.
            window.alert('Q, When, RSVP etc');
        },
        function error(e) {
            // jQuery will reach this.
            window.alert('jQuery says "' + e + '"');
        }
    );
    deferred.reject('Success! All is well||');
}());


