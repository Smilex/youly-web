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
			$scope.$watch(d, function (nVal, oVal) {
				$scope.search_results = [];
				var results = $scope.search_results;
				if (nVal == "") {
					$element.parent().removeClass("open");
					return;
				}

				for (var i = 0; i < ids.length; i++) {
					if (ids[i].id.slice(0, nVal.length) == nVal) {
						ids[i].found = nVal;
						ids[i].rest = ids[i].id.slice(nVal.length);
						results.push(ids[i]);
					}
				}

				id = show_results(results, $scope, $element);
			});
		}
	};

	return directive;
});
