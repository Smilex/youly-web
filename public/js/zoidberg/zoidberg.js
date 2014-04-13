angular.module("zoidberg", [])
	.controller('HeaderCtrl', ['$scope', function($scope) {
		$scope.items = [
			{text: "Home", href: "/zoidberg/", active: true},
			{text: "Users", href: "/zoidberg/users", active: false}
		];
		$scope.ClickItem = function(item) {
			for(var i = 0; i < $scope.items.length; i++)
			{
				$scope.items[i].active = false;
			}
			item.active = true;
		}
	}]);
