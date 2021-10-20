/* eslint-disable */
import React, { useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Nav from '../../../Layout/Nav';
import Person from '../../../forms/Person/Person.jsx';
import { modificarPaciente } from "../../../../actions/index.js";

export default function PatientEdit() {
    const capitalFirstLetter = (str) => { // agregado marce
        return str.charAt(0).toUpperCase() + str.slice(1)
    }
    const patientDetail = useSelector(state => state.pacienteDetallado)

    const dispatch = useDispatch();  

    const [input, setInput] = useState({
        id:patientDetail[0]?.personaId,
        name: patientDetail[0]?.persona.name,
        lastName: patientDetail[0]?.persona.lastName,
        dni: patientDetail[0]?.persona.dni,
        email: patientDetail[0]?.persona.email,
        phone: patientDetail[0]?.persona.phone,
        adress: patientDetail[0]?.persona.adress,
        birth: patientDetail[0]?.persona.birth,
        user: patientDetail[0]?.persona.user,
        password: patientDetail[0]?.persona.password,
        gender: patientDetail[0]?.persona.gender,
        emergencyContact: patientDetail[0]?.emergencyContact

    })

    const [error, setError] = useState({})
    const validationCreatePatient = (input) => {
        let errors = {};
        if (input.gender.length === 0) {
            errors.gender = 'Seleccione un tipo de genero'
        }
        return errors;
    }

    const handleChange = (event) => {
        setInput({
            ...input,
            [event.target.name]: event.target.value
        })
        setError(validationCreatePatient({
            ...input,
            [event.target.name]: event.target.value
        }))
    }

    const handleSubmit = () => {
        

        let newPatient = {

            id: patientDetail[0]?.personaId,
            name: input.name.toLowerCase(),
            lastName: input.lastName.toLowerCase(),
            dni: parseInt(input.dni),
            email: input.email,
            phone: input.phone,
            adress: input.adress.toLowerCase(),
            birth: input.birth,
            user: input.user,
            password: input.password,
            gender: input.gender,
           
        }

        dispatch(modificarPaciente(newPatient));

        // setInput({
        //     name: "",
        //     lastName: "",
        //     dni: "",
        //     email: "",
        //     phone: "",
        //     adress: "",
        //     birth: "",
        //     user: "",
        //     password: "",
        //     gender: "",
        //     emergencyContact: "",
        // })

        alert(`El paciente ${capitalFirstLetter(input.name)} ${capitalFirstLetter(input.lastName)} se modificó correctamente `)

    }

    return (
        <div id="createPatient-container">
            <Nav />

            <form className='createPatient-form' onSubmit={handleSubmit}>
                <div className='information-person'>

                    <Person
                        name={input.name} lastName={input.lastName} dni={input.dni}
                        email={input.email} phone={input.phone} adress={input.adress}
                        birth={input.birth} user={input.user} password={input.password} handle={handleChange} error={error}
                    />


                </div>
                <div className='information-clinic'>
                <div className='label-title'>
                        <label className='label-title-text'>INFORMACION CLINICA</label>
                    </div>
                    <div className='label-textarea'>
                        <label htmlFor="emergencyContact" className='label-interno'>Contacto de emergencia: </label>

                        <input
                            id="emergencyContact" type="text" name="emergencyContact" required pattern="[0-9]+"
                            title="El campo solo acepta números" value={input.emergencyContact} onChange={handleChange}
                            className='input-emergencia'
                        />
                    </div>
                </div>
                <div className='boton-crear-paciente'>
                    <Link to="/patientPys">
                        <button className='boton-crear'>CANCELAR</button>
                    </Link>
                    <Link to="/patientPys" onClick={()=>handleSubmit()}><button type="submit" className='boton-crear'>MODIFICAR</button></Link>
                </div>
            </form>

        </div>
    )
}
