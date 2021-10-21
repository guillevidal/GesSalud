const server = require("./src/app.js");
const { conn, Tipo_especialidad } = require("./src/db.js");
const axios = require("axios");

conn.sync({ force: true }).then(async () => {
  server.listen(3001, async () => {
    let getEspecialidades = await axios.get(
      `http://localhost:3001/especialidades`
    );
    let Especialidades = getEspecialidades.data.sort(function (a, b) {
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

    console.log("%s listening at 3001"); // eslint-disable-line no-console
  });
});
