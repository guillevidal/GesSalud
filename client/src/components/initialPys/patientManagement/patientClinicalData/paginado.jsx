import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {paginado} from "../../../../actions/index.js";
import '../../../homeRH/Paginado.scss'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleRight,faArrowCircleLeft } from "@fortawesome/free-solid-svg-icons";


const Paginado = ({diag})=> {

    const dispatch = useDispatch();
    const valorPaginado = useSelector( state => state.paginado);
    const count = useSelector(state => state.paginado)
    const paginaSIguiente = () => {
        if(diag.slice(valorPaginado, valorPaginado+5).length > diag.length%5){
            dispatch(paginado(valorPaginado+5))
        }
    }
    const paginaAnterior = () => {
        if (valorPaginado > 0) {
            dispatch(paginado(valorPaginado-5));
        }
    }
    return (
        <div className='paginado'>
            <button className='boton' onClick={paginaAnterior}><FontAwesomeIcon icon={faArrowCircleLeft} className='flecha'/></button>
            <span className='indicacion'>Página {count / 5 === 0 ? 1 : count / 5 + 1} / {Math.ceil(diag.length / 5)}</span>
            <button className='boton' onClick={paginaSIguiente}><FontAwesomeIcon icon={faArrowCircleRight} className='flecha'/></button>
        </div>
    )
}

export default Paginado;