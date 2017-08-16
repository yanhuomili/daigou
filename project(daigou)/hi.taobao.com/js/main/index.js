$(function() {
//轮播
var flag = false;
var swiper = new Swiper('.swiper-container', {
	pagination: '.swiper-pagination',
	paginationClickable: true,
	autoplayDisableOnInteraction: false,
	autoplay: 2000,
	loop: true,
	onTouchMove: function() {
		flag = true;
	},
	onTouchEnd: function() {
		setTimeout(function() {
			flag = false;
		}, 300)
	}
});
//解决swiper 的点透事件
$(".swiper-container .swiper-wrapper").on("touchend", "a", function() {
	//连接地址
	if(!flag) {
	//所要执行的内容
	alert("点击事件发生了")
	} else {
		return;
	}
})
	//点击看汇率
	$(".huilv p").on("tap", function() {
		$(".huilv-ul").toggle();
	});
	//点击二维码
	$(".scan-erweima").on("tap", function() {
		var language = localStorage.getItem("language")
		$("#show-scan").hide();
		$("#shouye-scan").show();
		if(language == 0){
			$(".lang_index_18").text("将二维码放入输入框内，即可自动扫描")
		}else if(language == 1){
			$(".lang_index_18").text("Put the two-dimensional code into the input box, you can automatically scan")
		}else if(language == 2){
			$(".lang_index_18").text("Kod dua dimensi dalam kotak input, mengimbas secara automatik")
		}
	});
	//热门分类跳转
	$(".classify-p span").on("tap", function() {
		window.location.href = "html/shouye/more-classify.html";
	});
	//特色惠跳转
	$(".feayure-p span").on("tap", function() {
		window.location.href = "html/shouye/feature.html";
	});
	//跳到搜索页面
	$(".text").on("tap", function() {
		window.location.href = "html/shouye/index-search.html";
	});
})