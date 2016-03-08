angular.module( 'testApp.login', [
  'ui.router',
  'plusOne',
  'ui.bootstrap',
  'ui.bootstrap.alert'
])

.config(function config( $stateProvider ) {
  $stateProvider.state( 'login', {
    url: '/login',
    views: {
      "main": {
        controller: 'LoginCtrl',
        templateUrl: 'login/login.tpl.html'
      }
    },
    data:{ pageTitle: 'Login' }
  });
})

.factory('loginService', function loginService($http, $q, userService) {

    var API_URL = 'http://jsonplaceholder.typicode.com';

    function loginUser(username) {

        var deferred = $q.defer();

        $http({
            method: 'GET',
            url: API_URL + '/users/'
        })
        .then(function success(response) {
            var data = response.data;
            for (var i = 0; i < data.length; i++) {
                if (data[i].username.toLowerCase() === username.toLowerCase()) {
                    userService.setUser(data[i]);
                    deferred.resolve(data[i]);
                    return;
                }
            }
            return deferred.reject();
        }, function err(error) {
            return deferred.reject(error);
        });

        return deferred.promise;
    }

    return {
        loginUser: loginUser
    };
})

/**
 * And of course we define a controller for our route.
 */
.controller( 'LoginCtrl', function LoginController( $scope, loginService ) {

    $scope.alerts = [];

    $scope.loginUser = function() {
        $scope.signingIn = true;
        var promise = loginService.loginUser($scope.username);
        promise.then(function success(response) {
            $scope.$emit('dreamlinesDemo:userLoggedIn');
            $scope.signingIn = false;
        }, function err(error) {
            if (!error) {
                $scope.alerts = [{
                    type: 'alert-danger',
                    msg: 'Error: Incorrect Username'
                }];
            } else {
                $scope.alerts = [{
                    type: 'alert-danger',
                    msg: 'Error: Incorrect Username'
                }];
            }
            $scope.signingIn = false;
        });

        return promise;
    };

    $scope.closeAlert = function(index) {
        $scope.alerts.splice(index, 1);
    };
});
