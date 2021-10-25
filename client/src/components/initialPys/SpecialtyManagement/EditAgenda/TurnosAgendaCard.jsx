import React from "react";

const TurnosAgendaCard = ({ numeroTurno, horaI, horaF }) => {

    return (
        <div>
            <h5>{"Turno n°: " + numeroTurno}</h5>
            <h6>{"Hora de inicio: " + horaI}</h6>
            <h6>{"Hora final: " + horaF}</h6>
            <h6>{"Paciente: no asignado"}</h6>
            <h6>{"Historia clinica: no disponible"}</h6>
            <button>Asignar turno</button>
        </div>
    )
}

export default TurnosAgendaCard