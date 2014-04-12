angular.module("zoidberg", [])
	.controller('test', ['$scope', function($scope) {
		$scope.todos = [];
		$scope.editing = "";
		$scope.addTODO = function(text) {
			$scope.todos.push(text);
			$scope.editing = "";
		};
	}]);
