import React from "react";
import { useDispatch } from "react-redux";
import '../initialPys/SpecialtyManagement/EditAgenda/EditAgenda.scss'
import Modal from '../Modal/Modal'
import { useModal } from '../Modal/useModal'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserTimes } from "@fortawesome/free-solid-svg-icons";
import { eliminarTurno } from '../../actions/index.js';
import swal from "sweetalert";

function MisTurnosCard(date) {
  
    const capitalFirstLetter = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1)
    }

    const dispatch = useDispatch()

    const [isOpenCancelarTurno, openCancelarTurno, closeCancelarTurno] = useModal(false)
    
    const handleSubmitEliminarTurno = (event) => {
        event.preventDefault();
        const fun = async () => {
            await dispatch(eliminarTurno(date.id))

            await swal({
                icon: 'success',
                title: 'Turno eliminado',
                text: `El turno se elimino satisfactoriamente`
            })

        
            
        }
        fun()
    }
    
    return (
        <>
        
          <tr className="listasss">
              <td className="td numero">{date.date.split('T')[0]}</td>
              <td className="td horario">{date.date.split('T')[1].split('&')[0]}</td>
              <td className="td horarioFinal" >{`${capitalFirstLetter(date.nameEspecialista)} ${capitalFirstLetter(date.lastNameEspecialista)}`}</td>
              <td className="td paciente" >{date.especialidad}</td>
              <td className="td asignar" >
                    <button className="button eliminar" onClick={openCancelarTurno} >Eliminar</button>
                    <button className="button assign">Añadir Pago</button>
                </td>
                <Modal isOpen={isOpenCancelarTurno} closeModal={closeCancelarTurno} >
                       <div className="eliminacion">
                        <div className="icon"><FontAwesomeIcon className="delete" icon={faUserTimes}></FontAwesomeIcon></div>
                        <div>
                            <label>Eliminar turno del día {date.date.split('T')[0]} </label>
                            <label>Horario {date.date.split('T')[1].split('&')[0]} hrs</label>
                        </div>
                        <div className="confirmacionDiv">
                            <button className="boton" onClick={handleSubmitEliminarTurno} >ACEPTAR</button>
                        </div>
                    </div>
                </Modal>
          </tr>
        </>
    )
}

export default MisTurnosCard;
