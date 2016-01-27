(function(){

    'use strict';

    angular.module('main').directive('myNav', function(){
        return {
            templateUrl: 'nav/nav.html',
            controller: 'UserCtrl',
            controllerAs: 'user'
        };
    });
})()
