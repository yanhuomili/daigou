$(function(){

	var url = $("#urlid").val();
	var language = localStorage.getItem("language")
	if (language == null || language == '' || language == undefined) {
		language = 0;
	}
	// 返回d4页
	$(".my-back").on("tap",function(){

		window.location.href = url + "/wx/my.html?type=" + language;
	});
	// 点击意见反馈
	$(".feed-back").on("tap",function(){

		$("#install").hide();
		$("#veiw").show();
	});
	$(".veiw-back").on("tap",function(){

		$("#install").show();
		$("#veiw").hide();
	})
	// 点击常见问题
	$(".problem-btn").on("tap",function(){

		window.location.href = url + "html/my/rules.html?id=1&type=" + language;
		// window.location.href = "problem.html"
	})
	// 联系客服
	$(".contact-btn").on("tap",function(){

		window.location.href = url + "html/my/contact.html"
	})
	// 语言
	autoLanguage();
	function autoLanguage(){

		var getItem = localStorage.getItem("language");
		if (localStorage.getItem("language") == "0") {
			$(".lang_install_1").text("设置")
			$(".lang_install_2").text("退出登录")
			$(".lang_install_3").text("意见反馈")
			$(".lang_install_4").text("提交")
			$(".lang_install_5").text("常见问题")
			$(".lang_install_6").text("联系客服")
		} else if (localStorage.getItem("language") == "1") {
			$(".lang_install_1").text("Tetapan")
			$(".lang_install_2").text("Log keluar")
			$(".lang_install_3").text("Maklum balas")
			$(".lang_install_4").text("Hantar")
			$(".lang_install_5").text("Soalan-soalan lazim")
			$(".lang_install_6").text("Perkhidmatan pelanggan")
		} else if (localStorage.getItem("language") == "2") {
			$(".lang_install_1").text("Settings")
			$(".lang_install_2").text("Log out")
			$(".lang_install_3").text("Feedback")
			$(".lang_install_4").text("Submit")
			$(".lang_install_5").text("Frequently asked questions")
			$(".lang_install_6").text("Contact customer service")
		}
	}
	;
});