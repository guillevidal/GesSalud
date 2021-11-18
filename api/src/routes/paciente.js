const { Router } = require("express");
const { Persona, Paciente, HistoriaClinica, Diagnostico } = require("../db");
const { transporter } = require("../configs/nodemailer");
const rutasProtegidas = require("./Middleware/rutasProtegidas.js");
const {
  getPacientes,
  ifExist,
  createPatient,
} = require("../controllers/paciente");

const router = Router();
router.get("/" /* , rutasProtegidas */, async function (req, res, next) {
  let allPacientes = await getPacientes();
  res.send(allPacientes);
});

router.post("/" /* , rutasProtegidas */, async function (req, res) {
  const data = req.body;

  try {
    let [yaExisteDni, yaExisteCorreo, yaExisteUsuario] = await ifExist(data);
    if (yaExisteDni || yaExisteCorreo || yaExisteUsuario) {
      res.status(400).send({
        msg: `El dni, usuario o el email ingresado ya esta registrado`,
      });
    } else {
      let [creandoPersona, creandoDatosPaciente, creandoDatosHistoriaClinica] =
        await createPatient(data);

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
router.get("/consulta/:dni" /* , rutasProtegidas */, async (req, res) => {
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
