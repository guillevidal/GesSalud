const { Router } = require("express");
const { Persona, Paciente, HistoriaClinica, Diagnostico } = require("../db");
const { transporter } = require("../configs/nodemailer");
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
        attributes: ["id", "creationDate"],
        include: Diagnostico,
      },
    ],
  });

  res.send(dataPacientes);
});

router.post("/", rutasProtegidas, async function (req, res) {
  const data = req.body;

  try {
    const [yaExisteDni, yaExisteCorreo, yaExisteUsuario] = await Promise.all([
      Persona.findOne({ where: { dni: data.dni } }),
      Persona.findOne({ where: { email: data.email } }),
      Persona.findOne({ where: { user: data.user } }),
    ]);

    if (yaExisteDni || yaExisteCorreo || yaExisteUsuario) {
      res.status(400).send({
        msg: `El dni, usuario o el email ingresado ya esta registrado`,
      });
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
          },
          {
            fields: ["creationDate"],
          }
        ),
      ]);

      await creandoPersona.setPaciente(creandoDatosPaciente);
      await creandoDatosPaciente.setHistoriaClinica(
        creandoDatosHistoriaClinica
      );
      let obj = {
        ...creandoPersona.dataValues,
        ...creandoDatosPaciente.dataValues,
        ...creandoDatosHistoriaClinica.dataValues,
      };
      if (obj.email && obj.name && obj.lastName && obj.user && obj.password) {
        await transporter.sendMail({
          from: '"GesSalud💉" <ges.salud.04@gmail.com>',
          to: obj.email,
          subject: "Creacion de cuenta exitosa ✔",
          html: `<b> Hola ${obj.name} ${obj.lastName}👋 , tu usuario es: ${obj.user} y tu contraseña: ${obj.password} </b>`,
        });
      }

      res.status(201).send({ msg: "El usuario se creo correctamente" });
    }
  } catch (e) {
    res.status(400).send("no se puedo crear al Paciente");
  }
});

//BÚSQUEDA DE PACIENTE POR "DNI"
router.get("/consulta/:dni", rutasProtegidas, async (req, res) => {
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
            include: Diagnostico,
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
