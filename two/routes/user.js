var express = require('express');
var httpResult = require('../config').httpResult;
var query = require('../utils/dbHelper.js');

var router = express.Router();


//获取验证码
router.get('/getcode', function(req, res, next) {
	var letters = ['0','1','2','3','4','5','6','A','C','F','R','H','J','N','S'];
	code = '';
	for(var i =1; i <= 4; i++){
		code += letters[Math.floor(Math.random() * letters.length)];
	}
	req.session.code = code;//将用户对应的验证码放入对应的session中
	res.send(httpResult.success(code));
});

//手机登录
router.post('/phone', function(req, res, next) {
	var phone = req.body.phone;
	if(req.body.code.toUpperCase() === req.session.code) {//toUpperCase()全变成大写
		query('CALL p_loginByPhone(?)',[phone])
			.then(results => {
				req.session.name = results[0][0].name;
				res.send(httpResult.success());
			})
			.catch(message => res.send(httpResult.error(null, message)));
		} else res.send(httpResult.failure(null, '验证码错误。。'));
});

//密码登录
router.post('/pwd', function(req, res, next) {
	var account = req.body.account;
	var pwd = req.body.pwd;
	query('CALL p_loginByPwd(?,?)',[account, pwd])
		.then(results => {
			if(results[0][0].result === '') {
				req.session.name = account;
				res.send(httpResult.success());
			} else res.send(httpResult.failure(null, results[0][0].result));
		})
		.catch(message => res.send(httpResult.error(null, err.message)));
});
module.exports = router;