/* eslint-disable */
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {crearDiagnostico, pacienteDetallado} from '../../../../actions/index';
import Nav from "../../../Layout/Nav"
import './PatientHistory.scss'
import swal from "sweetalert";
import Diagnosticos from "./DiagnosticoCard";
import Paginado from "./paginado";


export default function PatientHistory() {

    const dispatch = useDispatch();
    const paciente = useSelector(state => state.pacienteDetallado[0])
    const historiaClinicaId = paciente?.paciente.historiaClinica.id;
    const diagnosticos = paciente?.paciente.historiaClinica.diagnosticos;
    const hoy = new Date().toISOString();
    const short = hoy.slice(0,10)
    const valorPaginado = useSelector(state => state.paginado)

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
            swal({
                icon: 'warning',
                title: 'Ups!',
                text: 'Complete los campos requeridos'
            })
        }
   
    }


    return (
        <div className='historyContainer'>
            <Nav />
            <div className='division'>
                <div className='infoPaciente'>
                    <div className='bloque'>
                        <span className='title'>Paciente: <b className='data'>{paciente?.name + ' ' + paciente?.lastName}</b></span>
                    </div>
                    <div  className='bloque'>
                        <span className='title'>Nacimiento: <b className='data'>{paciente?.birth}</b></span>
                    </div>
                    <div className='bloque'>
                        <span className='title'>Género: <b className='data'>{paciente?.gender}</b></span>
                    </div>
                </div>

            <div className='cargar'>
                    <div className='form'>
                        <div className='conjunto'>
                        <textarea name='text' value={values.text.value} placeholder="Epicrisis *" onChange={handleEpicrisis} className='textarea'></textarea>
                       {/*  <span>{values.text.error}</span>
                        */} 
                    <textarea name='diagnostic' value={values.diagnostic.value} placeholder="Diagnostico *" onChange={handleDiagnostic} className='textarea'></textarea>
                 {/*    <span>{values.diagnostic.error}</span>
                    */} </div>

                    <div>
                        <input className='input' type="text" name="derivation" value={values.derivation.value} placeholder="Derivacion *" onChange={handleDerivation} />
                    </div>
                        <span className='required'>(*) Campos requeridos</span>
                    
                        <button type="submit" onClick={handleOnClick} className='boton'>Generar historia clinica</button>

                    </div>
                
            </div>
            </div>

            <div className='historias'>
                <span className='title'>Historia clínica</span>
                    
                {diagnosticos && diagnosticos.length > 2 ? <Paginado diag={diagnosticos}/> :null}
       
               
                    
                    <table className='tabla'> 
                        <tr className='titles'>
                        <th className='th'>Fecha</th>
                        <th className='th'>Diagnóstico</th>
                        <th className='th'>Ver</th>
                        </tr>
                    
                    

            {
                    diagnosticos && 
                    diagnosticos.slice(valorPaginado, valorPaginado+5).map(e => {
                        return (
                            <Diagnosticos key={e.id}
                                fecha={e.date}
                                diagnostico={e.diagnostic}
                                tratamiento={e.text}
                                derivacion={e.derivation}
                            />
                            
                        )
                        
                    })       
                }
      
      </table> 

        

      {!diagnosticos && <p>No hay diagnósticos previos</p>}
                
            </div>

            
            
        </div>
    )
}
