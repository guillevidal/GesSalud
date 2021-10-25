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

    let agendaId = agendas.length > 0 && agendas.filter(agenda => {
        if (agenda.id === parseInt(id)) return agenda
    })
    console.log(agendaId)

    

    return (
        <div id="edit-agenda-container">
            <Nav />
            <div>
                <div>
                    <div>
                        <p>FECHA: <span>{agendaId[0]?.date.split('T')[0]}</span></p>
                    </div>
                    <div>
                        <p>ESPECIALISTA: <span>{agendaId[0] && `${capitalFirstLetter(agendaId[0].especialista_medico.persona.name)} 
                        ${capitalFirstLetter(agendaId[0].especialista_medico.persona.lastName)}`}</span></p>
                    </div>
                    <div>
                    <p>ESPECIALIDAD: <span>{agendaId[0]?.tipo_especialidad.name}</span></p>
                    </div>
                </div>
                <div>
                    {
                        
                    }
                </div>
            </div>

        </div>

    )
};

export default EditAgenda;