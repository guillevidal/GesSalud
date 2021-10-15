import { CREAR_ESPECIALISTA, CREAR_PACIENTE, OBTENER_ESPECIALIDADES } from "./valuesForActions.js";


//CREAR ESPECIALISTA
export const crearEspecialista = (especialista) => {
    return (dispatch) => {
        {
            fetch("http://localhost:3001/especialista",
                {
                    method: "POST",
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(especialista),
                })
                .then((respuesta) => respuesta.json)
                .then((data) => dispatch({type: CREAR_ESPECIALISTA, payload: data}))
                .catch(e => console.log(e))
          
        }
    }
}
//CREAR PACIENTE
export const crearPaciente = (paciente) => {
    return (dispatch) => {
        {
            fetch("http://localhost:3001/paciente",
                {
                    method: "POST",
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(paciente),
                })
                .then((respuesta) => respuesta.json)
                .then((data) => dispatch({type: CREAR_PACIENTE, payload: data}))
                .catch(e => console.log(e))
          
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