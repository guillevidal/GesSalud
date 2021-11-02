const { Router } = require("express");
const { transporter } = require("../configs/nodemailer");
const { Persona, Paciente, Items_pagos, Historial_pagos } = require("../db");
const router = Router();

router.get("/", async function (req, res) {
  try {
    let historial = await Historial_pagos.findAll({
      include: {
        model: Items_pagos,
        attributes: ["title"],
      },
      // include: {
      //   // model: Paciente,
      //   // include: {
      //   //   model: Persona,
      //   //   attributes: ["name", "lastName"],
      //   // },
      // },
    });

    let items = await Items_pagos.findAll();

    let array = [];

    array.push(items);
    res.status(200).send({ historial, items });
  } catch (error) {
    res.status(400).send({ msg: "No se encuentra el historial" });
  }
});

module.exports = router;
