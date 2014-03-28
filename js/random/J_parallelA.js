/*global $*/
(function () {
    'use strict';
    function getPosts(user) {
        var def = $.Deferred();
        setTimeout(function () {
            def.resolve({posts: {post1: {}}});
            user.gotPosts = true;
        }, 780);

        return def.promise();
    }
    function getAds(user) {
        var def = $.Deferred();
        setTimeout(function () {
            def.resolve({ads: {ad1: {}}});
            user.gotAds = true;
        }, 1000);

        return def.promise();
    }

    var job = $.Deferred(),
        thennable = job.promise(),
        firstJob = thennable.then(function (userId) {
            console.log('$ 1 started');

            var userInfo = $.Deferred();
            setTimeout(function () {
                userInfo.resolve({userId: userId, someName: 'Q some json'});
            }, 500);
            return userInfo.promise();
        },
        function () {
            console.log('$ 1 rejected');
        });


    firstJob.then(function (userCred) {
        $.when(getPosts(userCred), getAds(userCred)).then(function (posts, ads) {
            console.log('$ All done = ', posts, ads);
        }, function (posts, ads) {
            console.log('$ Error = ' + posts, ads);
        });
    },
    function () {
        console.log('$ 2 rejected');
    });

    // Resolve the job
    job.resolve({id: 123});

}());
