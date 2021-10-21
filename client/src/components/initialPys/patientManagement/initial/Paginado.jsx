/* eslint-disable */
import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {paginado} from "../../../../actions/index.js"
import '../../../homeRH/Paginado.scss'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleRight,faArrowCircleLeft } from "@fortawesome/free-solid-svg-icons";


const Paginado = ()=> {

    const dispatch = useDispatch();
    const valorPaginado = useSelector( state => state.paginado);
    const pacientes = useSelector( state => state.pacientes)
    const busquedaPaciente = useSelector(state => state.busquedaPaciente);
    const count = useSelector(state => state.paginado)
    const paginaSIguiente = () => {
        if(!busquedaPaciente[0]?pacientes.slice(valorPaginado, valorPaginado+6).length > pacientes.length%6:
        busquedaPaciente.slice(valorPaginado, valorPaginado+6).length > busquedaPaciente.length%6) {
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
            <span className='indicacion'>Página {count / 6 === 0 ? 1 : count / 6 + 1} / {Math.ceil(busquedaPaciente.length / 6) || Math.ceil(pacientes.length / 6)}</span>
            <button className='boton' onClick={paginaSIguiente}><FontAwesomeIcon icon={faArrowCircleRight} className='flecha'/></button>
        </div>
    )
}

export default Paginado;

