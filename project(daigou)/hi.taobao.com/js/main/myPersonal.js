$(function() {
	//返回我的 d4
	$(".my-back").on("tap", function() {
		window.location.href = "../../my.html";
	});
	
	//修改密码
	$(".revise-password").on("tap", function() {
		$("#oneself-revise").hide();
		$("#oneself-password").show();
		$("#change-phone").hide();
	})
	$(".pwd-back").on("tap", function() {
		$("#oneself-revise").show();
		$("#oneself-password").hide();
		$("#change-phone").hide();
	});
	//语言
	autoLanguage();

	function autoLanguage() {
		var getItem = localStorage.getItem("language");
		if(localStorage.getItem("language") == "0") {
			$(".lang_personal_1").text("个人资料修改");
			$(".lang_personal_2").text("保存");
			$(".lang_personal_3").text("进入相册");
			$(".lang_personal_4").text("取消");
			$(".lang_personal_5").text("修改密码");
			$(".lang_personal_6").text("确认修改");
			$(".lang_personal_7").text("修改手机");
			$("head link:last-child").remove()
		} else if(localStorage.getItem("language") == "1") {
			$(".lang_personal_1").text("Personal data modification");
			$(".lang_personal_2").text("Save");
			$(".lang_personal_3").text("Enter the album");
			$(".lang_personal_4").text("Cancel");
			$(".lang_personal_5").text("Change Password");
			$(".lang_personal_6").text("Confirm the changes");
			$(".lang_personal_7").text("Modify the phone");
			$("head link:last-child").remove()
			personalUSA()
		} else if(localStorage.getItem("language") == "2") {
			$(".lang_personal_1").text("Maklumat peribadi perubahan");
			$(".lang_personal_2").text("Jimat");
			$(".lang_personal_3").text("Masukkan album");
			$(".lang_personal_4").text("Dibatalkan");
			$(".lang_personal_5").text("Tukar Kata laluan");
			$(".lang_personal_6").text("Mengesahkan perubahan");
			$(".lang_personal_7").text("Mengubah suai telefon");
			$("head link:last-child").remove()
			personalMalaysia()
		}
	};
	function personalUSA() {
		var link = '<link rel="stylesheet" type="text/css" href="../../css/language/myPersonal_USA.css"/>';
		$("head").append(link)
	}

	function personalMalaysia() {
		var link = '<link rel="stylesheet" type="text/css" href="../../css/language/myPersonal_Malaysia.css"/>';
		$("head").append(link)
	}
});