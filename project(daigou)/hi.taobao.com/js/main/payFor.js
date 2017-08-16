price();
//选择付款方式
$(".pay-way li").on("tap", function() {
 	choosePay()
	$(this).siblings().find("span").removeClass("span-action")
	if($(this).attr("flag") == "true"){ //所选中的付款方式
		$(this).find("span").addClass("span-action");
	}
})
//完成付款
$("#pay-footer").on("tap", function() {
	$("#pay-success").show();
	$("#pay-list").hide();
})
//返回首页
$("#back-souye").on("tap", function() {
	window.location.href = "../../index.html";
})
//查看订单
$("#look-dingdan").on("tap", function() {
	window.location.href = "../myOrder/myOrder.html"
})
//支付返回
$(".pay-back").on("tap",function(){
	window.location.href = "../../shoppingCar.html"
})
/*支付成功后的 返回*/
$(".pay-success-back").on("tap",function(){
	$("#pay-success").hide();
	$("#pay-list").show();
})
//金额计算
function price() {
	var length = $(".pay-more-list li").length,
		shuLiang, danJia, productZongJi, zongJi = 0;
	for(var i = 0; i < length; i++) {
		danJia = $(".pay-more-list li").eq(i).find(".danjia").text();
		shuLiang = $(".pay-more-list li").eq(i).find(".shuliang").text();
		productZongJi = Number(danJia) * Number(shuLiang);
		zongJi = zongJi + productZongJi;
	}
	$(".zongji").text((accounting.formatMoney(zongJi).replace(/\$/, "")))
}
//语言
autoLanguage();
choosePay();
function autoLanguage() {
	var getItem = localStorage.getItem("language");
	if(localStorage.getItem("language") == "0") {
		$("head link:last-child").remove();
		$(".lang_payFor_9").text("恭喜您, 支付成功!")
	} else if(localStorage.getItem("language") == "1") {
		$("head link:last-child").remove();
		$(".lang_payFor_9").text("Congratulations, paid success!")
		payForUSA()
	} else if(localStorage.getItem("language") == "2") {
		$("head link:last-child").remove();
		$(".lang_payFor_9").text("Tahniah, kejayaan pembayaran!")
		payForMalaysia()
	}
};
//register.html 语言切换
function payForUSA() {
	var link = '<link rel="stylesheet" type="text/css" href="../../css/language/payFor_USA.css"/>';
	$("head").append(link)
}

function payForMalaysia() {
	var link = '<link rel="stylesheet" type="text/css" href="../../css/language/payFor_Malaysia.css"/>';
	$("head").append(link)
}
//不同的国家选择不同的付款方式
function choosePay(){
	var lang = localStorage.getItem("language");
	if(lang == 0){
		$(".pay-way li").eq(0).attr("flag","true");
		$(".pay-way li").eq(1).attr("flag","false");
		$(".pay-way li").eq(2).attr("flag","true");
		$(".pay-way li").eq(3).attr("flag","true");
	}else if(lang == 1){
		$(".pay-way li").eq(0).attr("flag","true");
		$(".pay-way li").eq(1).attr("flag","false");
		$(".pay-way li").eq(2).attr("flag","false");
		$(".pay-way li").eq(3).attr("flag","false");
	}else if(lang == 2){
		$(".pay-way li").eq(0).attr("flag","true");
		$(".pay-way li").eq(1).attr("flag","true");
		$(".pay-way li").eq(2).attr("flag","false");
		$(".pay-way li").eq(3).attr("flag","false");
	}
	$(".pay-way li").each(function(){
		if($(this).attr("flag") == 'true' ){
			$(this).css("color","#333")
		}else if($(this).attr("flag") == "false"){
			$(this).css("color","#D3D3D3")
		}
	})
}







