const express = require('express');
const router = express.Router();
var modelOder = require('../models/oder');
var nodeDate = require('date-and-time');

router.get('/', (req, res) => {
    modelOder.getAll((list) => {
        res.json(list);
    });
});
router.get('/thongke', (req, res) => {
    modelOder.thongke((list) => {
        res.json(list);
    });
});
router.get('/thongkemonth', (req, res) => {
    let date = new Date();
    let id = '%' + date.getFullYear() + '-0' + (date.getMonth() + 1) + '%';
    console.log(id);
    modelOder.thongkeMonth(id, (list) => {
        res.json(list);
    });
});
router.get('/thongkeyear', (req, res) => {
    let date = new Date();
    let id = date.getFullYear();
    modelOder.thongkeYear(id, (list) => {
        res.json(list);
    });
});
router.get('/chart', (req, res) => {
    modelOder.dataChart((list) => {
        res.json(list);
    });
});
router.get('/status', (req, res) => {
    modelOder.getStatus((list) => {
        res.json(list);
    });
});
router.get('/id/:id', (req, res) => {
    let id = req.params.id;
    modelOder.getOderByUserId(id, (list) => {
        res.json(list);
    });
});

router.post('/create', (req, res) => {
    let oderId = req.body.oderId;
    let address = req.body.address;
    let phone = req.body.phone;
    let price = req.body.price;
    let userId = req.body.userId;
    let now = nodeDate.format(new Date(), 'YYYY-MM-DD hh:mm:ss');
    let data = {
        oderId: oderId,
        address: address,
        phone: phone,
        price: price,
        date_creat: now,
        userId: userId,
        statusId: 1,
    };
    console.log(data);
    modelOder.createOder(data, (list) => {
        res.json(list);
    });
});

router.put('/edit/:id', (req, res) => {
    let id = req.params.id;
    let data = req.body;
    modelOder.updateOder(id, data, (list) => {
        res.json({ thongbao: 'Cập nhập thành công' });
    });
});
router.get('/us/:id', (req, res) => {
    let id = req.params.id;
    modelOder.getOder(id, (list) => {
        res.status(200).json(list);
    });
});

module.exports = router;
