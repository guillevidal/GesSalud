const server = require("./src/app.js");

const { conn, Tipo_especialidad, Persona } = require("./src/db.js");

const axios = require("axios");
const { especialidades } = require("./src/configs/specialties.js");

conn.sync({ force: false }).then(async () => {
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

      // //####### PRECARGA DE USUARIOS DE LA APP #######
      // //##############################################

      //PACIENTE
      const pacienteInit = await Persona.findOne({
        where: {
          id: 1,
        },
      });
      if (!pacienteInit) {
        await axios.post("http://localhost:3001/paciente", {
          name: "Jean",
          lastName: "Garzon",
          dni: 44444,
          email: "paciente@gmail.com",
          phone: "44444",
          adress: "Colombia",
          birth: "1994-04-04",
          user: "paciente@gmail.com",
          password: "paciente123",
          gender: "masculino",
          medication: "",
          emergencyContact: "44444",
          disease: "",
          creationDate: "2021-01-01",
        });
      }

      //ESPECIALISTA
      const especialistaInit = await Persona.findOne({
        where: {
          id: 2,
        },
      });
      if (!especialistaInit) {
        await axios.post("http://localhost:3001/especialista", {
          name: "Johao",
          lastName: "Lopez",
          dni: 33333,
          email: "especialista@gmail.com",
          phone: "33333",
          adress: "Ecuador",
          birth: "1993-03-03",
          user: "especialista@gmail.com",
          password: "especialista123",
          gender: "masculino",
          enrollment: "45687",
          specialty: "Cardiologia",
        });
      }

      //RRHH
      const rrhhInit = await Persona.findOne({
        where: {
          id: 3,
        },
      });
      if (!rrhhInit) {
        await axios.post("http://localhost:3001/administrativos", {
          name: "Rodrigo",
          lastName: "Navarro",
          dni: 22222,
          email: "rrhh@gmail.com",
          phone: "22222",
          adress: "Argentina",
          birth: "1992-02-02",
          user: "rrhh@gmail.com",
          password: "rrhh123",
          gender: "masculino",
          rol: "2",
          status: true,
        });
      }

      //PYS
      const pysInit = await Persona.findOne({
        where: {
          id: 4,
        },
      });
      if (!pysInit) {
        await axios.post("http://localhost:3001/administrativos", {
          name: "Natalia",
          lastName: "Ramirez",
          dni: 11111,
          email: "pys@gmail.com",
          phone: "11111",
          adress: "Colombia",
          birth: "1991-01-01",
          user: "pys@gmail.com",
          password: "pys123",
          gender: "femenino",
          rol: "1",
          status: true,
        });
      }

      //ADMIN
      const adminInit = await Persona.findOne({
        where: {
          id: 5,
        },
      });
      if (!adminInit) {
        await axios.post("http://localhost:3001/administrativos", {
          name: "Fernando",
          lastName: "De Maio",
          dni: 55555,
          email: "admin@gmail.com",
          phone: "55555",
          adress: "Argentina",
          birth: "1995-05-05",
          user: "admin@gmail.com",
          password: "admin123",
          gender: "masculino",
          rol: "5",
          status: true,
        });
      }
    } catch (error) {
      console.log("ERROR", error);
    }

    console.log("%s listening at 3001"); // eslint-disable-line no-console
  });
});
