$(function() {
	//返回d4页
	$(".top-back").on("tap", function() {
		window.location.href = "../../my.html";
	});
	//佣金额
	commission()
	fans()
});

function fans() {
	$(".fans-shu").text($(".fenxiao-list-peo").length)
}

function commission() {
	var length = $(".fenxiao-list-peo").length,
		commission = Number($(".fenxiao-list-peo .common-3 span").eq(0).text()),
		reg = /^\$.$/;
	for(var i = 1; i < length; i++) {
		commission += Number($(".fenxiao-list-peo .common-3 span").eq(i).text())
	}
	$(".fenxiao-money").text((accounting.formatMoney(commission).replace(/\$/, "")))
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
		$(".lang_distribution_1").text("我的分销")
		$(".lang_distribution_2").text("规则")
		$(".lang_distribution_3").text("佣金总额 (元)")
		$(".lang_distribution_4").text("历史佣金 (元)")
		$(".lang_distribution_5").text("我的粉丝 (人)")
		$(".lang_distribution_6").text("时间")
		$(".lang_distribution_7").text("来源")
		$(".lang_distribution_8").text("佣金")
	}
	function languageUSA(){
		$(".lang_distribution_1").text("My Distribution")
		$(".lang_distribution_2").text("Rule")
		$(".lang_distribution_3").text("Total commission ($)")
		$(".lang_distribution_4").text("Historical commissions ($)")
		$(".lang_distribution_5").text("My fans (people)")
		$(".lang_distribution_6").text("Time")
		$(".lang_distribution_7").text("Source")
		$(".lang_distribution_8").text("Commission")
	}
	function languageMalaysia(){
		$(".lang_distribution_1").text("Pengedaran Saya")
		$(".lang_distribution_2").text("Peraturan")
		$(".lang_distribution_3").text("Jumlah (RM) Suruhanjaya")
		$(".lang_distribution_4").text("Suruhanjaya sejarah (RM)")
		$(".lang_distribution_5").text("Peminat saya (orang)")
		$(".lang_distribution_6").text("Masa")
		$(".lang_distribution_7").text("Source")
		$(".lang_distribution_8").text("Suruhanjaya")
	}