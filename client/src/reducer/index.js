/* eslint-disable */
import {
    CREAR_ESPECIALISTA, CREAR_PACIENTE,
    OBTENER_ESPECIALIDADES, OBTENER_ESPECIALISTAS,
    OBTENER_PACIENTES, OBTENER_ESPECIALISTA_POR_NOMBRE,
    ESPECIALISTA_DETALLADO, PACIENTE_DETALLADO, 
    OBTENER_ESPECIALISTA_POR_ESPECIALIDAD,
    RESETEAR_BUSQUEDA_ESPECIALISTA, PAGINADO,
    ROL, RESETEAR_ESPECIALISTA_CREADO, RESETEAR_PACIENTE_CREADO,
    RESETEAR_PACIENTE_DETALLADO, RESETEAR_ESPECIALISTA_DETALLADO,
    RESETEAR_ESPECIALISTAS, RESETEAR_PACIENTES, MODIFICAR_PACIENTE,
    MODIFICAR_ESPECIALISTA, RESETEAR_MODIFICADO,
    RESETAR_ADMINISTRATIVO_CREADO, RESETEAR_ADMINISTRATIVOS,
    MODIFICAR_ADMINISTRATIVO, OBTENER_ADMINISTRATIVO_DETALLADO,
    RESETEAR_ADMINISTRATIVO_DETALLADO, OBTENER_ADMINISTRATIVOS,
    CREAR_ADMINISTRATIVO, RESETEAR_ESPECIALIDADES,
    CREAR_AGENDA, RESETEAR_AGENDA_CREADA,
    OBTENER_AGENDAS, RESETEAR_AGENDAS,
    MODIFICAR_AGENDA, OBTENER_TURNOS,
    RESETEAR_TURNOS, CREAR_TURNO,
    RESETEAR_TURNO_CREADO, OBTENER_TURNO_DETALLADO,
    RESETEAR_TURNO_DETALLADO, MODIFICAR_TURNO,
    ELIMINAR_TURNO, CREAR_DIAGNOSTICO,
    RESETEAR_DIAGNOSTICO, EDITAR_DIAGNOSTICO,
    CREAR_MULTIPLE_AGENDA, CREAR_REGISTRO_PACIENTE,
    OBTENER_PACIENTES_REGISTRO
} from "../actions/valuesForActions.js";

const initialState = {
    //SE IRAN AGREGANDO MAS ESTADOS A MEDIDA DE QUE SE HAGAN MAS COMPONENTES 
    especialidades: [],
    pacientes: [],
    especialistas: [],
    administrativos: [],
    agendas: [],
    turnos: [],
    pacienteDetallado: [],
    especialistaDetallado: [],
    administrativoDetallado: [],
    turnoDetallado: [],
    busquedaEspecialista: [],
    creado: [],
    modificado: "",
    rol: "",
    paginado: ""
}

