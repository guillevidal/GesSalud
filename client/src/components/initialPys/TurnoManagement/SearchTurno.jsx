/* eslint-disable */
import React, {useState} from "react";
import {useSelector} from "react-redux";
import './InicialTurno.scss'

const SearchTurno = ({ setBusquedaTurnos, estado, setEstado, }) => {
    const [input, setInput]=useState("")
    const turnos= useSelector(state => state.turnos)
    const [placeHolder, setPlaceHolder]= useState("Buscar por nombres")
    const handleChange = (event) => {
        const { value} = event.target
        if(value.length === 0){
            setInput(value)
            setBusquedaTurnos([])
        }else{
            setInput(value)
            if(estado==="turnos"){
                let filtroT=[]
                turnos.forEach(element => {
                    if(element.paciente.persona.name.toLowerCase().includes(value.toLowerCase()) || 
                    element.paciente.persona.lastName.toLowerCase().includes(value.toLowerCase())){
                        filtroT.push(element)
                    }
                })
                if(!filtroT[0]){
                    filtroT.push("No se encontro turno con el paciente")
                }
                setBusquedaTurnos(filtroT)
            }
            if(estado==="dni_paciente"){
                let filtroDniP=[]
                turnos.forEach(element => {
                    if(element.paciente.persona.dni.toString().startsWith(value)){
                        filtroDniP.push(element)
                    }
                });
                if(!filtroDniP[0]){
                    filtroDniP.push("No se econtro turno con tal DNI")
                }
                setBusquedaTurnos(filtroDniP)
            }
            if(estado==="especialidad"){
                let filtroEs=[]
                turnos.forEach(element => {
                    if(element.agenda.tipo_especialidad.name.toLowerCase().normalize('NFD')
                    .replace(/([^n\u0300-\u036f]|n(?!\u0303(?![\u0300-\u036f])))[\u0300-\u036f]+/gi, "$1")
                    .normalize().startsWith(value.toLowerCase())){
                        filtroEs.push(element)
                    }
                });
                if(!filtroEs[0]){
                    filtroEs.push("No se econtro turno con la especialidad")
                }
                setBusquedaTurnos(filtroEs)
            }
            if(estado==="especialista"){
                let filtroE=[]
                turnos.forEach(element=>{
                    if(element.agenda.especialista_medico.persona.name.toLowerCase().includes(value.toLowerCase()) ||
                       element.agenda.especialista_medico.persona.lastName.toLowerCase().includes(value.toLowerCase())){
                            filtroE.push(element)
                       }

                })
                if(!filtroE[0]){
                    filtroE.push("No se encontro turno con el especialista")
                }
                setBusquedaTurnos(filtroE)
            }
            if(estado==="fecha"){
                let filtroF=[]
                turnos.forEach(element => {
                    if(element.hour.slice(0, 10).includes(value)){
                        filtroF.push(element)
                    }
                })
                if(!filtroF[0]){
                    filtroF.push("No se encontro turno con la fecha")
                }
                setBusquedaTurnos(filtroF)
            }
        }

        

    }
    const handleSelect = (event)=>{
        const {value} = event.target
        if(value === "dni_paciente"){
            setBusquedaTurnos([])
            setEstado(value)
            setPlaceHolder("Buscar DNI Paciente")
            setInput("")
        }
        if(value === "turnos") {
            setBusquedaTurnos([])
            setEstado(value)
            setPlaceHolder("Buscar nombre de paciente")
            setInput("")
        }
        if(value === "especialidad") {
            setBusquedaTurnos([])
            setEstado(value)
            setPlaceHolder("Buscar Especialidad")
            setInput("")
        }
        if (value === "especialista") {
            setBusquedaTurnos([])
            setEstado(value)
            setPlaceHolder("Buscar nombre de Especialista")
            setInput("")
        }
        if(value=== "fecha"){
            setBusquedaTurnos([])
            setEstado(value)
            setInput("")
        }
        
    }
    return (
        <div className='buscar'>
            {estado!=="fecha"? <input className='input' value={input} onChange={(e)=>handleChange(e)} 
            placeholder={placeHolder}/>:<input className='input' value={input} onChange={(e)=>handleChange(e)} type="date"/>}
            
            
            <select onChange={(e) => handleSelect(e)} className='select'>
                <option value="turnos">Paciente</option>
                <option value="dni_paciente">DNI Paciente</option>
                <option value="especialidad">Especialidad</option>
                <option value="especialista">Especialista</option>
                <option value="fecha">Fecha</option>
            </select>
        </div>
    )
}

export default SearchTurno