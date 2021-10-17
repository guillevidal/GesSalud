/* eslint-disable */
import React, { useState, useEffect } from "react";
//import { useSelector } from "react-redux";
import Nav from '../../../Layout/Nav';
import Person from '../../../forms/Person/Person.jsx';

const PatientEdit = () => {
    // const patientDetail = useSelector(state => state.pacienteDetallado)
    /*useEffect(() => {
        console.log(patientDetail)
    }, [])
*/

    const [input, setInput] = useState({
        name: "",
        lastName: "",
        dni: "",
        email: "",
        phone: "",
        adress: "",
        birth: "",
        user: "",
        password: "",
        gender: "",
        emergencyContact: "",
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
    return (
        <div id="createPatient-container">
            <Nav />
            <form >
                <div className='information-person'>
                    {
                        <Person
                            name={input.name} lastName={input.lastName} dni={input.dni}
                            email={input.email} phone={input.phone} adress={input.adress}
                            birth={input.birth} user={input.user} password={input.password} handle={handleChange} error={error}
                        />
                    }

                </div>
                <div className='information-clinic'>
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
                    <button type="submit" className='boton-crear'>MODIFICAR</button>
                </div>
            </form>
        </div>
    )
}

export default PatientEdit;