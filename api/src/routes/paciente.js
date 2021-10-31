const { Router } = require("express");
const { Persona, Paciente, HistoriaClinica, Diagnostico } = require("../db");
const router = Router();
const rutasProtegidas = require("./Middleware/rutasProtegidas.js");
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
        attributes: ["id", "creationDate", "text"],
      },
    ],
  });

  res.send(dataPacientes);
});

router.post("/", rutasProtegidas, async function (req, res) {
  const data = req.body;

  try {
    const [yaExisteDni, yaExisteCorreo] = await Promise.all([
      Persona.findOne({ where: { dni: data.dni } }),
      Persona.findOne({ where: { email: data.email } }),
    ]);

    if (yaExisteDni || yaExisteCorreo) {
      res
        .status(400)
        .send({ msg: `El dni o el email ingresado ya esta registrado` });
    } else {
      const [
        creandoPersona,
        creandoDatosPaciente,
        creandoDatosHistoriaClinica,
      ] = await Promise.all([
        Persona.create(
          {
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
        ),
        Paciente.create(
          {
            medication: data.medication,
            emergencyContact: data.emergencyContact,
            disease: data.disease,
          },
          {
            fields: ["medication", "emergencyContact", "disease"],
          }
        ),
        HistoriaClinica.create(
          {
            creationDate: data.creationDate,
            text: data.text,
          },
          {
            fields: ["creationDate", "text"],
          }
        ),
      ]);

      await creandoPersona.setPaciente(creandoDatosPaciente);
      await creandoDatosPaciente.setHistoriaClinica(
        creandoDatosHistoriaClinica
      );

      res.send({ msg: "Se creo correctamente" });
    }
  } catch (e) {
    res.status(400).send("no se puedo crear al Paciente");
  }
});

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
            attributes: ["id", "creationDate", "text"],
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
