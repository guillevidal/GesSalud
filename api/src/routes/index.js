const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const router = Router();
const paciente = require("./paciente");
const especialista = require("./especialista");
const especialidades = require("./especialidades.js");
const agendas= require("./agendas");

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/paciente", paciente);
router.use("/especialista", especialista);
router.use("/especialidades", especialidades);
router.use("/agendas", agendas);

module.exports = router;
