import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Person from "../Person/Person";
import Nav from '../../Layout/Nav'
import { crearPaciente } from '../../../actions/index'
import './CreatePatient.scss'

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
            <div className='createPatient-form'>
                <form onSubmit={(event) => { handleSubmit(event) }}>
                 
                    <div>
                        <Person
                            name={input.name} lastName={input.lastName} dni={input.dni}
                            email={input.email} phone={input.phone} adress={input.adress}
                            birth={input.birth} user={input.user} password={input.password} handle={handleChange}
                        />
                    </div>
                    <hr />
                    <div>
                        <label>INFORMACION CLINICA</label>
                        <div>
                            <label htmlFor="medication">Medicación:</label>
                            <br />
                            <textarea
                                id="medication" type="text" name="medication" required pattern="[[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]{2,64}"
                                title="El campo solo acepta letras" value={input.medication} onChange={handleChange}
                            />
                            <br />
                            <label htmlFor="disease">Enfermedades:</label>
                            <br />
                            <textarea
                                id="disease" type="text" name="disease" required pattern="[[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]{2,64}"
                                title="El campo solo acepta letras" value={input.disease} onChange={handleChange}
                            />
                            <br />
                            <label htmlFor="emergencyContact">Contacto de emergencia:</label>
                            <br />
                            <input
                                id="emergencyContact" type="text" name="emergencyContact" required pattern="[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]{2,48}"
                                title="El campo solo acepta letras" value={input.emergencyContact} onChange={handleChange}
                            />
                        </div>
                   
                    <br />
                    <div>
                        <Link to='/patientPys'>
                            <button>VOLVER</button>
                        </Link>
                     <div className='boton-crear-paciente'>
                       <button type="submit" className='boton-crear'>CREAR</button>
                        </div>       
                    </div>
                </form>
            </div>
        </div>

    )
}