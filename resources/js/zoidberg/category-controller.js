angular.module("zoidberg")
.controller("CategoryCtrl", ["$scope","$http", function ($scope, $http) {
	$scope.lvl1_edit = "";
	$scope.lvl2_edit = "";
	$scope.lvl3_edit = "";
	$scope.lvl = [];
	$scope.selected = [];
	$scope.tree = [];
	var tree = $scope.tree;
	var n_lvls = 4;

	$scope.get_children = function (parent) {
		var ret = [];
		for (var i = 0; i < tree.length; i++) {
			if (tree[i].parent == parent)
				ret.push(tree[i]);
		}
		return ret;
	};

	$scope.select = function(obj) {
		obj.selected = !obj.selected;
	};

	$http.get("zoidberg/categories/get")
	.success(function(data) {
		tree = data;
		for (var i = 0; i < tree.length; i++) {
			tree[i].selected = false;
		}
	})
	.error(function() {
		alert("Her er galid");
	});

	$scope.add = function (parent) {
		var id = null;
		if (parent != null)
			id = parent._id;
		var item = {_id: 0, parent: id, name: "_"};
		tree.push(item);

		$http.post("zoidberg/categories/insert", item)
			.success(function (data) {
				item = data;
			});
	}

	$scope.remove = function (obj) {
		var yes = confirm("Are you sure you want to delete '" + obj.name + "', and all of its children?");
		if (!yes)
			return;

		$http.post("zoidberg/categories/remove", {id: obj._id})
			.success(function (data) {
				var i = tree.indexOf(obj);
				tree.splice(i, 1);
			})
			.error(function (e) {
				alert("Failed to remove");
			});
	}

	$scope.edit = function (obj, ch) {
		ch._id = obj._id;
		$http.post("zoidberg/categories/edit", {edit: ch})
			.success(function (data) {
				if (ch.name)
					obj.name = ch.name;
			})
			.error(function (e) {
				alert("Failed to edit");
			});

		obj.edit = false;
	}
}]);
