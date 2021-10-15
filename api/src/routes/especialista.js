const { Router } = require("express");
const { Persona, Especialista_medico, Tipo_especialidad, AgendaTotal } = require("../db");
const router = Router();
const { Op } = require("sequelize");
// const { v4: uuidv4 } = require("uuid");

router.get("/", async function (req, res, next) {
  let especialistas = await Especialista_medico.findAll({
    include: { model:Persona, attributes : ["name", "lastName", "dni", "email", "phone", "adress", "birth", "user", "password"] }
  });

  res.send(especialistas);
});

module.exports = router;

router.post("/", async function (req, res) {
  const data = req.body;
  try {
    const creandoEspecialista = await Persona.create(
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
        gender: data.gender
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
          "gender"
        ],
      }
    );
    const creandoMatriculaEspecialista = await Especialista_medico.create(
      {
        enrollment: data.enrollment,       
        specialty: data.specialty
      },
       {
         fields: [
           "enrollment", 
           "specialty"
          ],
       }
    );
     
   
    let queryEn = await creandoEspecialista.setEspecialista_medico(
      creandoMatriculaEspecialista
     );
    let obj = {
      ...creandoEspecialista.dataValues,
     ...creandoMatriculaEspecialista.dataValues
    };
    res.send(obj);
  } catch (e) {
    res.status(400).send("no se puedo crear al especialista");
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    if (id) {
      let query = await Especialista_medico.findByPk(id, {include : {model : Persona, attributes : ["name", "lastName", "dni", "email", "phone", "adress", "birth", "user", "password"]}});

      res.send(query);
    }
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = router;