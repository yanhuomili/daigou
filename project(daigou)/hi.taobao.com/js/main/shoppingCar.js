var phoneWidth = document.body.clientWidth;
var swiper = new Swiper('.swiper-container', {
	paginationClickable: true,
	autoplayDisableOnInteraction: false,
	autoplay: false,
	loop: false,
	autoHeight: true, //滑动切换过后 让高度自适应各自的高度
	onSlideChangeEnd: function(swiper) {
		var index = $("#shopping-main .swiper-container .swiper-wrapper .swiper-slide" + ".swiper-slide-active").index();
		//导航中的tab切换样式
		$(".shopping-nav ul li").eq(index).addClass("shopping-action").siblings().removeClass("shopping-action");
		$(".swiper-slide").eq(index).attr('shopflag', "true").siblings().attr("shopflag", "false")
	}
});
//点击导航跳转相应的页面
$(".shopping-nav ul li").on("touchstart mousedown", function(e) {
	e.preventDefault();
	var index = $(this).index();
	var tab_height = $("#shopping-main .swiper-wrapper .swiper-slide").eq(index).height();
	$(this).addClass("shopping-action").siblings().removeClass("shopping-action"); //点击导航切换导航的样式
	$(".swiper-slide").eq(index).attr('shopflag', "true").siblings().attr("shopflag", "false")
	$("#shopping-main .swiper-wrapper").animate({
		transform: 'translate3d(-' + $(this).index() * phoneWidth + 'px,0,0)'
	}, 150, "ease-out"); //tab内容的切换
	$("#shopping-main .swiper-wrapper .swiper-slide").eq(index).parent().height(tab_height); //tab根据内容的高度改变swiper-container 的高度
});
//点击结算  第一次购买 时显示 弹出框
$(".jiesuan-right").on("tap", function() {
	var reg = /^ads.*/g;
	var localLength = localStorage.length;
	for(var i = 0; i <= localLength; i++) {
		if(reg.test(localStorage.key(i))) {
			//不是第一次购买
			window.location = "html/my/address.html?ifShopping=true";
			break;
		} else {
			//第一次购买
			$("#first-buy").show();
			break;
		}
	}
});

$("#first-close").on("tap", function() {
	$("#first-buy").hide();
});
//去完善
$(".tirst-info").on("tap", function() {
	window.location.href = "html/shopping/firstBuy.html";
});
//减少和添加数量
$(".shopping-main ul .shuliang").on("touchstart", ".jian", function() {
	var cha = $(this).siblings().eq(0).text();
	var chaInt = parseInt(cha) - 1
	if(cha <= 1) {
		$(this).removeClass("jian-action");

		$(this).siblings().eq(0).text("1");
	} else {
		$(this).addClass("jian-action");
		$(this).siblings().eq(0).text(chaInt)
	};
	numberTrue();
	price();
});
$(".shopping-main ul .shuliang").on("touchstart", ".jia", function() {
	var shuliang = $(this).siblings().eq(1).text();
	var he = parseInt(shuliang) + 1;
	$(this).siblings().eq(1).text(he);
	$(this).siblings().eq(0).addClass("jian-action");
	//			可以在这里设置购买数量的限制
	numberTrue();
	price();
});
//商品选中    
$(".shop-tab ul").on("touchstart touchmove", ".shopping-ckecked", function() {
	if($(this).attr("flag") == 'false') {
		$(this).addClass("shopping-ckecked-action");
		$(this).attr('flag', 'true')
	} else {
		$(this).removeClass("shopping-ckecked-action");
		$(this).attr('flag', 'false')
	};
	numberTrue();
	price();
});
//全选中当前页面的所有商品
$(".shopping-right").on("tap", function() {
	var length = $(".swiper-slide").length;
	for(var i = 0; i < length; i++) {
		if($(".swiper-slide").eq(i).attr("shopflag") == "true") {
			$("#shopping-main .swiper-slide").eq(i).find(".shopping-ckecked").addClass("shopping-ckecked-action").attr("flag", "true");
		} else {
			$("#shopping-main .swiper-slide").eq(i).find(".shopping-ckecked").removeClass("shopping-ckecked-action").attr("flag", "false");
		}
	}
	numberTrue();
	price();
})
//删除选中的商品
$(".shopping-left").on("tap", function() {
	$(".shopping-ckecked").each(function(){
		if($(this).attr("flag") == "true")
		$(this).parent().remove();
	})
	numberTrue();
	price();
})
//商品属性 flag = ”true“的商品
function numberTrue() {
	var length = $(".shopping-ckecked").length;
	var numberPro = 0;
	for(var i = 0; i < length; i++) {
		if($(".shopping-ckecked").eq(i).attr("flag") == "true")
			numberPro += Number($(".shopping-ckecked").eq(i).siblings().find(".shu").text());
	}
	productNumber(numberPro);
}
//选中商品的数量
function productNumber(number) {
	var proShu = $(".jiesuan-right span").text();
	var sum = proShu + number;
	$(".jiesuan-right span").text(number)
};
//总价计算
function price() {
	var length = $(".shopping-ckecked").length;
	var price = 0;
	var jiHe = '0.00';
	for(var i = 0; i < length; i++) {
		if($(".shopping-ckecked").eq(i).attr("flag") == "true") {
			var danjia = parseFloat($(".shopping-ckecked").eq(i).siblings().find(".list-price").html());
			var shuliang = parseFloat($(".shopping-ckecked").eq(i).siblings().find(".shu").html());
			price += (danjia * shuliang);
			jiHe = changeTwoDecimal_f(price);
		}
	}
	$(".jiesuan-zongji").text(jiHe);
}
//将浮点数四舍五入，取小数点后2位，如果不足2位则补0,这个函数返回的是字符串的格式
function changeTwoDecimal_f(x) {
	var f_x = parseFloat(x);
	if(isNaN(f_x)) {
		return false;
	}
	var f_x = Math.round(x * 100) / 100;
	var s_x = f_x.toString();
	var pos_decimal = s_x.indexOf('.');
	if(pos_decimal < 0) {
		pos_decimal = s_x.length;
		s_x += '.';
	}
	while(s_x.length <= pos_decimal + 2) {
		s_x += '0';
	}
	return s_x;
}

//语言
autoLanguage();
carNav();
function autoLanguage() {
	var getItem = localStorage.getItem("language");
	if(localStorage.getItem("language") == "0") {
		$("head link:last-child").remove();
	} else if(localStorage.getItem("language") == "1") {
		$("head link:last-child").remove();
		carUSA()
	} else if(localStorage.getItem("language") == "2") {
		$("head link:last-child").remove();
		carMalaysia()
	}
};
//register.html 语言切换
function carUSA() {
	var link = '<link rel="stylesheet" type="text/css" href="css/language/car_USA.css"/>';
	$("head").append(link)
}

function carMalaysia() {
	var link = '<link rel="stylesheet" type="text/css" href="css/language/car_Malaysia.css"/>';
	$("head").append(link)
}

function carNav() {
	var getItem = localStorage.getItem("language");
	if(getItem == 0) {
		$(".shopping-nav ul li").eq(0).text("代购商品")
		$(".shopping-nav ul li").eq(1).text("平台商品")
	} else if(getItem == 1) {
		$(".shopping-nav ul li").eq(0).text("Shopping goods")
		$(".shopping-nav ul li").eq(1).text("Platform goods")
	} else if(getItem == 2) {
		$(".shopping-nav ul li").eq(0).text("Membeli barang-barang")
		$(".shopping-nav ul li").eq(1).text("Platform Produk")
	}

}