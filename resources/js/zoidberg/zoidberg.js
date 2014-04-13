angular.module("zoidberg", ["ui.router"])
	.config(["$stateProvider", "$urlRouterProvider", function ($stateProvider, $urlRouterProvider) {
		$urlRouterProvider
			.otherwise('/home');
		$stateProvider
			.state("home", {
				url: "/home",
				templateUrl: "/zoidberg/home"
			})
			.state("users", {
				url: "/users",
				templateUrl: "/zoidberg/users"
			});
	}])
	.controller('HeaderCtrl', ['$scope','$state', function($scope, $state) {
		$scope.items = [
			{text: "Home", state: "home", active: true},
			{text: "Users", state: "users", active: false}
		];
		$scope.ClickItem = function(item) {
			for(var i = 0; i < $scope.items.length; i++)
			{
				$scope.items[i].active = false;
			}
			item.active = true;
			$state.go(item.state);
		}
	}]);
