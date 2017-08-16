$(function() {
	//分享的滑动
	var number_1 = 0;
	var number_2 = 75;
	$(".share-condition ul").on("swipeLeft", function() {
		var timer = setInterval(function() {
			number_1 = number_1 + 5;
			if(number_1 <= 75) {
				$(".share-condition ul").css("transform", 'translate(-' + number_1 + 'px,0px)');
			} else {
				number_2 = 75;
				clearInterval(timer)
			}
		}, 10)
	}).on("swipeRight", function() {
		var timer = setInterval(function() {
			number_2 = number_2 - 5;
			if(number_2 >= 0) {
				$(".share-condition ul").css("transform", 'translate(-' + number_2 + 'px,0px)');
			} else {
				number_1 = 0;
				clearInterval(timer)
			}
		}, 10)
	});
	//轮播
	var swiper = new Swiper('.swiper-container', {
		pagination: '.swiper-pagination',
		paginationClickable: true,
		autoplayDisableOnInteraction: false,
		autoplay: 2000,
		loop: true
	});
	//点击切换
	$(".pro-nav ul li").on("tap",function(){
		$(this).addClass("pro-nav-action").siblings().removeClass("pro-nav-action");
		var index=$(this).index();
		$('.commentTap').eq(index).show().siblings().hide();
		
//		if($(this).index() == 0){
//			$(".pro-left").show();
//			$(".pro-right").hide();
//		}else{
//			$(".pro-left").hide();
//			$(".pro-right").show();
//		}
		
	})
	//视频播放
	$(".pro-left ul li:nth-of-type(1) img").on("tap",function(){
		var myVideo = document.getElementsByTagName('video')[0]
		if(myVideo.paused){
			myVideo.play();
		}else{
			myVideo.pause();
		}
		$(this).hide();
	})
	
	
	//加入购物车 购买
	$(".add-shop-car").on("tap", function() {
		$("#pro-buy-action").show();
	});
	$(".pro-buy").on("tap", function() {
		$("#pro-buy-action").show();
	});
	$(".pro-close").on("tap", function() {
		$("#pro-buy-action").hide();
	})
//	//选择容量
//	$(".pro-volume dd").on("tap", function() {
//		$(this).addClass("pro-action").siblings().removeClass("pro-action");
//	});
//	//选择颜色
//	$(".pro-color dd").on("tap", function() {
//		$(this).addClass("pro-action").siblings().removeClass("pro-action");
//	});
	//选则数量 减  加
	
	$(".pro-shu-jian").on("touchstart", function() {
		var proCha = Number($(".pro-shu-show input").val());
		var proChaIne = parseInt(proCha) - 1;
		if(proCha <= 1) {
			$(".pro-shu-show input").val("1");
		} else {
			$(".pro-shu-show input").val(proChaIne);
		}
	});
	$(".pro-shu-jia").on("touchstart", function() {
		var proHe = $(".pro-shu-show input").val();
		console.log(proHe)
		var proHeInt = parseInt(proHe) + 1;
		$(".pro-shu-show input").val(proHeInt);

	});
	//分享
	$(".share").on("tap", function() {
		$("#share-link").show();
	})
	$(".share-btn").on("tap", function() {
		$("#share-link").hide();
	});
	$(".share-condition ul li").on("tap", function() {
		console.log($(this).index())
	})
	$(".pt-hd-left").on("tap",function(){
		window.location.href = "more-classify.html";
	})
	//判断导航距顶部的距离
	navFixed();
	function navFixed(){
		$(window).scroll(function(){
			var $top = $(window).scrollTop();
			if($top >= 334){
				$(".pro-nav").addClass("pro-nav-fixed");
			}else if($top<=304){
				$(".pro-nav").removeClass("pro-nav-fixed")
			}
		})
	}	
	//语言
	autoLanguage();
	function autoLanguage(){
		var getItem = localStorage.getItem("language");
		if(localStorage.getItem("language") == "0"){
			$("head link:last-child").remove();
			$(".lang_proInform_5").text("图文详情");
			$(".lang_proInform_add").text("评论商品");
			$(".lang_proInform_6").text("商品参数");
			$(".lang_proInform_9").text("红");
			$(".lang_proInform_10").text("黄");
			$(".lang_proInform_11").text("橙");
		}else if(localStorage.getItem("language") == "1"){
			$("head link:last-child").remove();
			$(".lang_proInform_5").text("Graphic details");
			$(".lang_proInform_add").text("pinglunshagnpin");
			$(".lang_proInform_6").text("Product parameters");
			$(".lang_proInform_9").text("Red");
			$(".lang_proInform_10").text("Yellow");
			$(".lang_proInform_11").text("Orange");
			proInformUSA()
		}else if(localStorage.getItem("language") == "2"){
			$("head link:last-child").remove();
			$(".lang_proInform_5").text("Maklumat grafik");
			$(".lang_proInform_add").text("comment shopping");
			$(".lang_proInform_6").text("Parameter komoditi");
			$(".lang_proInform_9").text("Merah");
			$(".lang_proInform_10").text("Kuning");
			$(".lang_proInform_11").text("Oren");
			proInformMalaysia()
		}
	};
	//register.html 语言切换
	function proInformUSA(){
		var link = '<link rel="stylesheet" type="text/css" href="../../css/language/productInform_USA.css"/>';
		$("head").append(link)
	}
	function proInformMalaysia(){
		var link = '<link rel="stylesheet" type="text/css" href="../../css/language/productInform_Malaysia.css"/>';
		$("head").append(link)
	}
});