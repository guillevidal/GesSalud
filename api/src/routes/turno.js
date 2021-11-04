const { Router } = require("express");
const { transporter } = require("../configs/nodemailer");
const {
  Agenda,
  Turno,
  Paciente,
  Especialista_medico,
  Tipo_especialidad,
  Persona,
  HistoriaClinica,
} = require("../db");
const router = Router();
const rutasProtegidas = require("./Middleware/rutasProtegidas.js");

router.post("/", async function (req, res) {
  let { pacienteId, agendaId, modules, status, hour } = req.body;
  try {
    let crearTurno = await Turno.create(
      {
        modules,
        status,
        hour,
      },
      {
        fields: ["modules", "status", "hour"],
      }
    );

    const asignandoAgenda = await Agenda.findByPk(agendaId);
    let { date } = asignandoAgenda.dataValues;

    asignandoAgenda
      ? await crearTurno.setAgenda(asignandoAgenda)
      : res
          .status(400)
          .send({ msg: "No se pudo encontrar la agenda indicada" });

    const asignandoPaciente = await Paciente.findByPk(pacienteId);

    asignandoPaciente
      ? await crearTurno.setPaciente(asignandoPaciente)
      : res.status(400).send({ msg: "No se pudo encontrar el paciente" });

    let datosPersona = await Persona.findByPk(
      asignandoPaciente.dataValues.personaId
    );
    let { name, lastName, email } = datosPersona.dataValues;

    let datosAgenda = await Tipo_especialidad.findByPk(
      asignandoAgenda.dataValues.tipoEspecialidadId
    );
    let nameSpecialties = datosAgenda.dataValues.name;

    if (email) {
      await transporter.sendMail({
        from: '"GesSalud💉" <ges.salud.04@gmail.com>',
        to: email,
        subject: "Turno asignado ✔",
        html: `<b> Hola ${name} ${lastName}🩺 , </br>
        tu turno para: ${nameSpecialties} fue asignado para el ${date} a las ${hour} </b>`,
      });
    }

    res.status(200).send(crearTurno);
  } catch (e) {
    res.status(400).send({ msg: "No se pudo crear el turno" });
  }
});

router.get("/", rutasProtegidas, async function (req, res, next) {
  try {
    let turnosAll = await Turno.findAll({
      attributes: ["id", "hour", "status"],
      include: [
        {
          model: Agenda,
          attributes: ["date", "id"],
          include: [
            {
              model: Tipo_especialidad,
              attributes: ["name"],
            },
            {
              model: Especialista_medico,
              attributes: ["id"],
              include: {
                model: Persona,
                attributes: ["name", "lastName", "dni"],
              },
            },
          ],
        },
        {
          model: Paciente,
          attributes: ["id"],
          include: [
            {
              model: Persona,
              attributes: ["name", "lastName", "dni"],
            },
            {
              model: HistoriaClinica,
              attributes: ["id"],
            },
          ],
        },
      ],
    });
    res.status(200).send(turnosAll);
  } catch (e) {
    res.status(400).send({ msg: "No se encontraron turnos" });
  }
});

router.get("/:id", rutasProtegidas, async function (req, res, next) {
  let { id } = req.params;
  console.log(id);
  try {
    let turno = await Turno.findByPk(id, {
      attributes: ["id", "hour"],
      include: [
        {
          model: Agenda,
          attributes: ["date"],
          include: [
            {
              model: Tipo_especialidad,
              attributes: ["name"],
            },
            {
              model: Especialista_medico,
              attributes: ["specialty"],
              include: {
                model: Persona,
                attributes: ["name", "lastName"],
              },
            },
          ],
        },
        {
          model: Paciente,
          attributes: ["id"],
          include: [
            {
              model: Persona,
              attributes: ["name", "lastName"],
            },
            {
              model: HistoriaClinica,
              attributes: ["id"],
            },
          ],
        },
      ],
    });
    res.status(200).send(turno);
  } catch (e) {
    res.status(400).send({ msg: "No se encontro el turno" });
  }
});

router.put("/:id", async function (req, res) {
  try {
    let id = req.params.id;
    let query = await Turno.findByPk(id);
    let { pacienteId, agendaId, status, hour } = req.body;
    if (!status) {
      status = "pendiente";
    }
    await Turno.update(
      { hour, pacienteId, agendaId, status },
      { where: { id } }
    );
    res.status(200).send({ msg: "Se actualizaron los datos correctamente" });
  } catch (e) {
    res.status(400).send({ msg: "No se pudo modificar la agenda" });
  }
});

router.get("/borrarturno/:id", rutasProtegidas, async function (req, res) {
  try {
    let id = req.params.id;
    await Turno.destroy({ where: { id } });

    res.status(200).send({ msg: "El turno se elimino correctamente" });
  } catch (e) {
    res.status(400).send({ msg: "No se pudo modificar la agenda" });
  }
});

module.exports = router;
