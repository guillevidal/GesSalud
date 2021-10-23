/* eslint-disable */
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import './InitialSpecialty.scss';
import Nav from '../../../Layout/Nav';
import { obtenerEspecialistas } from '../../../../actions/index';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function InitialSpecialty() {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(obtenerEspecialistas())
    }, [])
    const specialties = useSelector(state => state.especialistas)
    const [startDate, setStartDate] = useState(new Date());
    const [inputSearch, setInputSearch] = useState({
        date: { value: startDate.toISOString().replace(/T.*$/, ''), error: null },
        name: { value: '', error: null },
        specialty: { value: '', error: 'Campo requerido' }
    })

    const [validation, setValidation] = useState(true)

    let types = [];
    inputSearch.name.value && specialties.map(element => {
        if (element.persona.name === inputSearch.name.value) {
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
            <div className="search-agenda">
                <div>
                    <div>
                        <div>
                            <label>Seleccione fecha</label>
                            <DatePicker
                                selected={startDate}
                                onChange={(date) => setStartDate(date)}
                                minDate={startDate}
                            />
                        </div>
                        <div>
                            <div>
                                <label>Seleccione especialista médico</label>
                            </div>
                            {inputSearch.name.error && <span>{inputSearch.name.error}</span>}
                            <select onChange={handleSearchSpecialist}>
                                <option>Especialista...</option>
                                {
                                    specialties.length > 0 && specialties.map(type => {
                                        return (
                                            <>
                                                <option key={type.personaId} id={type.persona.name} value={type.persona.name}>{type.persona.name}</option>
                                            </>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        <div>
                            <div>
                                <label>Seleccione especialidad</label>
                            </div>
                            {inputSearch.specialty.error && <span>{inputSearch.specialty.error}</span>}
                            <select onChange={handleSearchType}>
                                <option>Especialidad...</option>
                                {
                                    types.length > 0 && types.map(element => {
                                        return (
                                            <>
                                                <option key={element} id={element} value={element} >{element}</option>
                                            </>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        <div>
                            {!validation && <span>Completa correctamente el formulario</span>}
                            <button>BUSCAR</button>
                        </div>
                    </div>
                    <div>
                        <Link to="/createAgenda">
                            <button>CREAR AGENDA</button>
                        </Link>
                    </div>
                </div>
                <div>
                    <h4>ACA VA FULL CALENDAR</h4>
                </div>
            </div>
        </div>
    )
}

export default InitialSpecialty;