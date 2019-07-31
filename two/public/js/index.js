// 最顶端的首次下载效果
$('.down-first>.close').click(function() {
	$('.down-first').css('display', 'none');
});
// 菜单效果
$('.menu>li>a').click(function() {
	$('.menu>li>a').removeClass('active');
	$(this).addClass('active');
});
// 轮播图效果
var swiper = new Swiper('.run', {
	loop: true,
	autoplay: true,
	pagination: {
		el: '.swiper-pagination',
	}
});
// 活动内容
var mySwiper = new Swiper('.active-today .swiper-container',{
  slidesPerView : 2.5,
  slidesPerGroup : 1,
})
// 资讯推荐
$('.search').click(function() {
	window.location.href = 'search.html';
});
$('.footer li.login').click(function() {
	window.location.href = 'profile.html';
});
$('.footer li.cart').click(function(){
        window.location.href = 'cart.html';
});