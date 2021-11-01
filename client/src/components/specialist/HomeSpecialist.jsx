/* eslint-disable */

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom";
import '../initialPys/SpecialtyManagement/Initial/InitialSpecialty.scss';
import { obtenerAgendas } from '../../actions/index.js';
import "react-datepicker/dist/react-datepicker.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import Nav from "../Layout/Nav"
import './HomeSpecialist.scss'
import axios  from "axios"
import { rol, especialistaDetallado, pacienteDetallado } from "../../actions"


export default function HomeSpecialist(){
    const dispatch = useDispatch()
    useEffect(()=>{

        let obtengoToken = localStorage.getItem('access-token')
        axios.get('/whoami', { 
         headers:  { 
            authorization : obtengoToken
          }
      })
      .then(res => {
        console.log(res.data)
        if(res.data.rol){
            dispatch(rol(res.data.rol))
    
          if(res.data.dni){
            dispatch(pacienteDetallado(res.data.dni))
          }
          if(res.data.especialistaId){
            dispatch(especialistaDetallado(res.data.especialistaId))
          }
    
        }
        else{
          return
        }
      }) 
        
     
    
       },[])  
    useEffect(() => {

        dispatch(obtenerAgendas())
        
    }, [])

    const medico = useSelector(state => state.especialistaDetallado[0]?.id)// el medico logueado
    const agenda = useSelector(allAgenda => allAgenda.agendas)// todas las agendas de todos los medicos
    const agendaMedico = agenda.filter(e => e.especialista_medico.id === medico)// todas las agendas del medico logueado
    const turnosAgenda = agendaMedico.map(e => e = e.turnos)

    const nombreMedico = agendaMedico[0]?.especialista_medico.persona.name;
    const apellidoMedico = agendaMedico[0]?.especialista_medico.persona.lastName;
    const hoy = new Date().toISOString();
    const short = hoy.slice(0,10)
    
    
    let turnosSort = [];
    function filtrarTurnos(fecha){
        let turnosFlat = turnosAgenda.flat()
        let turnosFecha = turnosFlat.filter(e => e.hour.slice(0,10) === fecha)

        turnosSort = turnosFecha?.sort((a,b) => (a.hour.slice(11, 16) > b.hour.slice(11, 16)? 1 : -1))
       
        return turnosSort;
    }
    const estadoInicial = filtrarTurnos(short)

    const [turnos, setTurnos] = useState(estadoInicial);

    // useEffect(() => {

    //     setTurnos(estadoInicial)
        
    // }, [])

    const [inputSearchDay, setInputSearchDay] = useState({
        date: { value: short, error: 'Seleccione una fecha' }
    });
    const inputDia = inputSearchDay.date.value;

    
    const handleSearchDay = (event) => {
        const { value } = event.target
       
        
        setInputSearchDay({ ...inputSearchDay, date: { value, error: null } })
    }


    const handleSubmitSearchDay = (event) => {
        event.preventDefault();

        return setTurnos(filtrarTurnos(inputSearchDay.date.value))

    }

    if(inputDia === short){
        return(
            <div className='homeSpecialist'>
                <Nav />
                <div className="boton-crear-search">
                <label className='Titulo'>Agenda Médica Dr.{nombreMedico} {apellidoMedico}</label>
    
                <div className="searchAgenda">
                            <label className="label-title-search">FILTRAR AGENDA</label>
                            <div>
    
                                <input
                                    type="date"                                   
                                    min = {short}  
                                    value={inputSearchDay.date.value}
                                    onChange={handleSearchDay}
                                />
                                <button onClick={handleSubmitSearchDay} className='boton'>BUSCAR</button>
                            </div>
                           
                            {
    
                            estadoInicial?.length > 0 ?
                            
                            estadoInicial?.map((turno) => {
                                    return (
    
                                        <div key={turno.id}>
                                            <p>Paciente:</p>

                                            <div>
                                            <span>{turno.paciente.persona.name}</span>
                                            <span>{turno.paciente.persona.lastName}</span>
                                            </div>

                                            <span>{turno.hour.slice(11, 16)}</span>
                                            <span>{turno.hour.slice(0, 10)}</span>
                                            
                                            
                                            <Link to={`homeUser/patientHistory/${turno.paciente.id}`}>
                                            <FontAwesomeIcon icon={faEye} className='boton'/>
                                            </Link>
                                            
                                        </div>
    
                                    )
                                })
                                : <h3>No hay turnos para esta fecha</h3> 
                            }
                        </div>
                </div>
            </div>
        )
    }else{
        return(
            <div className='homeSpecialist'>
                <Nav />
                <div className="boton-crear-search">
                <label className='Titulo'>Agenda Médica Dr.  {nombreMedico} {apellidoMedico}  </label>
    
                <div className="searchAgenda">
                            <label className="label-title-search">FILTRAR AGENDA</label>
                            <div>
    
                                <input
                                    type="date"
                                    // min={new Date()}
                                    min = {short}  
                                    max = {short + 30}
                                    value={inputSearchDay.date.value}
                                    onChange={handleSearchDay}
                                />
                                <button onClick={handleSubmitSearchDay} className='boton'>BUSCAR</button>
                            </div>

                            {
    
                            turnos?.length === 0 ?
                            <h3>No hay turnos para esta fecha</h3> :
                            turnos?.map((turno) => {
                                    return (
    
                                        <div key={turno.id}>
                                            <p>Paciente:</p>


                                            <div>
                                            <span>{turno.paciente.persona.name}</span>
                                            <span>{turno.paciente.persona.lastName}</span>
                                            </div>


                                            <span>{turno.hour.slice(11, 16)}</span>
                                            <span>{turno.hour.slice(0, 10)}</span>

                                            
                                            <Link to={`homeUser/patientHistory/${turno.paciente.id}`}>
                                            <FontAwesomeIcon icon={faEye} className='boton'/>
                                            </Link>
                                            
                                        </div>
    
                                    )
                                })}
                        </div>
                </div>
            </div>
        )
    }

}