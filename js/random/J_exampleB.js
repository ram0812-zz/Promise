(function () {
    'use strict';
    var submiting = new $.Deferred(),
        saving = submiting.then(function () {
            console.log('2. Post to server');
            return $.Deferred(function (newDeferred) {
                    setTimeout(function () {
                        newDeferred.resolve('KEWL');
                    }, 2000);
                });
        });

    saving.then(function (val) {
        console.log('4. Success! ' + val);
    }, function () {
        console.log('Error! Something went wrong');
    });
    saving.always(function (val) {
        console.log('5. Hide spinner ' + val);
    });

    submiting.then(function () {
        console.log('3. Show spinner');
    });

    $('#feedback_two').on('click', function () {
        console.clear();
        console.log('1. Pressed submit button');
        submiting.resolve('resolve: submit button pressed');
        return false;
    });
}());















































