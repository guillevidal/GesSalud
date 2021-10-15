
import {CREAR_ESPECIALISTA, CREAR_PACIENTE, OBTENER_ESPECIALIDADES, OBTENER_ESPECIALISTA, OBTENER_PACIENTE, 
    OBTENER_ESPECIALISTA_POR_NOMBRE, ESPECIALISTA_DETALLADO, OBTENER_PACIENTE_POR_NOMBRE, PACIENTE_DETALLADO} from "../actions/valuesForActions.js";

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
    busqedaEspecialista: [],
    rol: ""
}

const Reducer = (state=initialState, action) => {

    switch (action.type) {
        case CREAR_ESPECIALISTA:
            return {...state, especialistaCreado: action.payload};
        
        case CREAR_PACIENTE: 
            return {...state, pacienteCreado: action.payload}

        case OBTENER_ESPECIALIDADES:
            return {...state, especialidades: action.payload}
        
        case OBTENER_PACIENTE: 
            return {...state, pacientes: action.payload}    
        
        case OBTENER_ESPECIALISTA:
            return {...state, especialistas: action.payload}

        case OBTENER_ESPECIALISTA_POR_NOMBRE:
            let busquedaE=[];;
            for (let index = 0; index < state.especialistas.length; index++) {
                if(state.especialistas[index].name.toLowerCase().includes(action.payload.toLowerCase())){
                    busquedaE=[...busquedaE, state.especialistas[index]];
                }
            }
            if(!busquedaE[0]){
                busquedaE=["No se encontro empleado"];
            }
            return {...state, busquedaEspecialista: busquedaE}

        case OBTENER_PACIENTE_POR_NOMBRE:
            let busquedaP=[];
                for (let index = 0; index < state.pacientes.length; index++) {
                    if(state.pacientes[index].name.toLowerCase().includes(action.payload.toLowerCase())){
                        busquedaP=[...busquedaP, state.pacientes[index]];
                    }
                }
                if(!busquedaP[0]){
                    busquedaP=["No se encontro paciente"];
                }
            return {...state, busquedaPaciente: busquedaP}


        case ESPECIALISTA_DETALLADO: 
            return {...state, especialistaDetallado: state.especialistas.filter( esp => action.payload === esp.id)}
        
        case PACIENTE_DETALLADO: 
            return {...state, pacienteDetallado: state.pacientes.filter( pac => action.payload === pac.id)}  
        
        case "ROL": {
            return {...state, rol: action.payload}
        }
        default:
            return state;
    }

}

export default Reducer;