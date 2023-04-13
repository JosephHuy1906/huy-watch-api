const db = require('./database');

exports.getAll = (id, callback) => {
    let sql = 'SELECT oderdetail.price, oderdetail.quantity, product.avatar, product.name FROM oderdetail, product  WHERE oderId = ? and oderdetail.productId = product.productId';
    db.query(sql, id, (err, data) => {
        if (err) throw err;
        callback(data);
    });
};

exports.CreateOderDetail = (data, callback) => {
    let sql = 'INSERT INTO oderdetail SET ?';
    db.query(sql, data, (err, data) => {
        if (err) throw err;
        callback(data);
    });
};
