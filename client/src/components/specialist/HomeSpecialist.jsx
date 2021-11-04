/* eslint-disable */

import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom";
import { useReactToPrint } from 'react-to-print';
import { obtenerAgendas, obtenerTurnos } from '../../actions/index.js';
import "react-datepicker/dist/react-datepicker.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import Nav from "../Layout/Nav"
import './HomeSpecialist.scss'
import axios from "axios"
import { rol, especialistaDetallado, pacienteDetallado, paginado } from "../../actions"
import MisTurnosCard from './MisTurnosCard.jsx';
import Agenda from './Agenda.jsx';
import { useModal } from "../Modal/useModal.js";
import Modal from '../Modal/Modal.js';
import ModalHistoriaClinica from '../Modal/ModalHistoriaClinica.js'
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
                    filtroEspecialista.push("No se encontró disponibilidad de agenda con el especialista requerido")
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
                    filtroEspecialidad.push("No se encontró disponibilidad de agenda con la especialidad requerida")
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

    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        
        content: () => componentRef.current,
        documentTitle: "MiHistoriaClinica",
    });


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
                    <div className="nombre-consulta">
                        <div className='front'>

                            {
                                pacienteDetail.length > 0 ? pacienteDetail[0]?.gender === 'femenino' ?
                                    <span className="titulo">Bienvenida, {`${capitalFirstLetter(pacienteDetail[0].name)} ${capitalFirstLetter(pacienteDetail[0].lastName)}`}!</span>
                                    : <span className="titulo">Bienvenido, {`${capitalFirstLetter(pacienteDetail[0].name)} ${capitalFirstLetter(pacienteDetail[0].lastName)}`}</span> : null
                            }
                            <div className='botones'>
                                <button onClick={handleMisTurnos} className='button'>Mis Turnos</button>
                                <button onClick={openHistoriaClinica} className='button'>Mi historia clínica</button>
                            </div>
                        </div>
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
                                            className='input'
                                        />
                                        :
                                        <input
                                            value={input}
                                            onChange={(e) => handleChange(e)}
                                            placeholder={placeHolder}
                                            className='input'
                                        />
                                }
                                <select onChange={handleSelect} className='select'>
                                    <option value="especialidad">Especialidad</option>
                                    <option value="especialista">Especialista</option>
                                    <option value="fecha">Fecha</option>
                                </select>

                        
                            </div>


                        </div>



                    </div>

                    <div className='carro'><FontAwesomeIcon icon={faShoppingCart} onClick={openChangeTurno} className='carrito' /><span onClick={openChangeTurno} className='cantidad'>{carro.items.length}</span></div>


                    <>


                        <ModalHistoriaClinica isOpen={isOpenHistoriaClinica} closeModal={closeHistoriaClinica} >
                            <>

                                <div className="rol-4-user" ref={componentRef}>

                                    <div className="contenido" >
                                        <label className="sub-title">HISTORIA CLÍNICA</label>
                                        <div className="">
                                            <span className="items-historia-clinica">CÓDIGO: {pacienteDetail[0]?.paciente.historiaClinica.id}</span>
                                            <span className="items-historia-clinica">FECHA: {pacienteDetail[0]?.paciente.historiaClinica.creationDate}</span>

                                        </div>
                                    </div>
                                    <div className="informacion">
                                        <span className="label-title-search">INFORMACIÓN DEL PACIENTE</span>
                                        <div className="contenido">
                                            <span className="items">NOMBRE : {(pacienteDetail[0]?.name)}</span>
                                            <span className="items">APELLIDO : {(pacienteDetail[0]?.lastName)}</span>
                                            <span className="items">DNI : {pacienteDetail[0]?.dni}</span>
                                            <span className="items">FECHA DE NACIMIENTO : {pacienteDetail[0]?.birth}</span>
                                        </div>
                                    </div>
                                    <div className="informacion">
                                        <span className="label-title-search">INFORMACIÓN DE CONTACTO</span>
                                        <div className="contenido">
                                            <span className="items">TELÉFONO: {pacienteDetail[0]?.phone}</span>
                                            <span className="items">DIRECCIÓN: {pacienteDetail[0]?.adress}</span>
                                            <span className="items">EMAIL: {pacienteDetail[0]?.email}</span>
                                            <span className="items">CONTACTO DE EMERGENCIA: {pacienteDetail[0]?.paciente.emergencyContact}</span>
                                        </div>
                                    </div>
                                   
                                    <div className="informacion">
                                        <span className="label-title-search">DIAGNÓSTICOS</span>
                                        {
                                            pacienteDetail[0]?.paciente.historiaClinica.diagnosticos.length > 0 ?
                                                pacienteDetail[0]?.paciente.historiaClinica.diagnosticos.map(diagnostico => {
                                                    return (
                                                        <div className="contenido">
                                                            <span className="items">FECHA: {diagnostico.date}</span>
                                                            <span className="items">DIAGNOSTICO:</span>
                                                            <span className="items">{diagnostico.diagnostic}</span>
                                                            <span className="items">DERIVACION: {diagnostico.derivation}</span>
                                                        </div>
                                                    )
                                                }) : <span className="items-historia-clinica">EL PACIENTE NO CUENTA CON DIAGNOSTICOS</span>
                                        }
                                        <div>

                                        </div>
                                    </div>
                                </div>
                                
                                <button className='button-pdf' onClick={handlePrint}>Generar PDF</button>
                                
                            </>

                        </ModalHistoriaClinica>
                    </>
                    {agendaFilter && agendaFilter.length > 10 ? <Paginado agendaFilter={agendaFilter} /> : null}

                    {
                        agendaFilter.length > 0
                            ?
                            <div className='editagendacontainer'>
                                <div className='encabezado'>
                                    <label className='title'>AGENDAS MÉDICAS</label>
                                </div>
                                {typeof agendaFilter[0] === "string" ?
                                    <span className='error2'>{agendaFilter[0]}</span> :
                                    <div className='asignaciones'>
                                        <table className='titles'>

                                            <tr className='subtitle'>
                                                <th className='th'>Fecha</th>
                                                <th className='th'>Especialista</th>
                                                <th className='th'>Especialidad</th>
                                                <th className='th'>Ver</th>
                                            </tr>
                                            {agendaFilter.slice(valorPaginado, valorPaginado + 10).map(agenda => {
                                                return (
                                                    <Agenda
                                                        date={agenda.date.split('T')[0]} specialist={capitalFirstLetter(agenda.especialista_medico.persona.name)
                                                            + ' ' + capitalFirstLetter(agenda.especialista_medico.persona.lastName)}
                                                        specialty={agenda.tipo_especialidad.name} id={agenda.id} turnos={agenda.turnos}
                                                        turnosPrecargados={agenda.turnosPrecargados} hora={agenda.date}
                                                    />
                                                )
                                            })}
                                        </table></div>}



                            </div>

                            :

                            <div className="editagendacontainer">

                                <div className="encabezado">
                                    <span className="title">MIS TURNOS</span>
                                </div>
                                <div className="asignaciones">


                                    {
                                        turnosDelPacienteSort.length > 0 ?

                                            <table className="titles">
                                                <thead>
                                                    <tr className="subtitle">
                                                        <th className='th'>Fecha</th>
                                                        <th className='th'>Hora</th>
                                                        <th className='th'>Especialista</th>
                                                        <th className='th'>Especialidad</th>
                                                        <th className='th'>Estado</th>
                                                        <th className='th'>Acciones</th>
                                                    </tr>
                                                </thead>

                                                {turnosDelPacienteSort.map(turno => {

                                                    return (

                                                        <MisTurnosCard
                                                            date={turno.hour} nameEspecialista={turno.agenda.especialista_medico.persona.name}
                                                            lastNameEspecialista={turno.agenda.especialista_medico.persona.lastName}
                                                            especialidad={turno.agenda.tipo_especialidad.name} id={turno.id} paciente={turno.paciente}
                                                            carro={carro} setCarro={setCarro} status={turno.status} agenda={turno.agenda}
                                                        />

                                                    )
                                                })}
                                            </table> : <span className='error'>No cuenta con turnos asignados</span>
                                    }

                                </div>
                            </div>
                    }

                    <Modal isOpen={isOpenChangeTurno} closeModal={closeChangeTurno}>
                        <CarroCompras carro={carro} setCarro={setCarro} />
                    </Modal>
                </div>
            }


        </div>
    )
}

