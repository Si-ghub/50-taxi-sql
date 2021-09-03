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

    // isspausdinti, kiek buvo kelioniu
    sql = 'SELECT * FROM `trips`';
    [rows] = await connection.execute(sql);
    const kelioniuSkaicius = rows.length;
    console.log(`Visi taksiskai bendrai ivykde ${kelioniuSkaicius}  keliones`);

    // isspausdinti, visu taksistu vardus
    sql = 'SELECT `driver` FROM `trips`';
    [rows] = await connection.execute(sql);
    let taksistuVardai = [];
    for (let index = 0; index < rows.length; index++) {
        const vardas = rows[index].driver;
        if (!taksistuVardai.includes(vardas)) {
            taksistuVardai.push(vardas);
        }
    }
    console.log(`Taksistais dirba: ${taksistuVardai.join(', ')}. `);

    // isspausdinti, koki atstuma nuvaziavo visu kelioniu metu

    // isspausdinti, koks yra vidutinis Jono ivertinimas

    // isspausdinti, kokia yra vidutine kelioniu kaina


}

app.init();

module.exports = app;