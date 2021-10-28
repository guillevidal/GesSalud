/* eslint-disable */
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import './InitialSpecialty.scss';
import Nav from '../../../Layout/Nav';
import { obtenerEspecialistas, obtenerEspecialidades, obtenerAgendas, obtenerTurnos } from '../../../../actions/index';
import "react-datepicker/dist/react-datepicker.css";
import Agenda from '../Agenda/Agenda.jsx';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";

function InitialSpecialty() {
    const capitalFirstLetter = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1)
    }
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(obtenerEspecialistas())
        dispatch(obtenerEspecialidades())
        dispatch(obtenerAgendas())
        dispatch(obtenerTurnos())
    }, [])
    const agenda = useSelector(state => state.agendas)
    const agendaSort = agenda.sort((a, b) => {
        if (a.date > b.date) return 1;
        if (a.date < b.date) return -1;
        return 0;
    })
  
    const [agendaFilter, setAgendaFilter] = useState([]);
    const [estado, setEstado]=useState("especialista")
    const [input, setInput]=useState("")
    const [placeHolder, setPlaceHolder]= useState("Buscar por nombre")
    const handleChange = (event) => {
        const { value } = event.target
        setInput(value)
        if(value.length === 0){
            setAgendaFilter([])
        }else{
            if(estado==="especialista"){
                let filtroE=[]
                agenda.forEach(element=>{
                    console.log(element)
                    if(element.especialista_medico.persona.name.toLowerCase().startsWith(value.toLowerCase()) || 
                    element.especialista_medico.persona.lastName.toLowerCase().startsWith(value.toLowerCase())){
                        filtroE.push(element)
                    }
                })
                if(!filtroE[0]){
                    filtroE.push("No se encontro agenda con el especialista")
                }
                setAgendaFilter(filtroE)
            }

            if(estado==="especialidad"){
                let filtroEsp=[]
                agenda.forEach(element=>{
                    if(element.tipo_especialidad.name.toLowerCase().normalize('NFD')
                    .replace(/([^n\u0300-\u036f]|n(?!\u0303(?![\u0300-\u036f])))[\u0300-\u036f]+/gi, "$1")
                    .normalize().startsWith(value.toLowerCase())){
                        filtroEsp.push(element)
                    }
                })
                if(!filtroEsp[0]){
                    filtroEsp.push("No se encontro agenda con la especialidad")
                }
                setAgendaFilter(filtroEsp)
            }
            if(estado==="fecha"){
                let filtroF=[]
                agenda.forEach(element=>{
                    if(element.date.slice(0,10).startsWith(value)){
                        filtroF.push(element)
                    }
                })
                if(!filtroF[0]){
                    filtroF.push("No se encontro agenda con la fecha")
                }
                setAgendaFilter(filtroF)
            }
        }
        
    }

    const handleSelect= (event) => {
        const { value } = event.target
        if(value==="especialista"){
            setInput("")
            setEstado(value)
            setPlaceHolder("Buscar por nombre")
        }
        if (value==="especialidad") {
            setInput("")
            setEstado(value)
            setPlaceHolder("Buscar por especialidad")
        }
        if(value==="fecha"){
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

                            {estado==="fecha"
                            ?
                            <input
                                type="date"
                                min={new Date()}
                                value={input}
                                onChange={(e)=>handleChange(e)}
                                />
                            :
                            <input 
                                value={input} 
                                onChange={(e)=>handleChange(e)}
                                placeholder={placeHolder}
                                />}

                            <select onChange={(e)=>handleSelect(e)} className='select'>
                                <option value="especialista">Especialista</option>
                                <option value="especialidad">Especialidad</option>
                                <option value="fecha">Fecha</option>
                            </select>
                            
                        </div>
                        <div>

                            <button onClick={handleAllAgenda} className='botonAll'>TODAS LAS AGENDAS</button>
                        </div>
                    </div>

            </div>
   
                <div className='agenda'>

                    <label className='titulo'>Agendas Médicas</label>

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
                        {agendaFilter.map(agenda => {
                            return (
                                    <Agenda
                                        date={agenda.date.split('T')[0]} specialist={capitalFirstLetter(agenda.especialista_medico.persona.name)
                                            + ' ' + capitalFirstLetter(agenda.especialista_medico.persona.lastName)}
                                        specialty={agenda.tipo_especialidad.name} id={agenda.id}
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
                        {agendaSort.map(agenda => {
                                return (
                                        <Agenda date={agenda.date.split('T')[0]} specialist={capitalFirstLetter(agenda.especialista_medico.persona.name)
                                            + ' ' + capitalFirstLetter(agenda.especialista_medico.persona.lastName)}
                                            specialty={agenda.tipo_especialidad.name} id={agenda.id}

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

