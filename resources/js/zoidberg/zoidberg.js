angular.module("zoidberg", ["ui.router"])
	.config(["$stateProvider", "$urlRouterProvider", function ($stateProvider, $urlRouterProvider) {
		$urlRouterProvider
			.otherwise('/');
		$stateProvider
			.state("home", {
				url: "/",
				templateUrl: "/zoidberg/home"
			});
	}])
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
