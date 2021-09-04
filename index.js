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

    // DESTYTOJO SPRENDIMAS 

    // **1.** _Isspausdinti, kiek buvo kelioniu_
    sql = 'SELECT count(id) as kiekis FROM `trips`';
    [rows] = await connection.execute(sql);
    const tripCount = rows[0].kiekis;
    console.log(`Visi taksiskai bendrai ivykde ${tripCount} keliones.`);

    // **2.** _Isspausdinti, visu taksistu vardus_
    sql = 'SELECT DISTINCT `driver` FROM `trips`';
    [rows] = await connection.execute(sql);
    const uniqueDrivers = rows.map(obj => obj.driver);
    console.log(`Taksistais dirba: ${uniqueDrivers.join(', ')}.`);

    // **3.** _Isspausdinti, koki atstuma nuvaziavo visu kelioniu metu_
    sql = 'SELECT sum(distance) as totalDistance FROM `trips`';
    [rows] = await connection.execute(sql);
    console.log(`Visu kelioniu metu nuvaziuota ${rows[0].totalDistance} km.`);

    // **4.** _Isspausdinti, koks yra vidutinis Jono ivertinimas_
    sql = 'SELECT avg(rating) as averageRating FROM `trips`\
                WHERE `driver` LIKE "Jonas"';
    [rows] = await connection.execute(sql);
    console.log(`Jono ivertinimas yra ${+rows[0].averageRating} zvaigzdutes.`);

    // **5.** _Isspausdinti, kokia yra vidutine kelioniu kilometro kaina_
    sql = 'SELECT avg(`price` / `distance`) as eurPerKm FROM `trips`';
    [rows] = await connection.execute(sql);
    console.log(`Vidutine kelioniu kaina yra ${(+rows[0].eurPerKm).toFixed(2)} EUR/km.`);


    // // KITAS SPRENDIMAS
    // // 1. Isspausdinti, kiek buvo kelioniu
    // sql = 'SELECT * FROM `trips`';
    // [rows] = await connection.execute(sql);
    // const kelioniuSkaicius = rows.length;
    // console.log(`Visi taksiskai bendrai ivykde ${kelioniuSkaicius} keliones`);

    // // 2. Isspausdinti, visu taksistu vardus
    // sql = 'SELECT `driver` FROM `trips`';
    // [rows] = await connection.execute(sql);
    // let taksistuVardai = [];
    // for (let index = 0; index < rows.length; index++) {
    //     const vardas = rows[index].driver;
    //     if (!taksistuVardai.includes(vardas)) {
    //         taksistuVardai.push(vardas);
    //     }
    // }
    // console.log(`Taksistais dirba: ${taksistuVardai.join(', ')}.`);

    // // 3. Isspausdinti, koki atstuma nuvaziavo visu kelioniu metu
    // sql = 'SELECT `distance` FROM `trips`';
    // [rows] = await connection.execute(sql);
    // let visosKeliones = 0;
    // for (let index = 0; index < rows.length; index++) {
    //     visosKeliones += +rows[index].distance;
    // }
    // console.log(`Visu kelioniu metu nuvaziuota ${visosKeliones} km`);

    // // 4. Isspausdinti, koks yra vidutinis Jono ivertinimas
    // sql = 'SELECT `rating` FROM `trips` WHERE `driver` LIKE "Jonas"';
    // [rows] = await connection.execute(sql);
    // let vairuotojoKeliones = 0;
    // for (let index = 0; index < rows.length; index++) {
    //     vairuotojoKeliones += +rows[index].rating;
    // }
    // const vidurkis = vairuotojoKeliones / rows.length;
    // console.log(`Jono ivertinimas yra ${vidurkis} zvaigzdutes.`);

    // // 5. Isspausdinti, kokia yra vidutine kelioniu kaina
    // sql = 'SELECT `price`, `distance` FROM `trips`';

    // [rows] = await connection.execute(sql);
    // let visosKainos = 0;
    // visosKeliones = 0;
    // for (let index = 0; index < rows.length; index++) {
    //     visosKainos += +rows[index].price; // konvertuoja stringe esanti skaiciu i tikra skaiciu
    //     visosKeliones += +rows[index].distance;
    // }
    // const vidutineKelioniuKaina = visosKainos / visosKeliones;
    // console.log(`Vidutine kelioniu kaina yra ${vidutineKelioniuKaina.toFixed(2)} EUR/km.`);
}

app.init();

module.exports = app;