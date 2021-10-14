import {CREAR_ESPECIALISTA, CREAR_PACIENTE} from "./valuesForActions.js";

/*POR AHORA SRA DE ESTA FORMA LAS ACTION PARA QUE A MEDIDA DE QUE SE HAGA COMPONENTES...
SE PUEDA PROBAR, UNA VEZ LOS CHICOS DEL BACK SUMINISTREN INFORMACION, SE EDITARAN LAS ACTIONS
PARA QUE LAS PETICIONES SE HAGAN AL SERVIDOR.*/

export const crearEspecialista = (especialista) => {
    return {
        type: CREAR_ESPECIALISTA, payload: especialista 
    }
}

export const crearPaciente = (paciente) => {
    return {
        type: CREAR_PACIENTE, payload : paciente
    }
}