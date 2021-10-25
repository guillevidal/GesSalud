/* eslint-disable */
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Nav from '../../../Layout/Nav';
import './CreateAgenda.scss';
import "react-datepicker/dist/react-datepicker.css";
import { crearAgenda } from '../../../../actions/index.js';

function CreateAgenda() {
    const dispatch = useDispatch();
    const capitalFirstLetter = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1)
    }

    
    const specialities = useSelector(state => state.especialidades)
    const specialists = useSelector(state => state.especialistas)
    const agenda = useSelector(state => state.agendas)
    

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


                let consulta = false;

                agenda.forEach(elemento => {
                    let diaAgenda = elemento.date.split('T')
                    let dia = newAgenda.date.split('T')
                    let especialistaAgenda = elemento.especialista_medico.id
                    let especialista = newAgenda.idSpecialist;

                    if(dia[0] === diaAgenda[0] && especialistaAgenda === especialista){
                        consulta = true;
                    }
                
                })

                if(consulta === true){
                    swal({

                        title: "Error",
                        text: `El especialista ya se encuentra registrado el dia seleccionado `,
                        icon: "warning",

                    })
                }
                else{
                   
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
                    }

            
        }
     } else {
            setValidation(false)
            return
        }

    }

    return (
        <div id="createAgenda-container">
            <Nav />
                <div className='volver'>
                    <Link to="/especialistaPys" >
                        <button className='elbotonazo'>VOLVER</button>
                    </Link>
                </div>
                <form className='formulario'>
                    <div className='seccion'>
                        <label className='title'>Seleccione Especialista</label>
                    
                   <select onChange={handleCreateAgendaSpecialist} className='select'>
                       <option>Especialista</option>
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
                    {inputCreateAgenda.specialist.error && <span className='error'>{inputCreateAgenda.specialist.error}</span>}
                    
                    </div>
                    <div className='seccion'>
                        <label className='title'>Seleccione Especialidad</label>
                    
                    <select onChange={handleCreateAgendaSpecialty} className='select'>
                    <option>Especialidades</option>
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
                    {inputCreateAgenda.specialty.error && <span className='error'>{inputCreateAgenda.specialty.error}</span>}
                   
                    </div>
                    <div className='seccion'>
                        <label htmlFor="dateStart" className='title'>Fecha y hora inicial de agenda</label>
                       <input
                            type="datetime-local"
                            min={new Date()}
                            name="dateStart"
                            value={inputCreateAgenda.dateStart.value}
                            onChange={handleCreateAgendaDateStart}
                            className='select'
                        />

                    {inputCreateAgenda.dateStart.error && <span className='error'>{inputCreateAgenda.dateStart.error}</span>}
                       

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
                    <div className='seccion'>
                        <label htmlFor="shiftsDay" className='title'>Cantidad de turnos por día</label>
                         <input

                            type="number"
                            min="1"
                            name="shiftsDay"
                            value={inputCreateAgenda.shiftsDay.value}
                            onChange={handleCreateAgendaShift}
                            className='select'

                        />
                    {inputCreateAgenda.shiftsDay.error && <span className='error'>{inputCreateAgenda.shiftsDay.error}</span>}
                      
                    </div>

                    {!validation && <span className='error-label'>Completa correctamente el formulario</span>}
                      

                    <div>
                         <button onClick={handleSubmitCreateAgenda} className='boton'>CREAR AGENDA</button>
                    </div>
                </form>
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