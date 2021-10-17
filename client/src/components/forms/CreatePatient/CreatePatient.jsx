/* eslint-disable */
import React, { useState } from "react";
import { useDispatch } from "react-redux";
//import { Link } from "react-router-dom";
import Person from "../Person/Person";
import Nav from '../../Layout/Nav'
import { crearPaciente } from '../../../actions/index'
import './CreatePatient.scss'
import '../Person/Person.scss'

export default function CreatePatient() {
    const capitalFirstLetter = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1)
    }


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
        medication: "",
        emergencyContact: "",
        disease: "",
        creationDate: "",
        diagnostic: "",
        date: "",
        derivation: ""

    })

    const [error, setError] = useState({})
    const validationCreatePatient = (input) => {
        let errors = {};
        if (input.gender.length === 0) {
            errors.gender = 'Seleccione un tipo de genero'
        }
        return errors;
    }

    const dispatch = useDispatch()
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

    const handleSubmit = (event) => {
        event.preventDefault()

        let creationDate = new Date();
        creationDate = creationDate.toDateString().slice(4, 15);

        let newPatient = {
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
            medication: input.medication,
            emergencyContact: parseInt(input.emergencyContact),
            disease: input.disease,
            creationDate: creationDate,
            diagnostic: "",
            date: "",
            derivation: ""

        }

        dispatch(crearPaciente(newPatient))
        setInput({
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
            medication: "",
            emergencyContact: "",
            disease: "",
            creationDate: "",
            diagnostic: "",
            date: "",
            derivation: ""
        })
        alert(`El paciente ${capitalFirstLetter(input.name)} ${capitalFirstLetter(input.lastName)} se creó correctamente `)
    }


    return (

        <div id="createPatient-container">

            <Nav />

            <form onSubmit={(event) => { handleSubmit(event) }} className='createPatient-form'>

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
                        <label htmlFor="medication" className='label-interno'>Medicación: </label>
                        <textarea
                            id="medication" type="text" name="medication" required pattern="[[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+[0-9]+{2,64}"
                            title="El campo solo acepta letras" value={input.medication} onChange={handleChange}
                            className='inputs' />
                    </div>
                    <div className='label-textarea'>
                        <label htmlFor="disease" className='label-interno'>Enfermedades: </label>
                        <textarea
                            id="disease" type="text" name="disease" required pattern="[[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+[0-9]+{2,64}"
                            title="El campo solo acepta letras" value={input.disease} onChange={handleChange}
                            className='inputs' />

                        <div className='label-textarea'>
                            <label htmlFor="emergencyContact" className='label-interno'>Contacto de emergencia: </label>

                            <input
                                id="emergencyContact" type="text" name="emergencyContact" required pattern="[0-9]+"
                                title="El campo solo acepta números" value={input.emergencyContact} onChange={handleChange}
                                className='input-emergencia'
                            />
                        </div>
                    </div>
                </div>

                <div className='boton-crear-paciente'>
                    <button type="submit" className='boton-crear'>CREAR</button>
                </div>
            </form>
        </div>

    )
}