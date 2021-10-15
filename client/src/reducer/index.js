import {CREAR_ESPECIALISTA, CREAR_PACIENTE, OBTENER_ESPECIALIDADES, OBTENER_ESPECIALISTA, OBTENER_PACIENTE
} from "../actions/valuesForActions.js";

const initialState = {
    //SE IRAN AGREGANDO MAS ESTADOS A MEDIDA DE QUE SE HAGAN MAS COMPONENTES 
    especialistaCreado: [],
    pacienteCreado: [],
    especialidades: [],
    pacientes: [],
    especialistas: []
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
            
        default:
            return state;
    }

}

export default Reducer;