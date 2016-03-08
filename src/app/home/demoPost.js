angular.module('testApp.home.post', [
	'plusOne',
	'testApp.home.comment'
])

.directive('demoPost', function demoPostDirective() {
	return {
		restrict: 'E',
		scope: {
			post: '='
		},
		templateUrl: 'home/demoPost.tpl.html', 
		controller: function($scope, postsService) {

			$scope.showComments = false;

			var promise = postsService.getPostComments($scope.post.id);
			promise.then(function(response) {
				$scope.comments = response.data;
			});

			$scope.showHideComments = function() {
				$scope.showComments = !$scope.showComments;
			};
		}
	};
});