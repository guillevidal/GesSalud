import axios from "axios";
/* eslint-disable */
import {
  CREAR_ESPECIALISTA,
  CREAR_PACIENTE,
  OBTENER_ESPECIALIDADES,
  OBTENER_ESPECIALISTAS,
  OBTENER_PACIENTES,
  OBTENER_ESPECIALISTA_POR_NOMBRE,
  ESPECIALISTA_DETALLADO,
  OBTENER_PACIENTE_POR_NOMBRE,
  PACIENTE_DETALLADO,
  OBTENER_ESPECIALISTA_POR_ESPECIALIDAD,
  RESETEAR_BUSQUEDA_ESPECIALISTA,
  PAGINADO,
  ROL,
  RESETEAR_BUSQUEDA_PACIENTE,
  RESETEAR_ESPECIALISTA_CREADO,
  RESETEAR_PACIENTE_CREADO,
  RESETEAR_PACIENTE_DETALLADO,
  RESETEAR_ESPECIALISTA_DETALLADO,
  RESETEAR_PACIENTES,
  RESETEAR_ESPECIALISTAS,
  MODIFICAR_PACIENTE,
  MODIFICAR_ESPECIALISTA,
  RESETEAR_MODIFICADO,
  CREAR_ADMINISTRATIVO,
  RESETAR_ADMINISTRATIVO_CREADO,
  OBTENER_ADMINISTRATIVOS,
  RESETEAR_ADMINISTRATIVOS,
  MODIFICAR_ADMINISTRATIVO,
  OBTENER_ADMINISTRATIVO_DETALLADO,
  RESETEAR_ADMINISTRATIVO_DETALLADO,
  BUSQUEDA_ADMINSTRATIVO,
  RESETEAR_BUSQUEDA_ADMINISTRATIVO,
  RESETEAR_ESPECIALIDADES,
  CREAR_AGENDA,
  RESETEAR_AGENDA_CREADA,
  OBTENER_AGENDAS,
  RESETEAR_AGENDAS,
  MODIFICAR_AGENDA,
  OBTENER_TURNOS,
  RESETEAR_TURNOS,
  CREAR_TURNO,
  RESETEAR_TURNO_CREADO,
  OBTENER_TURNO_DETALLADO,
  RESETEAR_TURNO_DETALLADO,
  MODIFICAR_TURNO,
  ELIMINAR_TURNO,
  CREAR_DIAGNOSTICO,
  RESETEAR_DIAGNOSTICO,
  EDITAR_DIAGNOSTICO,
} from "./valuesForActions.js";

// const token = localStorage["access-token"];

//CREAR ESPECIALISTA
export const crearEspecialista = (especialista) => {
  return async (dispatch) => {
    {
      const result = await axios.post(`/especialista`, especialista);
      const data = result.data;
      return dispatch({ type: CREAR_ESPECIALISTA, payload: data });
    }
  };
};
//CREAR PACIENTE
export const crearPaciente = (paciente) => {
  const token = localStorage["access-token"];
  return async (dispatch) => {
    {
      const result = await axios.post("/paciente", paciente, {
        headers: {
          authorization: token,
        },
      });
      const data = result.data;
      return dispatch({ type: CREAR_PACIENTE, payload: data });
    }
  };
};
//OBTENER TIPOS DE ESPECIALIDADES
export const obtenerEspecialidades = () => {
  return async (dispatch) => {
    const result = await axios.get("/especialidades");
    const data = result.data;
    return dispatch({ type: OBTENER_ESPECIALIDADES, payload: data });
  };
};

//RESETEAR ESPECIALIDADES
export const resetearEspecialidades = () => {
  return { type: RESETEAR_ESPECIALIDADES, payload: [] };
};
//OBTENER ESPECIALISTA
export const obtenerEspecialistas = () => {
  return async (dispatch) => {
    const result = await axios.get("/especialista");
    const data = result.data;
    return dispatch({ type: OBTENER_ESPECIALISTAS, payload: data });
  };
};

//OBTENER PACIENTE
export const obtenerPacientes = () => {
  const token = localStorage["access-token"];
  return async (dispatch) => {
    const result = await axios.get("/paciente", {
      headers: { authorization: token },
    });
    const data = result.data;
    return dispatch({ type: OBTENER_PACIENTES, payload: data });
  };
};

//OBTENER UNO O VARIOS ESPECIALISTA(S) BUSCANDO POR NOMBRE
export const obtenerEspecialistaPorNombre = (nombre) => {
  return { type: OBTENER_ESPECIALISTA_POR_NOMBRE, payload: nombre };
};

//OBTENER ESPECIALISTA(S) BUSCANDO POR ESPECIALIDAD
export const obtenerEspecialistaPorEspecialidad = (especialidad) => {
  return { type: OBTENER_ESPECIALISTA_POR_ESPECIALIDAD, payload: especialidad };
};

