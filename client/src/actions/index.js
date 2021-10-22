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
  RESETEAR_BUSQUEDA_ADMINISTRATIVO
} from "./valuesForActions.js";

const token = localStorage['access-token'];

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
  return async (dispatch) => {
    {
      const result = await fetch('http://localhost:3001/paciente', {
        method: "POST",
        headers: {
          // Accept: "application/json",
          "Content-Type": "application/json",
          'accept': token,
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
  return async (dispatch) => {
    const result = await fetch('http://localhost:3001/paciente',{
      method: 'GET',
      headers: {'accept': token}
    });
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
  console.log(id)
  return async (dispatch) => {
    const result = await fetch(`http://localhost:3001/especialista/${id}`);
    const data = await result.json();
    return dispatch({ type: ESPECIALISTA_DETALLADO, payload: data });
   
  };
}


//OBTENER UNO O VARIOS PACIENTE(S) BUSCANDO POR NOMBRE
export const obtenerPacientePorNombre = (nombre) => {
  return { type: OBTENER_PACIENTE_POR_NOMBRE, payload: nombre };
};

//OBTENES INFORMACION DETALLADA DE PACIENTE POR ID
export const pacienteDetallado = (dni) => {
  return async (dispatch) => {
    const result = await fetch(`http://localhost:3001/paciente/consulta/${dni}`);
    const data = await result.json();
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
  return { type: RESETEAR_MODIFICADO, payload: "" };
};


//CREAR ADMINISTRATIVO 

export const crearAdministrativo = (administrativo) => {
  return async (dispatch) => {
    {
      const result = await fetch(
        `http://localhost:3001/administrativos`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(administrativo),
        }
      );

      const data = await result.json();
      return dispatch({ type: CREAR_ADMINISTRATIVO, payload: data });
    }
  };
}

//RESETEAR ADMINISTRATIVO CREADO 
export const resetearAdministrativoCreado = () => {
  return { type: RESETAR_ADMINISTRATIVO_CREADO, payload: []}
}

//OBTENER ADMINISTRATIVOS
export const obtenerAdministrativos = () => {
  return async (dispatch) => {
    const result = await fetch(`http://localhost:3001/administrativos`);
    const data = await result.json();
    return dispatch({ type: OBTENER_ADMINISTRATIVOS, payload: data });
  };
}

//RESETEAR ADMINISTRATIVOS
export const resetearAdministrativos = () => {
  return { type: RESETEAR_ADMINISTRATIVOS, payload: [] };
}

//MODIFICAR ADMINISTRATIVO 
export const modificarAdministrativo = (administrativo) => {
  return async (dispatch) => {
    {
      const result = await fetch(
        `http://localhost:3001/administrativos/${administrativo.id}`,
        {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(administrativo),
        }
      );

      const data = await result.json();
      return dispatch({ type: MODIFICAR_ADMINISTRATIVO, payload: data });
    }
  };
}

//OBTENER ADMINISTRATIVO DETALLADO 
export const administrativoDetallado = (id) => {
  return { type: OBTENER_ADMINISTRATIVO_DETALLADO, payload: id}
}

//RESETEAR ADMINISTRATIVO DETALLADO

export const resetearAdministrativoDetallado = () => {
  return { type: RESETEAR_ADMINISTRATIVO_DETALLADO, payload: [] };
}

//BUSQUEDA ADMINISTRATIVO 
export const busquedaAdminstrativo = (value) => {
  return { type: BUSQUEDA_ADMINSTRATIVO, payload: value}
}

//RESETEAR BUSQUEDA ADMINISTRATIVO 
export const resetearBusquedaAdministrativo = () => {
  return { type: RESETEAR_BUSQUEDA_ADMINISTRATIVO, payload: []}
}