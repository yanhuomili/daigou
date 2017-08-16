$(function() {
	//选择国家
	$(".zhuce-country").on("tap", function() {
		$("#choose-country").show();
	});
	$("#choose-country .choose-btn").on("tap", function() {
		$(".zhuce-country span").text($(this).text());
		$("#choose-country").hide();
	});
	//表单验证
	var tel = /^(0|86|17951)?(13[0-9]|15[012356789]|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
	var psw = /^\w{8,16}$/;
	$("#user-tell").blur(function() {
		tel.test($(this).val())
		if(tel.test($(this).val())) {
			return;
		} else {
			alert("您输入的信息有误!")
		}
	});
	$("#user-psw").blur(function() {
		tel.test($(this).val())
		if(psw.test($(this).val())) {
			return;
		} else {
			alert("您输入的信息有误!")
		}
	});
	//登录
	$(".zhuce-right").on("tap", function() {
		window.location.href = "login.html";
	});

	//语言
	autoLanguage();
	function autoLanguage(){
		var getItem = localStorage.getItem("language");
		if(localStorage.getItem("language") == "0"){
			$("head link:last-child").remove();
		}else if(localStorage.getItem("language") == "1"){
			$("head link:last-child").remove();
			registerUSA()
		}else if(localStorage.getItem("language") == "2"){
			$("head link:last-child").remove();
			registerMalaysia()
		}
	};
	//register.html 语言切换
	function registerUSA(){
		var link = '<link rel="stylesheet" type="text/css" href="../../css/language/register_USA.css"/>';
	$("head").append(link)
	}
	function registerMalaysia(){
		var link = '<link rel="stylesheet" type="text/css" href="../../css/language/register_Malaysia.css"/>';
	$("head").append(link)
	}

})