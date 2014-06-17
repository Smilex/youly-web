$(window).bind("scroll", function () {
});

$(window).on("load", function () {
	$(".vertical-affix").affix({
		offset: {
			top: function () {
				var container = $(".vertical-affix").parents(".container").first();
				var val = container.offset().top;
				val = Math.round(val);
				return (this.top = val);
			},
			bottom: function () {
				var container = $(".vertical-affix").parents(".container").first();
				var val = $(document).height() - (container.offset().top + container.height());
				val = Math.round(val);
				return (this.bottom = val);
			}
		}
	});
});
