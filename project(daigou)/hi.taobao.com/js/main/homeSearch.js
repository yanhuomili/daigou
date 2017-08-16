$(function() {
	//搜索历史
	$(".sousuo").on("tap", function() {
		var inputSou = $("#search-header input").val();
		var leng = $(".search-history ul li").length;
		var arr = [];
		var flag = true;
		var reg = /^\s*$/
		for(var i = 0; i < leng; i++) {
			if($(".search-history ul li").eq(i).html() == inputSou) {
				return;
			} else {
				flag = false;
				arr.push(flag)
			}
		}
		if(reg.test(inputSou)) {
			$("#search-header input").val("")
			$("#search-header input").attr("placeholder", "请输入搜索内容")
		}
		if(inputSou == "" || flag == true || reg.test(inputSou) || inputSou == "请输入搜索内容") {
			return;
		} else {
			$(".search-history ul").prepend("<li>" + inputSou + "</li>");
		};

	});
	//点击清空输入框中的内容
	$(".search-clear").on("tap", function() {
		$("#search-header input").val("");
	})
	//清空历史
	$(".clear-history").on("tap", function() {
		$(".search-history ul li").remove();
	});
	//点击历史进行搜索
	$(".search-history ul").on("tap", "li", function() {
		$("#search-header input").val($(this).text());
	});
	//点击返回首页
	$(".search-back").on("tap", function() {
		window.location.href = "../../index.html";
	});
	//自动获取焦点
	$("#search-header input").focus();
	autoLanguage();
	function autoLanguage(){
		var getItem = localStorage.getItem("language");
		if(localStorage.getItem("language") == "0"){
			$(".lang_search_1").text("搜索");
			$(".lang_search_2").text("找不到搜索内容");
			$(".lang_search_3").text("搜索历史");
			$("#search-header input").attr("placeholder", "请输入搜索内容")
		}else if(localStorage.getItem("language") == "1"){
			$(".lang_search_1").text("Search");
			$(".lang_search_2").text("No search found");
			$(".lang_search_3").text("Search history");
			$("#search-header input").attr("placeholder", "Enter search content")
		}else if(localStorage.getItem("language") == "2"){
			$(".lang_search_1").text("Carian");
			$(".lang_search_2").text("Carian tidak dapat mencari kandungan");
			$(".lang_search_3").text("sejarah carian");
			$("#search-header input").attr("placeholder", "Sila masukkan carian")
		}
	};
});