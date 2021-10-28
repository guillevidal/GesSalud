/* eslint-disable */
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import './InitialSpecialty.scss';
import Nav from '../../../Layout/Nav';
import { obtenerEspecialistas, obtenerEspecialidades, obtenerAgendas } from '../../../../actions/index';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Agenda from '../Agenda/Agenda.jsx';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";

function InitialSpecialty() {
    const capitalFirstLetter = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1)
    }
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(obtenerEspecialistas())
        dispatch(obtenerEspecialidades())
        dispatch(obtenerAgendas())
    }, [])
    const agenda = useSelector(state => state.agendas)
    const agendaSort = agenda.sort((a, b) => {
        if (a.date > b.date) return 1;
        if (a.date < b.date) return -1;
        return 0;
    })
    const specialties = useSelector(state => state.especialistas)
  
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


    const handleSubmitSearchDay = (event) => {
        // event.preventDefault();
        // if (!inputSearchDay.date.error) {
        //     if (inputSearchDay.date.value.length === 0) {
        //         setValidation(false);
        //     } else {
        //         let agendas = [];
        //         agendas = agenda.filter(agenda => {
        //             return agenda.date.split('T')[0] === inputSearchDay.date.value

        //         })
        //         return setAgendaFilter(

        //             agendas
        //         )

        //     }
        // }
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

            <div className="boton-crear-search">
                        <Link to="/createAgenda">
                            <button className="boton-action">CREAR AGENDA</button>
                        </Link>

                        
                    <label className='Titulo'>AGENDA MÉDICA</label>

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

                            <select onChange={(e)=>handleSelect(e)}>
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

                    <div className="agenda-header-container">
                            <div className='bloque'><span className='title'>Fecha</span></div>
                            <div className='bloque'><span className='title'>Especialista</span></div>
                            <div className='bloque'><span className='title'>Especialidad</span></div>

                    </div>
                    {
                        agendaFilter.length > 0
                        ?
                        typeof(agendaFilter[0]) === "string"
                        ?
                        <h1>{agendaFilter[0]}</h1>
                        :
                        agendaFilter.map(agenda => {
                            return (
                                <div className='agendaEnlace'>
                                    <Agenda
                                        date={agenda.date.split('T')[0]} specialist={capitalFirstLetter(agenda.especialista_medico.persona.name)
                                            + ' ' + capitalFirstLetter(agenda.especialista_medico.persona.lastName)}
                                        specialty={agenda.tipo_especialidad.name}
                                    />
                                    <div className='boton'>
                                    <Link to={`especialistaPys/agenda/${agenda.id}`}>
                                        <FontAwesomeIcon icon={faEye} className='boton'/>
                                    </Link>
                                    </div>
                                </div>)
                        }) 
                        :
                        agendaSort
                        ? 
                        agendaSort.map(agenda => {
                                return (
                                    <div className='agendaEnlace'>
                                        <Agenda date={agenda.date.split('T')[0]} specialist={capitalFirstLetter(agenda.especialista_medico.persona.name)
                                            + ' ' + capitalFirstLetter(agenda.especialista_medico.persona.lastName)}
                                            specialty={agenda.tipo_especialidad.name}

                                        />
                                        <div >
                                        <Link to={`especialistaPys/agenda/${agenda.id}`}>
                                        <FontAwesomeIcon icon={faEye} className='boton'/> 
                                        </Link>
                                        </div>

                                    </div>

                                )
                            })
                        : 
                        <h4>No se han registrado agendas</h4>
                    }

                </div>
            </div>
    )
}

export default InitialSpecialty;

