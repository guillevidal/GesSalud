const { Router } = require("express");
const { Persona, Paciente, HistoriaClinica } = require("../db");
const router = Router();

router.post("/", async function (req, res) {
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

      res.send({ msg: "Registro creado correctamente" });
    }
  } catch (e) {
    res.status(400).send("No se pudo crear registro");
  }
});

module.exports = router;
