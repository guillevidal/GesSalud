const { Router } = require("express");
const router = Router();
const jwt = require("jsonwebtoken");
const config = require("../configs/config");
const { Persona, Especialista_medico } = require("../db");

router.post("/", async (req, res) => {
  let register = undefined;
  const persona = await Persona.findOne({
    where: { user: req.body.usuario },
  });

  if (persona) {
    register = persona.dataValues;
  }

  if (persona && persona.dataValues.rol === "3") {
    const datosEspec = await Especialista_medico.findOne({
      where: { personaId: persona.dataValues.id },
      attributes: ["id"],
    });
    especialistaId = datosEspec.dataValues.id;
    register = { ...register, especialistaId: especialistaId };
  }

  if (register) {
    if (register.password === req.body.password) {
      const payload = {
        check: true,
      };
      const token = jwt.sign(payload, config.masterKeyGesSalud, {
        expiresIn: 1440,
      });
      res.json({
        token: token,
        persona: register,
      });
    } else {
      res.json({ mensaje: "Usuario o contraseña incorrectos" });
    }
  } else {
    res.json({ mensaje: "Usuario o contraseña incorrectos" });
  }
});

module.exports = router;