//OBTENER INFORMACION DETALLADA DEL ESPECIALISTA POR ID
export const especialistaDetallado = (id) => {
  console.log(id);
  return async (dispatch) => {
    const result = await axios.get(`/especialista/${id}`);
    const data = result.data;
    return dispatch({ type: ESPECIALISTA_DETALLADO, payload: data });
  };
};

//OBTENER UNO O VARIOS PACIENTE(S) BUSCANDO POR NOMBRE
export const obtenerPacientePorNombre = (nombre) => {
  return { type: OBTENER_PACIENTE_POR_NOMBRE, payload: nombre };
};

//OBTENER INFORMACION DETALLADA DE PACIENTE POR DNI
export const pacienteDetallado = (dni) => {
  return async (dispatch) => {
    const result = await axios.get(`/paciente/consulta/${dni}`);
    const data = result.data;
    return dispatch({ type: PACIENTE_DETALLADO, payload: data });
  };
};

//PARA MANEJO DE ROLES
export const rol = (rol) => {
  return { type: ROL, payload: rol };
};

//RESETEAR ESTADO DE BUSQUEDA DE ESPECIALISTA
export const resetearBusquedaEspecialista = () => {
  return { type: RESETEAR_BUSQUEDA_ESPECIALISTA, payload: [] };
};

//RESETEAR ESTADO DE BUSQUEDA DE PACIENTE
export const resetearBusquedaPaciente = () => {
  return { type: RESETEAR_BUSQUEDA_PACIENTE, payload: [] };
};
//PARA MANEJO DEL PAGINADO
export const paginado = (valor) => {
  return { type: PAGINADO, payload: valor };
};

//RESETEA ESTADO PACIENTECREADO
export const resetearPacienteCreado = () => {
  return { type: RESETEAR_PACIENTE_CREADO, payload: [] };
};

//RESETEA ESTADO ESPECIALISTACREADO
export const resetearEspecialistaCreado = () => {
  return { type: RESETEAR_ESPECIALISTA_CREADO, payload: [] };
};

//RESETEA ESTADO PACIENTE DETALLADO
export const resetearPacienteDetallado = () => {
  return { type: RESETEAR_PACIENTE_DETALLADO, payload: [] };
};

//RESETEA ESTADO ESPECIALISTADO DETALLADO
export const resetearEspecialistaDetallado = () => {
  return { type: RESETEAR_ESPECIALISTA_DETALLADO, payload: [] };
};

//RESETEA ESTADO ESPECIALISTAS
export const resetearEspecialistas = () => {
  return { type: RESETEAR_ESPECIALISTAS, payload: [] };
};
//RESETEA ESTADO PACIENTES
export const resetearPacientes = () => {
  return { type: RESETEAR_PACIENTES, payload: [] };
};

//MODIFICAR UN PACIENTE
export const modificarPaciente = (paciente) => {
  console.log("DATA EN ACCION MODIF PACIENTE", paciente);
  return async (dispatch) => {
    {
      const result = await axios.put(`/paciente/${paciente.id}`, paciente);
      const data = result.data;
      return dispatch({ type: MODIFICAR_PACIENTE, payload: data });
    }
  };
};

//MODIFICAR UN ESPECIALISTA
export const modificarEspecialistas = (especialista) => {
  return async (dispatch) => {
    {
      const result = await axios.put(
        `/especialista/${especialista.id}`,
        especialista
      );

      const data = result.data;
      return dispatch({ type: MODIFICAR_ESPECIALISTA, payload: data });
    }
  };
};

//RESET ESTADO DE MODIFICADO
export const resetearModificado = () => {
  return { type: RESETEAR_MODIFICADO, payload: "" };
};

//CREAR ADMINISTRATIVO

export const crearAdministrativo = (administrativo) => {
  return async (dispatch) => {
    {
      const result = await axios.put(`/administrativos`, administrativo);
      const data = result.data;
      return dispatch({ type: CREAR_ADMINISTRATIVO, payload: data });
    }
  };
};

//RESETEAR ADMINISTRATIVO CREADO
export const resetearAdministrativoCreado = () => {
  return { type: RESETAR_ADMINISTRATIVO_CREADO, payload: [] };
};

//OBTENER ADMINISTRATIVOS
export const obtenerAdministrativos = () => {
  return async (dispatch) => {
    const result = await axios.get(`/administrativos`);
    const data = result.data;
    return dispatch({ type: OBTENER_ADMINISTRATIVOS, payload: data });
  };
};

//RESETEAR ADMINISTRATIVOS
export const resetearAdministrativos = () => {
  return { type: RESETEAR_ADMINISTRATIVOS, payload: [] };
};

//MODIFICAR ADMINISTRATIVO
export const modificarAdministrativo = (administrativo) => {
  return async (dispatch) => {
    {
      const result = await axios.put(
        `/administrativos/${administrativo.id}`,
        administrativo
      );
      const data = result.data;
      return dispatch({ type: MODIFICAR_ADMINISTRATIVO, payload: data });
    }
  };
};

