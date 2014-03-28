 /*global Q*/
(function () {
    'use strict';
    function getPosts(user) {
        var def = Q.defer();
        setTimeout(function () {
            def.resolve({posts: {post1: {}}});
            user.gotPosts = true;
        }, 750);

        return def.promise;
    }
    function getAds(user) {
        var def = Q.defer();
        setTimeout(function () {
            def.resolve({ads: {ad1: {}}});
            user.gotAds = true;
        }, 1000);

        return def.promise;
    }

    var job = Q.defer(),
        thennable = job.promise,
        firstJob = thennable.then(function (userId) {
            console.log('Q 1 started');

            var userInfo = Q.defer();
            setTimeout(function () {
                userInfo.resolve({userId: userId, someName: 'someone'});
            }, 3000);
            return userInfo.promise;
        },
        function () {
            console.log('Q 1 rejected');
        });

    firstJob.then(function (userCred) {
        Q.all([getPosts(userCred), getAds(userCred)]).spread(function (posts, ads) {
            console.log('Q All done = ', posts, ads);
        }, function (posts, ads) {
            console.log('Q Error = ', posts, ads);
        });
    },
    function () {
        console.log('Q 1 rejected');
    });

    // Resolve the first promise
    job.resolve({id: 123});
}());
