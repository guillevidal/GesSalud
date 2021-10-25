import './EditAgenda.scss';
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import Nav from "../../../Layout/Nav"
import TurnosAgendaCard from "./TurnosAgendaCard.jsx";


function EditAgenda() {
    let { id } = useParams()
    const capitalFirstLetter = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1)
    }
    
    const agendas = useSelector(state => state.agendas)

    let agendaId = agendas.length > 0 && agendas.filter(agenda => {
        if (agenda.id === parseInt(id)) return agenda
    })
    
    let contador = 1;
    let arr=[]
    function clockMinuteAdder(time, min) {
        // Escribir la funcion
        if (!time) throw Error('Espero la hora man');
        if (!min) return time;
      
        let [ hours, minutes ] = time.split(':');
        if (Number.isNaN(hours) || Number.isNaN(minutes)) throw TypeError('Ingrese un valor válido para time');
      
        minutes = min + parseInt(minutes);
        let newMinutes = minutes % 60;
      
        hours = parseInt(hours) + Math.floor(minutes / 60);
        let newHours = ((hours - 1) % 24) + 1 || 1;
      
       if (newHours < 10) newHours = `0${newHours}`;
        if (newMinutes < 10) newMinutes = `0${newMinutes}`;
      
        return `${newHours}:${newMinutes}`;
      };


    let horaI=agendaId[0].date.slice(11, agendaId[0].date.length)
    let horaF=""
    for (let index = 0; index < agendaId[0].amount; index++) {
        horaF=clockMinuteAdder(horaI, agendaId[0].tipo_especialidad.modulo_atencion*15)
        arr.push({contador, horaI, horaF})
        contador++
        horaI=horaF
    }
    
    return (
        <div id="edit-agenda-container">
            {console.log(horaI)}
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
                  
                    <div>
                        {arr.map(valor => {
                            return (
                            
                            <TurnosAgendaCard numeroTurno={valor.contador}
                            horaI={valor.horaI} horaF={valor.horaF}
                            />
                            
                            )
                        })}
                    </div>
                   
                </div>
            </div>

        </div>

    )
};

export default EditAgenda;