angular.module("zoidberg")
.controller("ProductsCtrl", ["$scope","$http", "$state", function ($scope, $http, $state) {
	$scope.p_edit = {};
	$scope.products = [];
	$scope.search_str = "";

	$http.get("zoidberg/products", {})
		.success(function (products) {
			$scope.products = products;
		});

	$scope.edit = function (p) {
		$scope.p_edit = p;
		$state.go("products.edit");
	}

	$scope.new = function () {
		$scope.p_edit = {};
		$state.go("products.edit");
	}

	$scope.parse_search = function () {
		var str = $scope.search_str;
		var spl = str.split(",");
		var ret = [];
		for (var i = 0; i < spl.length; i++) {
			var s = spl[i].trim();
			var l = s.split(":");
			if (l.length < 2)
				continue;

			var id = l[0];
			var val = l[1];

			ret.push({id: id, val: val});
		}

		$http.post("zoidberg/products/search", ret)
			.success(function (data) {
				console.log("Success");
				console.log(data);
			})
			.error(function () {
				console.log("Error");
			});
	}
}]);
