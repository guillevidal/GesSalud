const { Router } = require("express");
const { Persona, Paciente, HistoriaClinica, Diagnostico } = require("../db");
const router = Router();
// const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");
const config = require("../configs/config");

//MIDDLEWARE DE PROTECCION
const rutasProtegidas = Router();
rutasProtegidas.use((req, res, next) => {
  const { token } = req.query;
  if (token) {
    jwt.verify(token, config.masterKeyGesSalud, (err, decoded) => {
      if (err) {
        return res.json({ mensaje: "Token inválida" });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    res.send({
      mensaje: "Token no proveída.",
    });
  }
});

router.post("/autenticar", async (req, res) => {
  const register = await Persona.findOne({
    attributes: ["user", "password", "rol"],
    where: { user: req.body.usuario },
  });

  if (register) {
    if (register.dataValues.password === req.body.password) {
      const payload = {
        check: true,
      };
      const token = jwt.sign(payload, config.masterKeyGesSalud, {
        expiresIn: 1440,
      });
      res.json({
        // res: true,
        // mensaje: 'Autenticación correcta',
        // token: token
        token,
        rol: register.dataValues.rol,
      });
    } else {
      res.json({ mensaje: "Usuario o contraseña incorrectos" });
    }
  } else {
    res.json({ mensaje: "Usuario o contraseña incorrectos" });
  }
});

router.get(
  "/",
  /* rutasProtegidas, */ async function (req, res, next) {
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
            "rol",
          ],
        },
        {
          model: HistoriaClinica,
          attributes: ["creationDate"],
          include: [{ model: Diagnostico }],
        },
      ],
    });

    res.send(dataPacientes);
  }
);

module.exports = router;

router.post(
  "/",
  /* rutasProtegidas, */ async function (req, res) {
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
          rol: "1",
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
      await creandoDatosPaciente.setHistoriaClinica(
        creandoDatosHistoriaClinica
      );
      await creandoDatosHistoriaClinica.addDiagnostico(creandoDatosDiagnostico);

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
  }
);

//BÚSQUEDA DE PACIENTE POR "DNI"
router.get("/consulta/:dni", async (req, res) => {
  const { dni } = req.params;
  try {
    if (dni) {
      let query = await Persona.findOne({
        where: { dni: dni },
        include: {
          model: Paciente,
          include: [
            {
              model: HistoriaClinica,
            },
            {
              model: Diagnostico,
            },
          ],
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
