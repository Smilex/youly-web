angular.module("zoidberg", ["ui.router"])
.config(["$stateProvider", "$urlRouterProvider", function ($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise("/dash");
	$stateProvider
	.state("dash", {
		url: "/dash",
		templateUrl: "dash.html"
	});
}])
.directive("zoidNotifications", ["$http", function ($http) {
	function link (scope, element, attrs)
	{
		$http.get("/zoidberg/users/notifications").success(function (data) {
			if (!data)
				return;

			var len = data.length;
			if (len > 0)
			{
				element.find("span.badge").first().text(len);
				element.find("p.small").first().append("You have " + len + " new notifications.");
				var list = element.find("ul.dropdown-menu-list").first(); 
				for (var i = 0; i < len; i++)
				{
					list.append("<li class='unread'>" +
						"<a href='#'>" +
						//"<i class='entypo-user-add pull-right'></i>" +
						"<span class='line'><strong>" +
						data[i].msg +
						"</strong></span>" +
						"<span class='line small'>" +
						data[i].date +
						"</span>" +
						"</a></li>"
						);
				}
			}
		});
	}
	return {
		restrict: "E",
		link: link,
		templateUrl: "notifications.html"
	};
}]);
