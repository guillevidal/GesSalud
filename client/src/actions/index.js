import { CREAR_ESPECIALISTA, CREAR_PACIENTE, OBTENER_ESPECIALIDADES, OBTENER_ESPECIALISTA, OBTENER_PACIENTE} from "./valuesForActions.js";


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


//OBTENER ESPECIALISTA
export const obtenerEspecialistas = () => {
    let especialista = [{
        id: 1,
        name: "Marcos",
        lastName: "Perez",
        dni: 1234567,
        email: "marcoperez@centrosalud.com",
        phone: "1234567",
        adress: "Ciudad de Mexico",
        birth: "1/01/1993",
        user: "marcosp",
        password: "marcosp",
        typos_especiaidad: "..."
    },
    {
        id: 2,
        name: "Martin",
        lastName: "Jaramillo",
        dni: 1234567,
        email: "martinj@centrosalud.com",
        phone: "1234567",
        adress: "Quito",
        birth: "1/01/1993",
        user: "martinj",
        password: "martinj",
        typos_especiaidad: "..."
    },
    {
        id: 3,
        name: "Marcos",
        lastName: "Garzon",
        dni: 1234567,
        email: "marcosg@centrosalud.com",
        phone: "1234567",
        adress: "La paz",
        birth: "1/01/1993",
        user: "martinj",
        password: "martinj",
        typos_especiaidad: "..."
    }
    ]    
    return {
        type: OBTENER_ESPECIALISTA, payload: especialista
    }
}

//OBTENER PACIENTE 
export const obtenerPacientes = () => {
   
    let paciente = [{
        id: 1,
        name: "Juan",
        lastName: "Rodriguez",
        dni: 123456789,
        email: "juanro@gmail.com",
        phone: "12345677",
        adress: "Bogota",
        birth: "1/01/1993",
        user: "juanr",
        password: "juanr",
        hc: "...",
        medicacion: "Ninguna",
        contactos_emergencia: 1234567,
        enfermedades: "NInguna"
    },
    {
        id: 2,
        name: "Mila",
        lastName: "Gomez",
        dni: 123456789,
        email: "mila@gmail.com",
        phone: "12345677",
        adress: "Lima",
        birth: "23/06/1996",
        user: "milag",
        password: "milag",
        hc: "...",
        medicacion: "Ninguna",
        contactos_emergencia: 1234567,
        enfermedades: "NInguna"
    },
    {
        id: 3,
        name: "Jeison",
        lastName: "Mora",
        dni: 123456789,
        email: "moraJ@gmail.com",
        phone: "12345677",
        adress: "Buenos Aires",
        birth: "3/11/1979",
        user: "jeisonm",
        password: "jeisonm",
        hc: "...",
        medicacion: "Ninguna",
        contactos_emergencia: 1234567,
        enfermedades: "NInguna"
    }] 
    return {
        type: OBTENER_PACIENTE, payload: paciente
    }
}