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
    console.log(`Visi taksiskai bendrai ivykde ${kelioniuSkaicius} keliones`);

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
    console.log(`Taksistais dirba: ${taksistuVardai.join(', ')}.`);

    // isspausdinti, koki atstuma nuvaziavo visu kelioniu metu
    sql = 'SELECT `distance` FROM `trips`';
    [rows] = await connection.execute(sql);
    let visosKeliones = 0;
    for (let index = 0; index < rows.length; index++) {
        visosKeliones += +rows[index].distance;
    }
    console.log(`Visu kelioniu metu nuvaziuota ${visosKeliones} km`);

    // isspausdinti, koks yra vidutinis Jono ivertinimas
    sql = 'SELECT `rating` FROM `trips` WHERE `driver` LIKE "Jonas"';
    [rows] = await connection.execute(sql);
    let vairuotojoKeliones = 0;
    for (let index = 0; index < rows.length; index++) {
        vairuotojoKeliones += +rows[index].rating;
    }
    const vidurkis = vairuotojoKeliones / rows.length;
    console.log(`Jono ivertinimas yra ${vidurkis} zvaigzdutes.`);

    // isspausdinti, kokia yra vidutine kelioniu kaina
    sql = 'SELECT `price` FROM `trips`';
    [rows] = await connection.execute(sql);
    let visosKainos = 0;
    for (let index = 0; index < rows.length; index++) {
        visosKainos += +rows[index].price; // konvertuoja stringe esanti skaiciu i tikra skaiciu
    }
    const vidutineKelioniuKaina = visosKainos / rows.length;
    console.log(`Vidutine kelioniu kaina yra ${vidutineKelioniuKaina.toFixed(2)} EUR/km.`);
}

app.init();

module.exports = app;