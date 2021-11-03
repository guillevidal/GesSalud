/* eslint-disable */
import React, { useState} from "react"
import './InicialTurno.scss';
import { useModal } from "../../Modal/useModal.js";
import Modal from '../../Modal/Modal.js';
import swal from "sweetalert";
import '../SpecialtyManagement/EditAgenda/modales.scss'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faUserEdit, faEdit} from "@fortawesome/free-solid-svg-icons";
import {modificarTurno} from "../../../actions/index.js";
import {useDispatch} from "react-redux";
import '../SpecialtyManagement/EditAgenda/modales.scss';
import ImagenMP from '../../Landing/images/mercadopago.png'

const TurnosCard = ({ id, paciente, agenda, hour, status, pacientes, turnos, carro, setCarro }) => {
    const capitalFirstLetter = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1)
    }
    const dispatch = useDispatch();
    let fecha = hour.slice(0, 10)
    let horaI = hour.slice(11, 16)
    let horaF = hour.slice(17, hour.length)
    const [validation, setValidation] = useState(true)
    const [isOpenChangeTurno, openChangeTurno, closeChangeTurno] = useModal(false)
    const [inputEditarTurno, setInputEditarTurno] = useState({
        turnoId: { value: id, error: null },
        agendaId: { value: agenda.id, error: null },
        pacienteId: { value: "", error: 'Campo requerido' },
        hora: { value: `${fecha}T${horaI}&${horaF}`, error: null },

    })
    const [estadoPago, setEstadoPago]= useState("Añadir Pago")
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
            } else if (paciente[0].persona.dni === paciente.dni) {
                setInputEditarTurno({ ...inputEditarTurno, pacienteId: { value, error: "DNI de paciente igual al anterior" } })
            } else {

                setInputEditarTurno({ ...inputEditarTurno, pacienteId: { value, error: null } })
            }
        }
   
    }

    const handleSubmitEditarTurno = (event) => {
        event.preventDefault();

        if (!inputEditarTurno.agendaId.error && !inputEditarTurno.pacienteId.error
            && !inputEditarTurno.hora.error) {
            if (inputEditarTurno.agendaId.value || inputEditarTurno.pacienteId.value.length === 0
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
                            if (turno.hour.split('&')[0] === `${fecha}T${horaI}`) {
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

                                const ajuste = async () => {
                                    dispatch(modificarTurno(editarTurno))

                                    await swal({
                                        icon: 'success',
                                        title: 'Turno modificado',
                                        text: `El turno de ${capitalFirstLetter(pacienteDetail[0].persona.name)} ${capitalFirstLetter(pacienteDetail[0].persona.lastName)} se modifico satisfactoriamente`
                                    })

                                    location.reload()

                                }

                                ajuste()


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

                        const ajuste = async () => {
                            await dispatch(modificarTurno(editarTurno))

                            swal({
                                icon: 'success',
                                title: 'Turno modificado',
                                text: `El turno se modificó para ${capitalFirstLetter(pacienteDetail[0].persona.name)} ${capitalFirstLetter(pacienteDetail[0].persona.lastName)} satisfactoriamente`
                            })

                            setTimeout(() => {
                                location.reload()

                            }, 1000);

                        }

                        ajuste()
                    }
                }

            }
        } else {
            setValidation(false)
            return
        }
    }

    const handleCarro=()=>{
        
        setCarro({items: [...carro.items, {id :paciente.id, 
            title: agenda.tipo_especialidad.name,
            category_id: id,
            quantity: 1,
            unit_price: 200}]});

        setEstadoPago("Quitar")
    }

    const handleQuitar = () => {
       
        setCarro({items: carro.items.filter(element=>{
            return element.category_id!==id
        })})
        setEstadoPago("Añadir Pago")
    }
    return (
        <div className='container-info-turnos'>
            <div className='apartado'>
                <span className='subtitle'>Especialista </span>
                <span className='data'>{agenda.especialista_medico.persona.name} {agenda.especialista_medico.persona.lastName}</span>
            </div>
            <div className='apartado'>
                <span className='subtitle'>Especialidad </span>
                <span className='data'>{agenda.tipo_especialidad.name}</span>
            </div>
            <div className='apartado'>
                <span className='subtitle'>Paciente </span>
                <span className='data'>{paciente.persona.name} {paciente.persona.lastName}</span>
            </div>
            <div className='apartado'>
                <span className='subtitle'>Fecha </span>
                <span className='data'>{fecha}</span>
            </div>
            <div className='apartado'>
                <span className='subtitle'>Duracion </span>
                <span className='data'> de {horaI} hasta {horaF}</span>

            </div>
            <div className='apartado'>
                <span className='subtitle'>Estado </span>
                <span className='data'>{status.toUpperCase()}</span>

            </div>
            <div className='botones'>
                <button className='boton' onClick={openChangeTurno}><FontAwesomeIcon icon={faEdit} className='icon'/></button>
                {/* <button className='boton MP' onClick={estadoPago!=="Quitar"?handleCarro:handleQuitar}><img src={ImagenMP} alt="" className='logoMP'/></button> */}
                <button  onClick={estadoPago!=="Quitar"?handleCarro:handleQuitar}>{estadoPago}</button>

            </div>
            <Modal isOpen={isOpenChangeTurno} closeModal={closeChangeTurno}>
                <div className='cancelacion'>
                    <div className='icon'><FontAwesomeIcon className='edit' icon={faUserEdit}></FontAwesomeIcon></div>

                    <div className='cambioPac'>
                        <label className='title'>Cambiar paciente del turno</label>

                    </div>
                    <div className='busquedaConf'>
                        <input
                            type="text"
                            placeholder="DNI Paciente..."
                            onChange={handleEditarTurnoPatient}
                            value={inputEditarTurno.pacienteId.value}
                            className='input'


                        />
                        {inputEditarTurno.pacienteId.error && <span className='error'>{inputEditarTurno.pacienteId.error}</span>}

                        <div className='confirmacionDiv'>
                            <button className='boton' onClick={handleSubmitEditarTurno}>MODIFICAR</button>
                        </div>
                    </div>

                </div>
            </Modal>
           
        </div>
    )
}
export default TurnosCard