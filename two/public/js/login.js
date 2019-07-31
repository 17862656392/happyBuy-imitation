$('.header span').click(function() {
	var i = $(this).index();
	$('.header span').removeClass('active');
	$(this).addClass('active');
	$('.content>ul').removeClass('active');
	$('.content>ul').eq(i).addClass('active');
});
//获取验证码
$('.code').click(function() {
	myHttp({
		type: 'get',
		url: '/login/getcode',
		success: function(data) {
			$('.code').text(data);
		}
	});
});
//更新显示phone信息
$('.btn-phone').click(function() {
	if($('.code').text() !== $('.code2').val().toUpperCase()) {
		alert('验证码错误。。。');
		return;
	}
	//ajax动态请求页面phone信息
		myHttp({
			type: 'post',
			url: '/login/phone',
			data:{
				phone: $('.phone').val(),
				code: $('.code2').val()
			},
			success:function(data) {
				window.location.href = Cookies.get('target');
				window.location.href = 'profile.html';
			}
		});
	
});

$('.btn-pwd').click(function() {
	//ajax动态请求页面pwd信息
	myHttp({
		type: 'post',
		url: '/login/pwd',
		data:{
			account: $('.account').val(),
			pwd: $('.pwd').val()
		},
		success:function(data) {
			window.location.href = Cookies.get('target');
			window.location.href = 'profile.html';
		}
	});
});


