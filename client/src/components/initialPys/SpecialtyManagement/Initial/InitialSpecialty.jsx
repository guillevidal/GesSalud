/* eslint-disable */
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import './InitialSpecialty.scss';
import Nav from '../../../Layout/Nav';
import {
    obtenerEspecialistas, obtenerEspecialidades, obtenerAgendas, obtenerTurnos,
    obtenerPacientes, modificarTurno, paginado
} from '../../../../actions/index';
import "react-datepicker/dist/react-datepicker.css";
import Agenda from '../Agenda/Agenda.jsx';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import Paginado from "./paginado.jsx";
function InitialSpecialty() {
    const capitalFirstLetter = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1)
    }
    const agenda = useSelector(state => state.agendas)
    const valorPaginado = useSelector( state => state.paginado)
    let initalFecha= new Date ()
    const [input, setInput] = useState(initalFecha.toISOString().slice(0, 10))
    const [agendaFilter, setAgendaFilter] = useState(agenda.filter(element => {
        return element.date.slice(0, 10).includes(input)
    }));
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(obtenerEspecialistas())
        dispatch(obtenerEspecialidades())
        dispatch(obtenerAgendas())
        dispatch(obtenerTurnos())
        dispatch(obtenerPacientes())
        dispatch(paginado(0))
        setAgendaFilter(agenda.filter(element => {
            return element.date.slice(0, 10).includes(input)
        }))
    }, [])
    
   
   
    const agendaSort = agenda.sort((a, b) => {
        if (a.date > b.date) return 1;
        if (a.date < b.date) return -1;
        return 0;
    })

    
    
    const [estado, setEstado] = useState("fecha")
    const [placeHolder, setPlaceHolder] = useState("Buscar por nombre")
    const handleChange = (event) => {
        const { value } = event.target
        setInput(value)
        if (value.length === 0) {
            setAgendaFilter([])
        } else {
            if (estado === "especialista") {
                let filtroE = []
                agenda.forEach(element => {
                    let fullName= element.especialista_medico.persona.name+element.especialista_medico.persona.lastName
                    let fullNameInver=element.especialista_medico.persona.lastName+element.especialista_medico.persona.name
                    if (element.especialista_medico.persona.name.toLowerCase().startsWith(value.toLowerCase()) ||
                        element.especialista_medico.persona.lastName.toLowerCase().startsWith(value.toLowerCase()
                        )
                        ) {
                            filtroE.push(element)
                        
                        
                    }else if (fullName.toLowerCase().startsWith(value.replace(" ", "").toLowerCase())||
                    fullNameInver.toLowerCase().startsWith(value.replace(" ", "").toLowerCase())){
                        filtroE.push(element)
                    }
                })
                if (!filtroE[0]) {
                    filtroE.push("No se encontro agenda con el especialista")
                }
                setAgendaFilter(filtroE)
            }

            if (estado === "especialidad") {
                let filtroEsp = []
                agenda.forEach(element => {
                    if (element.tipo_especialidad.name.toLowerCase().normalize('NFD')
                        .replace(/([^n\u0300-\u036f]|n(?!\u0303(?![\u0300-\u036f])))[\u0300-\u036f]+/gi, "$1")
                        .normalize().startsWith(value.toLowerCase())) {
                        filtroEsp.push(element)
                    }
                })
                if (!filtroEsp[0]) {
                    filtroEsp.push("No se encontro agenda con la especialidad")
                }
                setAgendaFilter(filtroEsp)
            }
            if (estado === "fecha") {
                let filtroF = []
                agenda.forEach(element => {
                    if (element.date.slice(0, 10).startsWith(value)) {
                        filtroF.push(element)
                    }
                })
                if (!filtroF[0]) {
                    filtroF.push("No se encontro agenda con la fecha")
                }
                setAgendaFilter(filtroF)
            }
        }

    }

    const handleSelect = (event) => {
        const { value } = event.target
        if (value === "especialista") {
            setInput("")
            setEstado(value)
            setPlaceHolder("Buscar por nombre")
        }
        if (value === "especialidad") {
            setInput("")
            setEstado(value)
            setPlaceHolder("Buscar por especialidad")
        }
        if (value === "fecha") {
            setInput("")
            setEstado(value)
        }
    }


    const handleAllAgenda = (event) => {
        event.preventDefault();
        setInput("")
        setAgendaFilter([])
        dispatch(obtenerAgendas())
    }



    return (
        <div id="initialSpecialty-container">
            <Nav />
            <div className='division'>
                <div className="boton-crear-search">
                    <Link to="/createAgenda">
                        <button className="boton-action">CREAR AGENDA</button>
                    </Link>

                    <div className="searchAgenda">
                        <label className="label-title-search">FILTRAR AGENDA</label>
                        <div>

                            {estado === "fecha"
                                ?
                                <input
                                    type="date"
                                    min={new Date()}
                                    value={input}
                                    onChange={(e) => handleChange(e)}
                                />
                                :
                                <input
                                    value={input}
                                    onChange={(e) => handleChange(e)}
                                    placeholder={placeHolder}
                                />}

                            <select onChange={(e) => handleSelect(e)} className='select'>
                                <option value="fecha">Fecha</option>
                                <option value="especialista">Especialista</option>
                                <option value="especialidad">Especialidad</option>
                            </select>

                        </div>
                        <div>

                            <button onClick={handleAllAgenda} className='botonAll'>TODAS LAS AGENDAS</button>
                        </div>
                    </div>


            </div>

                <div className='agenda'>

                    <label className='titulo'>Agendas Médicas</label>
            {agendaFilter && agendaFilter.length > 10 ? <Paginado agendaFilter={agendaFilter}/> :null}
            {!agendaFilter.length && agendaSort && agendaSort.length > 10 ? <Paginado agendaFilter={agendaFilter}/> :null}

                    <table className="agenda-header-container">

                            

                    {
                        agendaFilter.length > 0
                        ?
                        typeof(agendaFilter[0]) === "string"
                        ?
                        <span className='empty'><FontAwesomeIcon icon={faTimesCircle} />{agendaFilter[0]}</span>
                        :<>
                        <tr className='encabezado'>
                            <th className='title'>Fecha</th>
                            <th className='title'>Especialista</th>
                            <th className='title'>Especialidad</th>
                            <th className='title'>Ver</th>
                        </tr>
                        {agendaFilter.slice(valorPaginado, valorPaginado+10).map(agenda => {
                            return (
                                    <Agenda
                                        date={agenda.date.split('T')[0]} specialist={capitalFirstLetter(agenda.especialista_medico.persona.name)
                                            + ' ' + capitalFirstLetter(agenda.especialista_medico.persona.lastName)}
                                        specialty={agenda.tipo_especialidad.name} id={agenda.id} 
                                        turnosPrecargados={agenda.turnosPrecargados} turnos={agenda.turnos}
                                    />
                            )
                                   
                        })} </>
                        :
                        agendaSort
                        ? <>
                        <tr className='encabezado'>
                            <th className='title'>Fecha</th>
                            <th className='title'>Especialista</th>
                            <th className='title'>Especialidad</th>
                            <th className='title'>Ver</th>
                            </tr>
                        {agendaSort.slice(valorPaginado, valorPaginado+10).map(agenda => {
                                return (
                                        <Agenda date={agenda.date.split('T')[0]} specialist={capitalFirstLetter(agenda.especialista_medico.persona.name)
                                            + ' ' + capitalFirstLetter(agenda.especialista_medico.persona.lastName)}
                                            specialty={agenda.tipo_especialidad.name} id={agenda.id}
                                            turnosPrecargados={agenda.turnosPrecargados} turnos={agenda.turnos}
                                        />

                                )
                            })}</>
                        : 
                         <span className='empty'><FontAwesomeIcon icon={faTimesCircle} />No se han registrado agendas</span>
                        
                    }

                    </table>

                </div>
            </div>
        </div>
    )
}

export default InitialSpecialty;

