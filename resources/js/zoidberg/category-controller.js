angular.module("zoidberg")
.controller("CategoryCtrl", ["$scope","$http", function ($scope, $http) {
	$scope.lvl1_edit = "";
	$scope.lvl2_edit = "";
	$scope.lvl3_edit = "";
	$scope.lvl1 = [];

	$http.get("js/category.json")
	.success(function(data) {
		$scope.lvl1 = data;
		$scope.lvl1_sel = $scope.lvl1[0];
	})
	.error(function() {
		alert("Her er galid");
	});

	$scope.sel_lvl1 = function(v) {
		$scope.lvl1_sel = v;
		$scope.lvl2_sel = null;
		$scope.lvl3_sel = null;
		$scope.lvl4_sel = null;
	};
	$scope.sel_lvl2 = function(v) {
		$scope.lvl3_sel = null;
		$scope.lvl4_sel = null;
		$scope.lvl2_sel = v;
	};
	$scope.sel_lvl3 = function(v) {
		$scope.lvl4_sel = null;
		$scope.lvl3_sel = v;
	};


	$scope.add_lvl1 = function(e) {
		if(e.key == "Enter" && $scope.lvl1_edit !="") {
			$scope.lvl1.push({name: $scope.lvl1_edit, children:[]});
			$scope.lvl1_edit = "";
		}
	}
	$scope.add_lvl2 = function(e) {
		if(e.key == "Enter" && $scope.lvl2_edit !="") {
			$scope.lvl1_sel.children.push({name: $scope.lvl2_edit, children:[]});
			$scope.lvl2_edit = "";
		}
	}
	$scope.add_lvl3 = function(e) {
		if(e.key == "Enter" && $scope.lvl3_edit !="") {
			$scope.lvl2_sel.children.push({name: $scope.lvl3_edit, children:[]});
			$scope.lvl3_edit = "";
		}
	}
}]);