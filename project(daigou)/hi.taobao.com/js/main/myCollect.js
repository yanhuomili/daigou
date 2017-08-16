$(function() {
	noCollect();
	//返回d4页
	$(".my-back").on("tap", function() {
		window.location.href = "../../my.html";
	});
	//编辑收藏
	$(".hoese-have-btn").on("tap", function() {
		$("#house-have").hide();
		$("#house-edit").show();
	})
	//收藏返回
	$(".back-house").on("tap", function() {
		$("#house-have").show();
		$("#house-edit").hide();
	})
	//点击全选    删除
	$(".house-edit-footer li").on("tap", function() {
		if($(this).index() == 0) {
			//全选
			$(".house-edit-main .house-edit-list #house-edit-checked").addClass("edit-action")
		} else if($(this).index() == 1){
			//删除
			remove()
		}
	});
	function remove(){
		$(".house-edit-list").each(function(){
		   if($(this).find("#house-edit-checked").hasClass("edit-action")){
		   	$(this).remove();
		   }
		});
	}
	//点击选中所要编辑的收藏品
	$(".house-edit-main").on("tap", ".house-edit-list", function() {
		if($(this).find("#house-edit-checked").hasClass("edit-action")) {
			$(this).find("#house-edit-checked").removeClass("edit-action");
		} else {
			$(this).find("#house-edit-checked").addClass("edit-action");
		}
	})
	//判断有没有收藏品
	function noCollect() {
		if($("#house-have .house-have-main dl").length) {
			$("#house-null").hide();
			$("#house-have").show();
			$("#house-edit").hide();
		} else {
			$("#house-null").show();
			$("#house-have").hide();
			$("#house-edit").hide();
		}
	}
	//语言
	autoLanguage();
	function autoLanguage(){
		var getItem = localStorage.getItem("language");
		if(localStorage.getItem("language") == "0"){
			$(".lang_collect_1").text("我的收藏");
			$(".lang_collect_2").text("编辑");
			$(".lang_collect_3").text("完成");
			$(".lang_collect_4").text("全选");
			$(".lang_collect_5").text("删除");
			$(".lang_collect_6").text("暂无收藏商品");
		}else if(localStorage.getItem("language") == "1"){
			$(".lang_collect_1").text("My Collection");
			$(".lang_collect_2").text("Edit");
			$(".lang_collect_3").text("Carry out");
			$(".lang_collect_4").text("Select all");
			$(".lang_collect_5").text("Delete");
			$(".lang_collect_6").text("No collection of goods");
		}else if(localStorage.getItem("language") == "2"){
			$(".lang_collect_1").text("Kegemaran saya");
			$(".lang_collect_2").text("Edit");
			$(".lang_collect_3").text("Lengkap");
			$(".lang_collect_4").text("pilih");
			$(".lang_collect_5").text("Padam");
			$(".lang_collect_6").text("No kegemaran");
		}
	};
});