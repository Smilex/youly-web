angular.module("zoidberg", [])
	.controller('HeaderCtrl', ['$scope', function($scope) {
		$scope.items = [
			{text: "Home", href: "/zoidberg/"},
			{text: "Users", href: "/zoidberg/users"}
		];
	}]);
