const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const router = Router();
const paciente = require("./paciente.js");
const especialista = require("./especialista");
const especialidades = require("./especialidades.js");
const turnos = require("./turno.js");
const administrativos = require("./administrativos");
const agendas = require("./agendas");
const diagnosticos = require("./diagnosticos");
const images = require("./images");

const autenticar = require("./autenticar.js");
const whoami = require("./whoami.js");

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/paciente", paciente);
router.use("/especialista", especialista);
router.use("/especialidades", especialidades);
router.use("/administrativos", administrativos);
router.use("/agendas", agendas);
router.use("/diagnosticos", diagnosticos);
router.use("/turnos", turnos);
router.use("/images", images);

router.use("/autenticar", autenticar);
router.use("/whoami", whoami);

module.exports = router;
