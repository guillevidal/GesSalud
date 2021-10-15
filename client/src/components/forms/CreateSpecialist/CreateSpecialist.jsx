import './CreateSpecialist.scss';
import React, { useState } from 'react';
import Nav from '../../Layout/Nav'
import { useDispatch } from 'react-redux';
import Person from '../Person/Person';
import { crearEspecialista } from '../../../actions/index'



export default function CreateSpecialist() {
    const typeSpecialty = ["Cardiología", "Endocrinología", "Gastroenterología",
        "Geriatría", "Hematología", "Infectología", "Médico clínico", "Neumología",
        "Neurología", "Nutriología", "Oftalmología", "Oncología", "Pediatría", "Psiquiatría",
        "Toxicología", "Dermatología", "Odontología", "Ginecología", "Otorrinolaringología", "Urología", "Traumatología"]

    const dispatch = useDispatch()
    const [input, setInput] = useState({
        name: "",
        lastName: "",
        dni: 0,
        email: "",
        phone: "",
        adress: "",
        birth: "",
        user: "",
        password: "",
    })

    const handleChange = (event) => {
        setInput({
            ...input,
            [event.target.name]: event.target.value
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault()

        let newSpecialist = {
            name: input.name.toLowerCase(),
            lastName: input.lastName.toLowerCase(),
            dni: parseInt(input.dni),
            email: input.email,
            phone: input.phone,
            adress: input.adress,
            birth: input.birth,
            user: input.user,
            password: input.password,
        }

        dispatch(crearEspecialista(newSpecialist))
        setInput({
            name: "",
            lastName: "",
            dni: 0,
            email: "",
            phone: "",
            adress: "",
            birth: "",
            user: "",
            password: "",
        })
        alert(`El especialista médico se creó correctamente `)
    }

    return (

        <div id="createSpecialist-container">

            <Nav />
            <div>
            <form onSubmit={(event) => handleSubmit(event)}>
                <Person name={input.name} lastName={input.lastName} dni={input.dni} 
                    email={input.email} phone={input.phone} adress={input.adress}
                    birth={input.birth} user={input.user} password={input.password} handle={handleChange}
                />
                <hr />
                <label>TIPO DE ESPECIALDAD</label>
                <br />
                <br />
                <div id="especialist-container">
                    {
                        typeSpecialty && typeSpecialty.map((type, index) => {
                            return (
                                <div className="typeSpecialty" key={index + "A"} >
                                    <input
                                        key={index}
                                        type="checkbox"
                                        name={type}
                                    />
                                    <label key={index + type}>{type}</label>
                                </div>
                            )
                        })
                    }

                </div>
                <div>
                    <button type="submit">CREAR</button>
                </div>
            </form>
            </div>
        </div>
    )
}