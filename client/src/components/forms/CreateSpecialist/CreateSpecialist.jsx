import './CreateSpecialist.scss';
import React, { useState } from 'react';
import Person from '../Person/Person'
import Nav from '../../Layout/Nav'


export default function CreateSpecialist() {
    const typeSpecialty = ["Cardiología", "Endocrinología", "Gastroenterología",
        "Geriatría", "Hematología", "Infectología", "Médico clínico", "Neumología",
        "Neurología", "Nutriología", "Oftalmología", "Oncología", "Pediatría", "Psiquiatría",
        "Toxicología", "Dermatología", "Odontología", "Ginecología", "Otorrinolaringología", "Urología", "Traumatología"]

    const [ input, setInput ] = useState({
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

    const handleChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }

    return (

        <div id="createSpecialist-container">
            <Nav />
            <div>
            <form>
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
            </form>
            </div>
        </div>
    )
}