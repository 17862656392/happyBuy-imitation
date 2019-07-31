// 专门负责连接数据库
var mysql = require('mysql');

function query(sql, params = []) {
	var connect = mysql.createConnection({
		host: 'localhost',
		user: 'root',
		password: '123',
		database: 'two'
	});
	return new Promise(function(resolve, reject) {
			connect.query(sql, params, function(err, result, fields) {
				connect.end(); // 关闭连接
				if (err) reject(err.message);
				else resolve(result);
			});
		});
	}

	module.exports = query; //导出query方法
