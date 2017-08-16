$(function() {
	//shouNumber(); //显示要处理的数量    
	//我的收藏 跳转
	$("#my-other .mycollect").on("tap", function() {
		window.location.href = "html/my/mycollect.html"
	});
	//我的分销跳转
	$("#my-other .distribution").on("tap", function() {
		window.location.href = "html/my/distribution.html"
	});
	//我的钱包 跳转
	$("#my-other .wallet").on("tap", function() {
		window.location.href = "html/my/wallet.html"
	});
	//我的优惠券 跳转
	$("#my-other .coupon").on("tap", function() {
		window.location.href = "html/my/coupon.html"
	});
	//地址管理 跳转
	$("#my-other .address").on("tap", function() {
		window.location.href = "html/my/address.html"
	});
	//我的二维码 跳转
	$("#my-other .scan").on("tap", function() {
		$("#my-share-scan").show();
	});
	$(".my-scan-close").on("tap", function() {
		$("#my-share-scan").hide();
	})
	$("#my-share-scan ul li:last-child").on("tap", function() {
		$("#share-link").show()
	})
	$(".share-btn").on("tap", function() {
		$("#share-link").hide();
		$("#my-share-scan").hide();
	})
	//设置 跳转
	$("#my-other .install").on("tap", function() {
		window.location.href = "html/my/install.html"
	});
	//个人资料
	$(".ziliao").on("tap", function() {
		window.location.href = "html/my/personalData.html"
	})
	$(".user-img").on("tap", function() {
		window.location.href = "html/my/personalData.html"
	})

	//导航
	$("#wrapper ul li").on("tap", function() {
		var index = $(this).index()
		if(index != 5) {
			window.location = "html/myOrder/myOrder.html?indexTiaoZhuan=" + index;
		} else {
			window.location.href = "html/myOrder/myOrder.html";
		}
	})
	//分享的滑动
//	var number_1 = 0;
//	var number_2 = 75;
//	$(".share-condition ul").on("swipeLeft", function() {
//		var timer = setInterval(function() {
//			number_1 = number_1 + 5;
//			if(number_1 <= 75) {
//				$(".share-condition ul").css("transform", 'translate(-' + number_1 + 'px,0px)');
//			} else {
//				number_2 = 75;
//				clearInterval(timer)
//			}
//		}, 10)
//	}).on("swipeRight", function() {
//		var timer = setInterval(function() {
//			number_2 = number_2 - 5;
//			if(number_2 >= 0) {
//				$(".share-condition ul").css("transform", 'translate(-' + number_2 + 'px,0px)');
//			} else {
//				number_1 = 0;
//				clearInterval(timer)
//			}
//		}, 10)
//	});

	function shouNumber() {
		var shouNumber = JSON.parse(localStorage.getItem("promNumber"))
		if(shouNumber.problem) {
			$("#wrapper ul li").eq(1).find("span").text(shouNumber.problem).show()
		} else {
			$("#wrapper ul li").eq(1).find("span").hide()
		}
		if(shouNumber.waitPay) {
			$("#wrapper ul li").eq(2).find("span").text(shouNumber.waitPay).show()
		} else {
			$("#wrapper ul li").eq(2).find("span").hide()
		}
		if(shouNumber.waitSend) {
			$("#wrapper ul li").eq(3).find("span").text(shouNumber.waitSend).show()
		} else {
			$("#wrapper ul li").eq(3).find("span").hide()
		}
		if(shouNumber.hasbeen) {
			$("#wrapper ul li").eq(4).find("span").text(shouNumber.hasbeen).show()
		} else {
			$("#wrapper ul li").eq(4).find("span").hide()
		}
	}
	//语言
	autoLanguage();

	function autoLanguage() {
		var getItem = localStorage.getItem("language");
		if(localStorage.getItem("language") == "0") {
			$("head link:last-child").remove();
			$(".lang_my_1").text("钱包余额：")
			$(".lang_my_15").text("元")
			$(".lang_my_16").text("让朋友扫一扫，即可成为我的粉丝")
			$(".lang_my_17").text("分享我的二维码")
		} else if(localStorage.getItem("language") == "1") {
			$("head link:last-child").remove();
			$(".lang_my_1").text("Wallet Balance:")
			$(".lang_my_15").text("$")
			$(".lang_my_16").text("Let friends sweep away, you can become my fans")
			$(".lang_my_17").text("Share my code")
			myUSA()
		} else if(localStorage.getItem("language") == "2") {
			$("head link:last-child").remove();
			$(".lang_my_1").text("Baki Wallet:")
			$(".lang_my_15").text("RM")
			$(".lang_my_16").text("Mari rakan-rakan menyapu dihanyutkan, menjadi peminat saya")
			$(".lang_my_17").text("Saya berkongsi kod dua dimensi")
			myMalaysia()
		}
	};
	//register.html 语言切换
	function myUSA() {
		var link = '<link rel="stylesheet" type="text/css" href="css/language/my_USA.css"/>';
		$("head").append(link)
	}

	function myMalaysia() {
		var link = '<link rel="stylesheet" type="text/css" href="css/language/my_Malaysia.css"/>';
		$("head").append(link)
	}
});