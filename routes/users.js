var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
var formidable = require('formidable');
const jwt = require('jsonwebtoken');
const fs = require('fs');
var modelUser = require('../models/user');

router.get('/', (req, res) => {
    modelUser.getAll((list) => {
        res.json(list);
    });
});
router.get('/useradmin', (req, res) => {
    modelUser.getAdmin((list) => {
        res.json(list);
    });
});
router.get('/id/:id', (req, res) => {
    let id = req.params.id;
    modelUser.getId(id, (list) => {
        res.json(list);
    });
});
router.get('/email/:id', (req, res) => {
    let id = req.params.id;
    modelUser.getUS(id, (list) => {
        res.json(list);
    });
});
router.get('/get/role', (req, res) => {
    modelUser.getRole((data) => {
        res.json(data);
    });
});

router.post('/create', function (req, res) {
    let pass = req.body.password;
    let name = req.body.fullName;
    let em = req.body.email;
    let role = 2;

    let salt = bcrypt.genSaltSync(10);
    let pass_mahoa = bcrypt.hashSync(pass, salt);
    let user_info = {
        fullName: name,
        password: pass_mahoa,
        email: em,
        roleId: role,
    };
    modelUser.create(user_info, function (data) {
        res.json({ thongbao: 'Đăng ký tài khoản thành công' });
    });
});

router.get('/codecheck/:id', (req, res) => {
    let id = req.params.id;
    modelUser.getCode(id, (list) => {
        res.json(list);
    });
});

router.post('/createadmin', function (req, res) {
    let user = req.body.username;
    let pass = req.body.password;
    let role = req.body.roleId;

    let salt = bcrypt.genSaltSync(10);
    let pass_mahoa = bcrypt.hashSync(pass, salt);
    let user_info = {
        username: user,
        password: pass_mahoa,
        roleId: role,
    };
    console.log(user_info);
    modelUser.create(user_info, function (data) {
        res.json({ thongbao: 'Đăng ký tài khoản thành công' });
    });
});

router.post('/login', async function (req, res) {
    let u = req.body.email;
    let p = req.body.password;
    console.log(u);
    modelUser.getUS(u, function (rows) {
        if (rows.length <= 0) {
            res.json({
                status: 404,
                message: 'Tài khoản không tồn tại',
            });
            return;
        }

        let user = rows[0];
        let pass_fromdb = user.password;
        let kq = bcrypt.compareSync(p, pass_fromdb);

        if (kq) {
            let [data] = rows;
            let payload = {
                email: data.email,
                userId: data.userId,
            };
            const token = jwt.sign(payload, 'josephhuy19062002', { noTimestamp: true });
            console.log(token);
            return res.json({
                status: 1,
                token: token,
            });
        } else {
            console.log('Thất bại');
            res.json({
                status: 2,
                message: 'Mật khẩu bạn nhập sai',
            });
        }
    });
});
router.post('/loginAd', async function (req, res) {
    let u = req.body.email;
    let p = req.body.password;
    console.log(u);
    modelUser.getIdAdmin(u, function (rows) {
        if (rows.length <= 0) {
            res.json({
                status: 304,
                message: 'Không được để trống',
            });
            return;
        }

        let user = rows[0];
        let role = rows[0].roleId;
        console.log(role);
        let pass_fromdb = user.password;
        let kq = bcrypt.compareSync(p, pass_fromdb);

        if (kq) {
            if (role !== 2) {
                let [item] = rows;
                let payload = {
                    userId: item.userId,
                    fullName: item.fullName,
                    role: item.roleId,
                };
                const token = jwt.sign(payload, 'josephhuy19062002', { noTimestamp: true });
                return res.json({
                    tokenAd: token,
                    role: role,
                });
            } else {
                return res.json({
                    status: 204,
                    message: 'Tài khoản không phải Admin',
                });
            }
        } else {
            res.json({
                status: 204,
                message: 'Mật khẩu bạn không đúng',
            });
        }
    });
});
router.get('/loginad/:token', (req, res) => {
    let token = req.params.token;
    let kq = jwt.verify(token, 'josephhuy19062002');
    if (kq) {
        res.json(kq);
    }
});
router.get('/profile/:token', (req, res) => {
    try {
        let token = req.params.token;
        let kq = jwt.verify(token, 'josephhuy19062002');
        if (kq) {
            res.json(kq);
        }
    } catch (err) {
        return res.json('Lỗi sever');
    }
});

router.put('/update/role/:id', async function (req, res) {
    const id = req.params.id;
    const data = req.body;
    modelUser.updateRole(id, data, function (err, data) {
        res.json({ message: 'Update thành công' });
    });
});

router.put('/update/pass/:id', async function (req, res) {
    const id = req.params.id;
    const pass = req.body.password;
    
    let salt = bcrypt.genSaltSync(10);
    let pass_mahoa = bcrypt.hashSync(pass, salt);
    let us = {
        password: pass_mahoa
    }
    modelUser.updateCode(id, us, function (err, data) {
        res.json({ message: 'Update thành công' });
    });
});


module.exports = router;
