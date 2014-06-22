angular.module("zoidberg")
.controller("BlogCtrl", ["$scope","$http", "$modal", "$state",
		function ($scope,$http,$modal,$state) {
	function alert_error (msg) {
		$scope.alert = true;
		$scope.alert_class = "alert-danger";
		$scope.alert_msg = msg;
	}
	function alert_info (msg) {
		$scope.alert = true;
		$scope.alert_class = "alert-info";
		$scope.alert_msg = msg;
	}

	$scope.blog_edit = {};
	$scope.blogs = [];
	$scope.headings = [
		"Title", "Author", "Date", "Published", "Controls"
	];
	$http.get("zoidberg/blogs").success(function (blogs) {
		$scope.blogs = blogs;
	});

	$scope.dismiss = function () {
		$scope.alert = false;
	}

	$scope.publish_toggle = function (blog) {
		$http.post("zoidberg/blogs/publish",
			{id: blog._id, published: !blog.published})
			.success(function () {
				blog.published = !blog.published;
				alert_info("'" + blog.title + "' has been published.");
			})
			.error(function () {
				alert_error("Failed to change publish status of blog");
			});
		
	}

	$scope.delete = function (blog) {
		var m_inst = $modal.open({
			templateUrl: 'blog_delete_modal.html',
			controller: ["$scope", "$modalInstance",
			function ($scope, $modalInstance) {
				$scope.blog = blog;

				$scope.ok = function () {
					$modalInstance.close();
				}

				$scope.cancel = function () {
					$modalInstance.dismiss();
				}
			}]
		});
		m_inst.result.then(function () {
			$http.post("zoidberg/blogs/delete", {id: blog._id})
				.success(function () {
					alert_info("Successfully deleted blog");
					var index = $scope.blogs.indexOf(blog);
					if (index == -1)
						return;
					$scope.blogs.splice(index, 1);
				})
				.error(function () {
					alert_error("Failed to delete blog");
				});
		});
	}

	$scope.edit = function (blog) {
		$scope.blog_edit = blog;
		$state.go("blogs.edit");
	}

	$scope.new = function () {
		$scope.blog_edit = {};
		$http.post("zoidberg/blogs/new", {})
				.success(function (data) {
					$scope.blogs.push(data);
					$scope.blog_edit = $scope.blogs[$scope.blogs.length - 1];
					$state.go("blogs.edit");
				})
				.error(function () {
					alert_error("Failed to create new blog");
				});
	}

	$scope.save = function () {
		$http.post("zoidberg/blogs/save", $scope.blog_edit)
				.success(function () {
				})
				.error(function () {
					alert_error("Failed to save blog");
				});
	}
}]);
