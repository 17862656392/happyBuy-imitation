var express = require('express');
var httpResult = require('../config').httpResult;
var router = express.Router();

router.post('/center',function(req,res,next) {
        var data = 'MB_' + req.session.name;
        res.send(httpResult.success(data))
});



module.exports = router;