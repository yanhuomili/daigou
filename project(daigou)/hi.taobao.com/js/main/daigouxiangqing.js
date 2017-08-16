//轮播
var phoneWidth = document.body.clientWidth;
var swiper1 = new Swiper('.lunbo .swiper-container', {
	pagination: '.jibenxinxi-tab',
	paginationClickable: true,
	autoplayDisableOnInteraction: false,
	autoplay: false,
	loop: false
});
//tab切换
var swiper2 = new Swiper('.daigou-main>.swiper-container', {
	pagination: '.daigou-main-tab',
	paginationClickable: true,
	autoplayDisableOnInteraction: false,
	autoplay: false,
	loop: false,
	autoHeight: true, //滑动切换过后 让高度自适应各自的高度

	onSlideChangeStart: function(swiper) {
		//导航中的tab切换样式
		var index = $(".daigou-main ul li" + ".swiper-slide-active").index();
		$("#daigou-nav ul li").eq(index).addClass("nav-action").siblings().removeClass("nav-action"); //滑动tab切换导航的样式
		var tab_height = $(".daigou-main ul li").eq(index).height();
		$(".daigou-main ul li").eq(index).parent().parent().height(tab_height); //tab根据内容的高度改变swiper-container 的高度
	}
});

//点击导航跳转相应的页面
$("#daigou-nav ul li").on("touchstart mousedown", function(e) {
	$(this).addClass("nav-action").siblings().removeClass("nav-action"); //点击导航切换导航的样式
	$(".daigou-main ul").animate({ transform: 'translate3d(-' + $(this).index() * phoneWidth + 'px,0,0)' }, 150, "ease-out"); //tab内容的切换
	var index = $(this).index();
	var tab_height = $(".daigou-main ul li").eq(index).height();
	$(".daigou-main ul li").eq(index).parent().parent().height(tab_height); //tab根据内容的高度改变swiper-container 的高度
});