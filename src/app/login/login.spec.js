describe('LoginCtrl', function() {

	var LoginCtrl, $location, rootScope, $scope, userService;

	beforeEach(module('testApp'));

	beforeEach(inject(function($controller, _$location_, $rootScope, _userService_, $httpBackend) {
		
		$location = _$location_;
		$scope = $rootScope.$new();
		rootScope = $rootScope;
		userService = _userService_;
		LoginCtrl = $controller('LoginCtrl', { $location: $location, $scope: $scope, userService: userService });

		$httpBackend.whenGET('http://jsonplaceholder.typicode.com/users/').respond(function() {
			return [201, [{id: 1, username: 'Bret'}], {}];
		});

	}));

	it('should be defined', inject(function($controller) {
		expect(LoginCtrl).toBeDefined();
		expect($scope.alerts).toBeDefined();
		expect($scope.loginUser).toBeDefined();
		expect($scope.closeAlert).toBeDefined();
	}));

	it('should show add an alert with type alert-danger if wrong username is provided', inject(function($controller, $httpBackend) {
		$scope.username = 'random_username';
		
		$scope.loginUser();

		$httpBackend.flush();
		
		rootScope.$apply();

		expect($scope.signingIn).toBeFalsy();
		expect($scope.alerts.length).toEqual(1);
		expect($scope.alerts[0].type).toBe('alert-danger');
	}));

	it('should emit an event when correct username is provided', inject(function($controller, $httpBackend) {
		spyOn($scope, '$emit');
		$scope.username = 'Bret';
		$scope.loginUser();
		$httpBackend.flush();
		rootScope.$apply();
		expect($scope.$emit).toHaveBeenCalledWith('dreamlinesDemo:userLoggedIn');
	}));

});