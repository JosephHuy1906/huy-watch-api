var express = require('express');
var router = express.Router();
var model = require('../models/oderDetail');

router.get('/:id', (req,res)=>{
    let id = req.params.id;
    model.getAll(id, list =>{res.json(list)})
})
router.post('/create',(req,res) =>{
    let data = req.body;
    model.CreateOderDetail(data, (list) =>{res.json(list)})
})

module.exports = router;