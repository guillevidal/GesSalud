const { Persona, Paciente, HistoriaClinica, Diagnostico } = require("../db");

const getPacientes = async () => {
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
        attributes: ["id", "creationDate"],
        include: Diagnostico,
      },
    ],
  });
  return dataPacientes;
};

const ifExist = async (data) => {
  return await Promise.all([
    Persona.findOne({ where: { dni: data.dni } }),
    Persona.findOne({ where: { email: data.email } }),
    Persona.findOne({ where: { user: data.user } }),
  ]);
};

const createPatient = async (data) => {
  return await Promise.all([
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
      },
      {
        fields: ["creationDate"],
      }
    ),
  ]);
};

module.exports = {
  getPacientes,
  ifExist,
  createPatient,
};
