//滑动切换    点击切换
//获取设备的宽高
var phoneWidth = document.body.clientWidth,
	phoneHeight = document.body.clientHeight;
//点击头部的图片热点
var flag = false; //解决swiper滑动过后机会触发上面绑定的点击事件
var swiper = new Swiper('.swiper-container', {
	pagination: '.daigou-main-tab',
	paginationClickable: true,
	autoplayDisableOnInteraction: false,
	autoplay: false,
	loop: false,
	mode: 'horizontal',
	onTouchStart: function(){
		//		var start = swiper.getWrapperTranslate()
	},
	onTouchMove: function() {
		flag = true; 
	},
	onTouchEnd: function(ev) {
		setTimeout(function() {
			flag = false;
		}, 300)
		var end = swiper.getWrapperTranslate()
	},
	onSlideChangeEnd: function(swiper) {
		var index = $("#zixun-content .swiper-container .swiper-wrapper .swiper-slide" + ".swiper-slide-active").index();
		//导航中的tab切换样式
		$("#zixun-nav ul li").eq(index).addClass("nav-action").siblings().removeClass("nav-action");
		//适应各个tab的高    当每个tab的高都大于设备的高时 可以不用添加 tab-content 一下内容可以不要
		var tab_height = $("#zixun-content ul li").eq(index).find("#wrapper").height();
		$("#zixun-content ul li").eq(index).find(".tab-content").parent().parent().parent().parent().parent().height(tab_height);
		$(".swiper-slide").height(tab_height);
		var indexLi = $("#zixun-nav ul li").eq(index).index();
	}
});
$(".tab-content .content-img").on("tap", "a", function() {
	if(!flag) {
		window.location.href = "html/zixun/zixunInformtion.html";
		//		alert("头部图片")
	} else {
		return;
	}
})
//点击列表信息
$(".tab-content .zixun-list").on("tap", "dt", function() { //
	if(!flag) {
		window.location.href = "html/zixun/zixunInformtion.html";
		//		alert("新闻图片")
	} else {
		return;
	}
})
$(".tab-content .zixun-list").on("tap", ".zixun-title", function() {
	if(!flag) {
		window.location.href = "html/zixun/zixunInformtion.html";
		//		alert("新闻标题")
	} else {
		return;
	}
})

wrapperHeight();
$("#zixun-nav ul li").on("tap", function() {
	var index = $(this).index();
	$(this).addClass("nav-action").siblings().removeClass("nav-action");
	$("#zixun-content ul").animate({
		transform: 'translate3d(-' + index * phoneWidth + 'px,0,0)'
	}, 150, "ease-out");
	//适应各个tab的高    当每个tab的高都大于设备的高时 可以不用添加 tab-content 一下内容可以不要
	var tab_height = $("#zixun-content ul li").eq(index).find("#wrapper").height();
	$("#zixun-content ul li").eq(index).find(".tab-content").parent().parent().parent().parent().parent().height(tab_height);
	$(".swiper-slide").height(tab_height);
})


//上下拉加载数据
//根据不同的设备，自动设置iscroll 中wrapper 的高
function wrapperHeight() {
	var height = phoneHeight - $(".head-nav").height() - $("#footer").height() - 1;
	$(".swiper-slide > div").height(height)
}

//下拉刷新下拉加载
var zhengzhi_myScroll, yule_myScroll, caijing_myScroll, shishang_myScroll, bendi_myScroll, ertong_myScroll,
	pullDownEl, pullDownOffset, _maxScrollY,
	pullUpEl, pullUpOffset,
	generatedCount = 0,
	shooseIndex;

