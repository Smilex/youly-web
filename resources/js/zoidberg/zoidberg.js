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
	}])
	.controller("UsersCtrl", ['$scope', '$http', function($scope, $http) {
		$scope.secgroups = [];
		$http.get('/zoidberg/users/secgroups').success(function (data) {
			for (var i = 0; i < data.length; i++)
				$scope.secgroups.push({name: data[i], users: [], active: false});
		});

		$scope.GetUsersForGroup = function(group) {
			if (group.users.length > 0)
				return;
			$http.get('/zoidberg/users/secgroups/' + group.name).success(function (data) {
				group.users = [];
				for (var i = 0; i < data.length; i++)
					group.users.push(data[i]);
			});
		}

		$scope.SecGroupClick = function(group) {
			$scope.GetUsersForGroup(group);
			for (var i = 0; i < $scope.secgroups.length; i++)
			{
				$scope.secgroups[i].active = false;
			}
			group.active = true;
		}
	}]);
	
