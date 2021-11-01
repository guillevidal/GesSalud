import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {paginado} from "../../../../actions/index.js";
import '../../../homeRH/Paginado.scss'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleRight,faArrowCircleLeft } from "@fortawesome/free-solid-svg-icons";


const Paginado = ({agendaFilter})=> {

    const dispatch = useDispatch();
    const valorPaginado = useSelector( state => state.paginado);
    const agendas = useSelector( state => state.agendas)
    const count = useSelector(state => state.paginado)
    const paginaSIguiente = () => {
        if(!agendaFilter[0]?agendas.slice(valorPaginado, valorPaginado+10).length > agendas.length%10:
        agendaFilter.slice(valorPaginado, valorPaginado+10).length > agendaFilter.length%10) {
            dispatch(paginado(valorPaginado+10))
        }
    }
    const paginaAnterior = () => {
        if (valorPaginado > 0) {
            dispatch(paginado(valorPaginado-10));
        }
    }
    return (
        <div className='paginado'>
            <button className='boton' onClick={paginaAnterior}><FontAwesomeIcon icon={faArrowCircleLeft} className='flecha'/></button>
            <span className='indicacion'>Página {count / 10 === 0 ? 1 : count / 10 + 1} / {Math.ceil(agendaFilter.length / 10) || Math.ceil(agendas.length / 10)}</span>
            <button className='boton' onClick={paginaSIguiente}><FontAwesomeIcon icon={faArrowCircleRight} className='flecha'/></button>
        </div>
    )
}

export default Paginado;