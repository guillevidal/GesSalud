import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Person from "../Person/Person";
import Nav from '../../Layout/Nav'
import { crearPaciente } from '../../../actions/index'
import './CreatePatient.scss'
import '../Person/Person.scss'

export default function CreatePatient() {
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
    })
    const dispatch = useDispatch()
    const handleChange = (event) => {
        setInput({
            ...input,
            [event.target.name]: event.target.value
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault()

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
            gender: input.gener,
            medication: input.medication,
            emergencyContact: input.emergencyContact,
            disease: input.disease,

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
        })
        alert(`El paciente se creó correctamente `)
    }


    return (

        <div id="createPatient-container">

            <Nav />
                <form onSubmit={(event) => { handleSubmit(event) } }  className='createPatient-form'>
                 
                    <div className='information-person'>
                        <Person
                            name={input.name} lastName={input.lastName} dni={input.dni}
                            email={input.email} phone={input.phone} adress={input.adress}
                            birth={input.birth} user={input.user} password={input.password} handle={handleChange}
                        />
                    </div>
                    <div className='information-clinic'>
                        <div className='label-title'>
                            <label className='label-title-text'>INFORMACION CLINICA</label>
                        </div>
                            <div className='label-textarea'>
                            <label htmlFor="medication" className='label-interno'>Medicación:</label>
                            <textarea
                                id="medication" type="text" name="medication" required pattern="[[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]{2,64}"
                                title="El campo solo acepta letras" value={input.medication} onChange={handleChange}
                                className='inputs'
                            />
                            </div>
                            <div className='label-textarea'>
                            <label htmlFor="disease" className='label-interno'>Enfermedades:</label>
                            <textarea
                                id="disease" type="text" name="disease" required pattern="[[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]{2,64}"
                                title="El campo solo acepta letras" value={input.disease} onChange={handleChange}
                                className='inputs'
                            />
                            </div>
                            <div className='label-textarea'> 
                            <label htmlFor="emergencyContact" className='label-interno'>Contacto de emergencia:</label>
                           
                            <input
                                id="emergencyContact" type="text" name="emergencyContact" required pattern="[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]{2,48}"
                                title="El campo solo acepta letras" value={input.emergencyContact} onChange={handleChange}
                                className='input-emergencia'
                            />
                            </div>
                    </div> 
                   
                          
                </form>

                <div className='boton-crear-paciente'>
                       <button type="submit" className='boton-crear'>CREAR</button>
                    </div>  
        </div>

    )
}