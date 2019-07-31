var express = require('express');
var httpResult = require('../config').httpResult;
var query = require('../utils/dbHelper.js');

var router = express.Router();

router.post('/list', function(req, res, next) {
        var orderId = req.body.orderId;
        console.log(orderId);
        query('CALL p_orderdetail(?);',[orderId])
                .then(result => res.send(httpResult.success(result[0])))
                .catch( message => res.send(httpResult.error(null, message)));
});

module.exports = router;