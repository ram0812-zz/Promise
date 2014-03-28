(function () {
    'use strict';
    var submiting = new $.Deferred(),
        saving = submiting.then(function () {
            console.log('2. Post feedback to server');
            return submiting.promise();
        });


/*    saving.then(function () {
        console.log('4. Success! Thank you for your feedback!');
    }, function () {
        console.log('Error! Something went wrong');
    });
    saving.always(function () {
        console.log('5. Hide spinner');
    });
*/
    saving.done(function () {
        //console.log('3. Show spinner');
        console.log('3. Success! Thank you for your feedback!');
    });

    $('#feedback_one').on('click', function () {
        console.clear();
        console.log('1. Pressed feedback button');
        submiting.resolve('submit buttion pressed');
        return false;
    });
}());























































