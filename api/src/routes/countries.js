const { Router } = require("express");
const axios = require("axios");
const { Activity, Country } = require("../db");
const { Op } = require("sequelize");
const {
    getCountryByName,
    
} = require("../utils/utils");

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

/* GET /countries:
* En caso de estar vacia la table country, le instancia una lista de paises desde la APi externa.
* Si recibe un name retorna filtrando las coincidencias, de no llegar, envia toda la lista.
*/
router.get("/countries", async function (req, res){
    
    const name = req.query.name;
    
    try {
        res.status(200).json(await getCountryByName(name));
    } catch (error) {
        res.status(500).json({ error: error.message });
    }


    
    
});




module.exports = router;