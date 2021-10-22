const { Router } = require("express");
const router = Router();
const jwt = require('jsonwebtoken');
const config = require('../configs/config');
const { Persona } = require("../db");

router.post("/", async (req, res) => {
    const register = await Persona.findOne({
        attributes: ['user', 'password', 'rol'],
        where : { user : req.body.usuario}});

    if (register) {
        if (register.dataValues.password === req.body.password) {
            const payload = {
                check:  true
            };
            const token = jwt.sign(payload, config.masterKeyGesSalud, {
                expiresIn: 1440
            });
            res.json({
                    token: token,
                    rol: register.dataValues.rol,
            });
        } else {
            res.json({ mensaje: "Usuario o contraseña incorrectos"})
        }
    }
    else {
        res.json({ mensaje: "Usuario o contraseña incorrectos"})
    }
});

module.exports = router;