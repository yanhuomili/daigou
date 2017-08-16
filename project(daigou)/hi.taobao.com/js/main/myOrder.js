$(function() {
	var phoneWidth = document.body.clientWidth, //整个文档的宽
		phoneHeight = document.body.clientHeight, //整个文档的高
		problem = $(".order-has").eq(1).find("dl").length, //待处理的数量
		waitPay = $(".order-has").eq(2).find("dl").length, //待付款
		waitSend = $(".order-has").eq(3).find("dl").length, //代发货
		hasbeen = $(".order-has").eq(4).find("dl").length, //已完成
		myurl = GetQueryString("indexTiaoZhuan"); //有d4页面点击导航保存的index
	judgeOrder(); //判断是否有订单
	wrapperHeight(); //左右滑动之后显示对应的高
	orderCondition(); //订单状态
	number(); //数量 用于d4页面中使用
	jump(myurl) //d4跳转后显示对应的内容
	//跳转到 d4 的页面
	$(".order-back").on("tap", function() {
		window.location.href = "../../my.html"
	})
	//导航跳转
	var swiper = new Swiper('.swiper-container', {
		paginationClickable: true,
		autoplayDisableOnInteraction: false,
		autoplay: false,
		loop: false,
		autoHeight: true, //滑动切换过后 让高度自适应各自的高度
		onSlideChangeEnd: function(swiper) {
			var index = $(".swiper-slide" + ".swiper-slide-active").index();//选择器必须要用字符串拼接
			//导航中的tab切换样式
			$(".order-nav ul li").eq(index).addClass("order-action").siblings().removeClass("order-action");
			wrapperHeight();
		}
	});
	$(".order-nav ul li").on("tap", function() {
		var index = $(this).index();
		var slideHeight = $(".swiper-slide").eq(index).height();
		$(".swiper-slide").eq(index).parent().height(slideHeight)
		jump(index);
		wrapperHeight();
	})
	//点击区域查看订单详情
	$(".swiper-slide dl").on("click", "ul", function() {
		window.location.href = "orderInfor.html"
	})
	//取消订单
	$(".swiper-slide").on("click", ".remove-dingdan", function() {
		alert("取消订单")

	})
	//为何不能马上付款
	$(".swiper-slide").on("click", ".why-pay", function() {
		alert("为何不能马上付款")
	})
	//马上支付
	$(".swiper-slide").on("click", ".FuKuan-right-away", function() {
		$("#daigou-instruction").show();
	})
	$("#daigou-instruction ul li:last-child").on("tap",function(){
		window.location.href = "../shopping/payFor.html"
	})
	//提现发货FaHuo-dingdan
	$(".swiper-slide").on("click", ".FaHuo-dingdan", function() {
		alert("提现发货")
	})
	//确认收货
	$(".swiper-slide").on("click", ".ShouHuo-right-away", function() {
		window.location.href = "ConfirmReceipt.html"
	})
	//查看物流
	$(".swiper-slide").on("click", ".ShouHuo-remove-dingdan", function() {
		window.location.href = "logistics.html"
	})
	//再来一单
	$(".swiper-slide").on("click", ".PingJia-remove-dingdan", function() {
		alert("再来一单")
	})
	//订单说明
	$("#daigou-instruction span").on("tap",function(){
		$("#daigou-instruction").hide();
	})
	$("#daigou-instruction ul li:last-child").on("tap",function(){
		$("#daigou-instruction").hide();
		//在这里添加支付后的事件
		
	})
	//swiper-wrapper显示相对应的高度
	function wrapperHeight() {
		$(".swiper-wrapper").css("min-height", (phoneHeight - $("#order").height()))
	}
	//判断有无订单
	function judgeOrder() {
		if(!$(".order-has dl").length) {
			$("#order-null").show();
			$("html").css("background", "#fff");
		} else {
			$("html").css("background", "#ededed");
		}
	}
	//判断订单的状态
	function orderCondition() {
		var length = $(".swiper-slide").eq(0).find("dl").length,
			condition, clone;
		for(var i = 0; i < length; i++) {
			condition = $(".swiper-slide").eq(0).find("dl").eq(i).find("dt span").text();
			if(condition == "待处理") {
				clone = $(".swiper-slide").eq(0).find("dl").eq(i).clone(true);
				$(".swiper-slide").eq(1).append(clone);
			} else if(condition == "待付款") {
				clone = $(".swiper-slide").eq(0).find("dl").eq(i).clone(true);
				$(".swiper-slide").eq(2).append(clone);
			}else if(condition == "待付邮费"){
				clone = $(".swiper-slide").eq(0).find("dl").eq(i).clone(true);
				$(".swiper-slide").eq(3).append(clone);
			} else if(condition == "待发货") {
				clone = $(".swiper-slide").eq(0).find("dl").eq(i).clone(true);
				$(".swiper-slide").eq(4).append(clone);
			} else if(condition == "待收货") {
				clone = $(".swiper-slide").eq(0).find("dl").eq(i).clone(true);
				$(".swiper-slide").eq(5).append(clone);
			} else if(condition == "待评价") {
				clone = $(".swiper-slide").eq(0).find("dl").eq(i).clone(true);
				$(".swiper-slide").eq(6).append(clone);
			}
		}
	}
	//数量状态显示
	function number() {
		var numObj = {
			problem: problem,
			waitPay: waitPay,
			waitSend: waitSend,
			hasbeen: hasbeen
		};
		var strNumObj = JSON.stringify(numObj);
		localStorage.setItem("promNumber", strNumObj)
	}
	//点击导航或点击d4中的导航 滚动到相应的区域
	function jump(index) {
		$(".order-nav ul li").eq(index).addClass('order-action').siblings().removeClass("order-action");
		$(".swiper-wrapper").animate({
			transform: 'translate3d(-' + index * phoneWidth + 'px,0,0)'
		}, 150, "ease-out")
	}
	//获取地址栏中的参数
	function GetQueryString(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
		var r = window.location.search.substr(1).match(reg);
		if(r != null) return unescape(r[2]);
		return null;
	}
	//语言
	autoLanguage();
	function autoLanguage(){
		var getItem = localStorage.getItem("language");
		if(localStorage.getItem("language") == "0"){
			$(".lang_myOrder_1").text("我的订单")
			$(".lang_myOrder_2").text("当前没有订单信息")
			$(".lang_myOrder_3").text("全部")
			$(".lang_myOrder_4").text("待处理")
			$(".lang_myOrder_5").text("待付款")
			$(".lang_myOrder_6").text("待付邮费")
			$(".lang_myOrder_7").text("待发货")
			$(".lang_myOrder_8").text("待收货")
			$(".lang_myOrder_9").text("已完成")
			$("head link:last-child").remove()
		}else if(localStorage.getItem("language") == "1"){
//			$(".lang_myOrder_1").text("My Order")
//			$(".lang_myOrder_2").text("There is currently no order information")
//			$(".lang_myOrder_3").text("All orders")
//			$(".lang_myOrder_4").text("Pending")
//			$(".lang_myOrder_5").text("Payment")
//			$(".lang_myOrder_6").text("Postage")
//			$(".lang_myOrder_7").text("Delivered")
//			$(".lang_myOrder_8").text("Receipt")
//			$(".lang_myOrder_9").text("Carry out")
			$('#order .order-nav ul li').html('<span></span>');//在里面添加插入span
			$('.order-nav ul').css({//ul长度
			    'width':' 14.3rem !important',
			    'padding':'0 0.25rem',
			})
			$('#order .order-nav ul li').css({//固定里宽
				'width': '1.7rem !important',
				'line-height':'0.3rem',
				'position':'relative'
			})
			$('#order .order-nav ul li:nth-child(4)').css({'width':'2rem !important'})
			$('#order .order-nav ul li span').css({//给生span绝对定位
				'position':'absolute',
				'width':'100%',
				'top':'50%',
				'left':'50%',
				'transform':'translate(-50%,-50%)',
				'font-size':'0.15rem !important',
				'text-align':'center'
			})
			$("#order .order-nav ul li:nth-child(1) span").html("All orders")
			$("#order .order-nav ul li:nth-child(2) span").text("Pending payment")
			$("#order .order-nav ul li:nth-child(3) span").text("pending")
			$("#order .order-nav ul li:nth-child(4) span").text("Pending postage payment")
			$("#order .order-nav ul li:nth-child(5) span").text("To be delivered")
			$("#order .order-nav ul li:nth-child(6) span").text("To be received")
			$("#order .order-nav ul li:nth-child(7) span").text("Completed")
			$("head link:last-child").remove()
			myOrderUSA()
		}else if(localStorage.getItem("language") == "2"){
			$('#order .order-nav ul li').html('<span></span>');//在里面添加插入span
			$('.order-nav ul').css({//ul长度
			    'width':' 13.8rem !important',
			    'padding':'0 0.25rem',
			})
			$('#order .order-nav ul li').css({//固定里宽
				'width': '1.7rem !important',
				'line-height':'0.3rem',
				'position':'relative'
			})
			$('#order .order-nav ul li span').css({//给生span绝对定位
				'position':'absolute',
				'width':'100%',
				'top':'50%',
				'left':'50%',
				'transform':'translate(-50%,-50%)',
				'font-size':'0.15rem !important',
				})
			
			$('#order .order-nav ul li span').css({'text-align':'center'})
			$("#order .order-nav ul li:nth-child(1) span").html("Semua pesanan")
			$("#order .order-nav ul li:nth-child(2) span").text("Pembayaran belum selesai")
			$("#order .order-nav ul li:nth-child(3) span").text("Akan diproses")
			$("#order .order-nav ul li:nth-child(4) span").text("Bayaran pos belum dibayar")
			$("#order .order-nav ul li:nth-child(5) span").text("Akan dihantar")
			$("#order .order-nav ul li:nth-child(6) span").text("Akan diterima")
			$("#order .order-nav ul li:nth-child(7) span").text("Selesai")
			$("head link:last-child").remove()
			myOrderMalaysia();
		}
	};
	function myOrderUSA(){
		var link = '<link rel="stylesheet" type="text/css" href="../../css/language/myOrder_USA.css"/>';
		$("head").append(link)
	}
	function myOrderMalaysia(){
		var link = '<link rel="stylesheet" type="text/css" href="../../css/language/myOrder_Malaysia.css"/>';
		$("head").append(link)
	}
})