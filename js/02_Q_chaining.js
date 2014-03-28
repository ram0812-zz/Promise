/*global Q, $*/
(function () {
    'use strict';
    /* Chaning example
     * There are 3 requests as the previous example.
     * The next request will continue even if the previous request fails
     */

    function get(url) {
        var def = Q.defer();
        $.ajax(url)
        .done(function (result) {
            def.resolve(result);
        }).fail(function (error) {
            def.reject(error);
        });
        return def.promise;
    }
    function getUser(userId) {
        return get(userId + '/user');
    }
    function getPosts() {
        return get('/posts');
    }
    function getAds() {
        return get('/ads');
    }

    //Get user info
    getUser(12345).then(function (result) {
        return result;
    },
    function (error) { //Handle Error for User
        console.log('User Error', error.responseText);
    })

    //Get posts
    .then(function (user) {
        console.log('user =', user);
        return getPosts();
    },
    function (error) { //Handle Error for Posts
        console.log('User Error', error.responseText);
    })

    //Get Ads
    .then(function (posts) {
        console.log('posts = ', posts);
        return getAds();
    },
    function (error) { //Handle Error for afs
        console.log('User Error', error.responseText);
    })

    //Do something with ads
    .then(function (ads) {
        console.log('ads = ', ads);
        //Add some ads logic
    },
    function (error) {
        console.log('User Error', error.responseText);
    })

    //We shall never reach here!
    .catch(function (error) {
        console.log('SHALL NEVER BE CALLED!', error);
    });
}());
