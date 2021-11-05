/* eslint-disable */
import React, { useState, useEffect} from "react"
import './InicialTurno.scss';
import { useModal } from "../../Modal/useModal.js";
import Modal from '../../Modal/Modal.js';
import swal from "sweetalert";
import '../SpecialtyManagement/EditAgenda/modales.scss'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faUserEdit, faEdit, faShoppingCart} from "@fortawesome/free-solid-svg-icons";
import {modificarTurno, obtenerPagos, obtenerTurnos } from "../../../actions/index.js";
import {useDispatch, useSelector} from "react-redux";
import '../SpecialtyManagement/EditAgenda/modales.scss';

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
    useEffect(async () => {
        await dispatch(obtenerPagos())
        
    }, [])
    const pagos=useSelector(state => state.pagos)
    const [estadoPago, setEstadoPago]= useState("Pagar")
    const [estadoStatus, setEStadoStatus]= useState(false)


    const handleEditarTurnoPatient = (event) => {
    

        const { value } = event.target
        if (value === "") {
            setInputEditarTurno({ ...inputEditarTurno, pacienteId: { value, error: "Se requiere DNI" } })
        };
        if (value > 0) {

            let pacient = pacientes.length > 0 && pacientes.filter(paciente => {
                return paciente.persona.dni === parseInt(value)
            })

            if (pacient.length === 0) {
                setInputEditarTurno({ ...inputEditarTurno, pacienteId: { value, error: "Paciente no encontrado" } })
            } else if (pacient[0].persona.dni === paciente.persona.dni) {
                setInputEditarTurno({ ...inputEditarTurno, pacienteId: { value, error: "DNI de paciente igual al anterior" } })
            } else {

                setInputEditarTurno({ ...inputEditarTurno, pacienteId: { value, error: null } })
            }
        }
   
    }

    const handleSubmitEditarTurno = (event) => {
        event.preventDefault();
        if (!inputEditarTurno.agendaId.error || !inputEditarTurno.pacienteId.error || !inputEditarTurno.hora.error) {
            if (inputEditarTurno.agendaId.value.length===0 || inputEditarTurno.pacienteId.value.length===0
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
                                    status: estadoStatus?"pagado":"pendiente"
                                }

                                const ajuste = async () => {
                                    await dispatch(modificarTurno(editarTurno))

                                    await swal({
                                        icon: 'success',
                                        title: 'Turno modificado',
                                        text: `El turno de ${capitalFirstLetter(pacienteDetail[0].persona.name)} ${capitalFirstLetter(pacienteDetail[0].persona.lastName)} se modifico satisfactoriamente`
                                    })

                                    location.reload()

                                }

                                ajuste()


                            }
                        })

                    } else {
                        let editarTurno = {
                            id: inputEditarTurno.turnoId.value, // id del turno
                            agendaId: inputEditarTurno.agendaId.value,
                            pacienteId: pacienteDetail[0].id,
                            hour: inputEditarTurno.hora.value,
                            status: estadoStatus?"pagado":"pendiente"
                        }

                        const ajuste = async () => {
                            await dispatch(modificarTurno(editarTurno))

                            await swal({
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
            category_id: id.toString(),
            quantity: 1,
            unit_price: 200}]});

        setEstadoPago("Quitar")
    }

    const handleQuitar = () => {
       
        setCarro({items: carro.items.filter(element=>{
            return element.category_id.toString()!==id.toString()
        })})
        setEstadoPago("Pagar")
    }
    //let estadoOO=false
    
    const handleValidacionPago = () => {
        pagos.forEach(async element => {
            if(element.turno_id===id.toString()){

                setEStadoStatus(true)
                if(status!=="pagado"){

                    let editarTurno = {
                        id: id, // id del turno
                        agendaId: agenda.id,
                        pacienteId: paciente.id,
                        status: "pagado"
    
                    }
                    await dispatch(modificarTurno(editarTurno))
                }
            }
        })
        
    }
    handleValidacionPago()
    const handlePagado = () => {
       swal({
           title : 'Ups!',
           icon : 'warning',
           text: 'Este turno ya fue abonado'
       })
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
                <span className='data'>{estadoStatus ? "PAGADO": status.toUpperCase()}</span>

            </div>
            <div className='botones'>
                <button className='boton' onClick={openChangeTurno}><FontAwesomeIcon icon={faEdit} className='icon'/></button>
                {status === 'pendiente' && <button  className={estadoPago === 'Quitar' ? 'boton MP quitar' : 'boton MP pagar'} onClick={estadoStatus ? handlePagado : estadoPago!=="Quitar"?handleCarro:handleQuitar}><FontAwesomeIcon icon={faShoppingCart} />{estadoPago}</button>}

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
                        {inputEditarTurno.pacienteId.error && <span className='err'>{inputEditarTurno.pacienteId.error}</span>}

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