$(function(){

	var url = $("#urlid").val();
	// 返回我的 d4
	$(".my-back").on("tap",function(){

		window.location.href = url + "/wx/my.html?type=" + localStorage.getItem("language");
	});

	// 修改密码
	$(".revise-password").on("tap",function(){

		$("#oneself-revise").hide();
		$("#oneself-password").show();
		$("#change-phone").hide();
	})
	$(".pwd-back").on("tap",function(){

		$("#oneself-revise").show();
		$("#oneself-password").hide();
		$("#change-phone").hide();
	});
	// 语言
	autoLanguage();

	function autoLanguage(){

		var getItem = localStorage.getItem("language");
		if (localStorage.getItem("language") == "0") {
			$(".lang_personal_1").text("个人资料修改");
			$(".lang_personal_2").text("保存");
			$(".lang_personal_3").text("进入相册");
			$(".lang_personal_4").text("取消");
			$(".lang_personal_5").text("修改密码");
			$(".lang_personal_6").text("确认修改");
			$(".lang_personal_7").text("修改手机");
			$("head link:last-child").remove()
		} else if (localStorage.getItem("language") == "1") {
			$(".lang_personal_1").text("Pengubahsuaian data peribadi");
			$(".lang_personal_2").text("Simpan");
			$(".lang_personal_3").text("Pergi ke pilihan album");
			$(".lang_personal_4").text("Batal");
			$(".lang_personal_5").text("Tukar kata laluan");
			$(".lang_personal_6").text("Mengesahkan perubahan");
			$(".lang_personal_7").text("Mengubah suai telefon bimbit");
			$("head link:last-child").remove()
			personalMalaysia()
		} else if (localStorage.getItem("language") == "2") {
			$(".lang_personal_1").text("Personal data modification");
			$(".lang_personal_2").text("Save");
			$(".lang_personal_3").text("Go to album selection");
			$(".lang_personal_4").text("Cancel");
			$(".lang_personal_5").text("Change password");
			$(".lang_personal_6").text("Confirm the changes");
			$(".lang_personal_7").text("Modify the mobile phone");
			$("head link:last-child").remove()
			personalUSA()
		}
	}
	;

	function personalMalaysia(){

		var link = '<link rel="stylesheet" type="text/css" href="' + url + '/static/html/css/language/myPersonal_Malaysia.css"/>';
		$("head").append(link)
	}
	function personalUSA(){

		var link = '<link rel="stylesheet" type="text/css" href="' + url + '/static/html/css/language/myPersonal_USA.css"/>';
		$("head").append(link)
	}

});