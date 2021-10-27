const { Router } = require("express");
const { Persona, Paciente, HistoriaClinica, Diagnostico } = require("../db");
const router = Router();
const rutasProtegidas = require("./Middleware/rutasProtegidas.js");
// const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");
const config = require("../configs/config");

router.get("/", rutasProtegidas, async function (req, res, next) {
  let dataPacientes = await Paciente.findAll({
    include: [
      {
        model: Persona,
        attributes: [
          "name",
          "lastName",
          "dni",
          "email",
          "phone",
          "adress",
          "birth",
          "user",
          "password",
          "gender",
          "rol",
        ],
      },
      {
        model: HistoriaClinica,
        attributes: ["id", "creationDate"],
      },
    ],
  });

  res.send(dataPacientes);
});

module.exports = router;

router.post(
  "/",
  /* rutasProtegidas, */ async function (req, res) {
    const data = req.body;
    try {
      const creandoPersona = await Persona.create(
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
          gender: data.gender,
          rol: "4",
        },
        {
          fields: [
            "name",
            "lastName",
            "dni",
            "email",
            "phone",
            "adress",
            "birth",
            "user",
            "password",
            "gender",
            "rol",
          ],
        }
      );
      const creandoDatosPaciente = await Paciente.create(
        {
          medication: data.medication,
          emergencyContact: data.emergencyContact,
          disease: data.disease,
        },
        {
          fields: ["medication", "emergencyContact", "disease"],
        }
      );
      const creandoDatosHistoriaClinica = await HistoriaClinica.create(
        {
          creationDate: data.creationDate,
        },
        {
          fields: ["creationDate"],
        }
      );

      await creandoPersona.setPaciente(creandoDatosPaciente);
      await creandoDatosPaciente.setHistoriaClinica(
        creandoDatosHistoriaClinica
      );

      res.send({ msg: "Se creo correctamente" });
    } catch (e) {
      res.status(400).send("no se puedo crear al Paciente");
    }
  }
);

//BÚSQUEDA DE PACIENTE POR "DNI"
router.get("/consulta/:dni", async (req, res) => {
  const { dni } = req.params;
  try {
    if (dni) {
      let query = await Persona.findOne({
        where: { dni: dni },
        include: {
          model: Paciente,
          include: {
            model: HistoriaClinica,
            attributes: ["id", "creationDate"],
          },
        },
      });

      res.send(query);
    }
  } catch (error) {
    res.status(400).json(error);
  }
});

//ACTUALIZACIÓN DE DATOS PERSONALES DE PACIENTE
router.put("/:id", async (req, res) => {
  try {
    let id = req.params.id;
    let query = await Paciente.findByPk(id);
    let { personaId } = query;
    let {
      name,
      lastName,
      dni,
      email,
      phone,
      adress,
      birth,
      user,
      password,
      gender,
      emergencyContact,
    } = req.body;

    await Persona.update(
      {
        name,
        lastName,
        dni,
        email,
        phone,
        adress,
        birth,
        user,
        password,
        gender,
      },
      { where: { id: personaId } }
    );
    await Paciente.update({ emergencyContact }, { where: { id } });
    res.status(200).send("Se actualizaron los datos correctamente");
  } catch (e) {
    res.status(400).send("No se pudieron actualizar los datos.");
  }
});

module.exports = router;
