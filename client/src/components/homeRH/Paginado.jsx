/* eslint-disable */
import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {paginado} from "../../actions/index.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleRight,faArrowCircleLeft } from "@fortawesome/free-solid-svg-icons";
import './Paginado.scss'

const Paginado = ()=> {

    const dispatch = useDispatch();
    const valorPaginado = useSelector( state => state.paginado);
    const especialistas = useSelector( state => state.especialistas)
    const busquedaEspecialista = useSelector(state => state.busquedaEspecialista);
    const count = useSelector(state => state.paginado)
    const paginaSIguiente = () => {
        if(!busquedaEspecialista[0]?especialistas.slice(valorPaginado, valorPaginado+6).length > especialistas.length%6:
        busquedaEspecialista.slice(valorPaginado, valorPaginado+6).length > busquedaEspecialista.length%6) {
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
            <span className='indicacion'>Página {count / 6 === 0 ? 1 : count / 6 + 1} / {Math.ceil(busquedaEspecialista.length / 6) || Math.ceil(especialistas.length / 6)}</span>
            <button className='boton' onClick={paginaSIguiente}><FontAwesomeIcon icon={faArrowCircleRight} className='flecha'/></button>
        </div>
    )
}

export default Paginado;

