// 更新显示一级分类
function updateMainCategory(data) {
	data.forEach(function(item) {
		$(`<li data-id="${ item.id }" data-avatar="${ item.avatar }"><span>${ item.name }</span></li>`).appendTo('.category-main')
	});
	$('.category-main>li').click(function() {
		if($(this).hasClass('active')) return;
		$(this).addClass('active').siblings().removeClass('active');
		$('img.avatar').attr('src', $(this).attr('data-avatar'));
		var id = parseInt($(this).attr('data-id'));
		getSubCategoryData(id);
	}).first().addClass('active'); 

}
// 更新显示二级分类
function updateSubCategory(data) {
	$('.category-sub').empty();
	data.forEach(function(item) {
		$(`
			<li>
				<a href="list.html?cid=${ item.id }&name=${ item.name }">
					<img src="${ item.avatar }">
					<span>${ item.name }</span>
				</a>
			</li>
		`).appendTo('.category-sub')
	}); 
}

function getSubCategoryData(id) {
	$.ajax({
		type: 'get',
		url: '/category/sub',
		dateType: 'json',
		data: {id:id},
		success: function(result) {
			if (result.status === 200) updateSubCategory(result.data);
			else alert(result.message);
		}
	});
}
$.ajax({
	type: 'get',
	url: '/category/main',
	dateType: 'json',
	success: function(result) {
		if(result.status === 200) {
			updateMainCategory(result.data);
			$('img.avatar').attr('src', result.data[0].avatar);
			getSubCategoryData(result.data[0].id);
		}
		else alert(result.message);
	}
});
$('.footer li.login').click(function() {
        window.location.href = 'profile.html';
});
$('.footer li.cart').click(function(){
        window.location.href = 'cart.html';
});




