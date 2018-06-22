const mysql = require('../config/mysql.js');

module.exports = {
    hent_alle: () => {
        return new Promise((resolve, reject) => {
            let db = mysql.connect();
            db.execute(`SELECT 
            fisk_id, 
            fisk_navn, 
            fisk_koen, 
            fk_farve_id,
            farve_navn 
            FROM fisk 
            INNER JOIN 
            farver ON fisk.fk_farve_id = farver.farve_id
            ORDER by fisk_id DESC`,
                [], (err, rows) => {
                    if (err) {
                        console.log(err.message);
                        reject(err.message);
                    } else {
                        resolve(rows);
                    }
                });
            db.end();
        });
    },
    hent_en: (fisk_id) => {
        return new Promise((resolve, reject) => {
            let db = mysql.connect();
            db.execute(`SELECT
            fisk_id, 
            fisk_navn, 
            fisk_koen, 
            farve_navn, 
            farve_id 
            FROM fisk 
            INNER JOIN farver ON fisk.fk_farve_id = farver.farve_id
            WHERE fisk_id = ?`,
                [fisk_id], (err, rows) => {
                    if (err) {
                        console.log(err.message);
                        reject(err.message);
                    } else {
                        resolve(rows[0]);
                    }
                });
            db.end();
        });
    },
    opret_en: (navn, farve, koen) => {
        return new Promise((resolve, reject) => {
            let db = mysql.connect();
            db.execute(`INSERT INTO fisk SET 
             fisk_navn = ?,
             fk_farve_id = ?,
             fisk_koen = ? `,
                [navn, farve, koen], (err, rows) => {
                    if (err) {
                        console.log(err.message);
                        reject(err.message);
                    } else {
                        resolve(rows);
                    }
                });
            db.end();
        });
    },
    ret_en: (navn, farve, koen, id) => {
        return new Promise((resolve, reject) => {
            let db = mysql.connect();
            db.execute(`UPDATE fisk SET 
            fisk_navn = ?, 
            fk_farve_id = ?, 
            fisk_koen = ? 
            WHERE fisk_id = ? `,
                [navn, farve, koen, id], (err, rows) => {
                    if (err) {
                        console.log(err.message);
                        reject(err.message);
                    } else {
                        resolve(rows);
                    }
                });
            db.end();
        })
    },
    slet_en: (id) => {
        return new Promise((resolve, reject) => {
            let db = mysql.connect();
            db.execute(`DELETE FROM fisk 
            WHERE fisk_id = ? `,
                [id], (err, rows) => {
                    if (err) {
                        console.log(err.message);
                        reject(err.message);
                    } else {
                        resolve(rows);
                    }
                });
            db.end();
        })
    }

}