import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {paginado} from "../../../actions/index.js";
import '../../homeRH/Paginado.scss'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleRight,faArrowCircleLeft } from "@fortawesome/free-solid-svg-icons";


const Paginado = ({busquedaTurnos})=> {

    const dispatch = useDispatch();
    const valorPaginado = useSelector( state => state.paginado);
    const turnos = useSelector( state => state.turnos)
    const count = useSelector(state => state.paginado)
    const paginaSIguiente = () => {
        if(!busquedaTurnos[0]?turnos.slice(valorPaginado, valorPaginado+6).length > turnos.length%6:
        busquedaTurnos.slice(valorPaginado, valorPaginado+6).length > busquedaTurnos.length%6) {
            dispatch(paginado(valorPaginado+6))
        }
    }
    const paginaAnterior = () => {
        if (valorPaginado > 0) {
            dispatch(paginado(valorPaginado-6));
        }
    }
    return (
        <div className='paginado'>
            <button className='boton' onClick={paginaAnterior}><FontAwesomeIcon icon={faArrowCircleLeft} className='flecha'/></button>
            <span className='indicacion'>Página {count / 6 === 0 ? 1 : count / 6 + 1} / {Math.ceil(busquedaTurnos.length / 6) || Math.ceil(turnos.length / 6)}</span>
            <button className='boton' onClick={paginaSIguiente}><FontAwesomeIcon icon={faArrowCircleRight} className='flecha'/></button>
        </div>
    )
}

export default Paginado;