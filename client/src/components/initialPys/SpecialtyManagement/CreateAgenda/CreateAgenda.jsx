/* eslint-disable */
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Nav from '../../../Layout/Nav';
import './CreateAgenda.scss';
import "react-datepicker/dist/react-datepicker.css";
import { crearAgenda, crearMultipleAgenda } from '../../../../actions/index.js';

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
        dateEnd: { value: '', error: null },  // VA A PERMITIR CREAR AGENDAS POR MULTIPLES DÍAS CONSECUTIVOS
        specialty: { value: '', error: 'Campo requerido' }, // Especialidad
        specialist: { value: '', error: 'Campo requerido' }, // Especialista
        shiftsDay: { value: "", error: 'Seleccione los turnos por día' }, //Turnos por día

    })


    const dateMin = () => {
        var today = new Date();
        var day = today.getDate();
        var mounth = today.getMonth() + 1;
        var year = today.getFullYear();

        if (day < 10) {
            day = '0' + day;
        }
        if (mounth < 10) {
            mounth = '0' + mounth;
        }

        today = `${year}-${mounth}-${day}T00:00`

        return today;
    }


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


    const handleCreateAgendaDateEnd = (event) => {
        const { value } = event.target;
        setInputCreateAgenda({ ...inputCreateAgenda, dateEnd: { value, error: null } })
    }


    const handleCreateAgendaShift = (event) => {
        const { value } = event.target;
        setInputCreateAgenda({ ...inputCreateAgenda, shiftsDay: { value, error: null } })
    }

    const agendasMultiples = (dateStart, dateEnd) => {

        //if (!dateEnd) return [dateStart]
        if (dateStart.split('T')[0] === dateEnd) return [dateStart]

        let hourAgenda = dateStart.split('T')[1]

        let dayStart = parseInt(dateStart.split('T')[0].split('-')[2])
        let mounthStart = parseInt(dateStart.split('T')[0].split('-')[1])
        let yearStart = parseInt(dateStart.split('T')[0].split('-')[0])

        let dayEnd = parseInt(dateEnd.split('T')[0].split('-')[2])
        let mounthEnd = parseInt(dateEnd.split('T')[0].split('-')[1])
        let yearEnd = parseInt(dateEnd.split('T')[0].split('-')[0])

        let newDay = 1;
        let newsAgendas = [];
        let newDateMounthOne = [];
        let newDateMounthTwo = [];


        if (yearStart === yearEnd && mounthStart === mounthEnd) {
            let formatMount = '';
            let formatDay = '';

            while (dayStart <= dayEnd) {

                if (mounthStart < 10) {
                    formatMount = `0${mounthStart}`
                } else {
                    formatMount = `${mounthStart}`
                }

                if (dayStart < 10) {
                    formatDay = `0${dayStart}`
                } else {
                    formatDay = `${dayStart}`
                }

                newsAgendas.push(`${yearStart}-${formatMount}-${formatDay}T${hourAgenda}`)
                dayStart++
            }


        }

        if (yearStart === yearEnd && mounthStart + 1 === mounthEnd) {
            let formatMount = '';
            let formatDay = '';
            let newMounth = mounthStart;
            if (newMounth < mounthEnd) {

                if (mounthStart === 8 || mounthStart === 9 || mounthStart === 10 || mounthStart === 11 || mounthStart === 12) {

                    if (mounthStart % 2 === 1) {
                        while (dayStart <= 30) {

                            if (mounthStart < 10) {
                                formatMount = `0${mounthStart}`
                            } else {
                                formatMount = `${mounthStart}`
                            }

                            if (dayStart < 10) {
                                formatDay = `0${dayStart}`
                            } else {
                                formatDay = `${dayStart}`
                            }

                            newDateMounthOne.push(`${formatMount}-${formatDay}`)
                            dayStart++
                        }
                        newMounth++

                    } else if (mounthStart % 2 === 0) {
                        while (dayStart <= 31) {

                            if (mounthStart < 10) {
                                formatMount = `0${mounthStart}`
                            } else {
                                formatMount = `${mounthStart}`
                            }

                            if (dayStart < 10) {
                                formatDay = `0${dayStart}`
                            } else {
                                formatDay = `${dayStart}`
                            }

                            newDateMounthOne.push(`${formatMount}-${formatDay}`)
                            dayStart++
                        }
                        newMounth++

                    }
                } else {
                    if (mounthStart % 2 === 1) {
                        while (dayStart <= 31) {

                            if (mounthStart < 10) {
                                formatMount = `0${mounthStart}`
                            } else {
                                formatMount = `${mounthStart}`
                            }

                            if (dayStart < 10) {
                                formatDay = `0${dayStart}`
                            } else {
                                formatDay = `${dayStart}`
                            }

                            newDateMounthOne.push(`${formatMount}-${formatDay}`)
                            dayStart++
                        }
                        newMounth++

                    } else if (mounthStart % 2 === 0 && mounthStart !== 2) {
                        while (dayStart <= 30) {

                            if (mounthStart < 10) {
                                formatMount = `0${mounthStart}`
                            } else {
                                formatMount = `${mounthStart}`
                            }

                            if (dayStart < 10) {
                                formatDay = `0${dayStart}`
                            } else {
                                formatDay = `${dayStart}`
                            }

                            newDateMounthOne.push(`${formatMount}-${formatDay}`)
                            dayStart++
                        }
                        newMounth++

                    } else if (mounthStart === 2) {
                        while (dayStart <= 28) {

                            if (mounthStart < 10) {
                                formatMount = `0${mounthStart}`
                            } else {
                                formatMount = `${mounthStart}`
                            }

                            if (dayStart < 10) {
                                formatDay = `0${dayStart}`
                            } else {
                                formatDay = `${dayStart}`
                            }

                            newDateMounthOne.push(`${formatMount}-${formatDay}`)
                            dayStart++
                        }
                        newMounth++

                    }
                }


            }

            if (newMounth === mounthEnd) {

                while (newDay <= dayEnd) {

                    if (mounthEnd < 10) {
                        formatMount = `0${mounthEnd}`
                    } else {
                        formatMount = `${mounthEnd}`
                    }

                    if (newDay < 10) {
                        formatDay = `0${newDay}`
                    } else {
                        formatDay = `${newDay}`
                    }

                    newDateMounthTwo.push(`${formatMount}-${formatDay}`)
                    newDay++
                }


            }

            newDateMounthOne.forEach(date => {
                newsAgendas.push(`${yearStart}-${date}T${hourAgenda}`)
            })

            newDateMounthTwo.forEach(date => {
                newsAgendas.push(`${yearStart}-${date}T${hourAgenda}`)
            })



        }


        if (yearStart + 1 === yearEnd && mounthStart === 12 && mounthEnd === 1) {
            let formatMount = '';
            let formatDay = '';
            while (dayStart <= 31) {

                if (dayStart < 10) {
                    formatDay = `0${dayStart}`
                } else {
                    formatDay = `${dayStart}`
                }

                newDateMounthOne.push(`${mounthStart}-${formatDay}`)
                dayStart++
            }

            while (newDay <= dayEnd) {

                formatMount = `0${mounthEnd}`

                if (newDay < 10) {
                    formatDay = `0${newDay}`
                } else {
                    formatDay = `${newDay}`
                }

                newDateMounthTwo.push(`${formatMount}-${formatDay}`)
                newDay++
            }

            newDateMounthOne.forEach(date => {
                newsAgendas.push(`${yearStart}-${date}T${hourAgenda}`)
            })

            newDateMounthTwo.forEach(date => {
                newsAgendas.push(`${yearEnd}-${date}T${hourAgenda}`)
            })
        }


        return newsAgendas;


    }



    const arrayCreateAgendaSinFestivos = (array) => {

        var arrayFinal = [];
        var aux = null
        array.forEach(date => {
            aux = new Date(date.split('T')[0]).getUTCDay()
            if (aux === 6 || aux === 0) {


            } else {
                arrayFinal.push(date);
            }
        })

        return arrayFinal;

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

                if (inputCreateAgenda.dateEnd.value.length > 0) {

                    var newCreateAgendasConFestivos = agendasMultiples(inputCreateAgenda.dateStart.value, inputCreateAgenda.dateEnd.value)
                    //console.log(newCreateAgendasConFestivos)

                    var agendaSinFestivos = arrayCreateAgendaSinFestivos(newCreateAgendasConFestivos);

                    //console.log(agendaSinFestivos)

                    let newAgenda = {
                        idSpecialist: parseInt(inputCreateAgenda.specialist.value),
                        idSpecialties: idSpecialty[0].id,
                        date: agendaSinFestivos,
                        amount: inputCreateAgenda.shiftsDay.value
                    }

                    let consulta = false;

                    agenda.forEach(elemento => {

                        newAgenda.date.forEach(date => {

                            let diaAgenda = elemento.date.split('T')[0]
                            let dia = date.split('T')[0] //let dia = newAgenda.date.split('T')[0]
                            let especialistaAgenda = elemento.especialista_medico.id
                            let especialista = newAgenda.idSpecialist;


                            if (dia === diaAgenda && especialistaAgenda === especialista) {
                                consulta = true;
                            }
                        })

                    })

                    if (consulta === true) {
                        swal({

                            title: "Error",
                            text: `El especialista ya se encuentra registrado el dia seleccionado `,
                            icon: "warning",

                        })

                        setInputCreateAgenda({
                            dateStart: { value: '', error: 'Seleccione una fecha y hora' },
                            dateEnd: { value: '', error: null },
                            specialty: { value: '', error: 'Campo requerido' }, // Especialidad
                            specialist: { value: '', error: 'Campo requerido' }, // Especialista
                            shiftsDay: { value: "", error: 'Seleccione los turnos por día' }, //Turnos por día

                        })
                        
                    } else {

                        dispatch(crearMultipleAgenda(newAgenda));

                        swal({

                            title: "Agenda médica creada",
                            text: `La agenda del especialista se creó correctamente `,
                            icon: "success",

                        })

                        setInputCreateAgenda({
                            dateStart: { value: '', error: 'Seleccione una fecha y hora' },
                            dateEnd: { value: '', error: null },
                            specialty: { value: '', error: 'Campo requerido' }, // Especialidad
                            specialist: { value: '', error: 'Campo requerido' }, // Especialista
                            shiftsDay: { value: "", error: 'Seleccione los turnos por día' }, //Turnos por día

                        })
                    }


                } else {

                    let newAgenda = {
                        idSpecialist: parseInt(inputCreateAgenda.specialist.value),
                        idSpecialties: idSpecialty[0].id,
                        date: inputCreateAgenda.dateStart.value,
                        amount: inputCreateAgenda.shiftsDay.value
                    }

                    let consulta = false;

                    agenda.forEach(elemento => {

                        let diaAgenda = elemento.date.split('T')[0]
                        let dia = newAgenda.date.split('T')[0] //let dia = newAgenda.date.split('T')[0]
                        let especialistaAgenda = elemento.especialista_medico.id
                        let especialista = newAgenda.idSpecialist;


                        if (dia === diaAgenda && especialistaAgenda === especialista) {
                            consulta = true;
                        }


                    })

                    if (consulta === true) {
                        swal({

                            title: "Error",
                            text: `El especialista ya se encuentra registrado el dia seleccionado `,
                            icon: "warning",

                        })

                        setInputCreateAgenda({
                            dateStart: { value: '', error: 'Seleccione una fecha y hora' },
                            dateEnd: { value: '', error: null },
                            specialty: { value: '', error: 'Campo requerido' }, // Especialidad
                            specialist: { value: '', error: 'Campo requerido' }, // Especialista
                            shiftsDay: { value: "", error: 'Seleccione los turnos por día' }, //Turnos por día

                        })
                        
                    }else {

                        dispatch(crearAgenda(newAgenda));

                        swal({

                            title: "Agenda médica creada",
                            text: `La agenda del especialista se creó correctamente `,
                            icon: "success",

                        })

                        setInputCreateAgenda({
                            dateStart: { value: '', error: 'Seleccione una fecha y hora' },
                            dateEnd: { value: '', error: null },
                            specialty: { value: '', error: 'Campo requerido' }, // Especialidad
                            specialist: { value: '', error: 'Campo requerido' }, // Especialista
                            shiftsDay: { value: "", error: 'Seleccione los turnos por día' }, //Turnos por día

                        })
                    }
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
                        min={dateMin()}
                        name="dateStart"
                        value={inputCreateAgenda.dateStart.value}
                        onChange={handleCreateAgendaDateStart}
                        className='select'
                    />

                    {inputCreateAgenda.dateStart.error && <span className='error'>{inputCreateAgenda.dateStart.error}</span>}


                </div>
                <div className='seccion'>
                    <label htmlFor="dateEnd" className='title'>Fecha final de agenda (Opcional)</label>
                    <input
                        type="date"
                        min={inputCreateAgenda.dateStart.value.split('T')[0]}
                        name="dateEnd"
                        value={inputCreateAgenda.dateEnd.value}
                        onChange={handleCreateAgendaDateEnd}
                        className='select'
                    />




                </div>

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

