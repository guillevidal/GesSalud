import React from "react";

import { useSelector } from "react-redux";
import Agendar from '../Agendar/Agendar.jsx'
import { Link } from "react-router-dom";
import "./EditAgenda.scss";


const TurnosAgendaCard = ({ numeroTurno, horaI, horaF, idAgenda }) => {
    const agendas = useSelector(state => state.agendas)
    let agendaDetail = agendas.length > 0 && agendas.filter(agenda => {
        if (agenda.id === parseInt(idAgenda)) return agenda
    })


    return (

        
            <tr className='lista'>

                <td className='td numero'><span >{numeroTurno}</span></td>
                <td className='td horario'><span >{horaI}</span></td>
                <td className='td horarioFinal'><span>{horaF}</span></td>
                <td className='td paciente'><span >{"no asignado"}</span></td>
                <td className='td historia'><span >{"no disponible"}</span></td>

               
          

            <Link to={`/especialistaPys/agenda/${idAgenda}/agendadetail`} className='link' >
               <td className='td asignar'>
                Asignar turno

            </td>
           
          

            </Link>
            

          </tr>

    )
}

export default TurnosAgendaCard