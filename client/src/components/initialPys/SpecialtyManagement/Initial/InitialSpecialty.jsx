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
    const [startDate, setStartDate] = useState(new Date());
    const [inputSearch, setInputSearch] = useState({
        date: { value: new Date(startDate.toISOString().replace(/T.*$/, '')), error: null },
        name: { value: '', error: null },
        specialty: { value: '', error: 'Campo requerido' }
    })

    const [validation, setValidation] = useState(true)

    let types = [];
    inputSearch.name.value && specialties.map(element => {
        if (element.id === parseInt(inputSearch.name.value)) {
            types = element.specialty.split(', ')
        }
    });

    const handleSearchSpecialist = (event) => {
        const { value } = event.target
        if (value === "" || value === 'Especialista...') {
            setInputSearch({ ...inputSearch, name: { value, error: "Campo requerido" } })
        } else {
            setInputSearch({ ...inputSearch, name: { value, error: null } })
        }
    }

    const handleSearchType = (event) => {
        const { value } = event.target
        if (value !== 'Especialidad...') {
            setInputSearch({ ...inputSearch, specialty: { value, error: null } })
        }
    }

    /*
    const handleSubmitSearch = (event) => {
    event.preventDefault();
    if (!inputSearch.date.error && !inputSearch.name.error && !inputSearch.specialty.error) {
      if (inputSearch.date.value.length === 0 || inputSearch.name.value.length === 0 || inputSearch.specialty.value.length === 0) {
        setValidation(false)
      } else {
        //dispatch(ACTION DE BUSQUEDA(inputSearch))
        setInputSearch({
          date: { value: startDate.toISOString().replace(/T.*$/, ''), error: null },
        name: { value: '', error: null },
        specialty: { value: '', error: 'Campo requerido' }
        })
        return
      }
    } else {
      setValidation(false);
      return
    }
  }
    */

    return (
        <div id="initialSpecialty-container">
            <Nav />
            <div className="initialSpecialty">
                <div>
                    <div className="boton-crear-search">
                        <Link to="/createAgenda">
                            <button className="boton-action">CREAR AGENDA</button>
                        </Link>
                    </div>
                    <div className="searchAgenda">
                        <label className="label-title-search">FILTRAR AGENDA</label>
                        <div className="searchAgenda">
                            <label>Seleccione fecha</label>
                            <DatePicker
                                selected={startDate}
                                onChange={(date) => setStartDate(date)}
                                minDate={startDate}
                            />
                        </div>
                        <div className="searchAgenda">
                            <div>
                                <label >Seleccione especialista médico</label>
                            </div>
                            {inputSearch.name.error && <span className="error-label">{inputSearch.name.error}</span>}

                            <div>
                                <select onChange={handleSearchSpecialist}>
                                    <option>Especialista...</option>
                                    {
                                        specialties.length > 0 && specialties.map(type => {
                                            return (
                                                <>
                                                    <option key={type.id + type.persona.name + 'aa'} id={type.persona.name} value={type.id}>
                                                        {`${capitalFirstLetter(type.persona.name)} ${capitalFirstLetter(type.persona.lastName)}`}</option>
                                                </>
                                            )
                                        })
                                    }
                                </select>
                            </div>

                        </div>
                        <div className="searchAgenda">
                            <div>
                                <label >Seleccione especialidad</label>
                            </div>
                            {inputSearch.specialty.error && <span className='error-label'>{inputSearch.specialty.error}</span>}
                            <div>
                                <select onChange={handleSearchType}>
                                    <option>Especialidad...</option>
                                    {
                                        types.length > 0 && types.map(element => {
                                            return (
                                                <>
                                                    <option key={element + 'bb'} id={element} value={element} >{element}</option>
                                                </>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                        </div>
                        <div className="boton-crear-search">
                            {!validation && <span className="error-label">Completa correctamente el formulario</span>}
                            <button className="boton-action">BUSCAR</button>
                        </div>
                    </div>

                </div>
                <div>
                    <label>AGENDA MEDICA</label>

                    <div className="agenda-header-container">
                        <div><p>DIA</p></div>
                        
                        <div><p>ESPECIALISTA</p></div>
                        <div><p>ESPECIALIDAD</p></div>
                        
                    </div>
                    {
                        agendaSort ? agendaSort.map(agenda => {
                            return (
                                <div>
                                    <Agenda date={agenda.date.split('T')[0]} specialist={capitalFirstLetter(agenda.especialista_medico.persona.name)
                                        + ' ' + capitalFirstLetter(agenda.especialista_medico.persona.lastName)}
                                        specialty={agenda.tipo_especialidad.name} turno={agenda.turnos.length > 0 ? agenda.turnos[0] : <span>Agenda disponible</span>}
                                        hour={agenda.date.split('T')[1]}
                                    />
                                    <Link to={`especialistaPys/agenda/${agenda.id}`}>
                                        <button>VER MAS</button>
                                    </Link>
                                    
                                </div>

                            )
                        }) : <h4>NO HAY AGENDA CREADA</h4>
                    }

                </div>
            </div>
        </div>
    )
}

export default InitialSpecialty;