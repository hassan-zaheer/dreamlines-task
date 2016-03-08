/**
 * Each section of the site has its own module. It probably also has
 * submodules, though this boilerplate is too simple to demonstrate it. Within
 * `src/app/home`, however, could exist several additional folders representing
 * additional modules that would then be listed as dependencies of this one.
 * For example, a `note` section could have the submodules `note.create`,
 * `note.delete`, `note.edit`, etc.
 *
 * Regardless, so long as dependencies are managed correctly, the build process
 * will automatically take take of the rest.
 *
 * The dependencies block here is also where component dependencies should be
 * specified, as shown below.
 */
angular.module( 'testApp.home', [
  'ui.router',
  'plusOne',
  'testApp.home.post'
])

/**
 * Each section or module of the site can also have its own routes. AngularJS
 * will handle ensuring they are all available at run-time, but splitting it
 * this way makes each module more "self-contained".
 */
.config(function config( $stateProvider ) {
  $stateProvider.state( 'home', {
    url: '/home',
    views: {
      "main": {
        controller: 'HomeCtrl',
        templateUrl: 'home/home.tpl.html'
      }
    },
    data:{ pageTitle: 'Home' }
  });
})

/**
 * And of course we define a controller for our route.
 */
.controller( 'HomeCtrl', function HomeController( $scope, postsService ) {
    
  $scope.comments = {};
  $scope.showCreatePostForm = false;

  function init() {
    $scope.loadingPosts = true;
    var promise;

    if ($scope.currentUser) {
      promise = postsService.getPostsByUser($scope.currentUser.id);
    } else {
      promise = postsService.getAllPosts();  
    }
    
    promise.then(function(response) {
      var data = response.data;
      $scope.posts = data;
      $scope.loadingPosts = false;
    });
  }

  $scope.showHidePostForm = function() {
    $scope.showCreatePostForm = !$scope.showCreatePostForm;
  };

  $scope.createPost = function() {
    var promise = postsService.createPost($scope.title, $scope.body, $scope.currentUser.id);
    $scope.title = null;
    $scope.body = null;
    $scope.creatingPost = true;
    promise.then(function(response) {
      $scope.creatingPost = false;
      $scope.showHidePostForm();
      $scope.init();
    });
  };

  init();

});
