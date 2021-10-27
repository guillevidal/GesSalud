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
    const agenda = useSelector(allAgenda => allAgenda.agendas)
    const agendaSort = agenda.sort((a, b) => {
        if (a.date > b.date) return 1;
        if (a.date < b.date) return -1;
        return 0;
    })
    const specialties = useSelector(state => state.especialistas)
  
    const [agendaFilter, setAgendaFilter] = useState([]);

    const [inputSearchDay, setInputSearchDay] = useState({
        date: { value: '', error: 'Seleccione una fecha' }
    })

    const [validation, setValidation] = useState(true)


    const handleSearchDay = (event) => {
        const { value } = event.target
        setInputSearchDay({ ...inputSearchDay, date: { value, error: null } })
    }


    const handleSubmitSearchDay = (event) => {
        event.preventDefault();
        if (!inputSearchDay.date.error) {
            if (inputSearchDay.date.value.length === 0) {
                setValidation(false);
            } else {
                let agendas = [];
                agendas = agenda.filter(agenda => {
                    return agenda.date.split('T')[0] === inputSearchDay.date.value

                })
                return setAgendaFilter(

                    agendas
                )

            }
        }
    }

    const handleAllAgenda = (event) => {
        event.preventDefault();
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

                            <input
                                type="date"
                                min={new Date()}
                                value={inputSearchDay.date.value}
                                onChange={handleSearchDay}
                            />
                            <button onClick={handleSubmitSearchDay} className='boton'>BUSCAR</button>
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
                        agendaFilter.length > 0 ? agendaFilter.map(agenda => {
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
                        }) :
                            agendaSort ? agendaSort.map(agenda => {
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
                            }) : <h4>NO HAY AGENDA CREADA</h4>
                    }

                </div>
            </div>
    )
}

export default InitialSpecialty;

