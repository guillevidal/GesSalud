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
            <div className='createSpecialist-form'>
            <form onSubmit={(event) => handleSubmit(event)} className='form-container'>
               <div className='form-infoPersonal'>
                <Person name={input.name} lastName={input.lastName} dni={input.dni} 
                    email={input.email} phone={input.phone} adress={input.adress}
                    birth={input.birth} user={input.user} password={input.password} handle={handleChange}
                />
                </div>
                
                <div id="specialist-container">
                <div className='label-tipo-title'>
                    <label className='label-tipo-title-text'>TIPO DE ESPECIALDAD</label>
                </div>
                <div className='lista-especialidades'>
                    {
                        typeSpecialty && typeSpecialty.map((type, index) => {
                            return (
                                <div className="typeSpeciality" key={index + "A"} >
                                    <input
                                        key={index}
                                        type="checkbox"
                                        name={type}
                                        className='input-tipo'
                                    />
                                    <label className='label-tipo' key={index + type}>{type}</label>
                                </div>
                            )
                        })
                    }
                    </div>

                </div>
            </form>
                <div className='boton-crear-especialista'>
                    <button type="submit" className='boton-creacion'>Crear</button>
                </div>
            </div>
        </div>
    )
}