//OBTENER ADMINISTRATIVO DETALLADO
export const administrativoDetallado = (id) => {
  return { type: OBTENER_ADMINISTRATIVO_DETALLADO, payload: id };
};

//RESETEAR ADMINISTRATIVO DETALLADO

export const resetearAdministrativoDetallado = () => {
  return { type: RESETEAR_ADMINISTRATIVO_DETALLADO, payload: [] };
};

//BUSQUEDA ADMINISTRATIVO
export const busquedaAdminstrativo = (value) => {
  return { type: BUSQUEDA_ADMINSTRATIVO, payload: value };
};

//RESETEAR BUSQUEDA ADMINISTRATIVO
export const resetearBusquedaAdministrativo = () => {
  return { type: RESETEAR_BUSQUEDA_ADMINISTRATIVO, payload: [] };
};

//CREAR AGENDA
export const crearAgenda = (agenda) => {
  console.log(agenda);
  return async (dispatch) => {
    const result = await axios.post(`/agendas`, agenda);
    const data = result.data;
    return dispatch({ type: CREAR_AGENDA, payload: data });
  };
};

//RESETEAR AGENDA CREANDA
export const resetearAgendaCreada = () => {
  return { type: RESETEAR_AGENDA_CREADA, payload: [] };
};

//OBTENER AGENDAS
export const obtenerAgendas = () => {
  return async (dispatch) => {
    const result = await axios.get("/agendas");
    const data = result.data;
    return dispatch({ type: OBTENER_AGENDAS, payload: data });
  };
};

//RESETEAR AGENDAS
export const resetearAgendas = () => {
  return { type: RESETEAR_AGENDAS, payload: [] };
};

//MODIFICAR AGENDA
export const modificarAgenda = (agenda) => {
  return async (dispatch) => {
    const result = await axios.put(`/agendas/${agenda.id}`, agenda);
    const data = result.data;
    return dispatch({ type: MODIFICAR_AGENDA, payload: data });
  };
};

//OBTENER TURNOS
export const obtenerTurnos = () => {
  return async (dispatch) => {
    const result = await axios.get("/turnos");
    const data = result.data;
    return dispatch({ type: OBTENER_TURNOS, payload: data });
  };
};

//RESETEAR TURNOS
export const resetearTurnos = () => {
  return { type: RESETEAR_TURNOS, payload: [] };
};

//CREAR TURNO
export const crearTurno = (turno) => {
  return async (dispatch) => {
    const result = await axios.post(`/turnos`, turno);
    const data = result.data;
    return dispatch({ type: CREAR_TURNO, payload: data });
  };
};

//RESETEAR TURNO CREADO
export const resetearTurnoCreado = () => {
  return { type: RESETEAR_TURNO_CREADO, payload: [] };
};

//OBTENER TURNO DETALLADO
export const turnoDetallado = (id) => {
  return async (dispatch) => {
    const result = await axios.get(`/turnos/${id}`);
    const data = result.data;
    return dispatch({ type: OBTENER_TURNO_DETALLADO, payload: data });
  };
};

//RESETEAR TURNO DETALLADO
export const resetearTurnoDetallado = () => {
  return { type: RESETEAR_TURNO_DETALLADO, payload: [] };
};

//MODIFICAR TURNO
export const modificarTurno = (turno) => {
  return async (dispatch) => {
    const result = await axios.put(`/turnos/${turno.id}`, turno);
    const data = result.data;
    return dispatch({ type: MODIFICAR_TURNO, payload: data });
  };
};

//ELIMINAR UN TURNO
export const eliminarTurno = (id) => {
  return async (dispatch) => {
    const result = await axios.get(`/turnos/borrarturno/${id}`);
    const data = result.data;
    return dispatch({ type: ELIMINAR_TURNO, payload: data });
  };
};

//CREAR DIAGNOSTICO
export const crearDiagnostico = (diagnostico) => {
  return async (dispatch) => {
    {
      const result = await axios.post(`/diagnosticos`, diagnostico);
      const data = result.data;
      return dispatch({ type: CREAR_DIAGNOSTICO, payload: data });
    }
  };
};

//RESETEAR DIAGNOSTICO
export const resetearDiagnostico = () => {
  return { type: RESETEAR_DIAGNOSTICO, payload: [] };
};

//MODIFICAR DIAGNOSTICO
export const modificarDiagnostico = (diagnostico) => {
  return async (dispatch) => {
    {
      const result = await axios.put(
        `/diagnosticos/${diagnostico.id}`,
        diagnostico
      );
      const data = result.data;
      return dispatch({ type: EDITAR_DIAGNOSTICO, payload: data });
    }
  };
};

//SUBIR IMAGEN
export const uploadAction =  (image) => {

  const fd = new FormData();
  fd.append("image", image);

  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };

  try {
    return async function(){
    const res = await axios.post("http://localhost:3001/images", fd, config);
  }
  } catch (err) {
    console.log(err);
  }
};
