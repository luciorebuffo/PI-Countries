const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const Activities = require("./activities");
const Countries = require("./countries");

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use("/" ,Activities);
router.use("/", Countries);

module.exports = router;