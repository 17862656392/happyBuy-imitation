var express = require('express');
var httpResult = require('../config').httpResult;
var query = require('../utils/dbHelper.js');

var router = express.Router();

//缓存数据
router.get('/main', function(req, res, next) {
	query('SELECT * FROM `dt_top`')
		 .then(result => res.send(httpResult.success(result)))
         .catch(message => res.send(httpResult.error(null, message)));
});

module.exports = router;
