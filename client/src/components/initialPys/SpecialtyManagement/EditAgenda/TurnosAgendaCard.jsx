import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./EditAgenda.scss";
import { useModal } from "../../../Modal/useModal.js";
import Modal from '../../../Modal/Modal.js';
import { crearTurno } from '../../../../actions/index'


const TurnosAgendaCard = ({ numeroTurno, horaI, horaF, idAgenda, date, modules }) => {
    const dispatch = useDispatch()
    const capitalFirstLetter = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1)
    }
    const pacientes = useSelector(state => state.pacientes)

    const [inputPatientDni, setinputPatientDni] = useState('')
    const [validation, setValidation] = useState(true)
    const [inputFormTurno, setInputFormTurno] = useState({
        agendaId: { value: idAgenda, error: null },
        pacienteId: { value: '', error: 'Campo requerido' },
        status: { value: 'pendiente', error: null },
        hora: { value: `${date}T${horaI}&${horaF}`, error: null },
        modules: { value: modules, error: null }

    })
    
    const [isOpenFormTurno, openFormTurno, closeFormTurno] = useModal(false)

    const handleSubmitFormTurno = (event) => {
        event.preventDefault();

        if (!inputFormTurno.agendaId.error && !inputFormTurno.pacienteId.error && !inputFormTurno.status.error
            && !inputFormTurno.hora.error && !inputFormTurno.modules.error) {
            if (inputFormTurno.agendaId.value.length === 0 || inputFormTurno.pacienteId.value.length === 0 || inputFormTurno.status.value.length === 0
                || inputFormTurno.hora.value.length === 0 || inputFormTurno.modules.value.length === 0) {
                setValidation(false)
            } else {
                let pacienteDetail = pacientes.filter(paciente => {
                    return paciente.persona.dni === parseInt(inputFormTurno.pacienteId.value)
                })



                if (pacienteDetail.length === 0) {
                    alert('Paciente no encontrado')
                } else {

                    let newTurno = {
                        agendaId: parseInt(inputFormTurno.agendaId.value),
                        pacienteId: pacienteDetail[0].id,
                        status: inputFormTurno.status.value,
                        hour: inputFormTurno.hora.value,
                        modules: inputFormTurno.modules.value.toString(),
                    }
                    console.log(pacienteDetail)
                    console.log(newTurno)
                    dispatch(crearTurno(newTurno))

                    alert('Turno creado con exito')

                    setInputFormTurno({
                        agendaId: { value: idAgenda, error: null },
                        pacienteId: { value: '', error: 'Campo requerido' },
                        status: { value: 'pendiente', error: null },
                        hora: { value: `${date}T${horaI}&${horaF}`, error: null },
                        modules: { value: modules, error: null }

                    })

                }



            }
        } else {
            setValidation(false)
            return
        }


    }

    const handleChangeSearchPatient = (event) => {

        const { value } = event.target
        setInputFormTurno({ ...inputFormTurno, pacienteId: { value, error: null } })

    }

    return (

        <>
            <tr className='lista'>

                <td className='td numero'><span >{numeroTurno}</span></td>
                <td className='td horario'><span >{horaI}</span></td>
                <td className='td horarioFinal'><span>{horaF}</span></td>
                <td className='td paciente'><span >{"no asignado"}</span></td>
                <td className='td historia'><span >{"no disponible"}</span></td>


                <td className='td asignar'>
                    <button onClick={openFormTurno} >
                        Asignar turno
                    </button>

                </td>


            </tr>
            <Modal isOpen={isOpenFormTurno} closeModal={closeFormTurno}>

                <div >
                    <span>HORA DE TURNO</span>
                    <h4>{horaI}</h4>
                    <form>
                        <div>
                            <label>PACIENTE</label>
                            <input
                                type="text"
                                onChange={handleChangeSearchPatient}
                                value={inputFormTurno.pacienteId.value}


                            />
                            {inputFormTurno.pacienteId.error && <span>{inputFormTurno.pacienteId.error}</span>}
                        </div>
                        {!validation && <span>Completar campo de paciente</span>}
                        <div>
                            <button onClick={handleSubmitFormTurno} >CREAR TURNO</button>
                        </div>
                    </form>


                </div>

            </Modal>

        </>

    )
}

export default TurnosAgendaCard

