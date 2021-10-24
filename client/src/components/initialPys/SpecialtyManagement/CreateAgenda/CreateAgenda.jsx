import React, { useState } from "react";
import { useSelector } from "react-redux";
import Nav from '../../../Layout/Nav';
import './CreateAgenda.scss';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function CreateAgenda() {
    const capitalFirstLetter = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1)
    }

    /* dateStart: { value: startDate.toISOString().replace(/T.*$/, ''), error: null },*/
    const specialities = useSelector(state => state.especialidades)
    const specialists = useSelector(state => state.especialistas)
    const [startDate, setStartDate] = useState(new Date());
    let dateStart = startDate;

    const [inputCreateAgenda, setInputCreateAgenda] = useState({
        dateStart: { value: dateStart, error: null },
        dateEnd: { value: '', error: null },
        specialty: { value: '', error: 'Campo requerido' },
        specialist: { value: '', error: 'Campo requerido' },
        hourStart: { value: "", error: null },
        hourEnd: { value: "", error: null },
        shiftsDay: { value: "", error: null },

    })

    let types = [];
    inputCreateAgenda.specialist.value && specialists.map(element => {
        if (element.id === parseInt(inputCreateAgenda.specialist.value)) {
            types = element.specialty.split(', ')
        }
    });

    const handleCreateAgendaSpecialist = (event) => {
        const { value } = event.target
        if (value !== 'Especialista...') {
            setInputCreateAgenda({ ...inputCreateAgenda, specialist: { value, error: null } })
        }
    }

    const handleCreateAgendaSpecialty = (event) => {
        const { value } = event.target
        if (value !== 'Especialidad...') {
            setInputCreateAgenda({ ...inputCreateAgenda, specialty: { value, error: null } })
        }
    }

    return (
        <div id="createAgenda-container">
            <Nav />
            <div>
                <div>
                    <label>Seleccione Especialista</label>
                </div>
                {inputCreateAgenda.specialist.error && <span>{inputCreateAgenda.specialist.error}</span>}
                <select onChange={handleCreateAgendaSpecialist}>
                    <option>Especialista...</option>
                    {
                        specialists.length > 0 && specialists.map(specialist => {

                            return (
                                <>
                                    <option key={specialist.personaId} value={specialist.id} >
                                        {`${capitalFirstLetter(specialist.persona.name)} ${capitalFirstLetter(specialist.persona.lastName)}`}</option>
                                </>
                            )

                        })
                    }
                </select>
                <div>
                    <label>Seleccione Especialidad</label>
                </div>
                {inputCreateAgenda.specialty.error && <span>{inputCreateAgenda.specialty.error}</span>}
                <select onChange={handleCreateAgendaSpecialty}>
                    <option>Especialidades...</option>
                    {
                        types.length > 0 && types.map(type => {
                            return (
                                <>
                                    <option key={type + 'Cc'} value={type} id={type}  >{type}</option>
                                </>
                            )
                        })
                    }
                </select>
                <div>
                    <label>Fecha y hora inicial</label>
                    <DatePicker
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        minDate={startDate}
                        showTimeSelect
                        dateFormat="MMMM d, yyyy h:mm aa"
                        className="input-datePicker"

                    />
                    {console.log(startDate)}
                </div>
                <div>
                    <label>Fecha final</label>
                    <DatePicker
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        minDate={startDate}
                        className="input-datePicker"
                    />
                </div>
                <div>
                    <label>Seleccione la cantidad de turnos por día</label>
                    <input type="number" min="1" />
                </div>
            </div>
        </div>
    )
}

export default CreateAgenda;