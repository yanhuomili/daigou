//返回购物车
$(function() {
	$(".perfect-back").on("tap", function() {
		window.location.href = "../../shoppingCar.html"
	});
});
//获得焦点时 value为空
var inputattr,
	thisContent = [],
	reg = /\s*$/, //全部是空字符
	tel = /(\s*$)|^(((\d{11})|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$))/,
	//空字符  或者不是电话或手机号
	IDCard = /^(^(\d{15}$|^\d{18}$|^\d{17}(\d|X|x))$)/, //不是身份证号
	firstBuy = {}, //第一次购买时保存的地址信息
	length = $(".perfect-put").length;
//选择地址
$("#perfect-main ul li div" + ".perfect-put").on("tap", function() {
	$(".choose-address").show();
	$(".choose-country").show();
});
//国家
$(".choose-country").on("tap", "dd", function() {
	localStorage.setItem("cos_country", $(this).text())
	/*如果选择马来西亚调用马来西亚的地址，如果选择中国调用中国的地址*/
	if($(this).text() == "中国") {
		//				alert("调用中国的地址")
		//添加中国的地址
		$.ajax({
			type: "get",
			url: "../../source/address.json",
			async: "true",
			dataType: "json",
			success: function(data) {
				$("#city-wrapper #scroller").append("")
				sheng(data) //省
			},
			error: function(error) {
				console.log(error)
			}
		})
		var choose_province;

		function sheng(data) {
			var obj_data = data.data;
			var obj_length = data.data.length; //省长度
			for(var i = 0; i < obj_length; i++) {
				$("#province-wrapper #scroller").append('<dd>' + obj_data[i].name + '</dd>') //省
			};
			//选择省 添加市
			$(".choose-province").on("tap", "dd", function() {
				//清空上次添加的内容
				$("#city-wrapper #scroller").html("")
				localStorage.setItem("cos_sheng", $(this).text())
				$(".choose-province").hide();
				$(".choose-city").show();
				//点击某个省 显示魔鳄个省的市
				choose_province = $(this).index();
				var city_length = obj_data[choose_province].cities.length;
				for(var i = 0; i < city_length; i++) {
					$("#city-wrapper #scroller").append('<dd>' + obj_data[choose_province].cities[i].name + '</dd>')
				}
			});
			//选择市 添加区
			$(".choose-city").on("tap", "dd", function() {
				//清空上次添加的内容
				$("#area-wrapper #scroller").html("");
				localStorage.setItem("cos_shi", $(this).text())
				$(".choose-city").hide();
				$(".choose-area").show();
				//点击某个市 显示魔鳄个市的县
				var choose_city = $(this).index();
				var area_length = obj_data[choose_province].cities[choose_city].district.length;
				for(var i = 0; i < area_length; i++) {
					$("#area-wrapper #scroller").append('<dd>' + obj_data[choose_province].cities[choose_city].district[i].name + '</dd>')
				}
			});
			//区或县
			$(".choose-area").on("tap", "dd", function() {
				localStorage.setItem("cos_qu", $(this).text())
				$(".choose-address").hide();
				$(".choose-area").hide();
				fnaddress()
				//			localStorage.setItem("firstBuy")//保存到本地
			});
		}
		$(".choose-country").hide();
		$(".choose-province").show();
	} else {
		alert("调用马来西亚的地址")
	}
});
//保存
$("#perfect-footer").on("tap", function() {

	firstBuyInfo();
})
//第一次购买时向本地存储的地址信息 
function firstBuyInfo() {
	var name = $(".name").val(),
		tel = $(".name-tel").val(),
		address = $(".address").html(),
		addressOther = $(".ads-detailed").val(),
		name_ID = $(".name-ID").val(),
		ads_content = address + addressOther;
	if(name.length && tel.length && address.length != 7) {
		var objAds = {
			firstBuy: "firstBuy",
			username: name,
			usertel: tel,
			userads: ads_content,
			name_ID: name_ID
		};
		var objAdsStr = JSON.stringify(objAds)
		localStorage.setItem('ads' + 0, objAdsStr); //保存到本地
		window.location.href = "affirmOrderForm.html";
	} else {
		alert("请填写收货信息！");
		return;
	}
}
//地址信息显示到所在地区中
function fnaddress() {
	var html = localStorage.getItem("cos_country") + localStorage.getItem("cos_sheng") + localStorage.getItem("cos_shi") + localStorage.getItem("cos_qu");
	$(".perfect-put").html(html);
};
//语言
autoLanguage();

function autoLanguage() {
	var getItem = localStorage.getItem("language");
	if(localStorage.getItem("language") == "0") {
		$(".lang_first_1").text("完善资料");
		$(".lang_first_2").text("保存");
	} else if(localStorage.getItem("language") == "1") {
		$(".lang_first_1").text("Complete Material");
		$(".lang_first_2").text("Save");
	} else if(localStorage.getItem("language") == "2") {
		$(".lang_first_1").text("maklumat Perfect");
		$(".lang_first_2").text("Jimat");
	}
};