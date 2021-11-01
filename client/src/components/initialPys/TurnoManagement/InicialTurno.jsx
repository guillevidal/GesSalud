/* eslint-disable */
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Nav from "../../Layout/Nav"
import "./InicialTurno.scss"
import { obtenerTurnos, paginado, obtenerPacientes} from "../../../actions/index.js"
import Turnos from "./turnosCard.jsx";
import SearchTurno from "./SearchTurno";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import Paginado from "./paginado.jsx";
import { Link } from "react-router-dom";
import CarroCompras from "./CarroCompras.jsx";

function InicialTurno() {
    const dispatch = useDispatch();
    const turnos = useSelector(state => state.turnos)
    const pacientes = useSelector(state => state.pacientes)
    const valorPaginado = useSelector( state => state.paginado)
    const [estado, setEstado] = useState("turnos")
    const [busquedaTurnos, setBusquedaTurnos] = useState([])
    const [carro, setCarro]= useState({items:[]})
    useEffect(() => {
        dispatch(obtenerTurnos())
        dispatch(paginado(0))
        dispatch(obtenerPacientes())
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
            <div className='boton-crear'>
            <Link to="especialistaPys"><button className='botoncito'>Crear turno</button></Link>
  
            </div>
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
                                pacientes={pacientes}
                                turnos={turnos}
                                carro={carro}
                                setCarro={setCarro}
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
                            pacientes={pacientes}
                            turnos={turnos}
                            carro={carro}
                            setCarro={setCarro}
                        />)
                })}
                </div>
                <CarroCompras carro={carro} setCarro={setCarro} />
        </div>
    )

}

export default InicialTurno;