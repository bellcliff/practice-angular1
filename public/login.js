(function() {

    'use strict';

    angular.module('main')
        .controller('LoginCtrl', ['$scope', '$http', 'LoginService', '$sce',
            function(scope, $http, LoginService, $sce) {

                scope.signup = function(user) {
                    $http.post('/api/login', user).success(function(info) {
                        if(info.username)
                            LoginService.loginModal.close({username:info.username});
                        // TODO: handle error
                    });
                };

                scope.login = function(user) {
                    user.isLogin = true;
                    $http.post('/api/login', user).success(function(info) {
                        if (info.status) {
                            scope.username = user.name;
                            LoginService.loginModal.close({username: user.name});
                        } else {
                            // TODO: show error message in login modal
                            scope.errmsg = $sce.trustAsHtml('<i>login fail: ' + (info.err || 'unknow error')+'</i>');
                        }
                    });
                };
            }
        ]);
})();
