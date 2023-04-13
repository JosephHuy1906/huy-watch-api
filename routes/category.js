var express = require('express');
var router = express.Router()
var modelsCate = require('../models/category');


router.get('/',(req, res)=>{
    modelsCate.getAll( (list)=>{
        res.json(list);
    })
})

router.get('/:id',(req, res)=>{
    let id = req.params.id;
    modelsCate.getById(id, (list)=>{
        res.json(list);
    })
})
router.post('/',(req, res)=>{
    let data = req.body;
    modelsCate.create(data, ()=>{
        res.json({thongbao: "Đã thêm 1 Danh Mục mới"});
    })
})
router.put('/:id',(req, res)=>{
    let data = req.body;
    let id = req.params.id;
    modelsCate.update(id, data, ()=>{
        res.json({thongbao: "Đã Cập nhập Danh Mục"});
    })
})
router.delete('/:id',(req, res)=>{
    let id = req.params.id;
    modelsCate.delete(id, ()=>{
        res.json({thongbao: "Đã xoá Danh Mục"});
    })
})

module.exports = router;