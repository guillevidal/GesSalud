const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const router = Router();
const paciente = require("./paciente.js");
const especialista = require("./especialista");
const especialidades = require("./especialidades.js");
const turnos = require("./turno.js");
const administrativos = require("./administrativos");
const agendas= require("./agendas");


// const autenticar = require("./autenticar.js");


// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/paciente", paciente);
router.use("/especialista", especialista);
router.use("/especialidades", especialidades);
router.use("/administrativos", administrativos);
router.use("/agendas", agendas);
router.use("/turnos", turnos );

// router.use("/autenticar", autenticar);


module.exports = router;
