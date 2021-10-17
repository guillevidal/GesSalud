import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {paginado} from "../../actions/index.js";

const Paginado = ()=> {

    const dispatch = useDispatch();
    const valorPaginado = useSelector( state => state.paginado);
    const especialistas = useSelector( state => state.especialistas)
    const busquedaEspecialista = useSelector(state => state.busquedaEspecialista);

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
        <div>
            <button onClick={paginaAnterior}>⏪</button>
            <button onClick={paginaSIguiente}>⏩</button>
        </div>
    )
}

export default Paginado;

