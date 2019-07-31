// 对jQuery的ajax进行进一步封装，减少多个页面中相同的ajax代码
var $overlay = $('<div class="overlay"></div>').appendTo('body');

function myHttp(options) {
	options.dataType = 'json';
	var success = options.success;
	options.success = function(result) {
		$overlay.toggle();	//4.ajax回来后，关闭遮罩
		if(result.message !== '') alert(result.message);
		switch(result.status) {
			case 200:
				success(result.data);
				break;
			case 401:
				Cookies.set('target', window.location.href);
				window.location.href = 'login.html';
				break;
			default:
				break;
		}
	};
	$overlay.toggle();	// 2.发送ajax前，显示一个半透明遮罩
	setTimeout(function() { $.ajax(options) },0);	// 3.延时1s发送ajax，让遮罩显示1s，提高用户体验
}
