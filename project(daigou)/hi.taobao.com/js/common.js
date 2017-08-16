$(function() {
	//选择语言
	$(".language").on("tap", function() {
		$(".xiala").toggle();
	});
	$(".xiala li").on("tap", function() {
		var languageIndex = $(this).index();
		localStorage.setItem("language",languageIndex);
		var getItem = localStorage.getItem("language");//获取到0/1/2，用来选择语言
		
		document.cookie="user="+languageIndex;
		console.log(document.cookie)
		setTimeout(function(){//2.解决点透事件
			$(this).siblings().removeClass("action");
			$(this).addClass("action");
		},301)		
		language(getItem);
		$(".xiala").hide();
		autoLanguage();
		
	});
	//语言显示状态
	language(localStorage.getItem("language"))

	//语言 显示状态
	function language(getItem){//将0/1/2传进去选择语言
		$(".xiala li").eq(getItem).addClass("action").siblings().removeClass("action")//打钩
		var index=document.cookie.substr(document.cookie.indexOf("=")+1,1);
		if(getItem == 0 ){//选择中文
			$(".lang_index_1").text("语言");
			$(".lang_active_7").text("中文");
			$(".lang_active_8").text("英文");
			$(".lang_active_9").text("马来语");
		}else if(getItem == 1 || 2){
			if(getItem == 1){//英文
				$(".lang_index_1").text("language");//英文
			}else{//马来西亚文
				$(".lang_index_1").text("bahasa");//马来文
			}
			$(".lang_active_7").text("China");
			$(".lang_active_8").text("USA");
			$(".lang_active_9").text("Malaysia");
		}
		console.log(index);
		test(index);
	}
	//判断所选择的的语言种类
	autoLanguage();
	function autoLanguage(){
		var getItem = localStorage.getItem("language");
		if(localStorage.getItem("language") == "0"){
//			alert("中国");
			$("head link:last-child").remove();
		}else if(localStorage.getItem("language") == "1"){
//			alert("英语");
			$("head link:last-child").remove();
			if($("#show-scan").hasClass("index")){//判断当前是在index.html还是在login.html
				indexUSA();
			}else{
				loginUSA();
			}
		}else if(localStorage.getItem("language") == "2"){
//			alert("马来西亚");
			$("head link:last-child").remove();
			if($("#show-scan").hasClass("index")){
				indexMalaysia();
			}else{
				loginMalaysia()
			}
		}
	}
	
	//login.html 语言切换
	function loginUSA(){
		var link = '<link rel="stylesheet" type="text/css" href="../../css/language/login_USA.css"/>';
	$("head").append(link)
	}
	function loginMalaysia(){
		var link = '<link rel="stylesheet" type="text/css" href="../../css/language/login_Malaysia.css"/>';
	$("head").append(link)
	}
	
	//index.html 语言切换
	function indexUSA(){
		var link = '<link rel="stylesheet" type="text/css" href="css/language/index_USA.css"/>';
	$("head").append(link)
	}
	function indexMalaysia(){
		var link = '<link rel="stylesheet" type="text/css" href="css/language/index_Malaysia.css"/>';
	$("head").append(link)
	}
});