angular.module("zoidberg", ["ui.router", "ui.bootstrap", "ngTagsInput"])
.config(["$stateProvider", "$urlRouterProvider", function ($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise("/");
	$stateProvider
	.state("home", {
		url: "/",
		templateUrl: "dash.html"
	})
	.state("blogs", {
		url: "/blogs",
		abstract: true,
		templateUrl: "blogs.html"
	})
	.state("blogs.list", {
		url: "/",
		templateUrl: "blog_list.html"
	})
	.state("blogs.edit", {
		url: "/edit",
		templateUrl: "blog_edit.html"
	})
	.state("products", {
		url: "/products",
		abstract: true,
		templateUrl: "products.html",
		controller: "ProductsCtrl"
	})
	.state("products.list", {
		url: "/",
		templateUrl: "products_list.html"
	})
	.state("products.edit", {
		url: "/edit",
		templateUrl: "products_edit.html"
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
}])
.directive("zoidEditor", function () {
	var self = this;
	var directive = {
		restrict: "E",
		replace: true,
		transclude: true,
		scope: {
		},
		template :
		 
			"<div>" +
			 
			"<textarea class=\"wysihtml5 form-control\" rows=\"18\"></textarea>"+
			 
			"</div>",
		link: function ($scope, $element, $attrs) {
			$scope.textarea = $($element.find("textarea"));
			$scope.wysi = $scope.textarea.wysihtml5({
				stylesheet: "/css/neon/wysihtml5-color.css",
				events: {
					"change": function () {
						$scope.$parent.blog_edit.content = this.getValue();
						$scope.$parent.save();
					}
				}
			});

			$scope.wysi.val($attrs.value);
		}
	};

	return directive;
});
