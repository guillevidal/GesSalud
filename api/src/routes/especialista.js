const { Router } = require("express");
const { transporter } = require("../configs/nodemailer");
const db = require("../db");
const {
  Persona,
  Especialista_medico,
  Tipo_especialidad,
  AgendaTotal,
} = require("../db");
const router = Router();
const rutasProtegidas = require("./Middleware/rutasProtegidas.js");

router.get("/", async function (req, res, next) {
  let especialistas = await Especialista_medico.findAll({
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
          "imgProfile",
        ],
      },
    ],
  });

  res.send(especialistas);
});

module.exports = router;

router.post("/", async function (req, res) {
  const data = req.body;
  try {
    const [yaExisteDni, yaExisteCorreo, yaExisteUsuario] = await Promise.all([
      Persona.findOne({ where: { dni: data.dni } }),
      Persona.findOne({ where: { email: data.email } }),
      Persona.findOne({ where: { user: data.user } }),
    ]);
    if (yaExisteUsuario || yaExisteCorreo || yaExisteDni) {
      res.status(400).send({
        msg: `El dni, usuario o el email ingresado ya esta registrado`,
      });
    } else {
      const [creandoEspecialista, creandoMatriculaEspecialista] =
        await Promise.all([
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
              rol: "3",
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
          Especialista_medico.create(
            {
              enrollment: data.enrollment,
              specialty: data.specialty,
            },
            {
              fields: ["enrollment", "specialty"],
            }
          ),
        ]);

      await creandoEspecialista.setEspecialista_medico(
        creandoMatriculaEspecialista
      );
      let obj = {
        ...creandoEspecialista.dataValues,
        ...creandoMatriculaEspecialista.dataValues,
      };
      if (obj.email && obj.name && obj.lastName && obj.user && obj.password) {
        await transporter.sendMail({
          from: '"GesSalud💉" <ges.salud.04@gmail.com>',
          to: obj.email,
          subject: "Creacion de cuenta exitosa ✔",
          html: `<b> Hola ${obj.name} ${obj.lastName}🩺 , tu usuario es: ${obj.user} y tu contraseña: ${obj.password} </b>`,
        });
      }
      res
        .status(201)
        .send({ msg: "Se ha creado el usuario de manera exitosa" });
    }
  } catch (e) {
    res.status(400).send("no se puedo crear al especialista");
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    if (id) {
      let query = await Especialista_medico.findByPk(id, {
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
              "imgProfile",
            ],
          },
          // {
          //   model: Tipo_especialidad,
          // }
        ],
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
