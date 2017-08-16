var url = $("#urlid").val();
var language = localStorage.getItem("language")
if (language == null || language == '' || language == undefined) {
	language = 0;
}

// 返回购物车
$(function(){

	$(".perfect-back").on("tap",function(){

		window.location.href = url + "/wx/shoppingCar.html?type=" + language;
	});
});
// 获得焦点时 value为空

var country = 0;
var province = 0;
var city = 0;
var area = 0;

var inputattr,thisContent = [],reg = /\s*$/, // 全部是空字符
tel = /(\s*$)|^(((\d{11})|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$))/,
// 空字符 或者不是电话或手机号
IDCard = /^(^(\d{15}$|^\d{18}$|^\d{17}(\d|X|x))$)/, // 不是身份证号
firstBuy = {}, // 第一次购买时保存的地址信息
length = $(".perfect-put").length;
// 选择地址
$("#perfect-main ul li div" + ".perfect-put").on("tap",function(){

	$(".choose-address").show();
	$(".choose-country").show();

});
$.ajax({
	type:"get",
	url:url + "app/appIndexController/provinces.do",//
	data:{
		code:"0",
		type:language
	},
	async:"true",
	dataType:"json",
	success:function(data){

		// alert("success");
		addAds(data) // 是选择省市区
	},
	error:function(error){

		alert(error)
	}
})
var choose_country;
var choose_province;
function addAds(dataObj){

	var obj_data = dataObj.countryArray;
	var obj_length = dataObj.countryArray.length; // 国家的长度
	for (var i = 0; i < obj_length; i++) {
		$("#country-wrapper #scroller").append('<dd id=' + obj_data[i].countryid + '>' + obj_data[i].countryname + '</dd>') // 国家
	}
	;

	// 选择国家 添加省
	$(".choose-country").on("tap","dd",function(){

		$("#province-wrapper #scroller").html("")
		localStorage.setItem("cos_country",$(this).text())
		localStorage.setItem("countryid",$(this).attr("id"));
		country = $(this).attr("id");
		$(".add-info input").removeAttr("readonly") // 移除readonly的属性使之能够弹出键盘

		$(".choose-country").hide();
		$(".choose-province").show();
		// 点击某个省 显示某个省的市
		choose_country = $(this).index();
		var province = obj_data[choose_country].countryArray;
		for (var i = 0; i < province.length; i++) {
			$("#province-wrapper #scroller").append('<dd id=' + province[i].shenid + '>' + province[i].shenname + '</dd>')
		}
	});

	// 选择省 添加市
	$(".choose-province").on("tap","dd",function(){

		$("#city-wrapper #scroller").html("");
		localStorage.setItem("cos_sheng",$(this).text());
		localStorage.setItem("shengid",$(this).attr("id"));
		province = $(this).attr("id");
		$(".choose-province").hide();

		// 点击某个省 显示某个省的市
		choose_province = $(this).index();
		var city = obj_data[choose_country].countryArray[choose_province].shenArray;
		if (city.length > 0) {
			$(".choose-city").show();
			for (var i = 0; i < city.length; i++) {
				$("#city-wrapper #scroller").append('<dd id=' + city[i].shiid + '>' + city[i].shiname + '</dd>')
			}
		} else {
			$(".choose-address").hide();
			var html = localStorage.getItem("cos_country") + localStorage.getItem("cos_sheng");
			$(".perfect-put").html(html);
		}
	});

	// 选择市 添加区
	$(".choose-city").on("tap","dd",function(){

		$("#area-wrapper #scroller").html("");
		localStorage.setItem("cos_shi",$(this).text());
		city = $(this).attr("id");
		$(".choose-city").hide();

		// 点击某个市 显示魔鳄个市的县
		var choose_city = $(this).index();
		var area = obj_data[choose_country].countryArray[choose_province].shenArray[choose_city].shiArray;
		if (area.length > 0) {
			$(".choose-area").show();
			for (var i = 0; i < area.length; i++) {
				$("#area-wrapper #scroller").append('<dd id=' + area[i].id + '>' + area[i].quname + '</dd>')
			}
		} else {
			$(".choose-address").hide();

			var html = localStorage.getItem("cos_country") + localStorage.getItem("cos_sheng") + localStorage.getItem("cos_shi");
			$(".perfect-put").html(html);
		}
	});

	// 区或县
	$(".choose-area").on("tap","dd",function(){

		localStorage.setItem("cos_qu",$(this).text());
		area = $(this).attr("id");
		$(".choose-address").hide();
		$(".choose-area").hide();
		fnaddress();
		$("#city-wrapper #scroller").html("");
		$("#area-wrapper #scroller").html("");
	});

}
$(".choose-country").hide();

