/*global Q, $*/
(function () {
    'use strict';
    /* Chaining Example
     * There are three requests.
     * If one of them fail the next request will be aborted
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

    getUser(1).then(function (result) {
        return result;
    }).then(function (user) {
        console.log('user =', user);
        return getPosts();
    }).then(function (posts) {
        console.log('posts = ', posts);
        return getAds();
    }).then(function (ads) {
        console.log('ads = ', ads);
    })
    .catch(function (error) {
        console.log('Error in any of the then is caught here', '- "', error.responseText, '"');
    });
}());
