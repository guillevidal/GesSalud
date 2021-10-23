/* eslint-disable */
import {
    CREAR_ESPECIALISTA, CREAR_PACIENTE, OBTENER_ESPECIALIDADES, OBTENER_ESPECIALISTAS, OBTENER_PACIENTES,
    OBTENER_ESPECIALISTA_POR_NOMBRE, ESPECIALISTA_DETALLADO, OBTENER_PACIENTE_POR_NOMBRE, PACIENTE_DETALLADO,
    OBTENER_ESPECIALISTA_POR_ESPECIALIDAD, RESETEAR_BUSQUEDA_ESPECIALISTA, PAGINADO, ROL, RESETEAR_BUSQUEDA_PACIENTE,
    RESETEAR_ESPECIALISTA_CREADO, RESETEAR_PACIENTE_CREADO, RESETEAR_PACIENTE_DETALLADO, RESETEAR_ESPECIALISTA_DETALLADO,
    RESETEAR_ESPECIALISTAS, RESETEAR_PACIENTES, MODIFICAR_PACIENTE, MODIFICAR_ESPECIALISTA, RESETEAR_MODIFICADO,
    RESETAR_ADMINISTRATIVO_CREADO, RESETEAR_ADMINISTRATIVOS, MODIFICAR_ADMINISTRATIVO, OBTENER_ADMINISTRATIVO_DETALLADO,
    RESETEAR_ADMINISTRATIVO_DETALLADO, OBTENER_ADMINISTRATIVOS, CREAR_ADMINISTRATIVO,BUSQUEDA_ADMINSTRATIVO,
    RESETEAR_BUSQUEDA_ADMINISTRATIVO
} from "../actions/valuesForActions.js";

const initialState = {
    //SE IRAN AGREGANDO MAS ESTADOS A MEDIDA DE QUE SE HAGAN MAS COMPONENTES 
    especialistaCreado: [],
    pacienteCreado: [],
    especialidades: [],
    pacientes: [],
    especialistas: [],
    especialistaDetallado: [],
    pacienteDetallado: [],
    busquedaPaciente: [],
    busquedaEspecialista: [],
    rol: "",
    paginado: "",
    modificado: "",
    administrativoCreado: [],
    administrativos: [],
    administrativoDetallado: [],
    busquedaAdministrativo: []
}

