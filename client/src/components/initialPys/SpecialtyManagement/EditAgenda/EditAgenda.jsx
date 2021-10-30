/* eslint-disable */
import './EditAgenda.scss';
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from 'react-router-dom';
import Nav from "../../../Layout/Nav"
import TurnosAgendaCard from "./TurnosAgendaCard.jsx";
import { obtenerAgendas, obtenerTurnos } from "../../../../actions/index.js"


function EditAgenda() {
    const dispatch = useDispatch();
    let { id } = useParams()
    const capitalFirstLetter = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1)
    }
    const agendas = useSelector(state => state.agendas)


    let agendaId = agendas.length > 0 && agendas.filter(agenda => {
        if (agenda.id === parseInt(id)) return agenda
    })

    useEffect(async () => {
        await dispatch(obtenerAgendas())
        await dispatch(obtenerTurnos())

    }, [])

    return (
        <>
            <div id="edit-agenda-container">

                <>
                    <Nav />
                    <div className='encabezado'>
                        <div>
                            <p className='title'>Fecha: <span className='data'>{agendaId[0]?.date.split('T')[0]}</span></p>
                        </div>
                        <div>
                            <p className='title'>Especialista: <span className='data'>{agendaId[0] && `${capitalFirstLetter(agendaId[0].especialista_medico.persona.name)} 

                        ${capitalFirstLetter(agendaId[0].especialista_medico.persona.lastName)}`}</span></p>
                        </div>
                        <div>
                            <p className='title'>Especialidad: <span className='data'>{agendaId[0]?.tipo_especialidad.name}</span></p>
                        </div>
                    </div>

                    <div className='asignaciones'>
                        <table className='titles'>
                            <thead>
                                <tr className='subtitle'>
                                    <th><span>Turno</span></th>
                                    <th><span>Inicio</span></th>
                                    <th> <span>Fin</span></th>



                                    <th><span>Paciente</span></th>


                                </tr>
                            </thead>
                            {agendaId[0].turnosPrecargados.map((valor) => {
                                return (

                                    <TurnosAgendaCard numeroTurno={valor.idTurnoPre} idAgenda={valor.idAgenda}
                                        horaI={valor.horaI} horaF={valor.horaF} date={agendaId[0].date.split('T')[0]}
                                        modules={agendaId[0].tipo_especialidad.modulo_atencion}
                                        especialista={`${agendaId[0].especialista_medico.persona.name} ${agendaId[0].especialista_medico.persona.lastName}`}
                                        especialidad={agendaId[0].tipo_especialidad.name}

                                    />

                                )
                            })}



                        </table>
                    </div>
                </>



            </div>


        </>

    )
};

export default EditAgenda;