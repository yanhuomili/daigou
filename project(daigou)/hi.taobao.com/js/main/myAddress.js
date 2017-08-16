$(function() {
	autoAds(); //自动加载localStorage中的地址信息
	isHasAddress(); //判断是否有地址信息
	//返回d4页
	$(".my-back").on("tap", function() {
		history.go(-1)
	});
	//点击返回收货地址管理
	$(".address-back").on("tap", function() {
		$("#address").show();
		$("#add-address").hide();
		isHasAddress();
	});
	//设置默认地址
	$(".address-list ul ").on("tap",".ads-moren", function() {
		$(this).parent().addClass("address-action").siblings().removeClass("address-action");
	});
	//删除地址
	$(".address-list ul").on("tap", "i", function() {
		$(this).parent().remove();
		alert($(this).attr("index"))
		localStorage.removeItem("ads" + $(this).attr("index"))
//		localStorage.removeItem("ads" + $(this).attr("firstbuy"))
		autoAds();
		isHasAddress();
	});
	//点击新建
	$(".new-xinjian").on("tap", function() {
		$("#address").hide();
		$("#add-address").show();
	});
	//所在的地区
	$(".input-3").on("tap", function() {
		$(".choose-address").show();
		$(".choose-country").show();
		$(".add-info input").attr("readonly", "readonly") //设置input为只读防止移动端的键盘弹出
	});
	//国家
	$(".choose-country").on("tap", "dd", function() {
		$("#province-wrapper #scroller").html("")
		localStorage.setItem("cos_country", $(this).text())
		$(".add-info input").removeAttr("readonly") //移除readonly的属性使之能够弹出键盘
		/*如果选择马来西亚调用马来西亚的地址，如果选择中国调用中国的地址*/
		if($(this).text() == "中国") {
			//添加中国的地址
			$.ajax({
				type: "get",
				url: "../../source/address.json",//
				async: "true",
				dataType:"json",
				success: function(data) {
					$("#city-wrapper #scroller").append("")
					addAds(data) //是选择省市区
				}, 
				error: function(error) {
					alert(error)
				}
			})
			var choose_province; 

			function addAds(dataObj) {
				var obj_data = dataObj.data;
				var obj_length = dataObj.data.length; //省长度 
				for(var i = 0; i < obj_length; i++) {
					$("#province-wrapper #scroller").append('<dd>' + obj_data[i].name + '</dd>') //省
				};
				//选择省 添加市 
				$(".choose-province").on("tap", "dd", function() {
					$("#city-wrapper #scroller").html("");
					localStorage.setItem("cos_sheng", $(this).text());
					$(".choose-province").hide();
					$(".choose-city").show();
					//点击某个省 显示某个省的市
					choose_province = $(this).index();
					var city_length = obj_data[choose_province].cities.length;
					for(var i = 0; i < city_length; i++) {
						$("#city-wrapper #scroller").append('<dd>' + obj_data[choose_province].cities[i].name + '</dd>')
					}
				});
				//选择市 添加区
				$(".choose-city").on("tap", "dd", function() {
					$("#area-wrapper #scroller").html("");
					localStorage.setItem("cos_shi", $(this).text());
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
					localStorage.setItem("cos_qu", $(this).text());
					$(".choose-address").hide();
					$(".choose-area").hide();
					fnaddress();
					$("#city-wrapper #scroller").html("");
					$("#area-wrapper #scroller").html("");
				});
			}
		} else {
			alert("调用马来西亚的地址");
		}
		$(".choose-country").hide();
		$(".choose-province").show();
	});

	//点击保存添加收货地址
	$(".add-add").on("tap", function() {
		var name = null,tel = null, address = null, addressOther = null, ads_content = null;
		    name = $(".name").val();
			tel = $(".name-tel").val();
			address = $(".input-3").html();
			addressOther = $(".xiangxi-address").val();
			ads_content = address + addressOther;
		//判断是否添加空的收货地址；

		if(name.length && tel.length && address.length) {
			//判断收货地址管理中是否有这个收货地址
			/************************重复的收货地址判断
			
			
			    预留
			
			
			结束**************************************/
			var time = new Date().getTime()
			var objAds = {
				add_ads_index: time,
				username: name,
				usertel: tel,
				userads: ads_content
			};
			var objAdsStr = JSON.stringify(objAds)
			localStorage.setItem('ads' + time, objAdsStr); //保存到本地
			autoAds();
			isHasAddress();
			//返回收货地址管理
			$("#add-address").hide();
			$("#address").show();
		} else {
			alert("请填写收货信息！");
			return;
		}
	});
	//自动从本地中获取地址信息；
	function autoAds() {
		var reg = /^ads.*/g;
//		$(".address-list ul").html("");
		var localLength = localStorage.length;
		for(var i = 0; i < localLength; i++) {
			console.log(reg.test(localStorage.key(i)),localStorage.key(i))
			console.log(reg.test(localStorage.key(i)) == true)
			
			if(reg.test( localStorage.key(i) ) == true) {
				var keyAds = localStorage.key(i);
				console.log(keyAds)
				var objAdsObj = JSON.parse(localStorage.getItem(keyAds));
				var address = '<li>' +
					'<p class="ads-name">' + objAdsObj.username + '</p>' +
					'<p class="ads-tel">' + objAdsObj.usertel + '</p>' +
					'<p class="ads-content">' + objAdsObj.userads + '</p>' +
					'<span class="ads-moren">设为默认地址</span>' +
					'<i class="ads-remove" index=' + objAdsObj.add_ads_index + '>删除</i>' +
					'</li>';
				$(".address-list ul").prepend(address);
			} else {
				console.log(localStorage.key(i))
			}
		}
		$(".address-list ul li").removeClass("address-action").eq(0).addClass("address-action");
	}
	//判断收货地址管理是否有收货地址
	function isHasAddress() {
		if($(".address-list ul li").length) {
			$("html").css("background", "#ededed");
			$(".have-address").show();
			$(".null-address").hide();
		} else {
			$("html").css("background", "#fff");
			$(".have-address").hide();
			$(".null-address").show();
		};
	};
	//地址信息显示到所在地区中
	function fnaddress() {
		var html = localStorage.getItem("cos_country") + localStorage.getItem("cos_sheng") + localStorage.getItem("cos_shi") + localStorage.getItem("cos_qu");
		$(".input-3").html(html);
	};

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
			languageChina()
		}else if(localStorage.getItem("language") == "1"){
			languageUSA()
		}else if(localStorage.getItem("language") == "2"){
			languageMalaysia()
		}
	};
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
	function languageUSA(){
		$('header .lang_address_4,header .lang_address_5').css({'font-size': '0.25rem !important'})
//		header .lang_address_4, header .lang_address_5 {
//		    font-size: 0.25rem;
//		}
//		$(".lang_address_1").text("Delivery address management")
		$(".lang_address_1").html('<span class="newAdd">Delivery address management</span>')
		$(".lang_address_1 .newAdd").css({'font-size':'0.25rem !important'})
		$(".lang_address_2").text("New")
		$(".lang_address_3").text("No shipping address")
		$(".lang_address_4").text("New shipping address")
		$(".lang_address_5").text("Save")
		$(".lang_address_6").text("Name")
		$(".lang_address_7").text("Number")
		$(".lang_address_8").text("Where")
		$(".lang_address_9").text("Please select your location")
		$(".lang_address_10").text("Address")
		$("head link:last-child").remove()
		addressUSA()
	}
	function languageMalaysia(){
		$('header .lang_address_4,header .lang_address_5').css({'font-size': '0.25rem !important'})//新增收货地址头部
		$('.add-info .lang_address_7,.add-info .lang_address_8').parent().css({'line-height':'0'})
		$('#add-address .add-info .lang_address_9').css({'line-height':'1rem !important'})
		$('.lang_address_7').css({
			'display': 'inline-block',
		   'height': '100%',
		    'width': '1.16rem',
		    'padding-top': '0.1rem',
		    'box-sizing': 'border-box',
		    'line-height': '0.3rem !important',
		    'font-size':'0.2rem'
		})
		$('.lang_address_8').css({
			'display': 'inline-block',
		    'height': '100%',
		    'width': '1.2rem',
		    'padding-top': '0.2rem',
		    'box-sizing': 'border-box',
		    'line-height': '0.3rem !important',
		    'font-size':'0.2rem'
		    
		})
		
		
		
//		$(".lang_address_1").text("Pengurusan alamat dstwtwqw")
		$(".lang_address_1").html('<span>Pengurusan alamat penghantaran</span>')
		$(".lang_address_1 span").css({'font-size':'0.25rem !important'})
		$(".lang_address_2").text("New")
		$(".lang_address_3").text("Tiada alamat penghantaran")
		$(".lang_address_4").text("Tambah alamat penghantaran")
		$(".lang_address_5").text("Jimat")
		$(".lang_address_6").text("Nama")
		$(".lang_address_7").text("Nombor")
		$(".lang_address_8").text("Rantau")
		$(".lang_address_9").text("Sila pilih kawasan yang mana")
		$(".lang_address_10").text("Alamat")
		$("head link:last-child").remove()
		addressMalaysia()
	}
	function addressUSA(){
		var link = '<link rel="stylesheet" type="text/css" href="../../css/language/address_USA.css"/>';
		$("head").append(link)
	}
	function addressMalaysia(){
		var link = '<link rel="stylesheet" type="text/css" href="../../css/language/address_Malaysia.css"/>';
		$("head").append(link)
	}
});

















