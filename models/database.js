var mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'watch_shop'
})
db.connect((err) => {
    if (err) throw err;
    console.log("Kết nối database thành công")

});

module.exports = db;