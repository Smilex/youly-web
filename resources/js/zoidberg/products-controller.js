angular.module("zoidberg")
.controller("ProductsCtrl", ["$scope","$http", "$state", function ($scope, $http, $state) {
	$scope.p_edit = {};

	$scope.edit = function (p) {
		$scope.p_edit = p;
		$state.go("products.edit");
	}

	$scope.new = function () {
		$scope.p_edit = {};
		$state.go("products.edit");
	}
}]);
