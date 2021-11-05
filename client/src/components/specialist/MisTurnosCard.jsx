import React, { useState,useEffect} from "react";
import { useDispatch, useSelector} from "react-redux";
import '../initialPys/SpecialtyManagement/EditAgenda/EditAgenda.scss'
import '../initialPys/SpecialtyManagement/EditAgenda/modales.scss'
import Modal from '../Modal/Modal'
import { useModal } from '../Modal/useModal'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserTimes, faShoppingCart, faCartArrowDown } from "@fortawesome/free-solid-svg-icons";
import { eliminarTurno, modificarTurno, obtenerPagos} from '../../actions/index.js';
import swal from "sweetalert";

function MisTurnosCard({date, especialidad, id, paciente, carro, setCarro, lastNameEspecialista, nameEspecialista, status, agenda}) {
    
    
    const capitalFirstLetter = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1)
    }
    const [estadoPago, setEstadoPago]= useState("Pagar")
    const dispatch = useDispatch()

    const [isOpenCancelarTurno, openCancelarTurno, closeCancelarTurno] = useModal(false)
    //const [estadoStatus, setEStadoStatus]= useState(false)
    const pagos=useSelector(state => state.pagos)


    const handleSubmitEliminarTurno = (event) => {
        event.preventDefault();
        const fun = async () => {
            dispatch(eliminarTurno(id))

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
 
    const handlePagado = () => {
        alert("Ya fue pagado este item")
    }

    let estadoStatus = false;
    const handleValidacionPago = () => {
        pagos?.forEach(async (element) => {
            if (element.turno_id === id.toString()) {

                if (status !== "pagado") {

                    let editarTurno = {
                        id: id, // id del turno
                        agendaId: agenda.id,
                        pacienteId: paciente.id,
                        status: "pagado"

                    }
                    await dispatch(modificarTurno(editarTurno))
                }
                estadoStatus=true;
            }
        })
    }
    handleValidacionPago()
    return (
        <>
          <tr className="listasss">
              <td className="td numero">{date.split('T')[0]}</td>
              <td className="td horario">{date.split('T')[1].split('&')[0]}</td>
              <td className="td horarioFinal" >{`${capitalFirstLetter(nameEspecialista)} ${capitalFirstLetter(lastNameEspecialista)}`}</td>
              <td className="td paciente" >{especialidad}</td>
              <td className="td paciente" >{estadoStatus ? "PAGADO": status.toUpperCase()}</td>
              <td className="td asignar" >
                  <div className='botones'>
                    <button className="button eliminar" onClick={openCancelarTurno} >Eliminar</button>
                    {estadoPago === 'Quitar' ? 
                     <button  className={"button eliminarcart"} onClick={estadoStatus ? handlePagado :estadoPago!=="Quitar"?handleCarro:handleQuitar}><FontAwesomeIcon icon={faCartArrowDown} /></button>
                        :
                        <button  className={"button pagar"} onClick={estadoStatus ? handlePagado : estadoPago!=="Quitar"?handleCarro:handleQuitar}><FontAwesomeIcon icon={faShoppingCart} /></button>
                    }
                   </div>
                </td>
                <Modal isOpen={isOpenCancelarTurno} closeModal={closeCancelarTurno} >
                       <div className="eliminacion">
                        <div className="icon"><FontAwesomeIcon className="delete" icon={faUserTimes}></FontAwesomeIcon></div>
                        <div className='busquedaConf'>
                            <label className='text'>Eliminar turno del día {date.split('T')[0]} </label>
                            <label className='text'>Horario {date.split('T')[1].split('&')[0]} hrs</label>
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