const Reducer = (state = initialState, action) => {

    switch (action.type) {
        case CREAR_ESPECIALISTA:
        case RESETEAR_ESPECIALISTA_CREADO:
        case CREAR_PACIENTE:
        case RESETEAR_PACIENTE_CREADO:
        case CREAR_ADMINISTRATIVO:
        case RESETAR_ADMINISTRATIVO_CREADO:
        case CREAR_AGENDA:
        case RESETEAR_AGENDA_CREADA:
        case CREAR_TURNO:
        case RESETEAR_TURNO_CREADO:
        case CREAR_DIAGNOSTICO:
        case RESETEAR_DIAGNOSTICO:
        case CREAR_MULTIPLE_AGENDA:
        case CREAR_REGISTRO_PACIENTE:
            return { ...state, creado: action.payload };


        case OBTENER_ESPECIALIDADES:
        case RESETEAR_ESPECIALIDADES:
            let arr = []
            for (let index = 0; index < action.payload.length; index++) {
                let nameFIltro = action.payload[index].name.normalize('NFD')
                    .replace(/([^n\u0300-\u036f]|n(?!\u0303(?![\u0300-\u036f])))[\u0300-\u036f]+/gi, "$1")
                    .normalize();
                arr = [...arr, { name: nameFIltro, modulo_atencion: action.payload[index].modulo_atencion, id: action.payload[index].id }]
            }

            return { ...state, especialidades: arr }

        case OBTENER_PACIENTES:
        case RESETEAR_PACIENTES:
        case OBTENER_PACIENTES_REGISTRO:
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
            let esp = []
            for (let index = 0; index < state.especialistas.length; index++) {

                esp = state.especialistas[index].specialty.toLowerCase().split(", ")

                for (let index2 = 0; index2 < esp.length; index2++) {
                    let formart = esp[index2]
                    if (formart.startsWith(action.payload.toLowerCase())) {
                        if (busquedaEs.length > 0) {
                            let filtro = busquedaEs.filter(es => es.id === state.especialistas[index].id)
                            if (!filtro[0]) {
                                busquedaEs.push(state.especialistas[index])
                            }
                        } else {
                            busquedaEs.push(state.especialistas[index])
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
        case MODIFICAR_AGENDA:
        case MODIFICAR_TURNO:
        case ELIMINAR_TURNO:
        case EDITAR_DIAGNOSTICO:
            return { ...state, modificado: action.payload }

        case OBTENER_ADMINISTRATIVOS:
            let filter=action.payload.filter(element=>element.persona.dni!==0)
            return { ...state, administrativos: filter }
            
        case RESETEAR_ADMINISTRATIVOS:
            return { ...state, administrativos: action.payload }
            
        case OBTENER_ADMINISTRATIVO_DETALLADO:
            return { ...state, administrativoDetallado: state.administrativos.filter(adm => adm.id === action.payload) }

        case RESETEAR_ADMINISTRATIVO_DETALLADO:
            return { ...state, administrativoDetallado: action.payload }


        case OBTENER_AGENDAS:
            const clockMinuteAdder = (time, min) => {

                if (!time) throw Error('Espero la hora man');
                if (!min) return time;

                let [hours, minutes] = time.split(':');
                if (Number.isNaN(hours) || Number.isNaN(minutes)) throw TypeError('Ingrese un valor válido para time');

                minutes = min + parseInt(minutes);
                let newMinutes = minutes % 60;

                hours = parseInt(hours) + Math.floor(minutes / 60);
                let newHours = ((hours - 1) % 24) + 1 || 1;

                if (newHours < 10) newHours = `0${newHours}`;
                if (newMinutes < 10) newMinutes = `0${newMinutes}`;


                return `${newHours}:${newMinutes}`;
            };
            let turnosPre = []
            let newAgenda = []
            let horaI = ""
            let horaF = ""
            let cont = 1
            for (let index = 0; index < action.payload.length; index++) {
                const { id, amount, date, tipo_especialidad } = action.payload[index]
                horaI = date.slice(11, date.length)
                
                for (let index2 = 0; index2 < amount; index2++) {
                    horaF = clockMinuteAdder(horaI, tipo_especialidad.modulo_atencion * 15)
                    turnosPre.push({
                        idTurnoPre:cont,
                        idAgenda: id,
                        idPaciente: null,
                        status: "no asinado",
                        horaI,
                        horaF
                    })
                    horaI=horaF
                    cont++
                }
                newAgenda.push({ ...action.payload[index], turnosPrecargados: turnosPre })
                turnosPre=[]
                cont=1
            }
            return { ...state, agendas: newAgenda }

        case OBTENER_TURNO_DETALLADO:
        case RESETEAR_TURNO_DETALLADO:
            return { ...state, turnoDetallado: action.payload }

        case OBTENER_TURNOS:
        case RESETEAR_TURNOS:
            return { ...state, turnos: action.payload }

        case RESETEAR_AGENDAS:
            return { ...state, agendas: action.payload}
        default:
            return state;

    }

}

export default Reducer;