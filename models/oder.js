const db = require('./database');

exports.getAll = (callback) => {
    let sql = `SELECT oder.oderId ,oder.address ,oder.phone ,oder.price as total, oder.date_creat, oder.statusId, status.name as status
    from oder, status where oder.statusId = status.statusId order by date_creat desc`;
    db.query(sql, (err, data) => {
        if (err) throw err;
        callback(data);
    });
};

exports.getStatus = (callback) => {
    let sql = `SELECT * from status`;
    db.query(sql, (err, data) => {
        if (err) throw err;
        callback(data);
    });
};
exports.getOderByUserId = (id, callback) => {
    let sql = `SELECT oder.oderId ,oder.price as total, oder.date_creat, status.name as status
    from oder, status where oder.userId = ? and oder.statusId = status.statusId;`;
    db.query(sql, id, (err, d) => {
        callback(d);
    });
};

exports.createOder = (data, callback) => {
    let sql = 'INSERT INTO oder SET ?';
    db.query(sql, data, (err, data) => {
        if (err) throw err;
        callback(data);
    });
};

exports.updateOder = (id, data, callback) => {
    let sql = 'UPDATE oder SET ? WHERE oderId = ?';
    db.query(sql, [data, id], (err, data) => {
        if (err) throw err;
        callback(data);
    });
};
exports.thongke = (callback) => {
    let sql = 'SELECT SUM(price) as totalOder FROM oder';
    db.query(sql, (err, data) => {
        if (err) throw err;
        callback(data);
    });
};
exports.thongkeMonth = (id,callback) => {
    let sql = "SELECT SUM(price) AS totalMonth FROM oder WHERE date_creat LIKE ? ";
    db.query(sql, id, (err, data) => {
        if (err) throw err;
        callback(data);
    });
};
exports.thongkeYear = (id,callback) => {
    let sql = 'SELECT sum(price) as total FROM oder WHERE YEAR(date_creat) = ?; ';
    db.query(sql,id, (err, data) => {
        if (err) throw err;
        callback(data);
    });
};
exports.dataChart = (callback) => {
    let sql = 'SELECT YEAR(date_creat) AS year,sum(price) as total FROM oder GROUP BY year Order by year';
    db.query(sql, (err, data) => {
        if (err) throw err;
        callback(data);
    });
};
exports.getOder = (id, callback) =>{
    let sql = `SELECT oderId, date_creat, price as total, 
    (SELECT JSON_ARRAYAGG(JSON_OBJECT('productId', productId, 'quantity', quantity, 'price',price)) 
    FROM oderdetail WHERE oderdetail.oderId = oder.oderId) AS oderdetails FROM oder 
    Where oder.userId = ?;`;

    db.query(sql, id, (err, res) =>{
        if(err) throw err;
        // const array = res.map(res => Object.values(res));
        callback(res)
    })
}