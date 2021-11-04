const { Router } = require("express");
const { transporter } = require("../configs/nodemailer");
const { Persona, Personal_administrativo } = require("../db");
const router = Router();

router.post("/", async function (req, res) {
  const data = req.body;
  try {
    const [yaExisteDni, yaExisteCorreo, yaExisteUsuario] = await Promise.all([
      Persona.findOne({ where: { dni: data.dni } }),
      Persona.findOne({ where: { email: data.email } }),
      Persona.findOne({ where: { user: data.user } }),
    ]);
    if (yaExisteDni || yaExisteCorreo || yaExisteUsuario) {
      res.status(200).send({
        msg: `El dni, usuario o el email ingresado ya esta registrado`,
      });
    } else {
      const [creandoPersona, creandoEstadoAdministrativo] = await Promise.all([
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
            rol: data.rol,
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
        Personal_administrativo.create(
          {
            status: true,
          },
          {
            fields: ["status"],
          }
        ),
      ]);

      await creandoPersona.setPersonal_administrativo(
        creandoEstadoAdministrativo
      );

      let obj = {
        ...creandoEstadoAdministrativo.dataValues,
        ...creandoPersona.dataValues,
      };
      if (obj.email && obj.name && obj.lastName && obj.user && obj.password) {
        await transporter.sendMail({
          from: '"GesSalud💉" <ges.salud.04@gmail.com>',
          to: obj.email,
          subject: "Creacion de cuenta exitosa ✔",
          html: `<b> Hola ${obj.name} ${obj.lastName}🩺 , tu usuario es: ${obj.user} y tu contraseña: ${obj.password} </b>`,
        });
      }

      res.status(201).send({ msg: "la cuenta se creo correctamente" });
    }
  } catch (e) {
    res.status(400).send("no se puedo crear al especialista");
  }
});

router.get("/", async function (req, res) {
  try {
    const administrativos = await Personal_administrativo.findAll({
      include: [
        {
          model: Persona,
          attributes: [
            "id",
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
      ],
    });
    res.status(200).send(administrativos);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.put("/:id", async function (req, res) {
  try {
    let id = req.params.id;
    let queryy = await Personal_administrativo.findByPk(id);

    let { personaId } = queryy;
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
      status,
      gender,
      rol,
    } = req.body;
    await Personal_administrativo.update({ status }, { where: { id } });
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
        rol,
      },
      { where: { id: personaId } }
    );
    res.send("Modificado");
  } catch (error) {
    res.send("no se puedo modificar");
  }
});
module.exports = router;
