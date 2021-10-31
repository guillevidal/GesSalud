const { Router } = require("express");
const { Persona, Paciente, HistoriaClinica } = require("../db");
const router = Router();

router.post("/", async function (req, res, next) {
  const data = req.body;
  try {
    const creandoPersona = await Persona.create(
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
        text: data.text,
      },
      {
        fields: ["creationDate", "text"],
      }
    );

    await creandoPersona.setPaciente(creandoDatosPaciente);
    await creandoDatosPaciente.setHistoriaClinica(creandoDatosHistoriaClinica);

    res.send({ msg: "Registro creado correctamente" });
  } catch (e) {
    res.status(400).send("No se pudo crear registro");
  }
});

module.exports = router;
