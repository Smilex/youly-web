angular.module("zoidberg")
.controller("UserCtrl", ["$scope", "$http", function($scope, $http) {
	$scope.notifications = [];
	$http.get("/zoidberg/users/notifications").success(function (data) {
		$scope.notifications = data;
	});
}]);
