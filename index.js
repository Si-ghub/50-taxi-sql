const mysql = require('mysql2/promise');

const app = {}

app.init = async () => {
    // prisijungti prie duomenu bazes
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'taxi',
    });

    let sql = '';
    let rows = [];



    // perskaitom ka turim is pradziu
    sql = 'SELECT * \ FROM `trips`'
    [rows] = await data.db.execute(sql);
    console.log(rows);




}

app.init();

module.exports = app;