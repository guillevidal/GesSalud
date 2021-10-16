const { Router } = require("express");
const { Persona } = require("../db");
const router = Router();

router.get("/", async function (req, res, next) {
  let especialidades = [
    {name : "Cardiología", modulo : 2},
    {name : "Endocrinología", modulo : 3},
    {name : "Gastroenterología", modulo : 2},
    {name : "Geriatría", modulo : 1},
    {name : "Hematología", modulo : 1},
    {name : "Infectología", modulo : 2},
    {name : "Médico clínico", modulo : 1},
    {name : "Neumología", modulo : 3},
    {name : "Neurología", modulo : 2},
    {name : "Nutriología", modulo : 1},
    {name : "Oftalmología", modulo : 1},
    {name : "Oncología", modulo : 1},
    {name : "Pediatría", modulo : 1},
    {name : "Psiquiatría", modulo : 1},
    {name : "Toxicología", modulo : 3},
    {name : "Dermatología", modulo : 1},
    {name : "Odontología", modulo : 1},
    {name : "Ginecología", modulo : 3},
    {name : "Otorrinolaringología", modulo : 2},
    {name : "Urología", modulo : 1},
    {name : "Traumatología", modulo : 3}
  ];

  res.send(especialidades);
});

module.exports = router;
