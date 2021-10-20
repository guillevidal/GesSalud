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
} from "./valuesForActions.js";

//CREAR ESPECIALISTA
export const crearEspecialista = (especialista) => {
  
  return async (dispatch) => {
    {
      const result = await fetch(`http://localhost:3001/especialista`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(especialista),
      });
      const data = await result.json();
      return dispatch({ type: CREAR_ESPECIALISTA, payload: data });
    }
  };
};
//CREAR PACIENTE
export const crearPaciente = (paciente) => {
  const token = localStorage['access-token'];
  return async (dispatch) => {
    {
      const result = await fetch(`http://localhost:3001/paciente?token=${token}`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(paciente),
      });
      const data = await result.json();
      return dispatch({ type: CREAR_PACIENTE, payload: data });
    }
  };
};
//OBTENER TIPOS DE ESPECIALIDADES
export const obtenerEspecialidades = () => {
  return async (dispatch) => {
    const result = await fetch("http://localhost:3001/especialidades");
    const data = await result.json();
    return dispatch({ type: OBTENER_ESPECIALIDADES, payload: data });
  };
};

//OBTENER ESPECIALISTA
export const obtenerEspecialistas = () => {
  return async (dispatch) => {
    const result = await fetch("http://localhost:3001/especialista");
    const data = await result.json();
    return dispatch({ type: OBTENER_ESPECIALISTAS, payload: data });
  };
};

//OBTENER PACIENTE
export const obtenerPacientes = () => {
  const token = localStorage['access-token'];
  return async (dispatch) => {
    const result = await fetch(`http://localhost:3001/paciente?token=${token}`);
    const data = await result.json();
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

//OBTENES INFORMACION DETALLADA DEL ESPECIALISTA POR ID
export const especialistaDetallado = (id) => {
  return { type: ESPECIALISTA_DETALLADO, payload: id };
};

//OBTENER UNO O VARIOS PACIENTE(S) BUSCANDO POR NOMBRE
export const obtenerPacientePorNombre = (nombre) => {
  return { type: OBTENER_PACIENTE_POR_NOMBRE, payload: nombre };
};

//OBTENES INFORMACION DETALLADA DE PACIENTE POR ID
export const pacienteDetallado = (id) => {
  return { type: PACIENTE_DETALLADO, payload: id };
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
      const result = await fetch(
        `http://localhost:3001/paciente/${paciente.id}`,
        {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(paciente),
        }
      );
      const data = await result.json();
      return dispatch({ type: MODIFICAR_PACIENTE, payload: data });
    }
  };
};

//MODIFICAR UN ESPECIALISTA
export const modificarEspecialistas = (especialista) => {
  return async (dispatch) => {
    {
      const result = await fetch(
        `http://localhost:3001/especialista/${especialista.id}`,
        {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(especialista),
        }
      );

      const data = await result.json();
      return dispatch({ type: MODIFICAR_ESPECIALISTA, payload: data });
    }
  };
};

//RESET ESTADO DE MODIFICADO
export const resetearModificado = () => {
  return { type: RESETEAR_MODIFICADO, payload: [] };
};
