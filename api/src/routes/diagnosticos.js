const { Router } = require("express");
const { Diagnostico } = require("../db");
const router = Router();

router.post("/", async function (req, res) {
  data = req.body;
  try {
    await Diagnostico.create(
      {
        // id: uuidv4(),
        diagnostic: data.diagnostic,
        date: data.date,
        derivation: data.derivation,
        historiaClinicaId: data.historiaClinicaId,
      },
      {
        fields: ["diagnostic", "date", "derivation", "historiaClinicaId"],
      }
    );
    res.status(201).send("Creacion exitosa");
  } catch (error) {
    res.status(400).send({ msg: error });
  }
});

router.put("/:id", async function (req, res) {
  try {
    const { id } = req.params;
    let { diagnostic, date, derivation } = req.body;
    await Diagnostico.update(
      { diagnostic, date, derivation },
      { where: { id } }
    );

    res.send("se modifico correctamente");
  } catch (error) {
    res.status(400).json({ msg: error });
  }
});

module.exports = router;
