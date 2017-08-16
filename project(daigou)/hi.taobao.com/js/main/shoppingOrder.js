//点击提交订单
var postage = 20;//邮费价格总计
var number = 0;//商品件数
var allPrice = 0;//商品总价
var Deductible = 0;//优惠券的抵扣
numberProduct()//商品件数；
priceProduct()//商品总价
DeductibleFn();//优惠券折扣显示
payAll();//应付金额
$("#affirm-footer").on("tap", function() {
	$("#submit-list").hide();
	$("#sub-list-success").show();
})
$(".affirm-back").on("tap", function() {
	window.location.href = "../../shoppingCar.html"
})
//选择快递
$(".affirm-send").on("tap", function() {
	$("#affirm-postage").show();
})
$("#affirm-postage ul li").on("tap", function() {
	$("#affirm-postage ul li").find("span").removeClass("affitm-action");
	var inform = $(this).find("p").eq(0).text();
	var reg = /\d+\.?\d*|\.\d+/;
	postage = toDecimal2($(this).find("p:first-child").text().match(reg));//所选的邮费价格
	$(this).find("span").addClass("affitm-action");
	$(".affirm-send").find("span").text(inform);
	$("#affirm-postage").hide()
	$(".affirm-price li:nth-of-type(2) span:first-child").text(postage)//邮费显示
	payAll()
})

//选择收货地址
$(".affirm-address").on("tap", function() {
	window.location.href = "../my/address.html?ifAffirm=true"
})
//商品件数以及价格计算
function numberProduct(){
	number = $(".affirm-list li").length;
	$(".number").text(number)
}
function priceProduct(){
	$(".affirm-list li").each(function(){
		var Price = Number($(this).find(".affirm-money span:nth-of-type(1)").text());
		var Quantity = Number($(this).find(".affirm-money span:nth-of-type(2)").text());
		allPrice += Price*Quantity;
	})
	var showAllPrice = toDecimal2(allPrice);
	$(".showAllPrice").text(showAllPrice);//商品总价格显示
	localStorage.setItem("allPrice",showAllPrice)//用于判断优惠券的使用条件
}
//选择优惠券
$(".choose_btn").on("tap",function(){
	window.location.href = "../my/coupon.html"
})
//优惠券折扣显示
function DeductibleFn(){
	var reg = /\d+\.?\d*|\.\d+/;
	Deductible = toDecimal2(localStorage.getItem("discount"));
	$(".deductible").text(Deductible)
}
//应付金额
function payAll(){
	console.log(postage,allPrice,Deductible)
	var payAllPrice = Number(allPrice) + Number(postage) - Number(Deductible);
	$(".payAllPrice").text( toDecimal2(payAllPrice) );//应付金额显示
}
//提交成功后
$(".back-success").on("tap", function() {
	$("#submit-list").show();
	$("#sub-list-success").hide();
})
//返回首页
$("#back-souye").on("tap", function() {
	window.location.href = "../../index.html";
})
//查看订单
$("#look-dingdan").on("tap", function() {
	window.location.href = "../myOrder/myOrder.html"
})
//制保留2位小数，如：2，会在2后面补上00.即2.00    
function toDecimal2(x) {    
    var f = parseFloat(x);    
    if (isNaN(f)) {    
        return false;    
    }    
    var f = Math.round(x*100)/100;    
    var s = f.toString();    
    var rs = s.indexOf('.');    
    if (rs < 0) {    
        rs = s.length;    
        s += '.';    
    }    
    while (s.length <= rs + 2) {    
        s += '0';    
    }    
    return s;    
}  
//语言
autoLanguage();

function autoLanguage() {
	var getItem = localStorage.getItem("language");
	if(localStorage.getItem("language") == "0") {
		$("head link:last-child").remove();
		$(".lang_affirmOrderForm_4").text("恭喜您, 提交订单成功!")
		
	} else if(localStorage.getItem("language") == "1") {
		$("head link:last-child").remove();
		$(".lang_affirmOrderForm_4").text("Congratulations, submit your order success!")
		shoppingOederUSA()
	} else if(localStorage.getItem("language") == "2") {
		$("head link:last-child").remove();
		$(".lang_affirmOrderForm_4").text("Tahniah, mengemukakan kejayaan perintah itu!")
		shoppingOederMalaysia()
	}
};
//register.html 语言切换
function shoppingOederUSA() {
	var link = '<link rel="stylesheet" type="text/css" href="../../css/language/affirm_USA.css"/>';
	$("head").append(link)
}
function shoppingOederMalaysia() {
	var link = '<link rel="stylesheet" type="text/css" href="../../css/language/affirm_Malaysia.css"/>';
	$("head").append(link)
}