angular.module("zoidberg", ["ui.router"])
.config(["$stateProvider", "$urlRouterProvider", function ($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise("/");
	$stateProvider
	.state("home", {
		url: "/",
		templateUrl: "dash.html"
	})
	.state("articles", {
		url: "/articles",
	});
}])
.directive("zoidBreadcrumbs", ["$location", "$rootScope", function ($location, $rootScope) {
	function appendPath(element, path, icon) {
		element.children().first().append("<li>" +
			"<a href='#'>" +
			(icon ? "<i class='" + icon + "'></i>" : "") +
			path +
			"</a></li>"
			);
	}
	function setPath(element) {
		element.children().html("");
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
	function link (scope, element, attrs) {
		$rootScope.$on("$locationChangeSuccess", function (e) {
			setPath(element);
		});
	}
	return {
		restrict: "E",
		link: link,
		template: "<ol class='breadcrumb bc-3'></ol>"
	}
}]);
