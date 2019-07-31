function t(data) {
	data.forEach(function(item) {
		$(`
			<li>
				<a>
					<div class="images-content"><img src="${ item.avatar }"><span>TOP${ item.id }</span></div>
					<div class="text-content">
						<p class="name">${ item.name }</p>
						<p class="remark">${ item.remark }</p>
						<span class="top">${ item.top }</span><br>
						<span class="price"><span class="money">￥</span>${ item.price }</span>
						<span class="old-price"><span class="money">￥</span>${ item.oldPrice }</span>
					</div>
				</a>
			</li>
		`).appendTo('ul');
	});
}
$.ajax({
	type: 'get',
	url: '/top/main',
	dateType: 'json',
	success: function(result) {
		if (result.status === 200) t(result.data);
		else alert(result.message);
	}
})