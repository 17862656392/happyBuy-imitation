var express = require('express');
var httpResult = require('../config').httpResult;
var query = require('../utils/dbHelper.js');
var upload = require('../utils/upload.js');
var uploadPaths = require('../config').uploadPaths;
var file = require('../utils/file.js');
var path = require('path'); 

var router = express.Router();

//缓存数据
router.post('/list', function(req, res, next) {
        var fid = parseInt(req.body.fid);
		console.log(fid);
        var begin = parseInt(req.body.begin);
		console.log(begin);
        var count = parseInt(req.body.count);
		console.log(count);
        query('SELECT * FROM `dt_product` WHERE `fid` = ? LIMIT ?,?;', [ fid, begin, count ])
                .then(results => res.send(httpResult.success(results)))
                .catch(message => res.send(httpResult.error(null, message)));
});
router.get('/detail', function(req, res, next) {
	var id = parseInt(req.query.id);
	query('SELECT * FROM `dt_product` WHERE `id` = ?;', [ id ])
		.then(result => res.send(httpResult.success(result)))
		.catch(message => res.send(httpResult.error(null, message)));
});
router.post('/admin-list', function(req, res, next) {
	var { name, mId, sId, begin, pageSize } = req.body;
	query('CALL p_getProductByCondition(?,?,?,?,?);', [ name, mId, sId, begin, pageSize ])
		.then(results => res.send(httpResult.success({ total: results[0][0].total, list: results[1] })))
		.catch(message => res.send(httpResult.error(null, message)));
});
router.post('/banner/upload', upload.single('banner'), function(req, res, next) {
	var { id } =req.body;
	var { temp, root, product: { banner } } = uploadPaths;
	var fileName = req.file.filename;
	var filePath = banner + fileName;
	var fromPath = path.join(temp, fileName);
	var toPath = path.join(root, banner, fileName);
	file.copy(fromPath, toPath)
		.then(() => file.unlink(fromPath))
		.then(() => query('CALL p_uploadProductBanner(?,?);', [ filePath, id ]))
		.then(data => res.send(httpResult.success(filePath)))
		.catch(message => res.send(httpResult.error(null, message)));
	// 1.把temp中的图片转移到product/banner中
	// 2.从temp中删除转移后的图片
	// 3.修改数据库
	// 4.返给客户端
	
});

router.post('/banner/remove', function(req, res, next) {
	var { id, filePath, newBannerImg } = req.body;
	query('UPDATE `dt_product` SET `bannerImg` = ? WHERE `id` = ?', [ newBannerImg, id ])
		.then(() => file.unlink(path.join(uploadPaths.root, filePath)))
		.then(() => res.send(httpResult.success()))	
		.catch(message => res.send(httpResult.error(null, message)));
})

module.exports = router;
