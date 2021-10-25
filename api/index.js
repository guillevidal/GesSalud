const server = require("./src/app.js");
const {
  conn,
  Tipo_especialidad,
  Persona,
  Paciente,
  HistoriaClinica,
  Especialista_medico,
  Personal_administrativo,
} = require("./src/db.js");
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

      //####### PRECARGA DE USUARIOS DE LA APP #######
      //##############################################

      //PACIENTE
      const paciente = Persona.findOrCreate({
        where: {
          id: 1,
        },
        defaults: {
          name: "Jean",
          lastName: "Garzon",
          dni: 44444,
          email: "paciente@gmail.com",
          phone: "44444",
          adress: "Colombia",
          birth: "04/04/1994",
          user: "paciente@gmail.com",
          password: "paciente123",
          gender: "masculino",
          rol: "4",
        },
      });

      const creandoDatosPaciente = Paciente.findOrCreate({
        where: {
          id: 1,
        },
        defaults: {
          medication: "",
          emergencyContact: "44444",
          disease: "",
          personaId: 1,
        },
      });

      const creandoDatosHistoriaClinica = HistoriaClinica.findOrCreate({
        where: {
          id: 1,
        },
        defaults: {
          creationDate: "01/01/2021",
          pacienteId: 1,
        },
      });

      //ESPECIALISTA

      const especialista = Persona.findOrCreate({
        where: {
          id: 2,
        },
        defaults: {
          name: "Johao",
          lastName: "Lopez",
          dni: 33333,
          email: "especialista@gmail.com",
          phone: "33333",
          adress: "Ecuador",
          birth: "03/03/1993",
          user: "especialista@gmail.com",
          password: "especialista123",
          gender: "masculino",
          rol: "3",
        },
      });

      const creandoMatriculaEspecialista = Especialista_medico.findOrCreate({
        where: {
          id: 1,
        },
        defaults: {
          enrollment: "45687",
          specialty: "clinico",
          personaId: 2,
        },
      });

      //RRHH

      const rrhh = Persona.findOrCreate({
        where: {
          id: 3,
        },
        defaults: {
          name: "Rodrigo",
          lastName: "Navarro",
          dni: 22222,
          email: "rrhh@gmail.com",
          phone: "22222",
          adress: "Argentina",
          birth: "02/02/1992",
          user: "rrhh@gmail.com",
          password: "rrhh123",
          gender: "masculino",
          rol: "2",
        },
      });

      const creandoEstadoAdministrativo1 = Personal_administrativo.findOrCreate(
        {
          where: {
            id: 1,
          },
          defaults: {
            status: true,
            personaId: 3,
          },
        }
      );

      //PYS

      const pys = Persona.findOrCreate({
        where: {
          id: 4,
        },
        defaults: {
          name: "Natalia",
          lastName: "Ramirez",
          dni: 11111,
          email: "pys@gmail.com",
          phone: "11111",
          adress: "Colombia",
          birth: "01/01/1991",
          user: "pys@gmail.com",
          password: "pys123",
          gender: "femenino",
          rol: "1",
        },
      });

      const creandoEstadoAdministrativo2 = Personal_administrativo.findOrCreate(
        {
          where: {
            id: 2,
          },
          defaults: {
            status: true,
            personaId: 4,
          },
        }
      );

      //PROMESAS

      Promise.all([
        paciente,
        especialista,
        rrhh,
        pys,
        creandoDatosPaciente,
        creandoDatosHistoriaClinica,
        creandoMatriculaEspecialista,
        creandoEstadoAdministrativo1,
        creandoEstadoAdministrativo2,
      ]).then((res) => {
        console.log("Usuarios precargados");
      });
    } catch (error) {
      res.send({ msg: error });
    }

    console.log("%s listening at 3001"); // eslint-disable-line no-console
  });
});
