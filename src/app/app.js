angular.module( 'testApp', [
  'templates-app',
  'templates-common',
  'ui.router',
  'ui.bootstrap',
  'ui.bootstrap.alert',
  'LocalStorageModule',
  'testApp.home',
  'testApp.login'
])

.config( function myAppConfig ( $stateProvider, $urlRouterProvider ) {
  $urlRouterProvider.otherwise( '/login' );
})

.run( function run () {
})

.factory('userService', function userService(localStorageService) {
    
    var user;

    function setUser(_user) {
      if (_user) {
          user = _user;
          localStorageService.set('test-user', angular.toJson(_user));
      }
    }

    function getUser() {
      var _user = localStorageService.get('test-user');
      return _user ? angular.fromJson(_user) : null; // making an assumption here that if user exists then it is a valid one
                                                     // and is already authenticated
    }

    function logoutUser() {
      user = null;
      localStorageService.remove('test-user');
    }

    return {
        setUser: setUser,
        getUser: getUser,
        logoutUser: logoutUser
    };
})

.factory('postsService', function postsService($http, $q, userService) {
  
  var API_URL = 'http://jsonplaceholder.typicode.com';

  function getAllPosts() {
    return $http({
      method: 'GET',
      url: API_URL + '/posts/'
    });
  }

  function getPostsByUser(userId) {
    return $http({
      method: 'GET',
      url: API_URL + '/posts?userId=' + userId
    });
  }

  function getPostComments(postId) {
    return $http({
      method: 'GET',
      url: API_URL + '/posts/' + postId + '/comments/'
    });
  }

  function createPost(title, body, userId) {
    return $http({
      method: 'POST',
      url: API_URL + '/posts/',
      data: {
        title: title,
        body: body,
        userId: userId
      }
    });
  }

  return {
    getAllPosts: getAllPosts,
    getPostsByUser: getPostsByUser,
    getPostComments: getPostComments,
    createPost: createPost
  };

})

.controller( 'AppCtrl', function AppCtrl ( $scope, $location, userService ) {



  function init() {

    var currentUser = userService.getUser();
    if (currentUser) {
      $scope.currentUser = currentUser;
    } else {
      $location.url('/login');
    }
  }

  $scope.logoutUser = function() {
    userService.logoutUser();
    $scope.currentUser = null;
    $location.url('/login');
  };

  $scope.$on('dreamlinesDemo:userLoggedIn', function() {
    init();
    $location.url('/home');
  });

  $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
    if ( angular.isDefined( toState.data.pageTitle ) ) {
      $scope.pageTitle = toState.data.pageTitle + ' | testApp' ;
    }
  });

  init();

  this.init = init;

});
