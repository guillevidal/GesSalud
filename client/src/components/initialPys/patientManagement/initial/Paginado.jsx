/* eslint-disable */
import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {paginado} from "../../../../actions/index.js"

const Paginado = ()=> {

    const dispatch = useDispatch();
    const valorPaginado = useSelector( state => state.paginado);
    const pacientes = useSelector( state => state.pacientes)
    const busquedaPaciente = useSelector(state => state.busquedaPaciente);

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
        <div>
            <button onClick={paginaAnterior}>⏪</button>
            <button onClick={paginaSIguiente}>⏩</button>
        </div>
    )
}

export default Paginado;

