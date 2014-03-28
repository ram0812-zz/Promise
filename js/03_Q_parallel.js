/*global Q, $*/
(function () {
    'use strict';
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

    getUser(12345).then(function (result) {
        console.log('User = ', result);
        return Q.all([getPosts(), getAds()]).spread(function (posts, ads) {
            console.log('posts = ', posts);
            console.log('ads = ', ads);
        }).catch(function (error) {
            console.log(error.responseText);
        });
    }).catch(function (error) {
        console.log('User error', error.responseText);
    });
}());
