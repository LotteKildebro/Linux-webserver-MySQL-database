const fisk_service = require('../services/fisk.js');
const admin_service = require('../services/admin.js');
const farve_service = require('../services/farve.js');


module.exports = (app) => {
    //henter alle fisk
    app.get('/admin/fisk', (req, res) => {
        (async () => {
            // standard data
            let alle_farver = [];
            let alle_fisk = [];
            let en_fisk = {
                "fisk_id": 0,
                "fisk_navn": "",
                "fisk_koen": "",
                "farve_id": 0,
                "farve_navn": ""
            };

            // udfør de asynkrone funktioner med en await kommando
            await farve_service.hent_alle()
                .then(result => {
                    alle_farver = result;
                });
            await fisk_service.hent_alle()
                .then(result => {
                    alle_fisk = result;
                });

            // send data til skabelonen
            res.render('pages/admin', {
                "title": "Mine Fisk",
                "data": alle_fisk,
                "formtype": "Rediger",
                "fisk": en_fisk,
                "farver": alle_farver,
                "page": "admin"
            });
        })();
    });


    //tag imod formular data og og indsæt fisk
    app.post('/admin/fisk', (req, res) => {
        fisk_service.opret_en(req.body.fisk_navn, req.body.fisk_farve, req.body.fisk_koen)
            .then(result => {
                res.redirect('/admin/fisk');
            })
            .catch(err => {
                console.log(err);
                res.redirect('/admin/fisk');
            })
    });

    //forudfyld formularen med en fisk 
    app.get('/admin/fisk/ret/:fisk_id', (req, res) => {
        (async () => {
            // standard data
            let alle_farver = [];
            let alle_fisk = [];
            let en_fisk = {
                "fisk_id": 0,
                "fisk_navn": "",
                "fisk_koen": "",
                "farve_id": 0,
                "farve_navn": ""
            };

            // udfør de asynkrone funktioner med en await kommando
            await farve_service.hent_alle()
                .then(result => {
                    alle_farver = result;
                });
            await fisk_service.hent_alle()
                .then(result => {
                    alle_fisk = result;
                });
            await fisk_service.hent_en(req.params.fisk_id)
                .then(result => {
                    en_fisk = result;
                });

            // send data til skabelonen
            res.render('pages/admin', {
                "title": "Mine Fisk",
                "data": alle_fisk,
                "formtype": "Rediger",
                "fisk": en_fisk,
                "farver": alle_farver,
                "page": "admin"
            });
        })();
    });

    //tag imod 1 og rediger formular og opdater databasen
    app.post('/admin/fisk/ret/:fisk_id', (req, res) => {
        fisk_service.ret_en(req.body.fisk_navn, req.body.fisk_farve, req.body.fisk_koen, req.params.fisk_id)
            .then(result => {
                res.redirect("/admin/fisk");
            })
            .catch(err => {
                console.log(err);
                res.redirect("/admin/fisk");
            })
    });

    //slet
    app.get('/admin/fisk/slet/:fisk_id', (req, res) => {
        fisk_service.slet_en(req.params.fisk_id)
            .then(result => {
                res.redirect("/admin/fisk");
            })
            .catch(err => {
                console.log(err);
                res.redirect("/admin/fisk");
            })
    });

}