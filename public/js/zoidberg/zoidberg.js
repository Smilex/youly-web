angular.module("zoidberg",["ui.router"]).config(["$stateProvider","$urlRouterProvider",function(e,t){t.otherwise("/"),e.state("home",{url:"/",templateUrl:"dash.html"}).state("articles",{url:"/articles"})}]).directive("zoidBreadcrumbs",["$location","$rootScope",function(e,t){function r(e,t,r){e.children().first().append("<li><a href='#'>"+(r?"<i class='"+r+"'></i>":"")+t+"</a></li>")}function i(t){t.children().html("");var i=e.path().split("/");r(t,"Home","entypo-home");for(var o=0;o<i.length;o++){var a=i[o];a&&(a=a.charAt(0).toUpperCase()+a.slice(1),r(t,a))}t.find("li").last().addClass("active")}function o(e,r){t.$on("$locationChangeSuccess",function(){i(r)})}return{restrict:"E",link:o,template:"<ol class='breadcrumb bc-3'></ol>"}}]);