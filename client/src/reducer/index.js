import {CREAR_ESPECIALISTA, CREAR_PACIENTE, OBTENER_ESPECIALIDADES} from "../actions/valuesForActions.js";

const initialState = {
    //SE IRAN AGREGANDO MAS ESTADOS A MEDIDA DE QUE SE HAGAN MAS COMPONENTES 
    especialista: [],
    paciente: [],
    especialidades: []
}

const Reducer = (state=initialState, action) => {

    switch (action.type) {
        case CREAR_ESPECIALISTA:
            return {...state, especialista: action.payload};
        
        case CREAR_PACIENTE: 
            return {...state, paciente: action.payload}

        case OBTENER_ESPECIALIDADES:
            return {...state, especialidades: action.payload}
            
        default:
            return state;
    }

}

export default Reducer;