const { Router } = require("express");
const db = require("../db");
const {
  Persona,
  Especialista_medico,
  Tipo_especialidad,
  AgendaTotal,
} = require("../db");
const router = Router();

router.get("/", async function (req, res, next) {
  let especialistas = await Especialista_medico.findAll({
    include: [{
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
        "rol"
      ]
    },
    // {
    //   model: Tipo_especialidad,
    //   }
    ]
  });

  // let queryEspecialista = especialistas.map((el) => {
  //   return {
  //     id: el.id,
  //     enrollment: el.enrollment,
  //     name: el.persona.name,
  //     lastName: el.persona.lastName,
  //     dni: el.persona.dni,
  //     email: el.persona.email,
  //     phone: el.persona.phone,
  //     adress: el.persona.adress,
  //     birth: el.persona.birth,
  //     user: el.persona.user,
  //     password: el.persona.password,
  //     //specialty: el.tipo_especialidads.map(ele => ele.name)
  //     specialty: el.specialty,
  //   };

  // });

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
        gender: data.gender,
        rol: '1'
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
          "rol"
        ],
      }
    );
    const creandoMatriculaEspecialista = await Especialista_medico.create(
      {
        enrollment: data.enrollment,
        specialty: data.specialty,
      },
      {
        fields: ["enrollment", "specialty"],
      }
    );

    // let especialidadesPromise = await Promise.all(
    //   data.specialty.map((el) =>
    //   Tipo_especialidad.findOne({ where: { name: el } })
    //   )
    // );

    // await creandoMatriculaEspecialista.setTipo_especialidads(
    //   especialidadesPromise);

    await creandoEspecialista.setEspecialista_medico(
      creandoMatriculaEspecialista
    );
    let obj = {
      ...creandoEspecialista.dataValues,
      ...creandoMatriculaEspecialista.dataValues,
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
      let query = await Especialista_medico.findByPk(id, {
        include: [{
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
            "rol"
          ]
        },
        // {
        //   model: Tipo_especialidad,
        // }
        ]
      });

      // let queryEspecialista =
      //   {
      // id: query.id,
      // enrollment: query.enrollment,
      // name: query.persona.name,
      // lastName: query.persona.lastName,
      // dni: query.persona.dni,
      // email: query.persona.email,
      // phone: query.persona.phone,
      // adress: query.persona.adress,
      // birth: query.persona.birth,
      // user: query.persona.user,
      // password: query.persona.password,
      // //specialty: query.tipo_especialidads.map(el => el.name)
      // specialty: query.persona.specialty,
      //   };

      res.send(query);
    }
  } catch (error) {
    res.status(400).json(error);
  }
});

router.put("/:id", async (req, res) => {
  try {
    let id = req.params.id;
    let query = await Especialista_medico.findByPk(id);
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
      specialty,
      gender,
      enrollment,
    } = req.body;

    await Especialista_medico.update(
      { enrollment, specialty },
      { where: { id } }
    );
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

    res.status(200).send("Se actualizaron los datos correctamente");
  } catch (e) {
    res.status(400).send("No se pudieron actualizar los datos.");
  }
});

module.exports = router;
