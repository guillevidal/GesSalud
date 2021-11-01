/* eslint-disable */

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom";
import '../initialPys/SpecialtyManagement/Initial/InitialSpecialty.scss';
import { obtenerAgendas, obtenerTurnos } from '../../actions/index.js';
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
        dispatch(obtenerTurnos())
        
    }, [])


    const hoy = new Date().toISOString();
    const short = hoy.slice(0,10)
    
    const medico2 = useSelector(state => state.especialistaDetallado)// el medico logueado
    const medico = medico2[0]?.id
    const nombreMedico = medico2[0]?.persona.name
    const apellidoMedico = medico2[0]?.persona.lastName

    const turnosDia = useSelector(state => state.turnos)//todos los turnos de todos los medicos   
    const turnosVigentes = turnosDia.filter(e => e.hour.slice(0,10) >= short)
    const turnosMedico = turnosVigentes.filter(e => e.agenda.especialista_medico.id === medico)

    let turnosDiaIndiv = turnosMedico.map(t => t = {
        idTurno: t.id,
        dniPaciente: t.paciente.persona.dni,
        name: t.paciente.persona.name,
        lastname: t.paciente.persona.lastName,
        horaTurno: t.hour.slice(11, 16),
        fechaTurno: t.hour.slice(0,10),
        idEspecialista: t.agenda.especialista_medico.id,
        status: t.status
    });

    let turnosSort = [];
    function filtrarTurnos(fecha){

        let turnosFecha = turnosDiaIndiv.filter(e => e.fechaTurno === fecha)

        turnosSort = turnosFecha?.sort((a,b) => (a.horaTurno > b.horaTurno? 1 : -1))
       
        return turnosSort;
    }
    const turnosHoy = filtrarTurnos(short)
    console.log('turnosHoy', turnosHoy)

    const [turnos, setTurnos] = useState(turnosDiaIndiv);

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

    const handleDataPaciente = (paciente) => {
        dispatch(pacienteDetallado(paciente))
        
    }

    const handleOnClick = () => {

    }

    let turnosRend = turnosHoy[0]?.fechaTurno === inputDia ? turnosHoy : turnos;

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
                            
                            turnosRend?.length > 0 ?
                            
                            turnosRend?.map((turno) => {
                                    return (
    
                                        <div key={turno.idTurno}>
                                            <p>Paciente:</p>

                                            <div>
                                            <span>{turno.name}</span>
                                            <span>{turno.lastName}</span>
                                            </div>

                                            <span>{turno.horaTurno}</span>
                                            <span>{turno.fechaTurno}</span>
                                            
                                            
                                            <Link to={`/patientHistory/${turno.dniPaciente}`}>
                                            <FontAwesomeIcon icon={faEye} className='boton' 
                                            onClick={()=>{handleDataPaciente(turno.dniPaciente)}}/>
                                            </Link>
                                            
                                            <button onClick={handleOnClick}>Atendido</button>
                                        </div>
    
                                    )
                                })
                                : <h3>No hay turnos para esta fecha</h3> 
                            }
                        </div>
                </div>
            </div>
        )
}

