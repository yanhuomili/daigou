//返回
$(".forget-left").on("tap", function() {
	window.location.href = "login.html";
})
//确定
$("#forgert-btn").on("tap", function() {

})
//选择国家
$(".forget-country").on("tap", function() {
	$("#choose-country").show();
})
$(".choose-btn").on("tap", function() {
	$(".forget-country span").text($(this).text());
	$("#choose-country").hide();
})

//语言
autoLanguage();

function autoLanguage() {
	var getItem = localStorage.getItem("language");
	if(localStorage.getItem("language") == "0") {
		$("head link:last-child").remove();
	} else if(localStorage.getItem("language") == "1") {
		$("head link:last-child").remove();
		registerUSA()
	} else if(localStorage.getItem("language") == "2") {
		$("head link:last-child").remove();
		registerMalaysia()
	}
};
//register.html 语言切换
function registerUSA() {
	var link = '<link rel="stylesheet" type="text/css" href="../../css/language/forget_USA.css"/>';
	$("head").append(link)
}

function registerMalaysia() {
	var link = '<link rel="stylesheet" type="text/css" href="../../css/language/forget_Malaysia.css"/>';
	$("head").append(link)
}