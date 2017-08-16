$(function() {
 
	$(".more-xiala").on("touchstart", function() {
		var width = $(".more-wrap").width();
		$(".pull-down").toggle();
		if($(".pull-down").css("display") == "block") {
			$(".more-xiala img").attr("src", "../../img/index/mianbaoxie_kui_shang@3x.png");
			$(".more-wrap").addClass("action-wrap");
		}else{
			$(".more-xiala img").attr("src", "../../img/index/mianbaoxie_kui_xia@3x.png");
			$(".more-wrap").removeClass("action-wrap");
		}
	})
	$(".more-nav-ul").on("tap", "li", function() {
		$(this).addClass("more-action").siblings().removeClass("more-action");
		$(".pull-down ul li").removeClass("for-you").eq($(this).index()).addClass("for-you")
		autoWidth();
	})
	$(".pull-down ul").on("touchstart", "li", function() {
		$(this).addClass("for-you").siblings().removeClass("for-you");
		$(".pull-down").hide();
		$(".more-xiala img").attr("src", "../../img/index/mianbaoxie_kui_xia@3x.png");
		$(".more-wrap").removeClass("action-wrap")
		var index =  $(this).index();
		$(".more-nav-ul li").removeClass("more-action").eq(index).addClass("more-action");
	})
	autoWidth();
	function autoWidth(){
		var ul_width = 0;
		$(".more-nav-ul li").each(function(){
			var width = $(this).width();
			ul_width += width;
		})
		$(".more-nav-ul").width(ul_width + 10)
	}
	autoLanguage();
	function autoLanguage(){
		var getItem = localStorage.getItem("language");
		if(localStorage.getItem("language") == "0"){
			$(".lang_moreClass_1").text("分类")
		}else if(localStorage.getItem("language") == "1"){
			$(".lang_moreClass_1").text("Classification")
		}else if(localStorage.getItem("language") == "2"){
			$(".lang_moreClass_1").text("Klasifikasi")
		}
	};
})