const Reducer = (state = initialState, action) => {

    switch (action.type) {
        case CREAR_ESPECIALISTA:
        case RESETEAR_ESPECIALISTA_CREADO:
            return { ...state, especialistaCreado: action.payload };

        case CREAR_PACIENTE:
        case RESETEAR_PACIENTE_CREADO:
            return { ...state, pacienteCreado: action.payload }

        case OBTENER_ESPECIALIDADES:
            return { ...state, especialidades: action.payload }

        case OBTENER_PACIENTES:
        case RESETEAR_PACIENTES:
            return { ...state, pacientes: action.payload }

        case OBTENER_ESPECIALISTAS:
        case RESETEAR_ESPECIALISTAS:
            return { ...state, especialistas: action.payload }

        case OBTENER_ESPECIALISTA_POR_NOMBRE:
            let busquedaE = [];;
            for (let index = 0; index < state.especialistas.length; index++) {
                if (state.especialistas[index].persona.name.toLowerCase().includes(action.payload.toLowerCase()) ||
                    state.especialistas[index].persona.lastName.toLowerCase().includes(action.payload.toLowerCase())) {
                    busquedaE = [...busquedaE, state.especialistas[index]];
                }
            }
            if (!busquedaE[0]) {
                busquedaE = ["No se encontro especialista"];
            }
            return { ...state, busquedaEspecialista: busquedaE }

        case OBTENER_ESPECIALISTA_POR_ESPECIALIDAD:
            let busquedaEs = [];
            let esp
            let cont = 0;
            for (let index = 0; index < state.especialistas.length; index++) {
                esp = state.especialistas[index].specialty.split(" ")
                for (let index2 = 0; index2 < esp.length; index2++) {
                    if (esp[index2].includes(action.payload.toLowerCase())) {
                        if(!busuqedaEs[0]){
                           busquedaEs = [...busquedaEs, state.especialistas[index]];
                        }else{
                            for (let index3 = 0; index3 < busuqedaEs.length; index3++) {
                                if(busquedaEs[index3].id!==state.especialistas[index].id){
                                    busquedaEs = [...busquedaEs, state.especialistas[index]];
                                }
                                
                            }
                        }
                    }

                }
            }
            if (!busquedaEs[0]) {
                busquedaEs = ["No se encontro especalista"];
            }
            return { ...state, busquedaEspecialista: busquedaEs }

        case RESETEAR_BUSQUEDA_ESPECIALISTA:
            return { ...state, busquedaEspecialista: action.payload }

        case OBTENER_PACIENTE_POR_NOMBRE:
            let busquedaP = [];
            for (let index = 0; index < state.pacientes.length; index++) {
                if (state.pacientes[index].persona.name.toLowerCase().includes(action.payload.toLowerCase()) || 
                state.pacientes[index].persona.lastName.toLowerCase().includes(action.payload.toLowerCase())) {
                    busquedaP = [...busquedaP, state.pacientes[index]];
                }
            }
            if (!busquedaP[0]) {
                busquedaP = ["No se encontro paciente"];
            }
            return { ...state, busquedaPaciente: busquedaP }

        case RESETEAR_BUSQUEDA_PACIENTE:
            return { ...state, busquedaPaciente: action.payload }

        case ESPECIALISTA_DETALLADO:
            return { ...state, especialistaDetallado: [action.payload] }

        case PACIENTE_DETALLADO:
            return { ...state, pacienteDetallado: [action.payload] }

        case ROL: {
            return { ...state, rol: action.payload }
        }

        case PAGINADO: {
            return { ...state, paginado: action.payload }
        }
    
        case RESETEAR_PACIENTE_DETALLADO:
                return { ...state, pacienteDetallado: action.payload }
    
        case RESETEAR_ESPECIALISTA_DETALLADO:
            return { ...state, especialistaDetallado: action.payload }


        case MODIFICAR_PACIENTE:
        case MODIFICAR_ESPECIALISTA:
        case MODIFICAR_ADMINISTRATIVO:
        case RESETEAR_MODIFICADO:
            return { ...state, modificado: action.payload}


        case CREAR_ADMINISTRATIVO:
        case RESETAR_ADMINISTRATIVO_CREADO:
            return {...state, administrativoCreado: action.payload}

        case OBTENER_ADMINISTRATIVOS:
        case RESETEAR_ADMINISTRATIVOS:
            return {...state, administrativos: action.payload}

        case OBTENER_ADMINISTRATIVO_DETALLADO: 
            return {...state, administrativoDetallado: state.administrativos.filter(adm => adm.id === action.payload)}
         
        case RESETEAR_ADMINISTRATIVO_DETALLADO:
            return { ...state, administrativoDetallado: action.payload}

        case BUSQUEDA_ADMINSTRATIVO:
            let busquedaAdmin = [];
            for (let index = 0; index < state.administrativos.length; index++) {
                if (state.administrativos[index].persona.name.toLowerCase().includes(action.payload.toLowerCase()) || 
                state.administrativos[index].persona.lastName.toLowerCase().includes(action.payload.toLowerCase())) {
                    busquedaAdmin = [...busquedaAdmin, state.administrativos[index]];
                }
            }
            if (!busquedaAdmin[0]) {
                busquedaAdmin = ["No se encontro Administrativo"];
            }
            return { ...state, busquedaAdministrativo: busquedaAdmin }
            
        case RESETEAR_BUSQUEDA_ADMINISTRATIVO:
            return { ...state, busquedaAdministrativo: action.payload}    
        
        default:
            return state;

    }

}

export default Reducer;