(function() {

    'use strict';

    angular.module('main')
        .controller('LoginCtrl', ['$scope', '$http', 'LoginService',
            function(scope, $http, LoginService) {

                scope.signup = function(user) {
                    $http.post('/api/login', user).success(function(user) {
                        scope.username = user.name;
                    });
                };

                scope.login = function(user) {
                    user.isLogin = true;
                    $http.post('/api/login', user).success(function(info) {
                        if (info.status) {
                            scope.username = user.name;
                            LoginService.loginModal.close({username: user.name});
                        }
                        // TODO: show error message in login modal
                    });
                };
            }
        ]);
})();
