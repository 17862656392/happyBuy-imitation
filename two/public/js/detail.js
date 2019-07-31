var params = window.location.search.substr(1).split('&');
var id =parseInt(params[0].split('=')[1]);
var pid = id;
function updateDetail(data) {
	data.forEach(function(item) {
		// noinspection JSAnnotator
                $(`
			<div class="remark">
				<span>【${ item.name }】</span>
				<span>${ item.remark }</span>
				<p>${ item.b_remark }</p>
				<div class="price">
					￥<span class="price">${ item.price }<span>
					<span class="old-price">￥${ item.oldPrice }</span>
				</div>
			</div>
		`).appendTo('.banner-content');
                $(`
			<img src="${ item.avatar }"/>
		`).appendTo('.user1 .u-right>.photo');
		data[0].bannerImg.split(',').forEach(function(item) {
                        $(`
				<div class="swiper-slide">
		            <img src="${ item }" />
		        </div>
			`).appendTo('.banner-content .swiper-wrapper');
		});
		var swiper = new Swiper('.run', {
			loop: true,
			pagination: {
				el: '.swiper-pagination',
				clickable :true,
			}
		});
		data[0].d_img.split(',').forEach(function(item) {
                        $(`
				<ul><li><img src="${ item }" /></li></ul>
			`).appendTo('.detail-photo');
		});
	});
}
$.ajax({
	type: 'get',
	url: '/product/detail',
	dateType: 'json',
	data: { id:id },
	success: function(result) {
		if (result.status === 200) updateDetail(result.data);
		else alert(result.message);
	}
});
// 详情
$('.detail>.title>span').click(function() {
	$('.detail>.title>span').removeClass('active');
	$(this).addClass('active');
	var index = $(this).index();
	$('.detail-content>ul>li').removeClass('active');
	$('.detail-content>ul>li').eq(index).addClass('active');
});
//加入购物车
$('.add-cart').click(function(){
        myHttp({
                type: 'post',
                url: '/cart/add',
                data: { pid: pid },
                success: function(result){
                        alert('成功加入购物车...');
                        window.location.href = 'cart.html';
                        Cookies.set('id', pid);
                }
        });
});


