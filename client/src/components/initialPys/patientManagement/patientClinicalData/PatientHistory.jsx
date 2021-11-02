/* eslint-disable */
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {crearDiagnostico, pacienteDetallado} from '../../../../actions/index';
import Nav from "../../../Layout/Nav"

export default function PatientHistory() {

    const dispatch = useDispatch();
    const paciente = useSelector(state => state.pacienteDetallado[0])
    const historiaClinicaId = paciente?.paciente.historiaClinica.id;
    const diagnosticos = paciente?.paciente.historiaClinica.diagnosticos;
    const hoy = new Date().toISOString();
    const short = hoy.slice(0,10)

    useEffect(() => {
        dispatch(pacienteDetallado(paciente?.dni))
    },[]);
 
    const [values, setValues] = useState({

        diagnostic: { value: "", error: null }, 
        date: short, 
        derivation: { value: "", error: null }, 
        text: { value: "", error: null }, 
        historiaClinicaId: historiaClinicaId,
    })

    const handleDerivation = (e) => {
        const { value } = e.target
        if (value === "") {
            setValues({ ...values, derivation: { value, error: "Campo requerido" } })
        }else {
            setValues({ ...values, derivation: { value, error: null } })
        }
    }

    const handleDiagnostic = (e) => {
        const { value } = e.target
        if (value === "") {
            setValues({ ...values, diagnostic: { value, error: "Campo requerido" } })
        }else {
            setValues({ ...values, diagnostic: { value, error: null } })
        }
    }

    const handleEpicrisis = (e) => {
        const { value } = e.target
        if (value === "") {
            setValues({ ...values, text: { value, error: "Campo requerido" } })
        }else {

            setValues({ ...values, text: { value, error: null }, historiaClinicaId, date: short})
        }
    }

    const handleOnClick = async (e) => {
        e.preventDefault()

        if(values?.diagnostic?.value !== '' && values?.text?.value !== '' && values?.derivation?.value !== ''){

            const valores = {
                diagnostic: values.diagnostic.value, 
                date: short, 
                derivation: values.derivation.value, 
                text: values.text.value, 
                historiaClinicaId: historiaClinicaId,
            }
            await dispatch(crearDiagnostico(valores))
            location.reload()

            setValues({
                diagnostic: { value: "", error: null }, 
                derivation: { value: "", error: null },
                text: { value: "", error: null },
            })

        }else{
            alert('Complete los campos requeridos')
        }
   
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
            <div>
                <p>Genero:</p>
                <span>{paciente?.gender}</span>
            </div>

            <div>
                <h3>Historia clínica</h3>
                {
                    diagnosticos? diagnosticos.map(e => {
                        return (
                            <div key={e.id}>
                                <p>Fecha de atención:</p>
                                <p>{e.date}</p>
                                <h4>Diagnóstico:</h4>
                                <p>{e.diagnostic}</p>
                                <h4>Tratamiento:</h4>
                                <p>{e.text}</p>
                                <p>Derivación: <span>{e.derivation}</span></p>
                            </div>
                            
                        )
                        
                    })
                    : <p>No hay diagnósticos previos</p>
                }
                
            </div>

            <div>
                <textarea name='text' value={values.text.value} placeholder="epicrisis*" onChange={handleEpicrisis}></textarea>
                <p>{values.text.error}</p>
            </div>
            <div>
               <textarea name='diagnostic' value={values.diagnostic.value} placeholder="diagnostico*" onChange={handleDiagnostic}></textarea>
               <p>{values.diagnostic.error}</p>
            </div>
            <div>
                <input type="text" name="derivation" value={values.derivation.value} placeholder="derivation*" onChange={handleDerivation} />
            </div>
            <div>
                <p>* campos requeridos</p>
            </div>
            <div>
                <button type="submit" onClick={handleOnClick}>cargar</button>
            </div>
           
            
        </div>
    )
}
