// 从当前浏览器url中解析出传来的id和name
var params = window.location.search.substr(1).split('&');
var fid =parseInt(params[0].split('=')[1]);  
var name = decodeURI(params[1].split('=')[1]);
// 把name值放在h1中显示
$('h1').text(name);
// 用id发送ajax请求指定分类的商品列表数据
function updateList(data) {
	data.forEach(function(item) {
		$(`
			<li>
				<a href="detail.html?id=${ item.id }">
					<img src="${ item.avatar }" />
					<h3>${ item.name }<h3>
					<p>${ item.remark }</p>
					<span class="price">￥${ item.price }</span> <span class="old-price">￥${ item.oldPrice }</span>
				</a>
			</li>
		`).appendTo('ul.product');
	});
}
// 发送ajax动态请求要显示的商品列表数据
$.ajax({
    type: 'post',
	url: '/product/list',
	data: { fid:fid },
	success: function(result) {
		if (result.status === 200) updateList(result.data);
		else alert(result.message);
	}
});