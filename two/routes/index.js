var express = require('express');
var httpResult = require('../config').httpResult;
var recommend = require('../data').recommend;

var router = express.Router();

/* GET home page. */
router.get('/main', function(req, res, next) {
        var name = req.session.name;
	var data = recommend.filter(item => item.fid === 0);
	res.send(httpResult.success(data));
});

module.exports = router;
