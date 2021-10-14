const { Router } = require("express");
const { Persona } = require("../db");
const router = Router();

router.get("/", async function (req, res, next) {
  let especialidades = [
    "Cardiología",
    "Endocrinología",
    "Gastroenterología",
    "Geriatría",
    "Hematología",
    "Infectología",
    "Médico clínico",
    "Neumología",
    "Neurología",
    "Nutriología",
    "Oftalmología",
    "Oncología",
    "Pediatría",
    "Psiquiatría",
    "Toxicología",
    "Dermatología",
    "Odontología",
    "Ginecología",
    "Otorrinolaringología",
    "Urología",
    "Traumatología",
  ];

  res.send(especialidades);
});

module.exports = router;
