var express = require('express');
var httpResult = require('../config').httpResult;
var query = require('../utils/dbHelper.js');

var router = express.Router();
//展示购物车商品
router.post('/list', function(req, res, next) {
        var orderId = req.bosy.orderId;
        query('SELECT * FROM `dt_order`;')
                .then(result => res.send(httpResult.success()))
                .catch(message => res.send(httpResult.error(null, message)));
});
router.post('/orderDetail', function(req, res, next) {
        var orderId = req.body.orderId;
        query('CALL p_orderdetail(?);',[orderId])
                .then(result => res.send(httpResult.success(result[0])))
                .catch( message => res.send(httpResult.error(null, message)));
});
router.post('/pay', function(req, res, next) {
        var id = req.body.id;
        console.log(id);
        query('UPDATE `dt_order` SET `pay` = 1 WHERE `id` = ?;',[id])
                .then(result => res.send(httpResult.success(result[0])))
                .catch( message => res.send(httpResult.error(null, message)));
});
router.post('/orderList', function(req, res, next) {
        var name = req.body.name;
        console.log(name);
        query('SELECT * FROM `dt_order`;')
                .then(result => res.send(httpResult.success()))
                .catch(message => res.send(httpResult.error(null, message)));
});

module.exports = router;