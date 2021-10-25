/* eslint-disable */
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Nav from '../../../Layout/Nav';
import './CreateAgenda.scss';
//import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { crearAgenda } from '../../../../actions/index.js';

function CreateAgenda() {
    const dispatch = useDispatch();
    const capitalFirstLetter = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1)
    }

    /* dateStart: { value: startDate.toISOString().replace(/T.*$/, ''), error: null },*/
    const specialities = useSelector(state => state.especialidades)
    const specialists = useSelector(state => state.especialistas)
    const agenda = useSelector(state => state.agendas)
    // const [startDate, setStartDate] = useState(new Date());

    const [validation, setValidation] = useState(true)
    const [inputCreateAgenda, setInputCreateAgenda] = useState({
        dateStart: { value: '', error: 'Seleccione una fecha y hora' },
        //dateEnd: { value: '', error: 'Seleccione una fecha' },  // VA A PERMITIR CREAR AGENDAS POR MULTIPLES DÍAS CONSECUTIVOS
        specialty: { value: '', error: 'Campo requerido' }, // Especialidad
        specialist: { value: '', error: 'Campo requerido' }, // Especialista
        shiftsDay: { value: "", error: 'Seleccione los turnos por día' }, //Turnos por día

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

    const handleCreateAgendaDateStart = (event) => {
        const { value } = event.target;
        setInputCreateAgenda({ ...inputCreateAgenda, dateStart: { value, error: null } })
    }

    /*
    const handleCreateAgendaDateEnd = (event) => {
        const { value } = event.target;
        setInputCreateAgenda({ ...inputCreateAgenda, dateEnd: { value, error: null } })
    }
    */

    const handleCreateAgendaShift = (event) => {
        const { value } = event.target;
        setInputCreateAgenda({ ...inputCreateAgenda, shiftsDay: { value, error: null } })
    }

    /*
    let shiftPerSpecialty = 0;
    if (inputCreateAgenda.specialty.value) {
        specialities.forEach(type => {
            if (type.name.toLowerCase() === inputCreateAgenda.specialty.value.toLowerCase()) {
                shiftPerSpecialty = type.modulo_atencion * 15;
            }
        })
        //console.log(shiftPerSpecialty)
    }
    */
   /*

    function clockMinuteAdder(time, min) {
        let [hours, minutes] = time.split(':');

        let totalMinutes = min + parseInt(minutes);
        let totalHours = parseInt(hours) + Math.floor(minutes / 60);

        let newHours = ((totalHours - 1) % 24) + 1;
        let newMinutes = totalMinutes % 60;

        let formatHours = newHours > 9 ? newHours : `0${newHours}`;
        let formatMinutes = newMinutes > 9 ? newMinutes : `0${newMinutes}`;

        return `${formatHours}:${formatMinutes}`
    }
    */
   
    const handleSubmitCreateAgenda = (event) => {
        event.preventDefault();

        if (!inputCreateAgenda.dateStart.error && !inputCreateAgenda.specialty.error
            && !inputCreateAgenda.specialist.error && !inputCreateAgenda.shiftsDay.error) {

            if (inputCreateAgenda.dateStart.value.length === 0 || inputCreateAgenda.specialty.value.length === 0
                || inputCreateAgenda.specialist.value.length === 0 || inputCreateAgenda.shiftsDay.value.length === 0) {
                setValidation(false)
            } else {
                let idSpecialty = specialities.filter(types => {
                    return types.name.toLowerCase() === inputCreateAgenda.specialty.value.toLowerCase()
                });

                let newAgenda = {
                    idSpecialist: parseInt(inputCreateAgenda.specialist.value),
                    idSpecialties: idSpecialty[0].id,
                    date: inputCreateAgenda.dateStart.value,
                    amount: inputCreateAgenda.shiftsDay.value
                }
                // console.log(newAgenda.date.split('T')[0] + '---------------------')
                // console.log(newAgenda.date.split('T')[0].toString())
                // console.log(newAgenda)
                for (let i = 0; i < agenda.length; i++) {
                    if (agenda[i].especialista_medico.id === parseInt(newAgenda.idSpecialist)
                        && agenda[i].tipo_especialidad.id === parseInt(newAgenda.idSpecialties)
                        && agenda[i].date.split('T')[0] === newAgenda.date.split('T')[0]) {
                            return alert('La agenda ya existe')
                        
                    } 
                }

                dispatch(crearAgenda(newAgenda));
                        swal({

                            title: "Agenda médica creada",
                            text: `La agenda del especialista se creó correctamente `,
                            icon: "success",

                        })

                        setInputCreateAgenda({
                            dateStart: { value: '', error: 'Seleccione una fecha y hora' },
                            dateEnd: { value: '', error: 'Seleccione una fecha' },
                            specialty: { value: '', error: 'Campo requerido' }, // Especialidad
                            specialist: { value: '', error: 'Campo requerido' }, // Especialista
                            shiftsDay: { value: "", error: 'Seleccione los turnos por día' }, //Turnos por día

                        })
                        return

            }
        } else {
            setValidation(false)
            return
        }

    }

    return (
        <div id="createAgenda-container">
            <Nav />
            <div>
                <div>
                    <Link to="/especialistaPys" >
                        <button>VOLVER</button>
                    </Link>
                </div>
                <form>
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
                        <label htmlFor="dateStart">Fecha y hora inicial de agenda</label>
                        {inputCreateAgenda.dateStart.error && <span>{inputCreateAgenda.dateStart.error}</span>}
                        <input
                            type="datetime-local"
                            min={new Date()}
                            name="dateStart"
                            value={inputCreateAgenda.dateStart.value}
                            onChange={handleCreateAgendaDateStart}
                        />

                    </div>
                    {/*
                    <div>
                        <label htmlFor="dateEnd">Fecha final de agenda</label>
                        {inputCreateAgenda.dateEnd.error && <span>{inputCreateAgenda.dateEnd.error}</span>}
                        <input

                            type="date"
                            min={new Date()}
                            name="dateEnd"
                            value={inputCreateAgenda.dateEnd.value}
                            onChange={handleCreateAgendaDateEnd}

                        />
                    </div>
                    */}
                    <div>
                        <label htmlFor="shiftsDay">Cantidad de turnos por día</label>
                        {inputCreateAgenda.shiftsDay.error && <span>{inputCreateAgenda.shiftsDay.error}</span>}
                        <input

                            type="number"
                            min="1"
                            name="shiftsDay"
                            value={inputCreateAgenda.shiftsDay.value}
                            onChange={handleCreateAgendaShift}

                        />
                    </div>

                    <div>
                        {!validation && <span className='error-label'>Completa correctamente el formulario</span>}
                        <button onClick={handleSubmitCreateAgenda}>CREAR AGENDA</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreateAgenda;

/*
<DatePicker
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        minDate={startDate}
                        showTimeSelect
                        dateFormat="MMMM d, yyyy h:mm aa"
                        className="input-datePicker"

                    />
*/