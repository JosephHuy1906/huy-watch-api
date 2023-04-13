const express = require('express');
const router = express.Router()
const models = require('../models/product');

router.get('/ramdom', (req, res) => {
  models.getMain6((list) => res.json(list))
})

router.get('/', (req, res) => {
  models.getAll(list => res.json(list));
})
router.get('/cate1', (req, res) => {
  models.getByCate1(list => res.json(list));
})
router.get('/cate2', (req, res) => {
  models.getByCate2(list => res.json(list));
})

router.get('/search', (req, res) => {
  models.getProductSearch(list => res.json(list));
})
router.get('/best', (req, res) => {
  models.best(list => res.json(list));
})
router.get('/:id', (req, res) => {
  let id = req.params.id;
  models.getProductById(id, (data) => res.json(data))
})

router.get('/cate/:id', (req, res) => {
  let id = req.params.id;
  models.getProductCate(id, (data) => res.json(data))
})

router.post("/", (req, res) => {
  let data = req.body;
  models.createProduct(data, function () {
    res.json({ thongbao: "Đã thêm xong một product mới" });
  });
});

router.put("/:id", (req, res) => {
  let data = req.body;
  let id = req.params.id;
  models.updateProduct(id, data, function () {
    res.json({ thongbao: "Đã cập nhật Product thành công " });
  });
});

router.delete("/:id", (req, res) => {
  let id = req.params.id;
  models.delete(id, function () {
    res.json({ thongbao: "Đã xoá Product" });
  });
});
router.get('/img/:id', (req, res) => {
  let id = req.params.id;
  models.getIMG(id, (list) => {
    res.json(list)
  })
})

module.exports = router;