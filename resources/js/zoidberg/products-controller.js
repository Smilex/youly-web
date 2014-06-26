angular.module("zoidberg")
.controller("ProductsCtrl", ["$scope","$http", "$state", function ($scope, $http, $state) {
	$scope.p_edit = {};
	$scope.products = [
		{
			barcode: "5741000138076",
			name: "Booster Blue",
			brand_name: "Faxe Kondi",
			brand_owner: "Royal Unibrew",
			category: "Drinks > Energy"
		}
	];

	$scope.edit = function (p) {
		$scope.p_edit = p;
		$state.go("products.edit");
	}

	$scope.new = function () {
		$scope.p_edit = {};
		$state.go("products.edit");
	}
}]);
