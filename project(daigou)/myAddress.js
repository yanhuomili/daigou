$(function(){

	var country = 0;
	var province = 0;
	var city = 0;
	var area = 0;
	var url = $("#urlid").val();
	var language = localStorage.getItem("language")
	if (language == null || language == '' || language == undefined) {
		language = 0;
	}

	// autoAds(); // 自动加载localStorage中的地址信息
	isHasAddress(); // 判断是否有地址信息
	// 返回d4页
	$(".my-back").on("tap",function(){

		history.go(-1)
	});
	// 点击返回收货地址管理
	$(".address-back").on("tap",function(){

		$("#address").show();
		$("#add-address").hide();
		isHasAddress();
	});
	// 设置默认地址
	$(".address-list ul ").on("tap",".ads-moren",function(){

		var id = $(this).attr("title");
		var thethis = $(this).parent();
		// alert(id);

		$.ajax({
			type:"POST",
			url:url + "/html/my/defaultAddress.do",
			data:{
				id:id
			},
			success:function(data){

				if ("success" == data.result) {
					thethis.addClass("address-action").siblings().removeClass("address-action");
				} else {
					window.location.href = url + "/wx/login.html";
				}
			},
		});
	});
	// 删除地址
	$(".address-list ul").on("tap","i",function(){

		$(this).parent().remove();
		// alert($(this).attr("title"))
		var id = $(this).attr("title");

		$.ajax({
			type:"POST",
			url:url + "/html/my/deleteMyAddress.do",
			data:{
				id:id
			},
			success:function(data){

				localStorage.removeItem("ads" + $(this).attr("index"))
			},
		});

		// localStorage.removeItem("ads" + $(this).attr("firstbuy"))
		// autoAds();
		isHasAddress();
	});
	// 点击新建
	$(".new-xinjian").on("tap",function(){

		$("#address").hide();
		$("#add-address").show();
	});
	// 所在的地区
	$(".input-3").on("tap",function(){

		$(".choose-address").show();
		$(".choose-country").show();
		$(".add-info input").attr("readonly","readonly") // 设置input为只读防止移动端的键盘弹出
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

			addAds(data) // 是选择国省市区
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
			// 点击省 显示市
			choose_country = $(this).index();
			var provinces = obj_data[choose_country].countryArray;
			for (var i = 0; i < provinces.length; i++) {
				$("#province-wrapper #scroller").append('<dd id=' + provinces[i].shenid + '>' + provinces[i].shenname + '</dd>')
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
				$(".input-3").html(html);
			}
		});

		// 选择市 添加区
		$(".choose-city").on("tap","dd",function(){

			$("#area-wrapper #scroller").html("");
			localStorage.setItem("cos_shi",$(this).text());
			city = $(this).attr("id");
			$(".choose-city").hide();

			// 点击市 显示县
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
				$(".input-3").html(html);
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

	// 点击保存添加收货地址
	$(".add-add").on(
			"tap",
			function(){

				//
				// var name = null,tel = null,address = null,addressOther = null,ads_content = null;
				// name = $(".name").val();
				// tel = $(".name-tel").val();
				// address = $(".input-3").html();
				// addressOther = $(".xiangxi-address").val();
				// ads_content = address + addressOther;
				// // 判断是否添加空的收货地址；
				//
				// if (name.length && tel.length && address.length) {
				// // 判断收货地址管理中是否有这个收货地址
				// /*******************************************************************************************************************************
				// * **********************重复的收货地址判断
				// *
				// *
				// * 预留
				// *
				// *
				// * 结束
				// ******************************************************************************************************************************/
				// var time = new Date().getTime()
				// var objAds = {
				// add_ads_index:time,
				// username:name,
				// usertel:tel,
				// userads:ads_content
				// };
				// var objAdsStr = JSON.stringify(objAds)
				// localStorage.setItem('ads' + time,objAdsStr); // 保存到本地
				// autoAds();
				// isHasAddress();
				// // 返回收货地址管理
				// $("#add-address").hide();
				// $("#address").show();
				// } else {
				// alert("请填写收货信息！");
				// return;
				// }
				console.log("国家的id是：" + country);
				console.log("省的id是：" + province);
				console.log("市的id是：" + city);
				console.log("区的id是：" + area);
				var name = $(".name").val();
				var tel = $(".name-tel").val();
				var address = $(".input-3").html();
				var addressOther = $(".xiangxi-address").val();
				var email = $(".email").val();
				var ads_content = address + addressOther;
				var myreg = /^1[3|4|5|7|8]\d{9}$/;// 手机的正则表达式
				var reg = /^\w{3,11}@\w+(\.[a-zA-Z]{2,3}){1,2}$/;// 判断邮箱 :包含@和. 并且@在.之前
				var userid = $("#id").val();

				// 判断是否添加空的收货地址；
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
						$(".email").focus();
						return false;
					}

					$.ajax({
						type:"POST",
						url:url + "/html/my/saveAddress.do",
						data:{
							userid:userid,
							name:name,
							country:country,
							province:province,
							city:city,
							area:area,
							phone:tel,
							// region:address,
							detailed:addressOther,
							isdefault:"0",
							email:email
						},
						success:function(data){

							var shoppingId = $("#shoppingId").val();
							var status = $("#status").val();
							var type = $("#type").val();
							var youhui = $("#youhui").val();
							var zhuantai = $("#zhuantai").val();
							var goodsId = $("#goodsId").val();
							var styleId = $("#styleId").val();
							var count = $("#count").val();
							if ("success" == data.result) {
								if (goodsId != null && goodsId != "" && goodsId != undefined && zhuantai != null && zhuantai != ""
										&& zhuantai != undefined) {
									window.location.href = url + "/html/my/address.do?userid=" + $("#id").val() + "&shoppingId="
											+ shoppingId + "&status=" + status + "&type=" + type + "&youhui=" + youhui + "&zhuantai="
											+ zhuantai + "&goodsId=" + goodsId + "&styleId=" + styleId + "&count=" + count;
								} else {
									window.location.href = url + "/html/my/address.html?userid=" + $("#id").val() + "&type=" + language;
								}
								if (localStorage.pagecount) {
									localStorage.pagecount = Number(localStorage.pagecount) + 1;
								} else {
									localStorage.pagecount = 1;
								}
								var objAds = {
									add_ads_index:localStorage.pagecount,
									username:name,
									usertel:tel,
									userads:ads_content
								};
								var objAdsStr = JSON.stringify(objAds)
								localStorage.setItem('ads' + localStorage.pagecount,objAdsStr); // 保存到本地
								// autoAds();
								isHasAddress();
								// 返回收货地址管理
								$("#add-address").hide();
								$("#address").show();

							} else {
								window.location.href = url + "/wx/login.html";
							}
						},
					});

					// 判断收货地址管理中是否有这个收货地址
					/***********************************************************************************************************************
					 * **********************重复的收货地址判断
					 * 
					 * 
					 * 预留
					 * 
					 * 
					 * 结束
					 **********************************************************************************************************************/

				} else {
					// 判断收货人的姓名是否为空
					if (name == "") {
						alert("请输入收货人的姓名！");
						$("#name").focus();
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
						$(".xiangxi-address").focus();
						return false;
					}

					if (email == "") {
						alert("邮箱不能为空!");
						$(".email").focus();
						return false;
					}
				}

			});
	// 自动从本地中获取地址信息；
	function autoAds(){

		var reg = /^ads.*/g;
		// $(".address-list ul").html("");
		var localLength = localStorage.length;
		for (var i = 0; i < localLength; i++) {
			console.log(reg.test(localStorage.key(i)),localStorage.key(i))
			console.log(reg.test(localStorage.key(i)) == true)

			if (reg.test(localStorage.key(i)) == true) {
				var keyAds = localStorage.key(i);
				console.log(keyAds)
				var objAdsObj = JSON.parse(localStorage.getItem(keyAds));
				var address = '<li>' + '<p class="ads-name">' + objAdsObj.username + '</p>' + '<p class="ads-tel">' + objAdsObj.usertel
						+ '</p>' + '<p class="ads-content">' + objAdsObj.userads + '</p>' + '<span class="ads-moren">设为默认地址</span>'
						+ '<i class="ads-remove" index=' + objAdsObj.add_ads_index + '>删除</i>' + '</li>';
				$(".address-list ul").prepend(address);
			} else {
				console.log(localStorage.key(i))
			}
		}
		// $(".address-list ul li").removeClass("address-action").eq(0).addClass("address-action");
	}
	// 判断收货地址管理是否有收货地址
	function isHasAddress(){

		if ($(".address-list ul li").length) {
			$("html").css("background","#ededed");
			$(".have-address").show();
			$(".null-address").hide();
		} else {
			$("html").css("background","#fff");
			$(".have-address").hide();
			$(".null-address").show();
		}
		;
	}
	;
	// 地址信息显示到所在地区中
	function fnaddress(){

		var html = localStorage.getItem("cos_country") + localStorage.getItem("cos_sheng") + localStorage.getItem("cos_shi")
				+ localStorage.getItem("cos_qu");
		$(".input-3").html(html);
	}
	;

	function GetQueryString(name){

		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
		var r = window.location.search.substr(1).match(reg);
		if (r != null)
			return unescape(r[2]);
		return null;
	}

	// 语言
	autoLanguage();
	function autoLanguage(){

		var getItem = localStorage.getItem("language");
		if (localStorage.getItem("language") == "0") {
			languageChina()
		} else if (localStorage.getItem("language") == "1") {
			languageMalaysia()
		} else if (localStorage.getItem("language") == "2") {
			languageUSA()
		}
	}
	;
	function languageChina(){

		$(".lang_address_1").text("收货地址管理")
		$(".lang_address_2").text("新建")
		$(".lang_address_3").text("暂无收货地址")
		$(".lang_address_4").text("新增收货地址")
		$(".lang_address_5").text("保存")
		$(".lang_address_6").text("姓名")
		$(".lang_address_7").text("手机号码")
		$(".lang_address_8").text("所在地区")
		$(".lang_address_9").text("请选择所在的地区")
		$(".lang_address_10").text("详细地址")
		$("head link:last-child").remove()
	}
	function languageMalaysia(){
		$(".lang_address_1").text("Pengurusan alamat penghantaran")
		$(".lang_address_2").text("Baru")
		$(".lang_address_3").text("Tiada alamat penghantaran")
		$(".lang_address_4").text("Alamat penghantaran yang baru ditambah")
		$(".lang_address_5").text("Simpan")
		$(".lang_address_6").text("Nama")
		$(".lang_address_7").text("Nombor telefon bimbit")
		$(".lang_address_8").text("Kawasan")
		$(".lang_address_9").text("Sila pilih kawasan anda berada")
		$(".lang_address_10").text("Alamat penuh")
		$("head link:last-child").remove()
		addressMalaysia()
	}
	function languageUSA(){

		$(".lang_address_1").text("Delivery address management")
		$(".lang_address_2").text("New")
		$(".lang_address_3").text("No shipping address")
		$(".lang_address_4").text("Newly added shipping address")
		$(".lang_address_5").text("Save")
		$(".lang_address_6").text("Name")
		$(".lang_address_7").text("Mobile phone number")
		$(".lang_address_8").text("Region")
		$(".lang_address_9").text("Please select your region")
		$(".lang_address_10").text("Detailed address")
		$("head link:last-child").remove()
		addressUSA()
	}
	function addressMalaysia(){

		var link = '<link rel="stylesheet" type="text/css" href="' + url + '/static/html/css/language/address_Malaysia.css"/>';
		$("head").append(link)
	}
	function addressUSA(){

		var link = '<link rel="stylesheet" type="text/css" href="' + url + '/static/html/css/language/address_USA.css"/>';
		$("head").append(link)
	}

});
