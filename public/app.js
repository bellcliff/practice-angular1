(function() {
    'use strict';

    angular.module('main', ['ui.bootstrap'])
        .service('LoginService', function($http) {
            var self = this;
            self.getUser = function() {
                return $http.get('/api/login')
            }
            self.logout = function() {
                return $http.get('/api/login/logout')
            }
        })
        .controller('UserCtrl', function($scope, $http, $uibModal, LoginService) {
            var self = this;

            LoginService.getUser().success(function(data) {
                // if use then, the username should be like
                // data.data.username
                self.username = data.username;
            })

            self.logout = function() {
                LoginService.logout().then(function() {
                    delete self.username
                });
            }

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

            self.openLoginForm = function() {
                LoginService.loginModal = $uibModal.open({
                    templateUrl: 'login.html',
                    controller: 'LoginCtrl',
                });
                LoginService.loginModal.result.then(function(data){
                    self.username = data.username
                })
            };
        });

})()
