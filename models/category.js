var db = require('./database');

exports.getAll = (callback) => {
    let sql = 'SELECT * FROM category';
    db.query(sql, (err, d) => {
        if (err) throw err;
        callback(d);
    });
};

exports.getById = (id, callback) => {
    let sql = 'SELECT * FROM category WHERE categoryId = ?';
    db.query(sql, id, (err, d) => {
        if (err) throw err;
        callback(d);
    });
};

exports.create = (data, callback) => {
    let sql = 'INSERT INTO category SET ?';
    db.query(sql, data, (err, d) => {
        if (err) throw err;
        callback(d);
    });
};

exports.update = (id, data, callback) => {
    let sql = 'UPDATE category SET ? WHERE categoryId = ?';
    db.query(sql, [data, id], (err, d) => {
        if (err) throw err;
        callback(d);
    });
};

exports.delete = (id, callback) => {
    let sql = 'DELETE FROM category WHERE categoryId = ?';
    db.query(sql, id, (err, d) => {
        if (err) throw err;
        callback(d);
    });
};
