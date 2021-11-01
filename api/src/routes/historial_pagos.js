const { Router } = require("express");
const { transporter } = require("../configs/nodemailer");
const { Persona, Paciente, Turno, Historial_pagos } = require("../db");
const router = Router();

router.get("/", async function (req, res) {
  try {
    let historial = await Historial_pagos.findAll({
      include: {
        model: Turno,
        include: {
          model: Paciente,
          include: {
            model: Persona,
            attributes: ["name", "lastName"],
          },
        },
      },
    });
    res.sendStatus(200).send(historial);
  } catch (error) {
    res.status(400).send({ msg: "No se encuentra el historial" });
  }
});

module.exports = router;
