import {objEspecialista, objPaciente} from "./modeloPersonaFake.js";
import { CREAR_ESPECIALISTA, CREAR_PACIENTE, OBTENER_ESPECIALIDADES, OBTENER_ESPECIALISTA, OBTENER_PACIENTE,
    OBTENER_ESPECIALISTA_POR_NOMBRE, ESPECIALISTA_DETALLADO, OBTENER_PACIENTE_POR_NOMBRE, PACIENTE_DETALLADO} from "./valuesForActions.js";

//CREAR ESPECIALISTA
export const crearEspecialista = (especialista) => {
    return async (dispatch) => {
        {
            const result = await fetch("http://localhost:3001/especialista",
                {
                    method: "POST",
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(especialista),
                })
                const data = await result.json()
                return dispatch({type: CREAR_ESPECIALISTA, payload: data})
          
        }
    }
}
//CREAR PACIENTE
export const crearPaciente = (paciente) => {
    return async (dispatch) => {
        {
            const result = await fetch("http://localhost:3001/paciente",
                {
                    method: "POST",
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(paciente),
                })
                const data = await result.json()
                return dispatch({type: CREAR_PACIENTE, payload: data})
          
        }
    }
}
//OBTENER TIPOS DE ESPECIALIDADES
export const obtenerEspecialidades = () => {
    return (dispatch) => {
        fetch("http://localhost:3001/especialidades")
        .then(respuesta => respuesta.json())
        .then(data => dispatch({type: OBTENER_ESPECIALIDADES, payload: data}))
    }
}


//OBTENER ESPECIALISTA
export const obtenerEspecialistas = () => {
  
    return {
        type: OBTENER_ESPECIALISTA, payload: objEspecialista
    }
}

//OBTENER PACIENTE 
export const obtenerPacientes = () => {
   
    
    return {
        type: OBTENER_PACIENTE, payload: objPaciente
    }
}

//OBTENER UNO O VARIOS ESPECIALISTA(S) BUSCANDO POR NOMBRE
export const obtenerEspecialistaPorNombre = (nombre) => {  
    return {type: OBTENER_ESPECIALISTA_POR_NOMBRE, payload: nombre}         
};
//OBTENES INFORMACION DETALLADA DEL ESPECIALISTA POR ID
export const especialistaDetallado = (id) => {
    return {type: ESPECIALISTA_DETALLADO, payload: id}
}

//OBTENER UNO O VARIOS PACIENTE(S) BUSCANDO POR NOMBRE
export const obtenerPacientePorNombre = (nombre) => {  
    return {type: OBTENER_PACIENTE_POR_NOMBRE, payload: nombre}         
};

//OBTENES INFORMACION DETALLADA DE PACIENTE POR ID
export const pacienteDetallado = (id) => {
    return {type: PACIENTE_DETALLADO, payload: id}
}

export const rol = (rol) => {
    return {type: "ROL", payload: rol}
}

