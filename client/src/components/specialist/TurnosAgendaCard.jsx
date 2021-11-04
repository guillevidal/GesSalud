/* eslint-disable */
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import '../initialPys/SpecialtyManagement/EditAgenda/EditAgenda.scss';
import { useModal } from "../Modal/useModal.js";
import Modal from '../Modal/Modal.js';
import { crearTurno, eliminarTurno, modificarTurno } from '../../actions/index.js';
import swal from "sweetalert";
import '../Modal/Modal.scss'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus, faTimes, faPlus } from "@fortawesome/free-solid-svg-icons";


const TurnosAgendaCard = ({ numeroTurno, horaI, horaF, idAgenda, date, modules, }) => {
    const dispatch = useDispatch();
    const capitalFirstLetter = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1)
    }

    const pacienteDetallado = useSelector(state => state.pacienteDetallado)
    const turnos = useSelector(state => state.turnos)


    

    const [isOpenFormTurno, openFormTurno, closeFormTurno] = useModal(false)
    let boton = "Solicitar"
    const confirmacionBoton = () => {
        turnos.forEach(element => {
            if (element.hour === `${date}T${horaI}&${horaF}`) {
                boton = "Ocupado"
            }
        })
    }
    confirmacionBoton()

    const handleSubmit = (e) => {
        e.preventDefault()
        const funct = async () => {
            
            dispatch(crearTurno({
                agendaId: idAgenda,
                pacienteId: pacienteDetallado[0].paciente.id,
                status: "pendiente",
                hour: `${date}T${horaI}&${horaF}`,
                modules: modules
            }))

            await swal({
                icon: 'success',
                title: 'Turno creado',
                text: `El turno para ${capitalFirstLetter(pacienteDetallado[0].name)} ${capitalFirstLetter(pacienteDetallado[0].lastName)} se genero satisfactoriamente`
            })
            location.reload()
            

        }


        funct()
    }
    return (

        <>
            <tr className='listasss'>

                <td className='td numero'><span >{numeroTurno}</span></td>
                <td className='td horario'><span >{horaI}</span></td>
                <td className='td horarioFinal'><span>{horaF}</span></td>

                <td className='td asignar'>{boton === "Solicitar" ? <button className='plusplus' onClick={openFormTurno}><FontAwesomeIcon icon={faPlus}/> {boton}</button> : <button className='timestimes' disabled><FontAwesomeIcon icon={faTimes}/> {boton}</button>}</td>


            </tr>


            <Modal isOpen={isOpenFormTurno} closeModal={closeFormTurno}>
                <div className='asignacionTurno'>
                   

                    <div className='icon'><FontAwesomeIcon className='more' icon={faUserPlus}></FontAwesomeIcon></div>
                    <div className='horario'>
                        <span className='title'>Hora de turno</span>
                        <span className='content'>{horaI}</span>
                    </div>
                    <form className='busquedaConf'>

                        <div className='confirmacionDiv'>

                            <button className='boton' onClick={(e)=>handleSubmit(e)}>CREAR TURNO</button>

                        </div>
                    </form>


                </div>

            </Modal>



        </>

    )
}

export default TurnosAgendaCard
