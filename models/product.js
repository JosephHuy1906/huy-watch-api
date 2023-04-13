var db = require('./database');

exports.getAll = (callback) => {
    let sql = 'SELECT productId, product.categoryId ,product.name, price, mota, avatar, category.name as cateName from product, category where product.categoryId = category.categoryId Order by productId desc';
    db.query(sql, (err, d) => { callback(d) });
}

exports.getProductById = (id, callback) => {
    let sql = 'SELECT productId ,product.name, price, mota, avatar, category.name as cateName from product, category where productId = ? and product.categoryId = category.categoryId;';
    db.query(sql, id, (err, d) => { callback(d) });
}



exports.createProduct = (data, callback) => {
    let sql = "INSERT INTO product SET ?";
    db.query(sql, data, (err, d) => {
        if (err) throw err;
        callback(d);
    });
}
exports.updateProduct = (id, data, callback) => {
    let sql = "UPDATE product  SET ? WHERE productId = ?";
    db.query(sql, [data, id], (err, d) => {
        if (err) throw err;
        callback(d);
    });
}

exports.delete = (id, callback) => {
    let sql = "DELETE FROM product WHERE productId = ?";
    db.query(sql, id, (err, d) => {
        if (err) throw err;
        callback(d);
    });
}
exports.getMain6 = (callback) => {
    let sql = "SELECT * FROM product ORDER BY RAND() LIMIT 6;";
    db.query(sql, (err, d) => {
        if (err) throw err;
        callback(d);
    })
}
exports.getByCate1 = (callback) => {
    let sql = 'SELECT * FROM product ORDER BY RAND() LIMIT 6';
    db.query(sql, (err, d) => { callback(d) });
}
exports.getByCate2 = (callback) => {
    let sql = 'SELECT * FROM product ORDER BY RAND() LIMIT 3';
    db.query(sql, (err, d) => { callback(d) });
}
exports.getProductCate = (id,callback) => {
    let sql = 'SELECT * FROM product WHERE categoryId = ?';
    db.query(sql,id, (err, d) => { callback(d) });
}
exports.getProductSearch = (callback) => {
    let sql = 'SELECT name as title, avatar, productId FROM product';
    db.query(sql, (err, d) => { callback(d) });
}

exports.best = (callback) => {
    let sql = 'SELECT * FROM product ORDER BY RAND() LIMIT 2';
    db.query(sql, (err, d) => { callback(d) });
}

exports.getIMG = (id, callback) => {
    let sql = 'SELECT * FROM images WHERE idProduct=?';
    db.query(sql, id, (err, d) => {
        if (err) throw err;
        callback(d)
    })
}