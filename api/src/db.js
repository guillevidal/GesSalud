require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");
const { default: axios } = require("axios");
const items_pagos = require("./models/items_pagos");
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;

let sequelize =
  process.env.NODE_ENV === "production"
    ? new Sequelize({
        database: DB_NAME,
        dialect: "postgres",
        host: DB_HOST,
        port: 5432,
        username: DB_USER,
        password: DB_PASSWORD,
        pool: {
          max: 3,
          min: 1,
          idle: 10000,
        },
        dialectOptions: {
          ssl: {
            require: true,
            // Ref.: https://github.com/brianc/node-postgres/issues/2009
            rejectUnauthorized: false,
          },
          keepAlive: true,
        },
        ssl: true,
      })
    : new Sequelize(
        `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/gessalud`,
        { logging: false, native: false }
      );

// const sequelize = new Sequelize(
//   `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/gessalud`,
//   {
//     logging: false, // set to console.log to see the raw SQL queries
//     native: false, // lets Sequelize know we can use pg-native for ~30% more speed
//   }
// );
const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach((model) => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const {
  Agenda,
  AgendaTotal,
  Consultorio,
  Diagnostico,
  Empleados,
  Especialista_medico,
  Genero,
  HistoriaClinica,
  Paciente,
  Persona,
  Personal_administrativo,
  Servicio,
  Tipo_especialidad,
  Turno,
  Historial_pagos,
  Items_pagos,
} = sequelize.models;

// Aca vendrian las relaciones

Especialista_medico.belongsTo(Persona);
Persona.hasOne(Especialista_medico);

Especialista_medico.belongsToMany(Tipo_especialidad, {
  through: "especialistaEspecialidad",
});
Tipo_especialidad.belongsToMany(Especialista_medico, {
  through: "especialistaEspecialidad",
});

Especialista_medico.hasOne(Agenda);
Agenda.belongsTo(Especialista_medico);

Agenda.belongsTo(Tipo_especialidad);
Tipo_especialidad.hasOne(Agenda);

Agenda.hasMany(Turno);
Turno.belongsTo(Agenda);

Paciente.hasMany(Turno);
Turno.belongsTo(Paciente);

Paciente.hasMany(Historial_pagos);
Historial_pagos.belongsTo(Paciente);

Historial_pagos.belongsTo(Turno);
Turno.hasMany(Historial_pagos);

Items_pagos.belongsTo(Historial_pagos);
Historial_pagos.hasMany(Items_pagos);

Persona.hasOne(Paciente);
Paciente.belongsTo(Persona);

Paciente.hasOne(HistoriaClinica);
HistoriaClinica.belongsTo(Paciente);

HistoriaClinica.hasMany(Diagnostico);
Diagnostico.belongsTo(HistoriaClinica);

Persona.hasOne(Personal_administrativo);
Personal_administrativo.belongsTo(Persona);

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize, // para importart la conexión { conn } = require('./db.js');
};
