import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"

import Nav from "../../../Layout/Nav"
// import { useParams } from 'react-router-dom';

export default function PatientHistory() {

    
    // let { dni } = useParams();
    const paciente = useSelector(state => state.pacienteDetallado[0])
    console.log('paciente', paciente)
    const hoy = new Date().toISOString();
    const short = hoy.slice(0,10)
    
    const [values, setValues] = useState({
        epicrisis: "", 
        diagnostico: "", 
        medicacion: "", 
    })

    const handleOnChange = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        })
    }
    console.log('epicrisis',values.epicrisis)
    console.log('diagnostico', values.diagnostico)
    console.log('medicacion', values.medicacion)

    const onSubmit = (e) => {
        e.preventDefault()

    }

    return (
        <div>
            <Nav />
            <div>
                <p>Paciente:</p>
                <span>{paciente?.name}</span>
                <span>{paciente?.lastName}</span>
            </div>
            <div>
                <p>Fecha de nacimiento:</p>
                <span>{paciente?.birth}</span>
            </div>
            {/* <div>
                <p>{paciente?.paciente.historiaClinica.Historico}</p>// aca traeria la hist clin
            </div> */}
            <div>
                <textarea name='epicrisis' value={values.epicrisis} placeholder="epicrisis" onChange={handleOnChange}></textarea>
            </div>
            <div>
               <textarea name='diagnostico' value={values.diagnostico} placeholder="diagnostico" onChange={handleOnChange}></textarea>
            </div>
            <div>
               <textarea name='medicacion' value={values.medicacion} placeholder="medicación" onChange={handleOnChange}></textarea>
            </div>
            <div>
                <button type="submit" onSubmit={onSubmit}>cargar</button>
            </div>
           
            
        </div>
    )
}
