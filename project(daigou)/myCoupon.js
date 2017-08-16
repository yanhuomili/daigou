$(function(){

	var url = $("#urlid").val();
	var shoppingId = $("#shoppingId").val();
	var addressId = $("#addressId").val();
	var status = $("#status").val();
	var type = $("#type").val();
	var language = localStorage.getItem("language")
	if (language == null || language == '' || language == undefined) {
		language = 0;
	}
	// 返回d4页
	var flag = false; // 解决swiper滑动过后机会触发上面绑定的点击事件

	var phoneWidth = document.body.clientWidth,phoneHeight = document.body.clientHeight;
	wrapperHeight(); // 设置swiper-wrapper的最小高度
	hasCoupon(); // 判断是否有优惠券信息
	var swiper = new Swiper('.swiper-container',{
		paginationClickable:true,
		autoplayDisableOnInteraction:false,
		autoplay:false,
		loop:false,
		autoHeight:true, // 滑动切换过后 让高度自适应各自的高度
		onTouchStart:function(){

			// var start = swiper.getWrapperTranslate()
		},
		onTouchMove:function(){

			flag = true;
		},
		onTouchEnd:function(){

			setTimeout(function(){

				flag = false;
			},300)
			var end = swiper.getWrapperTranslate()
		},
		onSlideChangeEnd:function(swiper){

			var index = $(".swiper-slide" + ".swiper-slide-active").index();
			// 导航中的tab切换样式
			$(".coupon-nav li").eq(index).addClass("coupon-nav-action").siblings().removeClass("coupon-nav-action");
			wrapperHeight();
		}
	});
	$(".coupon-nav li").on("tap",function(){

		$(this).addClass("coupon-nav-action").siblings().removeClass("coupon-nav-action");
		var index = $(this).index()
		var slideHeight = $(".swiper-slide").eq(index).height();
		$(".swiper-slide").eq(index).parent().height(slideHeight)
		$(".swiper-wrapper").animate({
			transform:'translate3d(-' + index * phoneWidth + 'px,0,0)'
		},150,"ease-out")
		wrapperHeight();
	})

	function wrapperHeight(){

		$(".swiper-wrapper").css("min-height",(phoneHeight - $(".coupon-top").height()))
	}

	function hasCoupon(){

		if (!$(".user-coupon ul li").length) {
			$("#kong-coupon").show();
			$("html").css("background","#fff")
		} else {
			$("html").css("background","#ededed")
			return;
		}
	}
	// 选择优惠券进行抵扣
	$(".user-coupon ul").on(
			"tap",
			"li",
			function(){

				var youhui = $(this).attr("data");
				var isCanUse = Number(localStorage.getItem("allPrice"));
				var money = Number($(this).find(".user-shu").text()); // 优惠的金额
				var reg = /\d+\.?\d*|\.\d+/;
				var isMoney = Number($(this).find("p").text().match(reg)[0]); // 判断金额是否达到使用的条件

				if (!flag) {
					if (isCanUse >= isMoney) {
						var index = $(this).index()
						/* localStorage.setItem("discount",money); */
						/* localStorage.setItem("userHad",index); */// 用于优惠券使用之后删除这个优惠券
						window.location.href = url + "/wx/shopping/submitOrders.do?shoppingId=" + shoppingId + "&addressId=" + addressId
								+ "&status=" + status + "&type=" + type + "&youhui=" + youhui;
					} else {
						alert("优惠券未达到使用条件");
					}
					;
				} else {
					return;
				}
				;
			});
	// 语言
	autoLanguage();

	function autoLanguage(){

		var getItem = localStorage.getItem("language");
		if (localStorage.getItem("language") == "0") {
			$(".lang_coupon_1").text("我的优惠券");
			$(".lang_coupon_2").text("可使用");
			$(".lang_coupon_3").text("已失效");
			$("head link:last-child").remove();
		} else if (localStorage.getItem("language") == "1") {
			$(".lang_coupon_1").text("Kupon saya");
			$(".lang_coupon_2").text("Telah dipakai");
			$(".lang_coupon_3").text("Telah tamat tempoh");
			$("head link:last-child").remove();
			couponMalaysia();
		} else if (localStorage.getItem("language") == "2") {
			$(".lang_coupon_1").text("My coupon")
			$(".lang_coupon_2").text("Used");
			$(".lang_coupon_3").text("Expired");
			$("head link:last-child").remove();
			couponUSA();
		}
	}
	;

	function couponMalaysia(){

		var link = '<link rel="stylesheet" type="text/css" href="' + url + '/static/html/css/language/coupon_Malaysia.css"/>';
		$("head").append(link);
	}

	function couponUSA(){

		var link = '<link rel="stylesheet" type="text/css" href="' + url + '/static/html/css/language/coupon_USA.css"/>';
		$("head").append(link);
	}
});