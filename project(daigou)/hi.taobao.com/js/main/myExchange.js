$(function() {
	autoLanguage();
	haveCurrency(0);
	//返回我的钱包 
	$(".duihuan-back,#duihuan-souye").on("tap", function() {
		window.location.href = "wallet.html";
	})
	//确认兑换
	$(".over-duihuan").on("tap", function() {
		$("#duihuan-main").hide();
		$("#duihuan-success").show();
	})
	//点击持有货币
	$(".duihuan-choose .have-money .first-btn").on("tap", function() {
		$(".xuanze").attr("flag", true).show();
	})
	//点击选择的货币
	$(".xuanze ul li").on("tap", function() {
		var str = $(".xuanze").attr("flag")
		var index = $(this).index();
		if(str == "true") {
			var have = $(this).find("i").text();
			var haveBtn = $(this).find("p").text();
			$(".haveBtn").text(haveBtn);
			$(".have-money span").eq(1).text(have)
		} else {
			var have = $(this).find("i").text();
			var haveBtn = $(this).find("p").text();
			$(".moneyBtn").text(haveBtn);
			$(".money-duihuan span").eq(1).text(have)
		}
		$(".xuanze ul li").find("span").removeClass("xuanze-action");
		$(this).find("span").addClass("xuanze-action");
		$(".xuanze").hide();
		haveCurrency(index)
	})
	//判断所选择持有的货币
	function haveCurrency(index){
		var RMB = $(".lang_exchange_10").text();
		var Dollar = $(".lang_exchange_11").text();
		var RM = $(".lang_exchange_12").text();
		if(index == 0){
			$(".other_1 .moneyBtn").text(Dollar);
			$(".other_1 span:nth-of-type(2)").text("$");
			
			$(".other_2 .moneyBtn").text(RM);
			$(".other_2 span:nth-of-type(2)").text("RM");
		}else if(index ==1){
			$(".other_1 .moneyBtn").text(RMB);
			$(".other_1 span:nth-of-type(2)").text("￥");
			
			$(".other_2 .moneyBtn").text(RM);
			$(".other_2 span:nth-of-type(2)").text("RM");
		}else if(index ==2){
			$(".other_1 .moneyBtn").text(RMB);
			$(".other_1 span:nth-of-type(2)").text("￥");
			
			$(".other_2 .moneyBtn").text(Dollar);
			$(".other_2 span:nth-of-type(2)").text("$");
		}
	}
	//语言
	
	function autoLanguage() {
		var getItem = localStorage.getItem("language");
		if(localStorage.getItem("language") == "0") {
			$("head link:last-child").remove();
			$(".lang_wallet_7").text("实时汇率");
			$(".lang_wallet_8").text("买进");
			$(".lang_wallet_9").text("卖出");
			$(".lang_wallet_10").text("马来西亚币");
			$(".lang_wallet_11").text("美元");
			$(".lang_exchange_7").text("恭喜您，兑换成功！")
			$(".lang_exchange_8").text("兑换成功")
			
			$(".lang_exchange_10").text("人民币")
			$(".lang_exchange_11").text("美元")
			$(".lang_exchange_12").text("马来西亚")
			$(".lang_exchange_13").text("人民币")
			$(".lang_exchange_14").text("您兑换的")
			$(".lang_exchange_15").text("已成功存入我的钱包，请前往查看。")
		} else if(localStorage.getItem("language") == "1") {
			$("head link:last-child").remove();
			$(".lang_wallet_7").text("Real Time Exchange Rates");
			$(".lang_wallet_8").text("Buy");
			$(".lang_wallet_9").text("To sell");
			$(".lang_wallet_10").text("Malaysian currency");
			$(".lang_wallet_11").text("The dollar");
			$(".lang_exchange_7").text("Congratulations, the success of the exchange!")
			$(".lang_exchange_8").text("Exchange success")
			
			$(".lang_exchange_10").text("RMB")
			$(".lang_exchange_11").text("Dollar")
			$(".lang_exchange_12").text("Malaysia")
			$(".lang_exchange_13").text("RMB")
			$(".lang_exchange_14").text("Your redeemed")
			$(".lang_exchange_15").text(" has been successfully deposited in my wallet, please go to view.")
			exchangeUSA()
		} else if(localStorage.getItem("language") == "2") {
			$("head link:last-child").remove();
			$(".lang_wallet_7").text("Kadar Pertukaran masa nyata");
			$(".lang_wallet_8").text("Membeli");
			$(".lang_wallet_9").text("Jual");
			$(".lang_wallet_10").text("Ringgit Malaysia");
			$(".lang_wallet_11").text("Dolar AS");
			$(".lang_exchange_7").text("Tahniah, kejayaan pertukaran!")
			$(".lang_exchange_8").text("kejayaan pertukaran")
			
			$(".lang_exchange_10").text("RMB")
			$(".lang_exchange_11").text("Dollar")
			$(".lang_exchange_12").text("Malaysia")
			$(".lang_exchange_13").text("RMB")
			$(".lang_exchange_14").text("Anda telah berjaya menebus")
			$(".lang_exchange_15").text(" ke dalam dompet saya, anda pergi melihat.")
			exchangeMalaysia()
		}
	};
	//register.html 语言切换
	function exchangeUSA() {
		var link = '<link rel="stylesheet" type="text/css" href="../../css/language/exchange_USA.css"/>';
		$("head").append(link)
	}

	function exchangeMalaysia() {
		var link = '<link rel="stylesheet" type="text/css" href="../../css/language/exchange_Malaysia.css"/>';
		$("head").append(link)
	}
})