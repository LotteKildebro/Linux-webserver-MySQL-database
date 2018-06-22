const fisk_service = require('../services/fisk.js');

module.exports = (app) => {
    //henter alle fisk
    app.get('/', (req, res) => {
        fisk_service.hent_alle()
            .then(result => {
                res.render('pages/fisk', {
                    "title": "Mine Fisk",
                    "data": result,
                    "formtype": "Opret",
                    "fisk": {
                        "fisk_navn": "",
                        "fk_farve_id": "",
                        "fisk_koen": ""
                    }
                });
            })
    });

    //henter en fisk
    app.get('/fisk/:id', (req, res) => {
        let id = req.params.id;
        if (isNaN(id)) {
            res.sendStatus(400);
        } else {
            fisk_service.hent_en(id).then(result => {
                res.render('pages/detalje', {
                    "title": "En Fisk",
                    "data": result
                });

            })
        }
    });

    //opret

    //ret

    //slet

}