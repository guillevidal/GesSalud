import './EditAgenda.scss';
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import Nav from "../../../Layout/Nav"

function EditAgenda() {
    let { id } = useParams()
    const capitalFirstLetter = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1)
    }
    const agendas = useSelector(state => state.agendas)
    const specialities = useSelector(state => state.especialidades)
    const specialists = useSelector(state => state.especialistas)
    
    
    let agendaId = agendas.length > 0 && agendas.filter(agenda => {
        if(agenda.id === parseInt(id)) return agenda
    })
    console.log(agendaId)

    const [inputEditAgenda, setInputEditAgenda] = useState({
        dateStart: { value: '', error: null },
        dateEnd: { value: '', error: 'Seleccione una fecha' },
        specialty: { value: '', error: 'Campo requerido' }, // Especialidad
        specialist: { value: '', error: 'Campo requerido' }, // Especialista
        shiftsDay: { value: "", error: 'Seleccione los turnos por día' }, //Turnos por día

    })

    return (
        <div id="edit-agenda-container">
            <Nav />
            <form>
                <div>
                    <label>Seleccione Especialista</label>
                </div>
                <select>
                    <option>Especialista...</option>
                    {
                        specialists.length > 0 && specialists.map(specialist => {
                            return (
                                <>
                                <option key={specialist.personaId} value={specialist.id}>{`${capitalFirstLetter(specialist.persona.name)} ${capitalFirstLetter(specialist.persona.lastName)}`}</option>
                                </>
                            )
                        })
                    }
                </select>
                <div>
                    <label>Seleccione Especialidad</label>
                </div>
                <select>
                    <option>Especialista...</option>
                </select>
            </form>

        </div>
        
    )
};

export default EditAgenda;