angular.module("zoidberg", ["ui.router"])
.config(["$stateProvider", "$urlRouterProvider", function ($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise("/");
	$stateProvider
	.state("home", {
		url: "/",
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
}])
.directive("zoidBreadcrumbs", ["$location", function ($location) {
	function appendPath(element, path, icon) {
		element.children().first().append("<li>" +
			"<a href='#'>" +
			(icon ? "<i class='" + icon + "'></i>" : "") +
			path +
			"</a></li>"
			);
	}
	function link (scope, element, attrs) {
		var paths = $location.path().split('/');
		appendPath(element, "Home", "entypo-home");
		for (var i = 0; i < paths.length; i++)
		{
			var path = paths[i];
			if (!path) continue;
			path = path.charAt(0).toUpperCase() + path.slice(1);
			appendPath(element, path);
		}
		element.find("li").last().addClass("active");
	}
	return {
		restrict: "E",
		link: link,
		template: "<ol class='breadcrumb bc-3'></ol>"
	}
}]);
