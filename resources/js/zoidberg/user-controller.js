angular.module("zoidberg")
.controller("UserCtrl", ["$scope", "$http", function($scope, $http) {
	$scope.notifications = [];
	$http.get("/zoidberg/users/notifications").success(function (data) {
		$scope.notifications = data;
		$scope.newNotifications = [];
		$scope.GetNotifications = function () {
			return $scope.notifications;
		}
		$scope.GetNewNotifications = function () {
			if ($scope.newNotifications.length > 0)
				return $scope.newNotifications;
			var news = [];
			for (var i = 0; i < $scope.notifications.length; i++)
			{
				if (!$scope.notifications[i].read)
					news.push($scope.notifications[i]);
			}
			$scope.newNotifications = news;
			return news
		}
		$scope.Read = function (notif) {
			notif.read = true;
			$scope.newNotifications = $scope.newNotifications.filter(function (element) {
				return !element.read;
			});
		}
	});
}]);
