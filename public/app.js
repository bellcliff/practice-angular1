(function() {
    'use strict';

    angular.module('main', ['ui.bootstrap', 'ngRoute'])
        .config(function($routeProvider, $locationProvider) {
            $routeProvider
                .when('/', {
                    templateUrl: 'list.html',
                    controllerAs: 'UserCtrl as user'
                })

        })
        .service('LoginService', function($http) {
            var self = this;
            self.getUser = function() {
                return $http.get('/api/login').success(function(info){
                    self.username = info.username;
                    return self.username
                })
            }
            self.logout = function() {
                return $http.get('/api/login/logout')
            }
        })
        .directive('myNav', function(LoginService, $uibModal) {
            return {
                templateUrl: 'nav.html',
                controller: function($scope) {
                    LoginService.getUser().then(function(info) {
                        console.log('user login info', info)
                        // if use then, the username should be like
                        // data.data.username
                        $scope.username = info.data.username
                    })

                    $scope.logout = function() {
                        LoginService.logout().then(function() {
                            $scope.username = undefined
                        });
                    }
                    $scope.openLoginForm = function() {
                        LoginService.loginModal = $uibModal.open({
                            templateUrl: 'login.html',
                            controller: 'LoginCtrl',
                        });
                        LoginService.loginModal.result.then(function(data) {
                            $scope.username = data.username
                        })
                    };
                }
            }
        })
        .controller('UserCtrl', function($scope, $http) {
            var self = this;

            $http.get('/api/user').success(function(data) {
                self.users = {};
                data.forEach(function(user) {
                    self.users[user._id] = user;
                });
            })

            self.add = function(user) {
                delete user._id;
                $http.post('/api/user', user).success(function(data) {
                    self.users[data.user._id] = data.user;
                });
            };

            self.selectUser = function(user) {
                self.newUser = angular.copy(user);
            }

            self.updateUser = function(user) {
                $http.put('/api/user', user).success(function(data) {
                    self.users[data.user._id] = data.user;
                });
            };

            self.del = function(uid) {
                $http.delete('/api/user/' + uid).success(function() {
                    delete self.users[uid];
                });
            }

        });

})()
