describe( 'AppCtrl', function() {
  
  var AppCtrl, $location, $scope, userService;

  beforeEach( module( 'testApp' ) );

  beforeEach(inject(function($controller, _$location_, $rootScope, _userService_) {
    $location = _$location_;
    $scope = $rootScope.$new();
    userService = _userService_;
    AppCtrl = $controller('AppCtrl', { $location: $location, $scope: $scope, userService: userService });
  }));

  it('should be defined', inject(function($controller) {
    
    expect(AppCtrl).toBeDefined();
    expect($scope.logoutUser).toBeDefined();
    expect(AppCtrl.init).toBeDefined();

  }));

  it('should redirect to /login if no user is found', inject(function($controller) {
    
    spyOn($location, 'path');
    AppCtrl.init();
    expect($scope.currentUser).toBeUndefined();
    expect($location.path).toHaveBeenCalledWith('/login');

  }));

  it('should direct to login if user logs out', inject(function($controller) {
    
    spyOn($location, 'path');
    $scope.logoutUser();
    expect($scope.currentUser).toBeNull();
    expect($location.path).toHaveBeenCalledWith('/login');

  }));

});