// 保存
$("#perfect-footer").on("tap",function(){

	firstBuyInfo();
})
// 第一次购买时向本地存储的地址信息
function firstBuyInfo(){

	var myreg = /^1[3|4|5|7|8]\d{9}$/;// 手机的正则表达式
	var reg = /^\w{3,11}@\w+(\.[a-zA-Z]{2,3}){1,2}$/;// 判断邮箱 :包含@和. 并且@在.之前
	var userid = $("#id").val();

	var name = $(".name").val();
	var tel = $(".name-tel").val();
	var address = $(".address").html();
	var addressOther = $(".ads-detailed").val();
	var name_ID = $(".name-ID").val();// 身份证
	var ads_content = address + addressOther;
	var email = $("#email").val();

	if (name.length && tel.length && address.length && email.length) {

		if (tel.length != 11 && !myreg.test(tel)) {
			alert("手机号格式不正确!");
			$(".name-tel").focus();
			return false;
		}
		if (address == "请选择所在地区" || address == "Please select your location" || address == "Sila pilih kawasan yang mana") {
			alert("请选择所在地区");
			return false;
		}
		if (!reg.test(email)) {
			alert("Email格式不正确，例如:web@sohu.com");
			$("#email").focus();
			return false;
		}

		$.ajax({
			type:"POST",
			url:url + "/app/appShoppingController/saveInfo.do",
			data:{
				userId:userid,
				username:name,
				phone:tel,
				country:country,
				province:province,
				city:city,
				area:area,
				detailed:addressOther,
				idCard:name_ID,
				email:email
			},
			success:function(data){

				if ("success" == data.code) {
					var objAds = {
						firstBuy:"firstBuy",
						username:name,
						usertel:tel,
						userads:ads_content,
						name_ID:name_ID
					};
					var objAdsStr = JSON.stringify(objAds)
					localStorage.setItem('ads' + 0,objAdsStr); // 保存到本地
					window.location.href = url + "/wx/shoppingCar.html?type=" + language;
				} else {
					window.location.href = url + "/wx/login.html";
				}
			},
		});

	} else {
		// 判断收货人的姓名是否为空
		if (name == "") {
			alert("请输入收货人的姓名！");
			$(".name").focus();
			return false;
		}

		// 判断手机号
		// var myreg = /^(((13[0-9]{1})|159)+\d{8})$/;
		if (tel == "") {
			alert("手机号不能为空!");
			$(".name-tel").focus();
			return false;
		}

		// 判断详细地址
		if (addressOther == "") {
			alert("详细地址不能为空!");
			$(".ads-detailed").focus();
			return false;
		}

		if (email == "") {
			alert("邮箱不能为空!");
			$("#email").focus();
			return false;
		}
	}
}
// 地址信息显示到所在地区中
function fnaddress(){

	var html = localStorage.getItem("cos_country") + localStorage.getItem("cos_sheng") + localStorage.getItem("cos_shi")
			+ localStorage.getItem("cos_qu");
	$(".perfect-put").html(html);
};
// 语言
autoLanguage();

function autoLanguage(){

	var getItem = localStorage.getItem("language");
	if (localStorage.getItem("language") == "0") {
		$(".lang_first_1").text("完善资料");
		$(".lang_first_2").text("保存");
		$(".lang_address_6").text("姓名")
		$(".lang_address_7").text("手机号码")
		$(".lang_address_8").text("所在地区")
		$(".address").text("请选择所在的地区")
		$(".lang_address_10").text("详细地址")
		$(".lang_address_11").text("身份证")
	} else if (localStorage.getItem("language") == "1") {
		$(".lang_first_1").text("maklumat Perfect");
		$(".lang_first_2").text("Simpan");
		$(".lang_address_6").text("Nama")
		$(".lang_address_7").text("Nombor telefon bimbit")
		$(".lang_address_8").text("Kawasan")
		$(".address").text("Sila pilih kawasan anda berada")
		$(".lang_address_10").text("Alamat penuh")
		$(".lang_address_11").text("Kad pengenalan")
	} else if (localStorage.getItem("language") == "2") {
		$(".lang_first_1").text("Complete Material");
		$(".lang_first_2").text("Save");
		$(".lang_address_6").text("Name")
		$(".lang_address_7").text("Mobile phone number")
		$(".lang_address_8").text("Region")
		$(".address").text("Please select your region")
		$(".lang_address_10").text("Detailed address")
		$(".lang_address_11").text("Identity card")
	}
};