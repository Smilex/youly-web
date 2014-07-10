angular.module("zoidberg")
.directive("zoidProductSearch", function () {
	function show_results(results,$scope, $element) {
		if (results.length > 0) {
			$scope.dismiss();
			$element.parent().addClass("open");
			if (results.length == 1) {
				if ($scope.search_state == "id")
					return results[0];
			}
			else
				return null;
		}
		else
			$element.parent().removeClass("open");

		return null;
	}

	var directive = {
		restrict: "A",
		link: function ($scope, $element, $attrs) {
			var d = $attrs.zoidProductSearch;
			var ids = $scope.get_ids();
			var id = null;
			var val = "";
			$scope.$watch(d, function (nVal, oVal) {
				$scope.search_results = [];
				var results = $scope.search_results;
				var add_char = "";
				var erase = false;
				if (nVal == "") {
					$element.parent().removeClass("open");
					id = null;
					return;
				}
				else if (nVal.length > oVal.length) {
					add_char = nVal.slice(oVal.length);
					if (add_char == ":") {
						if (!id) {
							$scope.alert_error("No valid id!");
							$element.val(oVal);
							return;
						}
						if ($scope.search_state == "id")
							$scope.search_state = "val";
						add_char = "";
					}
				}
				else if (nVal.length < oVal.length) {
					add_char = oVal.slice(nVal.length);
					erase = true;
					if (add_char == ":") {
						$scope.dismiss();
						if ($scope.search_state == "val")
							$scope.search_state = "id";
						add_char = "";
					}
					if ($scope.search_state == "id")
						id = null;
				}

				if ($scope.search_state == "id") {
					for (var i = 0; i < ids.length; i++) {
						if (ids[i].id.slice(0, nVal.length) == nVal) {
							ids[i].found = nVal;
							ids[i].rest = ids[i].id.slice(nVal.length);
							results.push(ids[i]);
						}
					}

					id = show_results(results, $scope, $element);
				}
				else if ($scope.search_state == "val") {
					if (erase) {
						if (val.length <= 1)
							val = "";
						else
							val = val.slice(val.length - 1);
					}
					else
						val += add_char;
					$scope.get_vals(id.id).then(function (vals) {
						if (!vals) return;
						for (var i = 0; i < vals.length; i++) {
							if (vals[i].id.slice(0, val.length) == val) {
								vals[i].found = val;
								vals[i].rest = vals[i].id.slice(val.length);
								results.push(vals[i]);
							}
						}

						show_results(results, $scope, $element);
					});
				}
			});
		}
	};

	return directive;
});
