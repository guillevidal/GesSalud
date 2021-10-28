/* eslint-disable */
import React from "react";

const HistoriaClinica = ({disease, medication, historiaClinica}) => {
    return (
        <div className="lista-detalles">
            <div className='detalles'>
                <div className='encabezado'>
                    <span className='nombre-apellido'>Historia Clinica</span>
                    <h4>Diagnostico inicial</h4>
                </div>
                <div className="data">
                    <span className='data-info'>Fecha de creacion: <b className='data-detail'>{historiaClinica.creationDate}</b></span>
                    <span className='data-info'>Enfermedades: <b className='data-detail'>{disease}</b></span>
                    <span className='data-info'>Medicacion: <b className='data-detail'>{medication}</b></span>
                </div>
                <div className='encabezado'>
                    
                    <h4>Diagnosticos posteriores</h4>

                </div>
                <div className="data">
                    <span className='data-info'>Continuara: <b className='data-detail'>{"Continuara...."}</b></span>
                </div>
            </div>

        </div>
    )
}

export default HistoriaClinica