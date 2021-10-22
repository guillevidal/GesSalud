/* eslint-disable */
import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {paginado} from "../../actions/index.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleRight,faArrowCircleLeft } from "@fortawesome/free-solid-svg-icons";
import './Paginado.scss'

const PaginadoAdmin = ()=> {

    const dispatch = useDispatch();
    const valorPaginado = useSelector( state => state.paginado);
    const administrativos = useSelector( state => state.administrativos)
    const busquedaAdministrativo = useSelector(state => state.busquedaAdministrativo);
    const count = useSelector(state => state.paginado)
    const paginaSIguiente = () => {
        if(!busquedaAdministrativo[0]?administrativos.slice(valorPaginado, valorPaginado+6).length > administrativos.length%6:
        busquedaAdministrativo.slice(valorPaginado, valorPaginado+6).length > busquedaAdministrativo.length%6) {
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
            <span className='indicacion'>Página {count / 6 === 0 ? 1 : count / 6 + 1} / {Math.ceil(busquedaAdministrativo.length / 6) || Math.ceil(administrativos.length / 6)}</span>
            <button className='boton' onClick={paginaSIguiente}><FontAwesomeIcon icon={faArrowCircleRight} className='flecha'/></button>
        </div>
    )
}

export default PaginadoAdmin;