function pullDownAction() { //下拉刷新
	// ajax取数据
	setTimeout(function() { // <-- Simulate network congestion, remove setTimeout from production!
		//模拟网络拥塞，从产生清除setTimeout
		for(i = 0; i < 3; i++) {
			var dl = '<dl class="zixun-list">' +
				'<dt><a href="#"><img src="img/other/zixun-2.png"/></a></dt>' +
				'<dd class="zixun-title">' +
				'<a href="#">' +
				'<p>维吾尔族自治区第二届双赢摄影绘画书法展' + (++generatedCount) + '</p>' +
				'</a>' +
				'</dd>' +
				'<dd><time>2016-10-21</time><span>342</span></dd>' +
				'</dl>';
//			var div = '<div style="width:100%;height:.9rem;"><a href="#" style="width:100%;height:100%;float:left;"><img src="" title="广告"/></a></div>';
			chooseAppendDown(dl);
		}
		chooseRefresh();
		//记得刷新内容时加载（即：Ajax完成）
	}, 1000); // <-- Simulate network congestion, remove setTimeout from production!
	//模拟网络拥塞，从产生清除setTimeout
}

function pullUpAction() { //上拉加载
	setTimeout(function() { // <-- Simulate network congestion, remove setTimeout from production!
		for(i = 0; i < 3; i++) {
			var dl = '<dl class="zixun-list">' +
				'<dt><a href="#"><img src="img/other/zixun-2.png"/></a></dt>' +
				'<dd class="zixun-title">' +
				'<a href="#">' +
				'<p>维吾尔族自治区第二届双赢摄影绘画书法展' + (++generatedCount) + '</p>' +
				'</a>' +
				'</dd>' +
				'<dd><time>2016-10-21</time><span>342</span></dd>' +
				'</dl>';
			chooseAppendUp(dl);
		}
		chooseRefresh();
	}, 1000); // <-- Simulate network congestion, remove setTimeout from production!
}

function chooseRefresh() {
	var refreshIndex = $("#zixun-nav ul li" + ".nav-action").index();
	switch(refreshIndex) {
		case 0:
			zhengzhi_myScroll.refresh();
			break;
		case 1:
			yule_myScroll.refresh();
			break;
		case 2:
			caijing_myScroll.refresh();
			break;
		case 3:
			shishang_myScroll.refresh();
			break;
		case 4:
			bendi_myScroll.refresh();
			break;
		case 5:
			ertong_myScroll.refresh();
			break;
	}
}

function chooseAppendDown(dl) {
	chooseIndex = $("#zixun-nav ul li" + ".nav-action").index();
	switch(chooseIndex) {
		case 0:
			$("#zhengzhi-wrapper .content-img").after(dl);
			break;
		case 1:
			$("#yule-wrapper .content-img").after(dl);
			break;
		case 2:
			$("#caijing-wrapper .content-img").after(dl);
			break;
		case 3:
			$("#shishang-wrapper .content-img").after(dl);
			break;
		case 4:
			$("#bendi-wrapper .content-img").after(dl);
			break;
		case 5:
			$("#ertong-wrapper .content-img").after(dl);
			break;
	}
}

function chooseAppendUp(dl) {
	chooseIndex = $("#zixun-nav ul li" + ".nav-action").index();
	switch(chooseIndex) {
		case 0:
			$("#zhengzhi-wrapper #thelist").append(dl);
			break;
		case 1:
			$("#yule-wrapper #thelist").append(dl);
			break;
		case 2:
			$("#caijing-wrapper #thelist").append(dl);
			break;
		case 3:
			$("#shishang-wrapper #thelist").append(dl);
			break;
		case 4:
			$("#bendi-wrapper #thelist").append(dl);
			break;
		case 5:
			$("#ertong-wrapper #thelist").append(dl);
			break;
	}
}

