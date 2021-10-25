const server = require("./src/app.js");
const { conn, Tipo_especialidad } = require("./src/db.js");
const axios = require("axios");
const { especialidades } = require("./src/configs/specialties.js");

conn.sync({ force: true }).then(async () => {
  server.listen(process.env.PORT, async () => {
    console.log(process.env.PORT);
    try {
      let Especialidades = especialidades.sort(function (a, b) {
        if (a.name > b.name) {
          return 1;
        }
        if (a.name < b.name) {
          return -1;
        }
        // a must be equal to b
        return 0;
      });
      await Tipo_especialidad.bulkCreate(
        Especialidades &&
          Especialidades.map((e) => ({
            name: e.name,
            modulo_atencion: e.modulo,
          }))
      );
    } catch (error) {
      res.send({ msg: error });
    }

    console.log("%s listening at 3001"); // eslint-disable-line no-console
  });
});
