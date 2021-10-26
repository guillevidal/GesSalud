import React from "react";
import { useSelector } from "react-redux";
import "./EditAgenda.scss";



const TurnosAgendaCard = ({ numeroTurno, horaI, horaF, idAgenda, openFormTurno }) => {
    
    

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


                <td className='td asignar'>
                    <button onClick={openFormTurno} >
                        Asignar turno
                    </button>

                </td>


            </tr>

           
      
    )
}

export default TurnosAgendaCard