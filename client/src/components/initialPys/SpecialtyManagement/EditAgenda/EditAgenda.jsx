import './EditAgenda.scss';
import React, { useState } from "react";
import { useSelector, useDispatch} from "react-redux";
import { useParams } from 'react-router-dom';
import Nav from "../../../Layout/Nav"
import TurnosAgendaCard from "./TurnosAgendaCard.jsx";
import Modal from '../../../Modal/Modal.js';
import { useModal } from '../../../Modal/useModal.js';
import { crearTurno } from '../../../../actions/index.js';


function EditAgenda() {
    let { id } = useParams()
    const capitalFirstLetter = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1)
    }

    const dispatch = useDispatch()

    const [isOpenFormTurno, openFormTurno, closeFormTurno] = useModal(false)

    const agendas = useSelector(state => state.agendas)
    const pacientes = useSelector(state => state.pacientes)

    let agendaId = agendas.length > 0 && agendas.filter(agenda => {
        if (agenda.id === parseInt(id)) return agenda
    })


    
    const [validation, setValidation] = useState(true)
    const [inputFormTurno, setInputFormTurno] = useState({
        agendaId: { value: agendaId[0]?.id, error: null },
        pacienteId: { value: '', error: 'Campo requerido' },
        status: { value: 'pendiente', error: null },
        hora: { value: '', error: 'Campo requerido' },

    })

    const handleCreateTurnoPatient = (event) => {
        const { value } = event.target;
        if (value !== 'Seleccionar...') {
            setInputFormTurno({ ...inputFormTurno, pacienteId: { value, error: null } })
        }
    }

    const handleCreateTurnohour = (event) => {
        const { value } = event.target;
        if (value !== 'Seleccionar...') {
            setInputFormTurno({ ...inputFormTurno, hora: { value, error: null } })
        }
    }

    const handleSubmitFormTurno = (event) => {
        event.preventDefault();

        
    }

    return (
        <>
            <div id="edit-agenda-container">
                
                <>
                    <Nav />
                    <div className='encabezado'>
                        <div>
                            <p className='title'>Fecha: <span className='data'>{agendaId[0]?.date.split('T')[0]}</span></p>
                        </div>
                        <div>
                            <p className='title'>Especialista: <span className='data'>{agendaId[0] && `${capitalFirstLetter(agendaId[0].especialista_medico.persona.name)} 

                        ${capitalFirstLetter(agendaId[0].especialista_medico.persona.lastName)}`}</span></p>
                        </div>
                        <div>
                            <p className='title'>Especialidad: <span className='data'>{agendaId[0]?.tipo_especialidad.name}</span></p>
                        </div>
                    </div>

                    <div className='asignaciones'>
                        <table className='titles'>
                            <tr className='subtitle'>
                                <th><span>Turno n°</span></th>
                                <th><span>Inicio</span></th>
                                <th> <span>Fin</span></th>
                                <th><span>Paciente:</span></th>
                                <th><span>Historia clinica</span></th>
                            </tr>
                    {agendaId[0].turnosPrecargados.map((valor) => {
                    return (

                          <TurnosAgendaCard numeroTurno={valor.idTurno} idAgenda={agendaId[0].id}
                              horaI={valor.horaI} horaF={valor.horaF} openFormTurno={openFormTurno}
                            />

                    )
                })}
                            
                        </table>
                    </div>
                </>
                <Modal isOpen={isOpenFormTurno} closeModal={closeFormTurno}>

                    <div >
                        <h4>DATOS DE TURNO</h4>
                        <p>ESPECIALIDAD</p>
                        <span>{agendaId[0].tipo_especialidad.name}</span>
                        <p>ESPECIALISTA</p>
                        <span>{`${capitalFirstLetter(agendaId[0].especialista_medico.persona.name)} ${capitalFirstLetter(agendaId[0].especialista_medico.persona.lastName)}`}</span>
                        <p>FECHA</p>
                        <span>{agendaId[0].date.split('T')[0]}</span>
                        <form>
                            <div>
                                <label>HORA</label>
                                <select onChange={handleCreateTurnohour}>
                                    <option>Seleccionar...</option>
                                    {
                                            agendaId[0].turnosPrecargados.length > 0 && agendaId[0].turnosPrecargados.map( turnoPrev => {
                                                return (
                                                    <>
                                                        <option key={turnoPrev.idTurno} value={turnoPrev.horaI} >{turnoPrev.horaI}</option>
                                                    </>
                                                )
                                            })
                                    }
                                </select>
                                { inputFormTurno.hora.error && <span>{inputFormTurno.hora.error}</span> }
                            </div>
                            <div>
                                <label>PACIENTE</label>
                                <select onChange={handleCreateTurnoPatient}>
                                    <option>Seleccionar...</option>
                                    {
                                        pacientes.length > 0 && pacientes.map(patient => {
                                            return (
                                                <option value={patient.id}>{patient.persona.dni}</option>
                                            )
                                        })
                                    }
                                </select>
                                { inputFormTurno.pacienteId.error && <span>{inputFormTurno.pacienteId.error}</span>}
                            </div>
                            <div>
                                <button>CREAR TURNO</button>
                            </div>
                        </form>

                    </div>

                </Modal>


            </div>


        </>

    )
};

export default EditAgenda;