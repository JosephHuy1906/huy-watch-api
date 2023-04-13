var db = require('./database');

exports.getAll = (callback) => {
    let sql = 'SELECT * FROM users WHERE roleId = 2';
    db.query(sql, (err, d) => {
        if (err) throw err;
        callback(d);
    });
};
exports.getAdmin = (callback) => {
    let sql =
        'SELECT users.userId,users.fullName,users.email,users.Phone,role.name as role, users.roleId  FROM users, role WHERE users.roleId != 2 and users.roleId = role.roleId';
    db.query(sql, (err, d) => {
        if (err) throw err;
        callback(d);
    });
};

exports.getUS = (u, callback) => {
    let sql = 'SELECT * FROM users WHERE email = ?';
    db.query(sql, u, (err, d) => {
        console.log('d=', d.length);
        data = d;
        callback(data);
    });
};
exports.getRole = (callback) => {
    let sql = 'SELECT * FROM role';
    db.query(sql, (err, d) => {
        if (err) throw err;
        callback(d);
    });
};
exports.getId = (u, callback) => {
    let sql = 'SELECT * FROM users WHERE userId = ?';
    db.query(sql, u, (err, d) => {
        if (err) throw err;
        callback(d);
    });
};
exports.getIdAdmin = (u, callback) => {
    let sql = 'SELECT * FROM users WHERE email = ?';
    db.query(sql, u, (err, d) => {
        if (err) throw err;
        callback(d);
    });
};
exports.getCode = (u, callback) => {
    let sql = 'SELECT code, email FROM users WHERE email=?';
    db.query(sql, u, (err, d) => {
        if (err) throw err;
        callback(d);
    });
};

exports.create = (data, callback) => {
    let sql = 'INSERT INTO users SET ?';
    db.query(sql, data, (err, d) => {
        if (err) throw err;
        callback(d);
    });
};

exports.updateRole = (id, data, callback) => {
    let sql = 'UPDATE users SET ? WHERE userId=?';
    db.query(sql, [data, id], (err, d) => {
        if (err) throw err;
        callback(d);
    });
};
exports.updateCode = (id, data, callback) => {
    let sql = 'UPDATE users SET ? WHERE email=?';
    db.query(sql, [data, id], (err, d) => {
        if (err) throw err;
        callback(d);
    });
};