function loaded() {
	pullDownEl = document.getElementById('pullDown');
	pullDownOffset = pullDownEl.offsetHeight; //下拉时获取高度
	pullUpEl = document.getElementById('pullUp');
	pullUpOffset = pullUpEl.offsetHeight; //上拉时获取高度
	//政治的下拉刷新下拉加载

	zhengzhi_myScroll = new iScroll('zhengzhi-wrapper', {
		useTransition: true,
		topOffset: pullDownOffset,
		vScrollbar: false,
		hScroll: false,
		onRefresh: function() {
			var that = this;
			sameOnRefiresh(that);
			console.log(this.maxScrollY)
		},
		onScrollMove: function() {
			var that = this;
			sameOnScrollMove(that);
			console.log(this.maxScrollY)
		},
		onScrollEnd: function() {
			sameOnScrollEnd();
//			alert(pullDownOffset,pullUpOffset)
			
		}
	});

	yule_myScroll = new iScroll('yule-wrapper', {
		useTransition: true,
		topOffset: pullDownOffset,
		vScrollbar: false,
		hScroll: false,
		onRefresh: function() {
			var that = this;
			sameOnRefiresh(that);
		},
		onScrollMove: function() {
			var that = this;
			sameOnScrollMove(that);
		},
		onScrollEnd: function() {
			sameOnScrollEnd();
		}
	});

	caijing_myScroll = new iScroll('caijing-wrapper', {
		useTransition: true,
		topOffset: pullDownOffset,
		vScrollbar: false,
		hScroll: false,
		onRefresh: function() {
			var that = this;
			sameOnRefiresh(that);
		},
		onScrollMove: function() {
			var that = this;
			sameOnScrollMove(that);
		},
		onScrollEnd: function() {
			sameOnScrollEnd();
		}
	});

	shishang_myScroll = new iScroll('shishang-wrapper', {
		useTransition: true,
		topOffset: pullDownOffset,
		vScrollbar: false,
		hScroll: false,
		onRefresh: function() {
			var that = this;
			sameOnRefiresh(that);
		},
		onScrollMove: function() {
			var that = this;
			sameOnScrollMove(that);
		},
		onScrollEnd: function() {
			sameOnScrollEnd();
		}
	});

	bendi_myScroll = new iScroll('bendi-wrapper', {
		useTransition: true,
		topOffset: pullDownOffset,
		vScrollbar: false,
		hScroll: false,
		onRefresh: function() {
			var that = this;
			sameOnRefiresh(that);
		},
		onScrollMove: function() {
			var that = this;
			sameOnScrollMove(that);
		},
		onScrollEnd: function() {
			sameOnScrollEnd();
		}
	});
	ertong_myScroll = new iScroll('ertong-wrapper', {
		useTransition: true,
		topOffset: pullDownOffset,
		vScrollbar: false,
		hScroll: false,
		onRefresh: function() {
			var that = this;
			sameOnRefiresh(that);
		},
		onScrollMove: function() {
			var that = this;
			sameOnScrollMove(that);
		},
		onScrollEnd: function() {
			sameOnScrollEnd();
		}
	});

}
document.addEventListener('touchmove', function(e) {
	e.preventDefault();
}, false);

document.addEventListener('DOMContentLoaded', function() {
	setTimeout(loaded, 200);
}, false);

function sameOnRefiresh(that) {//判断上拉还是下拉
	_maxScrollY = that.maxScrollY = that.maxScrollY + pullUpOffset;
	console.log(_maxScrollY)
//	if(pullDownEl.className.match('loading')) {
//		pullDownEl.className = '';
//		pullDownEl.querySelector('.pullDownLabel').innerHTML = '下拉加载更多...'; //下拉时所显示的内容不松鼠标键或不宋手指是显示
//	} else if(pullUpEl.className.match('loading')) {
//		pullUpEl.className = '';
//		pullUpEl.querySelector('.pullUpLabel').innerHTML = '上拉加载更多...'; //上拉时所显示的内容不松鼠标键或不宋手指是显示
//	}
	console.log(that.maxScrollY,pullUpOffset)
};

