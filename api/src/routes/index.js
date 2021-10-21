const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const router = Router();
const paciente = require("./paciente.js");
const especialista = require("./especialista");
const especialidades = require("./especialidades.js");
const administrativos = require("./administrativos");
// const autenticar = require("./autenticar.js");

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/paciente", paciente);
router.use("/especialista", especialista);
router.use("/especialidades", especialidades);
router.use("/administrativos", administrativos);
// router.use("/autenticar", autenticar);

module.exports = router;
