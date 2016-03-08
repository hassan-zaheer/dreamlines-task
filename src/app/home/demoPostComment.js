angular.module('testApp.home.comment', [
	'plusOne'
])

.directive('demoPostComment', function demoPostDirective() {
	return {
		restrict: 'E',
		scope: {
			comment: '='
		},
		templateUrl: 'home/demoPostComment.tpl.html', 
		controller: function($scope, postsService) {
			
		}
	};
});