function sameOnScrollMove(that) {
	if(that.y > 5 && !pullDownEl.className.match('flip')) {
		pullDownEl.className = 'flip';
		pullDownEl.querySelector('.pullDownLabel').innerHTML = '松开刷新...'; //下拉到一定距离所显示的内容不松鼠标键或不宋手指是显示
		that.minScrollY = 0;
	} else if(this.y < 5 && pullDownEl.className.match('flip')) {
		pullDownEl.className = '';
		pullDownEl.querySelector('.pullDownLabel').innerHTML = '下拉加载更多...'; //如果不松开鼠标或手指又拖回到原位时显示
		that.minScrollY = -pullDownOffset;
		
	} else if(that.y <= (_maxScrollY - pullUpOffset) && !pullUpEl.className.match('flip')) {
		pullUpEl.className = 'flip';
		pullUpEl.querySelector('.pullUpLabel').innerHTML = '松开加载...'; //上拉到一定距离所显示的内容不松鼠标键或不宋手指是显示
		that.maxScrollY = that.maxScrollY - pullUpOffset;
	} else if(that.y > (_maxScrollY - pullUpOffset) && pullUpEl.className.match('flip')) {
		pullUpEl.className = '';
		pullUpEl.querySelector('.pullUpLabel').innerHTML = '上拉加载更多...'; //如果不松开鼠标或手指又拖回到原位时显示
		that.maxScrollY = that.maxScrollY + pullUpOffset;
	}
};

function sameOnScrollEnd() {
	if(pullDownEl.className.match('flip')) {
		pullDownEl.className = 'loading';
		pullDownEl.querySelector('.pullDownLabel').innerHTML = 'Loading...'; //上拉松开鼠标或手指进行刷新时显示的内容
		pullDownAction(); // Execute custom function (ajax call?)
		//执行下拉刷新函数（Ajax调用）
	} else if(pullUpEl.className.match('flip')) {
		pullUpEl.className = 'loading';
		pullUpEl.querySelector('.pullUpLabel').innerHTML = 'Loading...'; //下拉松开鼠标或手指进行刷新时显示的内容
		pullUpAction(); // Execute custom function (ajax call?)
		//执行上拉加载的函数（Ajax调用）
	}
};

//语言
autoLanguage();
informNav();

function autoLanguage() {
	var getItem = localStorage.getItem("language");
	if(localStorage.getItem("language") == "0") {
		$("head link:last-child").remove();
	} else if(localStorage.getItem("language") == "1") {
		$("head link:last-child").remove();
		informUSA()
	} else if(localStorage.getItem("language") == "2") {
		$("head link:last-child").remove();
		informMalaysia()
	}
};
//register.html 语言切换
function informUSA() {
	var link = '<link rel="stylesheet" type="text/css" href="css/language/inform_USA.css"/>';
	$("head").append(link)
}

function informMalaysia() {
	var link = '<link rel="stylesheet" type="text/css" href="css/language/inform_Malaysia.css"/>';
	$("head").append(link)
}
function informNav(){
	var getItem = localStorage.getItem("language");
	if(getItem == 0){
		$("#zixun-nav ul li").eq(0).text("政治");
		$("#zixun-nav ul li").eq(1).text("娱乐");
		$("#zixun-nav ul li").eq(2).text("财经");
		$("#zixun-nav ul li").eq(3).text("时尚");
		$("#zixun-nav ul li").eq(4).text("本地");
		$("#zixun-nav ul li").eq(5).text("儿童");
	}else if(getItem ==1){
		$("#zixun-nav ul li").eq(0).text("Political");
		$("#zixun-nav ul li").eq(1).text("Entertainment");
		$("#zixun-nav ul li").eq(2).text("Finance");
		$("#zixun-nav ul li").eq(3).text("Fashion");
		$("#zixun-nav ul li").eq(4).text("Local");
		$("#zixun-nav ul li").eq(5).text("Child");
	}else if(getItem == 2){
		$("#zixun-nav ul li").eq(0).text("Politik");
		$("#zixun-nav ul li").eq(1).text("Hiburan");
		$("#zixun-nav ul li").eq(2).text("Kewangan dan ekonomi");
		$("#zixun-nav ul li").eq(3).text("fesyen");
		$("#zixun-nav ul li").eq(4).text("tempatan");
		$("#zixun-nav ul li").eq(5).text("Kanak-kanak");
	}
}
