const { Router } = require("express");
const { Persona, Especialista_medico } = require("../db");
const router = Router();
const { Op } = require("sequelize");
// const { v4: uuidv4 } = require("uuid");

router.get("/", async function (req, res, next) {
  let especialistas = await Persona.findAll();

  res.send(especialistas);
});

module.exports = router;

router.post("/", async function (req, res) {
  const data = req.body;
  try {
    const creandoEspecialista = await Persona.create(
      {
        // id: uuidv4(),
        name: data.name,
        lastName: data.lastName,
        dni: data.dni,
        email: data.email,
        phone: data.phone,
        adress: data.adress,
        birth: data.birth,
        user: data.user,
        password: data.password,
      },
      {
        fields: [
          /* "id", */ "name",
          "lastName",
          "dni",
          "email",
          "phone",
          "adress",
          "birth",
          "user",
          "password",
        ],
      }
    );
    const creandoMaEspecialista = await Especialista_medico.create(
      {
        // id: uuidv4(),
        enrollment: data.enrollment,
      },
      {
        fields: [/* "id", */ "enrollment"],
      }
    );

    res.json(creandoEspecialista);
  } catch (e) {
    res.status(400).send("no se puedo crear al especialista");
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    if (id) {
      let query = await Persona.findByPk(
        id /* , {// include: [datafaltante] } */
      );

      res.send(query);
    }
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = router;
