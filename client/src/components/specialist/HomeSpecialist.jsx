/* eslint-disable */

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom";
import { obtenerAgendas, obtenerTurnos } from '../../actions/index.js';
import "react-datepicker/dist/react-datepicker.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import Nav from "../Layout/Nav"
import './HomeSpecialist.scss'
import '../initialPys/SpecialtyManagement/EditAgenda/EditAgenda.scss'
import axios from "axios"
import { rol, especialistaDetallado, pacienteDetallado, paginado } from "../../actions"
import MisTurnosCard from './MisTurnosCard.jsx';
import Agenda from './Agenda.jsx';
import { useModal } from "../Modal/useModal.js";
import Modal from '../Modal/Modal.js';
import ModalHistoriaClinica from '../Modal/ModalHistoriaClínica.js'
import CarroCompras from "../initialPys/TurnoManagement/CarroCompras.jsx"
import Paginado from "./Paginado.jsx"
export default function HomeSpecialist() {
    const dispatch = useDispatch()
    const valorPaginado = useSelector(state => state.paginado)
    useEffect(() => {

        let obtengoToken = localStorage.getItem('access-token')
        axios.get('/whoami', {
            headers: {
                authorization: obtengoToken
            }
        })
            .then(res => {


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
        dispatch(paginado(0))
        dispatch(obtenerAgendas())
        dispatch(obtenerTurnos())

    }, [])


    // CODIGO VISTA DE ESPECIALISTA LOGEADO
    const roles = useSelector(state => state.rol)

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


    const [turnos, setTurnos] = useState(turnosHoy);


    const [inputSearchDay, setInputSearchDay] = useState({
        date: { value: '', error: 'Seleccione una fecha' }

    });

    const inputDia = inputSearchDay.date.value;

    const handleSearchDay = (event) => {
        const { value } = event.target

        setInputSearchDay({ ...inputSearchDay, date: { value, error: null } })
    }


    const handleSubmitSearchDay = (event) => {
        event.preventDefault();

        setTurnos(filtrarTurnos(inputSearchDay.date.value))

    }

    const handleDataPaciente = (paciente) => {
        dispatch(pacienteDetallado(paciente))


    }

    if (turnos.length === 0 && turnosHoy.length > 0 && inputDia === '') {
        setTurnos(turnosHoy)
    }












    //CODIGO VISTA DE PACIENTE LOGEADO
    const capitalFirstLetter = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1)
    }
    const pacienteDetail = useSelector(state => state.pacienteDetallado)
    const agenda = useSelector(state => state.agendas)

    const turnosDelPaciente = turnosDia.length > 0 && turnosDia.filter(turnosPaciente => {
        return pacienteDetail[0]?.paciente.id === turnosPaciente.paciente.id
    })

    const turnosDelPacienteSort = turnosDelPaciente.length > 0 && turnosDelPaciente.sort((a, b) => {
        if (a.hour.split('&')[0] > b.hour.split('&')[0]) return 1;
        if (a.hour.split('&')[0] < b.hour.split('&')[0]) return -1;
        return 0;
    })

    const [agendaFilter, setAgendaFilter] = useState([]);
    const [estado, setEstado] = useState("especialidad")
    const [input, setInput] = useState("")
    const [placeHolder, setPlaceHolder] = useState("Buscar por especialidad...")
    const [carro, setCarro] = useState({ items: [] })
    const [isOpenChangeTurno, openChangeTurno, closeChangeTurno] = useModal(false)
    const [isOpenHistoriaClinica, openHistoriaClinica, closeHistoriaClinica] = useModal(false)
    console.log(agendaFilter)

    const handleChange = (event) => {
        const { value } = event.target
        setInput(value)
        if (value.length === 0) {
            setAgendaFilter([])
        } else {
            if (estado === "especialista") {
                let filtroEspecialista = []
                agenda.forEach(element => {
                    if (element.especialista_medico.persona.name.toLowerCase().startsWith(value.toLowerCase()) ||
                        element.especialista_medico.persona.lastName.toLowerCase().startsWith(value.toLowerCase())) {
                        filtroEspecialista.push(element)
                    }
                })
                if (!filtroEspecialista.length > 0) {
                    filtroEspecialista.push("No se encontró agenda con el especialista")
                }
                setAgendaFilter(filtroEspecialista)

            }

            if (estado === "especialidad") {
                let filtroEspecialidad = [];
                agenda.forEach(element => {
                    if (element.tipo_especialidad.name.normalize('NFD')
                        .replace(/([^n\u0300-\u036f]|n(?!\u0303(?![\u0300-\u036f])))[\u0300-\u036f]+/gi, "$1")
                        .normalize().toLowerCase().startsWith(value.toLowerCase())) {
                        filtroEspecialidad.push(element)
                    }
                })
                if (!filtroEspecialidad.length > 0) {
                    filtroEspecialidad.push("No se encontró agenda con la especialidad")
                }
                setAgendaFilter(filtroEspecialidad)
            }

            if (estado === "fecha") {
                let filtroFecha = [];
                agenda.forEach(element => {
                    if (element.date.split('T')[0].includes(value)) {
                        filtroFecha.push(element)
                    }

                })
                if (!filtroFecha.length > 0) {
                    filtroFecha.push("No se encontró agenda en la fecha seleccionada")
                }
                setAgendaFilter(filtroFecha)
            }
        }
    }

    const handleSelect = (event) => {
        const { value } = event.target
        if (value === "especialista") {
            setInput("")
            setEstado(value)
            setPlaceHolder("Buscar por nombre...")
            setAgendaFilter([])
        }
        if (value === "especialidad") {
            setInput("")
            setEstado(value)
            setPlaceHolder("Buscar por especialidad...")
            setAgendaFilter([])
        }
        if (value === "fecha") {
            setInput("")
            setEstado(value)
            setAgendaFilter([])
        }
    }

    const handleMisTurnos = (event) => {
        event.preventDefault();
        setAgendaFilter([])
    }


    return (
        <div className='homeSpecialist'>
            <Nav />
            {
                roles === '3' &&
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
               

                        {turnos?.length < 1 && <h3 className='error'><FontAwesomeIcon icon={faTimesCircle} /> No hay turnos para esta fecha</h3>}
                        {turnos?.length > 0 &&
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

                                    {turnos?.map((turno) => {
                                        return (

                                            <tr key={turno.idTurno} id={turno.idTurno} className='lista'>


                                                <td className='datos fecha'>{turno.fechaTurno}</td>
                                                <td className='datos turno'>{turno.horaTurno}</td>
                                                <td className='datos nombre'>{turno.name + ' ' + turno.lastName}</td>

                                                <td className='datos ver'><Link to={`/patientHistory/${turno.dniPaciente}`}>
                                                    <FontAwesomeIcon icon={faEye}
                                                        onClick={() => { handleDataPaciente(turno.dniPaciente) }} className='icono' />
                                                </Link></td>

                                            </tr>

                                        )
                                    })}
                                </tbody>
                            </>}


                    </table>
                </div>
            }
            {
                roles === '4' &&
                <div className="rol-4-user">
                    <div className="agenda">
                        {
                            pacienteDetail.length > 0 ? pacienteDetail[0]?.gender === 'femenino' ?
                                <span className="titulo">Bienvenida, {`${capitalFirstLetter(pacienteDetail[0].name)} ${capitalFirstLetter(pacienteDetail[0].lastName)}`}!</span>
                                : <span className="titulo">Bienvenido, {`${capitalFirstLetter(pacienteDetail[0].name)} ${capitalFirstLetter(pacienteDetail[0].lastName)}`}</span> : null
                        }
                    </div>

                    <div>
                        <>

                            <div className="searchAgenda">
                                <label className="label-title-search">Consultar Agenda</label>
                                <div>
                                    {
                                        estado === "fecha" ?
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

                                            />
                                    }
                                    <select onChange={handleSelect}>
                                        <option value="especialidad">Especialidad</option>
                                        <option value="especialista">Especialista</option>
                                        <option value="fecha">Fecha</option>
                                    </select>
                                </div>
                            </div>
                            <button onClick={openHistoriaClinica}>Consultar Historia Clínica</button>
                            <ModalHistoriaClinica isOpen={isOpenHistoriaClinica} closeModal={closeHistoriaClinica} >
                                <div>
                                    <div>
                                        <span>HISTORIA CLÍNICA</span>
                                        <div>
                                            <span>CÓDIGO: {pacienteDetail[0]?.paciente.historiaClinica.id}</span>
                                            <span>FECHA: {pacienteDetail[0]?.paciente.historiaClinica.creationDate}</span>

                                        </div>
                                    </div>
                                    <div>
                                        <span>INFORMACIÓN DEL PACIENTE</span>
                                        <div>
                                            <span>NOMBRE : {(pacienteDetail[0]?.name)}</span>
                                            <span>APELLIDO : {(pacienteDetail[0]?.lastName)}</span>
                                            <span>DNI : {pacienteDetail[0]?.dni}</span>
                                            <span>FECHA DE NACIMIENTO : {pacienteDetail[0]?.birth}</span>
                                        </div>
                                    </div>
                                    <div>
                                        <span>INFORMACIÓN DE CONTACTO</span>
                                        <div>
                                            <span>TELÉFONO: {pacienteDetail[0]?.phone}</span>
                                            <span>DIRECCIÓN: {pacienteDetail[0]?.adress}</span>
                                            <span>EMAIL: {pacienteDetail[0]?.email}</span>
                                            <span>CONTACTO DE EMERGENCIA: {pacienteDetail[0]?.paciente.emergencyContact}</span>
                                        </div>
                                    </div>
                                    <div>
                                        <span>CONDICIÓN MÉDICA PREVIA</span>
                                        <div>
                                            <span>ENFERMEDADES: {pacienteDetail[0]?.paciente.disease}</span>
                                            <span>MEDICACIÓN: {pacienteDetail[0]?.paciente.medication}</span>
                                        </div>
                                    </div>
                                    <div>
                                        <span>DIAGNÓSTICOS</span>
                                        {
                                            pacienteDetail[0].paciente.historiaClinica.diagnosticos.length > 0 ? 
                                            pacienteDetail[0].paciente.historiaClinica.diagnosticos.map(diagnostico => {
                                                return (
                                                    <>
                                                    <span>FECHA: {diagnostico.date}</span>
                                                    <span>DIAGNOSTICO:</span>
                                                    <span>{diagnostico.diagnostic}</span>
                                                    <span>DERIVACION: {diagnostico.derivation}</span>
                                                    </>
                                                )
                                            }) : <span>EL PACIENTE NO CUENTA CON DIAGNOSTICOS</span>
                                        }
                                        <div>

                                        </div>
                                    </div>
                                </div>


                            </ModalHistoriaClinica>
                            <button onClick={handleMisTurnos}>Mis Turnos</button>
                        </>
                        {agendaFilter && agendaFilter.length > 10 ? <Paginado agendaFilter={agendaFilter} /> : null}

                        {
                            agendaFilter.length > 0
                                ?
                                <div>
                                    <label>Agendas Médicas</label>
                                    <table>

                                        <tr>
                                            <th>Fecha</th>
                                            <th>Especialista</th>
                                            <th>Especialidad</th>
                                            <th>Ver</th>
                                        </tr>
                                        {typeof agendaFilter[0] === "string" ?
                                            <h1>{agendaFilter[0]}</h1> : agendaFilter.slice(valorPaginado, valorPaginado + 10).map(agenda => {
                                                return (
                                                    <Agenda
                                                        date={agenda.date.split('T')[0]} specialist={capitalFirstLetter(agenda.especialista_medico.persona.name)
                                                            + ' ' + capitalFirstLetter(agenda.especialista_medico.persona.lastName)}
                                                        specialty={agenda.tipo_especialidad.name} id={agenda.id} turnos={agenda.turnos}
                                                        turnosPrecargados={agenda.turnosPrecargados} hora={agenda.date}
                                                    />
                                                )
                                            })}



                                    </table>
                                </div>

                                :

                                <div id="edit-agenda-container">

                                    <div className="encabezado">
                                        <span className="title data">MIS TURNOS</span>
                                    </div>
                                    <div className="asignaciones">
                                        <table className="titles">
                                            <thead>
                                                <tr className="subtitle">
                                                    <th>FECHA</th>
                                                    <th>HORA</th>
                                                    <th>ESPECIALISTA</th>
                                                    <th>ESPECIALIDAD</th>
                                                </tr>
                                            </thead>

                                            {
                                                turnosDelPacienteSort.length > 0 ? turnosDelPacienteSort.map(turno => {

                                                    return (

                                                        <MisTurnosCard
                                                            date={turno.hour} nameEspecialista={turno.agenda.especialista_medico.persona.name}
                                                            lastNameEspecialista={turno.agenda.especialista_medico.persona.lastName}
                                                            especialidad={turno.agenda.tipo_especialidad.name} id={turno.id} paciente={turno.paciente}
                                                            carro={carro} setCarro={setCarro}
                                                        />

                                                    )
                                                }) : <span>No cuenta con turnos asignados</span>
                                            }

                                        </table>
                                    </div>
                                </div>
                        }

                    </div>
                    <div className='carro'><FontAwesomeIcon icon={faShoppingCart} onClick={openChangeTurno} className='carrito' /><span onClick={openChangeTurno} className='cantidad'>{carro.items.length}</span></div>
                    <Modal isOpen={isOpenChangeTurno} closeModal={closeChangeTurno}>
                        <CarroCompras carro={carro} setCarro={setCarro} />
                    </Modal>
                </div>
            }


        </div>
    )
}

