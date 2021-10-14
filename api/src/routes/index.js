const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const router = Router();
const paciente = require('./paciente');




// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use( '/paciente', paciente);



module.exports = router;
