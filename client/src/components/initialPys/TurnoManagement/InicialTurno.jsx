/* eslint-disable */
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Nav from "../../Layout/Nav"
import "./InicialTurno.scss"
import { obtenerTurnos} from "../../../actions/index.js"
import Turnos from "./turnosCard.jsx";
import SearchTurno from "./SearchTurno";
function InicialTurno() {
    const dispatch = useDispatch();
    const turnos = useSelector(state => state.turnos)
    const [estado, setEstado] = useState("turnos")
    const [busquedaTurnos, setBusquedaTurnos] = useState([])
    useEffect(() => {
        dispatch(obtenerTurnos())
    }, [])

    useEffect(()=>{ 
        
    }, [busquedaTurnos])
    return (
        <div class="container-turnospys">
            <Nav />
            <SearchTurno busquedaTurnos={busquedaTurnos}
                setBusquedaTurnos={setBusquedaTurnos}
                estado={estado} setEstado={setEstado} turnos={turnos}
            />

            {!busquedaTurnos[0] 
            ?
                turnos[0]
                ?
                    turnos.map(t => {
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
                    <h1>No se han registrado turnos</h1>
            :   
            typeof(busquedaTurnos[0])==="string"
                ?
                <h1>{busquedaTurnos[0]}</h1> 
                :
                busquedaTurnos.map(t => {
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
    )

}

export default InicialTurno;