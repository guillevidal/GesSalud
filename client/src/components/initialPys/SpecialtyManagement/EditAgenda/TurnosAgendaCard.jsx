import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./EditAgenda.scss";
import { useModal } from "../../../Modal/useModal.js";
import Modal from '../../../Modal/Modal.js';
import { crearTurno } from '../../../../actions/index';
import { eliminarTurno } from '../../../../actions/index.js';
import swal from "sweetalert";


const TurnosAgendaCard = ({ numeroTurno, horaI, horaF, idAgenda, date, modules, especialista, especialidad }) => {
    const dispatch = useDispatch()

    const pacientes = useSelector(state => state.pacientes)
    const turnos = useSelector(state => state.turnos)
    const agendas = useSelector(state => state.agendas)
    let agendaId = agendas.length > 0 && agendas.filter(agenda => {
        if (agenda.id === idAgenda) return agenda
    })

    

    const [validation, setValidation] = useState(true)
    const [inputFormTurno, setInputFormTurno] = useState({
        agendaId: { value: idAgenda, error: null },
        pacienteId: { value: '', error: 'Campo requerido' },
        status: { value: 'pendiente', error: null },
        hora: { value: `${date}T${horaI}&${horaF}`, error: null },
        modules: { value: modules, error: null }

    })

    const [isOpenFormTurno, openFormTurno, closeFormTurno] = useModal(false)
    const [isOpenCancelarTurno, openCancelarTurno, closeCancelarTurno] = useModal(false)

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
                    swal({
                        icon : 'warning',
                        title : 'Paciente no encontrado',
                        text : 'Verifica los datos ingresados'
                    })
                } else {

                    let newTurno = {
                        agendaId: parseInt(inputFormTurno.agendaId.value),
                        pacienteId: pacienteDetail[0].id,
                        status: inputFormTurno.status.value,
                        hour: inputFormTurno.hora.value,
                        modules: inputFormTurno.modules.value.toString(),
                    }

                    dispatch(crearTurno(newTurno))

                    swal({
                        icon : 'success',
                        title : 'Turno creado',
                        text : 'El turno se genero satisfactoriamente'
                    })

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

    const confirmacionButton = () => {
        let entrar = false
        agendaId[0].turnos.length > 0 && agendaId[0].turnos.map(turno => {

            if (turno.hour === `${date}T${horaI}&${horaF}`) {

                entrar = true

            }
        })

        if (entrar === true) {
            return <div className='botones'>
            <button className='button editar'>Editar</button>
            <button className='button eliminar' onClick={openCancelarTurno}>Eliminar</button>
            </div>
        }
        else {
            return <button onClick={openFormTurno} className='button assign'>Asignar turno</button>
        }
    }

    var namePaciente = '';
    const fullNamePaciente = () => {
        agendaId[0].turnos.length > 0 && agendaId[0].turnos.map(turno => {

            if (turno.hour === `${date}T${horaI}&${horaF}`) {
               
                namePaciente = `${turno.paciente.persona.name} ${turno.paciente.persona.lastName}` 
                
            }
        })
    }
    fullNamePaciente()

    const confirmacionPaciente = () => {
        let entrar = false
        agendaId[0].turnos.length > 0 && agendaId[0].turnos.map(turno => {

            if (turno.hour === `${date}T${horaI}&${horaF}`) {

                entrar = true

            }
        })

        if (entrar === true) {
            return <span>{namePaciente}</span>
        }
        else {
            return <span>No asignado</span>
        }
    }

    var idTurnoEliminar = null;
    const idTurno = () => {
        agendaId[0].turnos.length > 0 && agendaId[0].turnos.map(turno => {

            if (turno.hour === `${date}T${horaI}&${horaF}`) {
               
                idTurnoEliminar = turno.id;
                
                
            }
        })
    }
    idTurno()
    console.log(idTurnoEliminar)
    const handleEliminarTurno = (id) => {
        dispatch(eliminarTurno(id))
    }
    
    const confirmacionIdTurno = () => {
        let entrar = false
        agendaId[0].turnos.length > 0 && agendaId[0].turnos.map(turno => {

            if (turno.hour === `${date}T${horaI}&${horaF}`) {

                entrar = true

            }
        })

        if (entrar === true) {
            return <button >ELIMINAR TURNO</button>
        }
       
    }

    return (

        <>
            
            <tr className='lista'>

                <td className='td numero'><span >{numeroTurno}</span></td>
                <td className='td horario'><span >{horaI}</span></td>
                <td className='td horarioFinal'><span>{horaF}</span></td>
                <td className='td paciente'>
                    {
                        confirmacionPaciente()
                    }
                </td>
                <td className='td asignar'>
                    {
                        confirmacionButton()
                    }

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
            <Modal isOpen={isOpenCancelarTurno} closeModal={closeCancelarTurno}>
        
            <div>
                <span>CONFIRMA ELIMINAR TURNO</span>
                <span>PACIENTE</span>
                {
                    confirmacionPaciente()
                }
                <span>FECHA</span>
                <span>{date}</span>
                <span>HORA</span>
                <span>{horaI}</span>
                <span>ESPECIALISTA</span>
                <span>{especialista}</span>
                <span>ESPECIALIDAD</span>
                <span>{especialidad}</span>
                {
                    confirmacionIdTurno()
                }
              


            </div>
            </Modal>

        </>

    )
}

export default TurnosAgendaCard

