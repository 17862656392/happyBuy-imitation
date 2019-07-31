var express = require('express');
var httpResult = require('../config').httpResult;
var uploadPaths = require('../config').uploadPaths;
var query = require('../utils/dbHelper.js');
var file = require('../utils/file.js');
var path = require('path'); //与生俱来
var upload = require('../utils/upload.js');

var router = express.Router();
//缓存所有分类数据（所有用户都会看的数据且是一样的数据）
// var category = null;
// 创建连接对象   // 通过connect连接对象调用query方法自动连接数据库，执行指定的sql语句
// query('SELECT * FROM `dt_category`;')
// 	.then(result => category = result)
// 	.catch(message => console.log(message));
/* GET users listing. */
// 一级分类请求
//router.get('/main', function(req, res, next) {
//	var data = category.filter(item => item.fid === 0);
//	 res.send(httpResult.success(data));
//});
// 二级分类请求
//router.get('/sub', function(req, res, next) {
//	var id = parseInt(req.query.id);
//	var data = category.filter(item => item.fid === id);
//	res.send(httpResult.success(data));
//});


// 处理获取一级分类的请求
router.get('/main', function(req, res, next) {
	query('SELECT * FROM `dt_category` WHERE `fid` = 0;')
		.then(data => res.send(httpResult.success(data)))
		.catch(message => res.send(httpResult.error(null, message)));
});
// 处理获取指定一级分类的二级分类信息的请求
router.get('/sub', function(req, res, next) {
	var id = parseInt(req.query.id);
	console.log(id);
	query('SELECT * FROM `dt_category` WHERE `fid` = ?;', [ id ])
		.then(data => res.send(httpResult.success(data)))
		.catch(message => res.send(httpResult.error(null, message)));
});


// 图片上传
router.post('/upload', upload.single('avatar'), function(req, res, next) { 
	// console.log(req.body.file);
	res.send(httpResult.success(req.file.filename));
	
})
// 删除分类
router.post('/remove', function(req, res, next) {
	var id = parseInt(req.body.id);
	var avatar = req.body.avatar; 
	query('CALL p_removeCategory(?);', [id])
		.then(results => results[0][0].result)
		.then(results => {
			if(results === '') {
				//resolve  join:连接
				file.unlink(path.join(uploadPaths.root, avatar))
					.then(() => res.send(httpResult.success(null, '删除成功')))
					.catch((err) => res.send(httpResult.failure(null, err.message)));
			}
			else res.send(httpResult.failure(null, results))
		})
		.catch(message => res.send(httpResult.error(null, message)));
});

// 新增分类
router.post('/add', function(req, res, next) {
	var { fid, name, avatar } = req.body;
	var { temp, root, category } = uploadPaths;  
	var fromPath = path.join(temp, avatar);
	var toPath = path.join(root, category, avatar);
	file.copy(fromPath, toPath)               // 从temp中拷贝到最终目录中
		.then(() => file.unlink(fromPath))    // 从temp中删除临时文件
		.then(() => query('CALL p_addCategory(?,?,?);', [fid, name, category + avatar]))
		.then(results => results[0][0].result)
		.then(data => res.send(httpResult.success(data, '新增成功')))
		.catch(message => res.send(httpResult.error(null, message)));
})

// 修改分类
router.post('/update', function(req, res, next) {
	var { id, fid, name, avatar, oldAvatar } = req.body;
	new Promise(function(resolve, reject) {
		if(avatar !== oldAvatar) {
			var { temp, root, category } = uploadPaths;
			var fromPath = path.join(temp, avatar);
			var toPath = path.join(root, category, avatar);
			file.copy(fromPath, toPath)
				.then(() => file.unlink(fromPath))
				.then(() => file.unlink(path.join(root, oldAvatar)))
				.then(() => resolve());
		}
		else resolve();
	})
		.then(() => {
			avatar = avatar !== oldAvatar ? (uploadPaths.category + avatar) : avatar;
			let sqlStr = 'UPDATE `dt_category` SET `fid` = ?, `name` = ?, `avatar` = ? WHERE `id` = ?';
			return query(sqlStr, [ fid, name, avatar, id ]);
		})
		.then(() => res.send(httpResult.success(null, '修改成功')))
		.catch(message => res.send(httpResult.error(null, message)));
})

router.post('/getListByFid', function(req, res, next){
        var fid = parseInt(req.body.fid);
		console.log(fid);
        query('SELECT * FROM `dt_category` WHERE `fid` = ?;', [fid])
                .then(data => res.send(httpResult.success(data)))
                .catch(message => res.send(httpResult.error(null, message)));
});
module.exports = router;
