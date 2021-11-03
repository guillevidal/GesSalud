import React, { useState} from "react";
import { useDispatch } from "react-redux";
import '../initialPys/SpecialtyManagement/EditAgenda/EditAgenda.scss'
import Modal from '../Modal/Modal'
import { useModal } from '../Modal/useModal'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserTimes, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { eliminarTurno } from '../../actions/index.js';
import swal from "sweetalert";

function MisTurnosCard({date, especialidad, id, paciente, carro, setCarro, lastNameEspecialista, nameEspecialista}) {
  
    const capitalFirstLetter = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1)
    }
    const [estadoPago, setEstadoPago]= useState("Pagar")
    const dispatch = useDispatch()

    const [isOpenCancelarTurno, openCancelarTurno, closeCancelarTurno] = useModal(false)
    
    const handleSubmitEliminarTurno = (event) => {
        event.preventDefault();
        const fun = async () => {
            dispatch(eliminarTurno(date.id))

            await swal({
                icon: 'success',
                title: 'Turno eliminado',
                text: `El turno se elimino satisfactoriamente`
            })

            window.location.reload()
            
        }
        fun()
    }
    const handleCarro=()=>{
        
        setCarro({items: [...carro.items, {id :paciente.id, 
            title: especialidad,
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
    return (
        <>
        
          <tr className="listasss">
              <td className="td numero">{date.split('T')[0]}</td>
              <td className="td horario">{date.split('T')[1].split('&')[0]}</td>
              <td className="td horarioFinal" >{`${capitalFirstLetter(nameEspecialista)} ${capitalFirstLetter(lastNameEspecialista)}`}</td>
              <td className="td paciente" >{especialidad}</td>
              <td className="td asignar" >
                    <button className="button eliminar" onClick={openCancelarTurno} >Eliminar</button>
                    <button  className={estadoPago === 'Quitar' ? 'boton MP quitar' : 'boton MP pagar'} onClick={estadoPago!=="Quitar"?handleCarro:handleQuitar}><FontAwesomeIcon icon={faShoppingCart} />{estadoPago}</button>
                </td>
                <Modal isOpen={isOpenCancelarTurno} closeModal={closeCancelarTurno} >
                       <div className="eliminacion">
                        <div className="icon"><FontAwesomeIcon className="delete" icon={faUserTimes}></FontAwesomeIcon></div>
                        <div>
                            <label>Eliminar turno del día {date.split('T')[0]} </label>
                            <label>Horario {date.split('T')[1].split('&')[0]} hrs</label>
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
