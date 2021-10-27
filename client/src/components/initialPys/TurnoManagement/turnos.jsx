import {useDispatch, useSelector} from "react-redux";


const Turnos = ({pacienteId, agendaId, modules, status, hour}) => {
    const pacientes = useSelector(state => state.pacientes)
    const agendas = useSelector(state => state.agendas)
    let filtroPaciente=pacientes.filter(p => p.id===pacienteId)
    let filtroAgenda=agendas.filter(a => a.id===agendaId)
    let fecha=hour.slice(0, 9)
    let horaI=hour.slice(10, hour.length)
    return (
        <div className='container-info-turnos'>
            <div>
                <h6>Especialista</h6>
                <span>{filtroAgenda.especialista_medico.persona.name}</span>
            </div>
            <div>
                <h6>Especialidad</h6>
                <span>{filtroAgenda.tipo_especialidad.name}</span>
            </div>
            <div>
                <h6>Paciente</h6>
                <span>{filtroPaciente.persona.name}</span>
            </div>
            <div>
                <h6>Fecha</h6>
                <span>{fecha}</span>
            </div>
            <div>
                <h6>Hora</h6>
                <span>{horaI}</span>
            </div>
            

        </div>
    )
}
export default Turnos