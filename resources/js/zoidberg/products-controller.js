angular.module("zoidberg")
.controller("ProductsCtrl", ["$scope","$http", "$state", "$q", function ($scope, $http, $state, $q) {
	$scope.p_edit = {};
	$scope.products = [];
	$scope.search_str = "";
	$scope.search_results = [];
	$scope.search_state = "id";
	$scope.alert = false;
	$scope.alert_class = "";
	$scope.alert_msg = "";
	$scope.vals = {};

	$scope.alert_error = function(msg) {
		$scope.alert = true;
		$scope.alert_class = "alert-danger";
		$scope.alert_msg = msg;
	}
	$scope.alert_info = function(msg) {
		$scope.alert = true;
		$scope.alert_class = "alert-info";
		$scope.alert_msg = msg;
	}

	$http.get("zoidberg/products", {})
		.success(function (products) {
			$scope.products = products;
		});

	$scope.dismiss = function () {
		$scope.alert = false;
		$scope.alert_class = "";
		$scope.alert_msg = "";
	}

	$scope.edit = function (p) {
		$scope.p_edit = p;
		$state.go("products.edit");
	}

	$scope.new = function () {
		$scope.p_edit = {};
		$state.go("products.edit");
	}

	function ck_id(id) {
		switch (id) {
			case "bc": return true;
			case "b": return true;
			case "p": return true;
			case "bo": return true;
			case "c": return true;
			case "i": return true;
			case "a": return true;
			default: return false;
		}
	}

	$scope.parse_search = function () {
		var str = $scope.search_str;
		var spl = str.split(",");
		var ret = [];
		for (var i = 0; i < spl.length; i++) {
			var s = spl[i].trim();
			var l = s.split(":");
			if (l.length < 2) {
				$scope.alert_error("Search qualifier '" + spl[i] + "' is not correct");
				return;
			}

			var id = l[0];
			if (!ck_id(id)) {
				$scope.alert_error("Search identifier '" + id + "' is unknown");
				return;
			}
			var val = l[1];

			ret.push({id: id, val: val});
		}

		/*$http.post("zoidberg/products/search", ret)
			.success(function (data) {
				$scope.alert_info("Search was successful.")
			})
			.error(function (msg) {
				$scope.alert_error(msg);
			});
		*/
	}

	$scope.get_ids = function () {
		return [
			{id: "b", desc: "Brand"},
			{id: "bc", desc: "Barcode"},
			{id: "p", desc: "Product"},
			{id: "bo", desc: "Brand Owner"},
			{id: "c", desc: "Category"},
			{id: "i", desc: "Ingredient"},
			{id: "a", desc: "Allergy"}
		];
	}

	$scope.get_vals = function (id) {
		$scope.vals_d = $q.defer();
		if ($scope.vals[id]) {
			$scope.vals_d.resolve($scope.vals[id]);
			return $scope.vals_d.promise;
		}
		var str = "zoidberg/products/search/";
		str += id;
		$http.get(str)
			.success(function (vals) {
				$scope.vals[id] = vals;
				$scope.vals_d.resolve(vals);
			})
			.error(function () {
				$scope.vals_d.reject();
			});

		return $scope.vals_d.promise;
	}
}]);
