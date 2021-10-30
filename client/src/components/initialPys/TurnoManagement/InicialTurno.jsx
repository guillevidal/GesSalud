/* eslint-disable */
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Nav from "../../Layout/Nav"
import "./InicialTurno.scss"
import { obtenerTurnos, paginado} from "../../../actions/index.js"
import Turnos from "./turnosCard.jsx";
import SearchTurno from "./SearchTurno";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import Paginado from "./paginado.jsx";
function InicialTurno() {
    const dispatch = useDispatch();
    const turnos = useSelector(state => state.turnos)
    const valorPaginado = useSelector( state => state.paginado)
    const [estado, setEstado] = useState("turnos")
    const [busquedaTurnos, setBusquedaTurnos] = useState([])
    useEffect(() => {
        dispatch(obtenerTurnos())
        dispatch(paginado(0))
    }, [])

    useEffect(()=>{ 
        
    }, [busquedaTurnos])
    return (
        <div class="container-turnospys">
            <Nav />
            <div className='buscador'>
            <SearchTurno busquedaTurnos={busquedaTurnos}
                setBusquedaTurnos={setBusquedaTurnos}
                estado={estado} setEstado={setEstado} turnos={turnos}
            />
            </div>
            {busquedaTurnos && busquedaTurnos.length > 6 ? <Paginado busquedaTurnos={busquedaTurnos}/> :null}
            {!busquedaTurnos.length && turnos && turnos.length > 6 ? <Paginado busquedaTurnos={busquedaTurnos}/> :null}
            <div className='turnos'>

            {!busquedaTurnos[0] 
            ?
                turnos[0]
                ?
                    turnos.slice(valorPaginado, valorPaginado+6).map(t => {
                        return (
                            <Turnos
                                key={t.id}
                                id={t.id}
                                paciente={t.paciente}
                                agenda={t.agenda}
                                hour={t.hour}
                                status={t.status}
                            />)}) 
                :
                    <span className='error'><FontAwesomeIcon icon={faTimesCircle} /> No se han registrado turnos</span>
            :   
            typeof(busquedaTurnos[0])==="string"
                ?
                <span className='error'><FontAwesomeIcon icon={faTimesCircle} /> {busquedaTurnos[0]}</span> 
                :
                busquedaTurnos.slice(valorPaginado, valorPaginado+6).map(t => {
                    return (
                        <Turnos
                            key={t.id}
                            id={t.id}
                            paciente={t.paciente}
                            agenda={t.agenda}
                            hour={t.hour}
                            status={t.status}

                        />)
                })}
                </div>
        </div>
    )

}

export default InicialTurno;