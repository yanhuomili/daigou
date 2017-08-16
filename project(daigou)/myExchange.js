$(function(){

	var language = localStorage.getItem("language")
	if (language == null || language == '' || language == undefined) {
		language = 0;
	}

	var index = 0;
	var url = $("#urlid").val();
	var rmbrm = $("#rmbrm").val();
	var rmbus = $("#rmbus").val();
	var rmrmb = $("#rmrmb").val();
	var rmus = $("#rmus").val();
	var usrmb = $("#usrmb").val();
	var usrm = $("#usrm").val();
	var userrmb = $("#userrmb").val();
	var usermyr = $("#usermyr").val();
	var userus = $("#userus").val();
	console.log(rmbrm + " " + rmbus + " " + rmrmb + " " + rmus + " " + usrmb + " " + usrm);

	autoLanguage();
	haveCurrency(0);
	// 返回我的钱包
	$(".duihuan-back,#duihuan-souye").on("tap",function(){

		window.location.href = "html/my/wallet.html";
	})
	// 确认兑换
	$(".over-duihuan").on("tap",function(){

		$("#duihuan-main").hide();
		$("#duihuan-success").show();
	})
	// 点击持有货币
	$(".duihuan-choose .have-money .first-btn").on("tap",function(){

		$(".xuanze").attr("flag",true).show();
	})
	// 点击选择的货币
	$(".xuanze ul li").on("tap",function(){

		var str = $(".xuanze").attr("flag")
		index = $(this).index();
		if (str == "true") {
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
	// 判断所选择持有的货币
	function haveCurrency(index){

		// console.log("index==" + index)
		var RMB = $(".lang_exchange_10").text();
		var Dollar = $(".lang_exchange_11").text();
		var RM = $(".lang_exchange_12").text();
		if (index == 0) {
			$(".other_1 .moneyBtn").text(Dollar);
			$(".other_1 span:nth-of-type(2)").text("$");

			$(".other_2 .moneyBtn").text(RM);
			$(".other_2 span:nth-of-type(2)").text("RM");
		} else if (index == 1) {
			$(".other_1 .moneyBtn").text(RMB);
			$(".other_1 span:nth-of-type(2)").text("￥");

			$(".other_2 .moneyBtn").text(RM);
			$(".other_2 span:nth-of-type(2)").text("RM");
		} else if (index == 2) {
			$(".other_1 .moneyBtn").text(RMB);
			$(".other_1 span:nth-of-type(2)").text("￥");

			$(".other_2 .moneyBtn").text(Dollar);
			$(".other_2 span:nth-of-type(2)").text("$");
		}
	}

	// 兑换
	$('.have-money').click(function(){

		$(this).find('input').css({
			background:'#DF463E',
			color:'#fff'
		});
		$(this).addClass('duihuan-action');
		$(this).siblings().removeClass('duihuan-action');
		$(this).next().find('input').css('background','#fff');
		$(this).next().next().find('input').css('background','#fff');
		$(this).next().find('input').css('color','#000');
		$(this).next().next().find('input').css('color','#000');
		$(this).find('input').removeAttr("readonly");
		console.log("index===" + index);
		$('.have-money').on('input',function(){

			$(this).next().find('input').attr('readonly',true);
			$(this).next().next().find('input').attr('readonly',true);
			var rmb = $(this).find('input').val();
			var dollar,malay;
			if (index == 0) {// 人民币兑换
				dollar = rmbus * rmb;// 美元
				malay = rmbrm * rmb;// 马币
			} else if (index == 1) {// 美元兑换
				dollar = usrmb * rmb;// 人民币
				malay = usrm * rmb;// 马币
			} else if (index == 2) {// 马币兑换
				dollar = rmrmb * rmb;// 人民币
				malay = rmus * rmb;// 美元
			}
			$('.other_1').find('input').attr('value',dollar.toFixed(2));
			$('.other_2').find('input').attr('value',malay.toFixed(2));
		})
	})
	// 全部兑换
	$('.lang_exchange_4').click(function(){

		console.log("当前货币类型是：：：" + language);

		var numleft = $('.num').text();
		$('.have-money').find('input').val(numleft);
		$(this).find('input').removeAttr("readonly");
		$(this).next().find('input').attr('readonly',true);
		$(this).next().next().find('input').attr('readonly',true);
		var rmb = numleft;
		var dollar,malay;

		if (language == "1") {// 马来
			$(".haveBtn").text("Malaysia");
			$(".have-money span").eq(1).text("RM");
			haveCurrency(2);
			dollar = rmrmb * rmb;// 人民币
			malay = rmus * rmb;// 美元
		} else if (language == "2") {// 英文
			$(".haveBtn").text("Dollar");
			$(".have-money span").eq(1).text("$");
			haveCurrency(1);
			dollar = usrmb * rmb;// 人民币
			malay = usrm * rmb;// 马币
		} else {// 中文
			$(".haveBtn").text("人民币");
			$(".have-money span").eq(1).text("￥");
			haveCurrency(0);
			dollar = rmbus * rmb;// 美元
			malay = rmbrm * rmb;// 马币
		}

		$('.other_1').find('input').attr('value',dollar.toFixed(2));
		$('.other_2').find('input').attr('value',malay.toFixed(2));

	})
	// 语言

	function autoLanguage(){

		var getItem = localStorage.getItem("language");
		if (localStorage.getItem("language") == "0") {
			$("head link:last-child").remove();
			$(".lang_wallet_7").text("人民币（主）");
			$(".lang_wallet_8").text("买进");
			$(".lang_wallet_9").text("卖出");
			$(".lang_wallet_10").text("马币");
			$(".lang_wallet_11").text("美元");
			$(".lang_exchange_7").text("恭喜您，兑换成功！");
			$(".lang_exchange_8").text("兑换成功");
			$(".lang_exchange_3").text("当前人民币余额为");
			$(".num").text(userrmb);
			$(".lang_exchange_4").text("全部兑换");
			$(".holding_money").text("持有货币");
			$(".exchange_currency").text("兑换货币");

			$(".lang_exchange_10").text("人民币")
			$(".lang_exchange_11").text("美元")
			$(".lang_exchange_12").text("马来西亚")
			$(".lang_exchange_13").text("人民币")
			$(".lang_exchange_14").text("您兑换的")
			$(".lang_exchange_15").text("已成功存入我的钱包，请前往查看。")
		} else if (localStorage.getItem("language") == "1") {
			$("head link:last-child").remove();
			$(".lang_wallet_7").text("Renminbi (atau yuan)");
			$(".lang_wallet_8").text("Beli");
			$(".lang_wallet_9").text("Jual");
			$(".lang_wallet_10").text("Ringgit Malaysia (RM)");
			$(".lang_wallet_11").text("Dolar AS");
			$(".lang_exchange_7").text("Tahniah, kejayaan pertukaran!")
			$(".lang_exchange_8").text("kejayaan pertukaran")
			$(".lang_exchange_3").text("Baki semasa Renminbi");
			$(".num").text(usermyr);
			$(".lang_exchange_4").text("Tukar semua");
			$(".holding_money").text("Mata wang yang dipegang");
			$(".exchange_currency").text("Tukar mata wang");

			$(".lang_exchange_10").text("Renminbi (atau yuan)")
			$(".lang_exchange_11").text("Dolar AS")
			$(".lang_exchange_12").text("Malaysia")
			$(".lang_exchange_13").text("Renminbi (atau yuan)")
			$(".lang_exchange_14").text("Anda telah berjaya menebus")
			$(".lang_exchange_15").text(" ke dalam dompet saya, anda pergi melihat.")
			exchangeMalaysia()
		} else if (localStorage.getItem("language") == "2") {
			$("head link:last-child").remove();
			$(".lang_wallet_7").text("Renminbi (or yuan)");
			$(".lang_wallet_8").text("Buy in");
			$(".lang_wallet_9").text("Sell out");
			$(".lang_wallet_10").text("Ringgit Malaysia (RM)");
			$(".lang_wallet_11").text("US Dollar (USD)");
			$(".lang_exchange_7").text("Congratulations, the success of the exchange!")
			$(".lang_exchange_8").text("Exchange success")
			$(".lang_exchange_3").text("Current balance of Renminbi");
			$(".num").text(userus);
			$(".lang_exchange_4").text("Exchange all");
			$(".holding_money").text("Currency held");
			$(".exchange_currency").text("Exchange currency");

			$(".lang_exchange_10").text("Renminbi (or yuan)")
			$(".lang_exchange_11").text("US Dollar (USD)")
			$(".lang_exchange_12").text("Malaysia")
			$(".lang_exchange_13").text("Renminbi (or yuan)")
			$(".lang_exchange_14").text("Your redeemed")
			$(".lang_exchange_15").text(" has been successfully deposited in my wallet, please go to view.")
			exchangeUSA()
		}
	}
	;
	// register.html 语言切换
	function exchangeMalaysia(){

		var link = '<link rel="stylesheet" type="text/css" href="' + url + '/static/html/css/language/exchange_Malaysia.css"/>';
		$("head").append(link)
	}

	function exchangeUSA(){

		var link = '<link rel="stylesheet" type="text/css" href="' + url + '/static/html/css/language/exchange_USA.css"/>';
		$("head").append(link)
	}

})