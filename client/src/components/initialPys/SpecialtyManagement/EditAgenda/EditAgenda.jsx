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

    let contador = 1;
    let arr = []
    function clockMinuteAdder(time, min) {
        // Escribir la funcion
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

    let horaI = agendaId[0].date.slice(11, agendaId[0].date.length)
    let horaF = ""
    for (let index = 0; index < agendaId[0].amount; index++) {
        horaF = clockMinuteAdder(horaI, agendaId[0].tipo_especialidad.modulo_atencion * 15)
        arr.push({ contador, horaI, horaF })
        contador++
        horaI = horaF
    }

    
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
                {console.log(horaI)}
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

                            {arr.map((valor) => {
                                return (

                                    <TurnosAgendaCard numeroTurno={valor.contador} idAgenda={agendaId[0].id}
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
                                            arr.length > 0 && arr.map( turnoPrev => {
                                                return (
                                                    <>
                                                        <option key={turnoPrev.contador} value={turnoPrev.horaI} >{turnoPrev.horaI}</option>
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