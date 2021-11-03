/* eslint-disable */

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom";
import { obtenerAgendas, obtenerTurnos } from '../../actions/index.js';
import "react-datepicker/dist/react-datepicker.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import Nav from "../Layout/Nav"
import './HomeSpecialist.scss'
import axios from "axios"
import { rol, especialistaDetallado, pacienteDetallado } from "../../actions"


export default function HomeSpecialist() {
    const dispatch = useDispatch()
    useEffect(() => {

        let obtengoToken = localStorage.getItem('access-token')
        axios.get('/whoami', {
            headers: {
                authorization: obtengoToken
            }
        })
            .then(res => {
                console.log(res.data)
                if (res.data.rol) {
                    dispatch(rol(res.data.rol))

                    if (res.data.dni) {
                        dispatch(pacienteDetallado(res.data.dni))
                    }
                    if (res.data.especialistaId) {
                        dispatch(especialistaDetallado(res.data.especialistaId))
                    }

                }
                else {
                    return
                }
            })



    }, [])

    useEffect(() => {

        dispatch(obtenerAgendas())
        dispatch(obtenerTurnos())

    }, [])


    const hoy = new Date().toISOString();
    const short = hoy.slice(0, 10)

    const medico2 = useSelector(state => state.especialistaDetallado)// el medico logueado
    const medico = medico2[0]?.id
    const nombreMedico = medico2[0]?.persona.name
    const apellidoMedico = medico2[0]?.persona.lastName

    const turnosDia = useSelector(state => state.turnos)//todos los turnos de todos los medicos   
    const turnosVigentes = turnosDia.filter(e => e.hour.slice(0, 10) >= short)
    const turnosMedico = turnosVigentes.filter(e => e.agenda.especialista_medico.id === medico)

    let turnosDiaIndiv = turnosMedico.map(t => t = {
        idTurno: t.id,
        dniPaciente: t.paciente.persona.dni,
        name: t.paciente.persona.name,
        lastName: t.paciente.persona.lastName,
        horaTurno: t.hour.slice(11, 16),
        fechaTurno: t.hour.slice(0, 10),
        idEspecialista: t.agenda.especialista_medico.id,
        status: t.status
    });

    let turnosSort = [];
    function filtrarTurnos(fecha) {

        let turnosFecha = turnosDiaIndiv.filter(e => e.fechaTurno === fecha)

        turnosSort = turnosFecha?.sort((a, b) => (a.horaTurno > b.horaTurno ? 1 : -1))

        return turnosSort;
    }
    const turnosHoy = filtrarTurnos(short)

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


    let turnosRend = turnosHoy[0]?.fechaTurno === inputDia ? turnosHoy : turnos;

    return (
        <div className='homeSpecialist'>
            <Nav />
            <div className='content'>
                <div className='encabezado'>
                    <label className='Titulo'>Agenda Médica <b className='name'>Dr.{nombreMedico} {apellidoMedico}</b></label>
                    <div className='filtro'>
                        <label className="label-title-search">Filtrar agenda</label>


                        <input
                            type="date"
                            min={short}
                            value={inputSearchDay.date.value}
                            onChange={handleSearchDay}
                            className='input'
                        />
                        <button onClick={handleSubmitSearchDay} className='boton'>BUSCAR</button>
                    </div>
                </div>

                
                            <table className='tabla'>

                        
                            {turnosRend.length < 1 && <h3 className='error'><FontAwesomeIcon icon={faTimesCircle}/> No hay turnos para esta fecha</h3>}
                            {turnosRend?.length > 0 &&
                            <>
                            <thead>
                                <tr className='titles'>
                                    <td className='text'>Fecha</td>
                                    <td className='text'>Hora</td>
                                    <td className='text'>Paciente</td>
                                    <td className='text'>Ver</td>
                                </tr>
                            </thead>
        
                            <tbody>

                                {turnosRend?.map((turno) => {
                                    return (

                                        <tr key={turno.idTurno} id={turno.idTurno} className='lista'>


                                            <td className='datos fecha'>{turno.fechaTurno}</td>
                                            <td className='datos turno'>{turno.horaTurno}</td>
                                            <td className='datos nombre'>{turno.name + ' ' + turno.lastName}</td>

                                            <td className='datos ver'><Link to={`/patientHistory/${turno.dniPaciente}`}>
                                                <FontAwesomeIcon icon={faEye} 
                                                    onClick={() => { handleDataPaciente(turno.dniPaciente) }} className='icono'/>
                                            </Link></td>

                                        </tr>

                                    )
                                })}
                                 </tbody>
                                 </>}
                        
                   
                   </table>
            </div>
        </div>
    )
}

