var path = require('path');
exports.httpResult = {
	success: function(data, message) {		// 成功
		data = data || null;
		message = message || '';
		return { status: 200, data: data, message: message };
	},
	failure: function(data, message) {		// 逻辑失败
		data = data || null;
		message = message || '';
		return { status: 199, data: data, message: message };
	},
	error: function(data, message) {		// 物理失败
		data = data || null;
		message = message || '';
		return { status: 500, data: data, message: message };
	},
	untoken: function(data, message) {		// 登录验证失败（权限验证失败）
		data = data || null;
		message = message || '';
		return { status: 401, data: data, message: message };
	},
	notFound: function(data, message) {		// 404错误
		data = data || null;
		message = message || '';
		return { status: 404, data: data, message: message };
	},
}
exports.sessionOptions = {
	cookie: { httpOnly: true, maxAge: 1000 * 60 * 20 },
	rolling: true, // 客户端与服务器每一次交互都强制刷新一下保存sessionID的客户端cookie的maxAge
	saveUninitialized: false,// 只有需要session的时候才创建客户端对应的session
	resave: false,// 客户端与服务器端交互后不强制刷新客户端在服务器端相关的session
	secret: 'bieduzi'
}

exports.authPathsReg = /^\/(profile|cart|address)/;

exports.uploadPaths = {
	temp: path.join(__dirname, '../temp'),
	root: path.join(__dirname, '../public'),
	category: '/images/category/',
	product: {
		banner: '/images/product/banner/',
		avatar: '/images/product/avatar/'
	},
}