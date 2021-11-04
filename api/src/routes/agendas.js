const { default: axios } = require("axios");
const { Router } = require("express");
const { transporter } = require("../configs/nodemailer");
const {
  Agenda,
  Especialista_medico,
  Tipo_especialidad,
  Persona,
  Turno,
  Paciente,
  HistoriaClinica,
} = require("../db");
const router = Router();
const rutasProtegidas = require("./Middleware/rutasProtegidas.js");

router.post("/", async function (req, res) {
  let { date, amount, idSpecialist, idSpecialties } = req.body;
  try {
    let crearAgendas = await Agenda.create(
      {
        date,
        amount,
      },
      {
        fields: ["date", "amount"],
      }
    );

    const asignandoMedico = await Especialista_medico.findByPk(idSpecialist);

    await crearAgendas.setEspecialista_medico(asignandoMedico);

    const asignandoEspecialidad = await Tipo_especialidad.findByPk(
      idSpecialties
    );
    await crearAgendas.setTipo_especialidad(asignandoEspecialidad);
    res.status(200).send({ msg: "Agendas creadas" });
  } catch (e) {
    res.status(400).send({ msg: "No se puedo crear el grupo de agendas" });
  }
});

router.post("/grupoagendas", async function (req, res) {
  let { date, amount, idSpecialist, idSpecialties } = req.body;
  try {
    date.forEach(async (element) => {
      let crearAgendas = await Agenda.create(
        {
          date: element,
          amount: amount,
        },
        {
          fields: ["date", "amount"],
        }
      );
      console.log(crearAgendas);
      const asignandoMedico = await Especialista_medico.findByPk(idSpecialist);

      await crearAgendas.setEspecialista_medico(asignandoMedico);

      const asignandoEspecialidad = await Tipo_especialidad.findByPk(
        idSpecialties
      );
      await crearAgendas.setTipo_especialidad(asignandoEspecialidad);
    });
    res.status(200).send({ msg: "Agendas creadas" });
  } catch (e) {
    res.status(400).send({ msg: "No se puedo crear el grupo de agendas" });
  }
});

router.get("/", rutasProtegidas, async function (req, res) {
  try {
    let totalAgendas = await Agenda.findAll({
      attributes: { exclude: ["especialistaMedicoId", "tipoEspecialidadId"] },
      include: [
        {
          //attributes:["id","date","amount"],
          model: Especialista_medico,
          attributes: { exclude: ["enrollment", "specialty"] },
          include: {
            model: Persona,
            attributes: ["name", "lastName"],
          },
        },
        {
          model: Tipo_especialidad,
        },
        {
          model: Turno,
          attributes: { exclude: ["modules", "agendaId", "pacienteId"] },
          include: {
            model: Paciente,
            attributes: {
              exclude: [
                "medication",
                "personaId",
                "emergencyContact",
                "disease",
              ],
            },
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
        },
      ],
    });
    res.status(200).send(totalAgendas);
  } catch (e) {
    res.status(400).send({ msg: "No se pudo encontrar las agendas" });
  }
});

router.get("/agendaId/:id", rutasProtegidas, async function (req, res) {
  let id = req.params.id;
  try {
    let totalAgendas = await Agenda.findByPk(id, {
      attributes: { exclude: ["especialistaMedicoId", "tipoEspecialidadId"] },
      include: [
        {
          //attributes:["id","date","amount"],
          model: Especialista_medico,
          attributes: { exclude: ["enrollment", "specialty"] },
          include: {
            model: Persona,
            attributes: ["name", "lastName"],
          },
        },
        {
          model: Tipo_especialidad,
        },
        {
          model: Turno,
          attributes: { exclude: ["modules", "agendaId", "pacienteId"] },
          include: {
            model: Paciente,
            attributes: {
              exclude: [
                "medication",
                "personaId",
                "emergencyContact",
                "disease",
              ],
            },
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
        },
      ],
    });
    res.status(200).send(totalAgendas);
  } catch (e) {
    res.status(400).send({ msg: "No se pudo encontrar las agendas" });
  }
});

router.put("/:id", async function (req, res) {
  try {
    let id = req.params.id;
    let query = await Agenda.findByPk(id);
    let { especialistaMedicoId, tipoEspecialidadId, date, amount } = req.body;

    await Agenda.update(
      { especialistaMedicoId, tipoEspecialidadId, date, amount },
      { where: { id } }
    );
    res.status(200).send({ msg: "Se actualizaron los datos correctamente" });
  } catch (e) {
    res.status(400).send({ msg: "No se pudo modificar la agenda" });
  }
});

module.exports = router;
