/* eslint-disable */
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./EditAgenda.scss";
import { useModal } from "../../../Modal/useModal.js";
import Modal from '../../../Modal/Modal.js';
import { crearTurno } from '../../../../actions/index';
import { eliminarTurno, modificarTurno } from '../../../../actions/index.js';
import swal from "sweetalert";


const TurnosAgendaCard = ({ numeroTurno, horaI, horaF, idAgenda, date, modules, }) => {
    const dispatch = useDispatch();


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

    const [isOpenChangeTurno, openChangeTurno, closeChangeTurno] = useModal(false)
   

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
                        icon: 'warning',
                        title: 'Paciente no encontrado',
                        text: 'Verifica los datos ingresados'
                    })
                } else {

                    let newTurno = {
                        agendaId: parseInt(inputFormTurno.agendaId.value),
                        pacienteId: pacienteDetail[0].id,
                        status: inputFormTurno.status.value,
                        hour: inputFormTurno.hora.value,
                        modules: inputFormTurno.modules.value.toString(),
                    }
                    const funct = async ()=>{
                        await dispatch(crearTurno(newTurno))

                        
                    swal({
                        icon: 'success',
                        title: 'Turno creado',
                        text: `El turno para ${pacienteDetail[0].persona.name} ${pacienteDetail[0].persona.lastName} se genero satisfactoriamente`
                    })

                        
                    }


              



                    funct()

                    setInputFormTurno({
                        agendaId: { value: idAgenda, error: null },
                        pacienteId: { value: '', error: 'Campo requerido' },
                        status: { value: 'pendiente', error: null },
                        hora: { value: `${date}T${horaI}&${horaF}`, error: null },
                        modules: { value: modules, error: null }

                    })
                    location.reload()
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
                <button className='button editar' onClick={openChangeTurno}>Editar</button>
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

                namePaciente=(`${turno.paciente.persona.name} ${turno.paciente.persona.lastName}`)

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

    let turnoId = null; // resultado del filter
    var idTurnoEliminar = null; // id a eliminar
    const idTurno = () => {
        agendaId[0].turnos.length > 0 && agendaId[0].turnos.forEach(turnoA => {

            if (turnoA.hour === `${date}T${horaI}&${horaF}`) {

                turnoId = turnos.length > 0 && turnos.filter(turno => {
                    return turno.id === turnoA.id
                })
            }

        })

        if (turnoId) {



             idTurnoEliminar = turnoId[0]?.id  

        }
    }
    idTurno()


    const confirmacionId = () => {
        let entrar = false
        agendaId[0].turnos.length > 0 && agendaId[0].turnos.map(turno => {

            if (turno.hour === `${date}T${horaI}&${horaF}`) {

                entrar = true

            }
        })

        if (entrar === true) {
            return idTurnoEliminar
        }

    }
    confirmacionId()



   
   

    let turno = turnos.length > 0 && turnos.filter(element => {
        return element.id === idTurnoEliminar
    })

    const [inputEditarTurno, setInputEditarTurno] = useState({
        turnoId: { value: idTurnoEliminar, error: null },
        agendaId: { value: idAgenda, error: null },
        pacienteId: { value: '', error: 'Campo requerido' },
        hora: { value: `${date}T${horaI}&${horaF}`, error: null },

    })
    //console.log(inputEditarTurno)

    const handleEditarTurnoPatient = (event) => {

        const { value } = event.target
        if (value === "") {
            setInputEditarTurno({ ...inputEditarTurno, pacienteId: { value, error: "Se requiere DNI" } })
        };
        if (value > 0) {

            let paciente = pacientes.length > 0 && pacientes.filter(paciente => {
                return paciente.persona.dni === parseInt(value)
            })

            if (paciente.length === 0) {
                setInputEditarTurno({ ...inputEditarTurno, pacienteId: { value, error: "Paciente no encontrado" } })
            } else if (paciente[0].persona.dni === turno[0].paciente.persona.dni) {
                setInputEditarTurno({ ...inputEditarTurno, pacienteId: { value, error: "DNI de paciente igual al anterior" } })
            } else {
                setInputEditarTurno({ ...inputEditarTurno, pacienteId: { value, error: null } })
            }
        }


    const handleSubmitEliminarTurno = (event) => {
        event.preventDefault();
        const fun = async() => {
            await dispatch(eliminarTurno(idTurnoEliminar))
            location.reload()
        }
        fun()
            


    }

    const handleSubmitEditarTurno = (event) => {
        event.preventDefault();

        if (!inputEditarTurno.agendaId.error && !inputEditarTurno.pacienteId.error
            && !inputEditarTurno.hora.error) {
            if (inputEditarTurno.agendaId.value.length === 0 || inputEditarTurno.pacienteId.value.length === 0
                || inputEditarTurno.hora.value.length === 0) {
                setValidation(false)
            } else {
                let pacienteDetail = pacientes.filter(paciente => {
                    return paciente.persona.dni === parseInt(inputEditarTurno.pacienteId.value)
                })

                let turnosDelPaciente = null;
                if (pacienteDetail.length > 0) {
                    turnosDelPaciente = turnos.filter(turnos => {
                        return turnos.paciente.persona.dni === pacienteDetail[0].persona.dni
                    });

                    if (turnosDelPaciente.length > 0) {

                        turnosDelPaciente.forEach(turno => {
                            if (turno.hour.split('&')[0] === `${date}T${horaI}`) {
                                return swal({
                                    icon: 'warning',
                                    title: 'El paciente ya tiene turno en la fecha y horario definido',
                                    text: 'Verifica los datos ingresados'
                                });

                            } else {
                                
                                let editarTurno = {
                                    id: inputEditarTurno.turnoId.value, // id del turno
                                    agendaId: inputEditarTurno.agendaId.value,
                                    pacienteId: pacienteDetail[0].id,
                                    hour: inputEditarTurno.hora.value,

                                }

                                dispatch(modificarTurno(editarTurno))
                               location.reload()

                                swal({
                                    icon: 'success',
                                    title: 'Turno modificado',
                                    text: `El turno se modificó para ${pacienteDetail[0].persona.name} ${pacienteDetail[0].persona.lastName} satisfactoriamente`
                                })

                                setInputEditarTurno({

                                    turnoId: { value: idTurnoEliminar, error: null },
                                    agendaId: { value: idAgenda, error: null },
                                    pacienteId: { value: '', error: 'Campo requerido' },
                                    hora: { value: `${date}T${horaI}&${horaF}`, error: null },

                                })
                            }
                        })

                    } else {
                        let editarTurno = {
                            id: inputEditarTurno.turnoId.value, // id del turno
                            agendaId: inputEditarTurno.agendaId.value,
                            pacienteId: pacienteDetail[0].id,
                            hour: inputEditarTurno.hora.value,

                        }

                        dispatch(modificarTurno(editarTurno))
                       location.reload()

                        swal({
                            icon: 'success',
                            title: 'Turno modificado',
                            text: `El turno se modificó para ${pacienteDetail[0].persona.name} ${pacienteDetail[0].persona.lastName} satisfactoriamente`
                        })

                        setInputEditarTurno({

                            turnoId: { value: idTurnoEliminar, error: null },
                            agendaId: { value: idAgenda, error: null },
                            pacienteId: { value: '', error: 'Campo requerido' },
                            hora: { value: `${date}T${horaI}&${horaF}`, error: null },

                        })
                    }
                }

            }
        } else {
            setValidation(false)
            return
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

                            <input
                                type="text"
                                onChange={handleChangeSearchPatient}
                                value={inputFormTurno.pacienteId.value}
                                placeholder="DNI Paciente..."


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
                    <label>ELIMINAR TURNO DEL PACIENTE</label>
                    <label>{confirmacionPaciente()}</label>
                    <div>
                    
                        <div>
                            <button onClick={handleSubmitEliminarTurno}>ACEPTAR</button>
                        </div>
                    </div>


                </div>


            </Modal>
            <Modal isOpen={isOpenChangeTurno} closeModal={closeChangeTurno}>
                <div>
                    <div>
                        <label>CAMBIAR PACIENTE DEL TURNO</label>

                        <label>A:</label>
                    </div>
                    <div>

                        <input
                            type="text"
                            placeholder="DNI Paciente..."
                            onChange={handleEditarTurnoPatient}
                            value={inputEditarTurno.pacienteId.value}


                        />
                        <div>
                            {inputEditarTurno.pacienteId.error && <span>{inputEditarTurno.pacienteId.error}</span>}
                            <button onClick={handleSubmitEditarTurno}>MODIFICAR</button>
                        </div>
                    </div>

                </div>
            </Modal>


        </>

    )
}

export default TurnosAgendaCard

