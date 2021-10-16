const { Router } = require("express");
const { Persona, Paciente, HistoriaClinica, Diagnostico } = require("../db");
const router = Router();
// const { v4: uuidv4 } = require("uuid");

router.get("/", async function (req, res, next) {
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
        ],
      },
      { model: HistoriaClinica, attributes: ["creationDate"] },
      { model: Diagnostico },
    ],
  });

  res.send(dataPacientes);
});

module.exports = router;

router.post("/", async function (req, res) {
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
        ],
      }
    );
    const creandoDatosPaciente = await Paciente.create(
      {
        // id: uuidv4(),
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
        // id: uuidv4(),
        creationDate: data.creationDate,
      },
      {
        fields: ["creationDate"],
      }
    );
    const creandoDatosDiagnostico = await Diagnostico.create(
      {
        // id: uuidv4(),
        diagnostic: data.diagnostic,
        date: data.date,
        derivation: data.derivation,
      },
      {
        fields: ["diagnostic", "date", "derivation"],
      }
    );
    await creandoPersona.setPaciente(creandoDatosPaciente);
    await creandoDatosPaciente.setHistoriaClinica(creandoDatosHistoriaClinica);
    await creandoDatosPaciente.addDiagnostico(creandoDatosDiagnostico);

    let obj = {
      ...creandoPersona.dataValues,
      ...creandoDatosPaciente.dataValues,
      ...creandoDatosHistoriaClinica.dataValues,
      ...creandoDatosDiagnostico.dataValues,
    };

    res.json(obj);
  } catch (e) {
    res.status(400).send("no se puedo crear al Paciente");
  }
});

//BÚSQUEDA DE PACIENTE POR "DNI"
router.get("/consulta", async (req, res) => {
  const { dni } = req.body;
  try {
    if (dni) {
      let query = await Persona.findOne({
        where : { dni : dni},
        include: {
          model: Paciente,
          include:
          [{
            model: HistoriaClinica,
          },
          {
            model: Diagnostico,
          }
          ]
        },
      });

      res.send(query);
    }
  } catch (error) {
    res.status(400).json(error);
  }
});

//ACTUALIZACIÓN DE DATOS PERSONALES DE PACIENTE
router.put ("/:id", async (req, res) => {
  try{
  let id= req.params.id;
  let query = await Paciente.findByPk(id);
  let { personaId } = query
  let {email, phone, adress, birth, user, password, gender } = req.body;

    if (email && phone && adress && birth && user && password && gender) {
      await Persona.update({ email, phone, adress, birth, user, password, gender },{where: {id : personaId}})
      res.status(200).send("Se actualizaron los datos correctamente");
    }
    else {
      res.status(400).send("Actualización FALLIDA, Campos vacíos")
    }
  }catch(e){
    res.status(400).send("No se pudieron actualizar los datos.");
  }
  
});


module.exports = router;
