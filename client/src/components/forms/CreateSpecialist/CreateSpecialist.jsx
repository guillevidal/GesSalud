import './CreateSpecialist.scss';
import React, { useState, useEffect } from 'react';
import Nav from '../../Layout/Nav'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Person from '../Person/Person';
import {
    crearEspecialista,
    obtenerEspecialidades,
} from '../../../actions/index'



export default function CreateSpecialist() {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(obtenerEspecialidades())
    }, [])

    const typeSpecialties = useSelector((state) => state.especialidades)

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
        enrollment: "",
        specialty: [],
    })
    
    const handleChange = (event) => {
        setInput({
            ...input,
            [event.target.name]: event.target.value
        })
    }

    const handleChangeTypeSpecialities = (e) => {
        if (input.specialty.includes(e.target.value)) {
            setInput({
                ...input,
                specialty: input.specialty.filter(type => type !== e.target.value)

            })
        } else {
            setInput({
                ...input,
                specialty: [...input.specialty, e.target.value]
            })
        }

    }

    const handleSubmit  = async (event) => {
        event.preventDefault()


        let newSpecialist = {
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
            enrollment: parseInt(input.enrollment),
            specialty: input.specialty.join(', '),

        }

        await dispatch(crearEspecialista(newSpecialist))
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
            enrollment: "",
            specialty: [],
        })
        alert(`El especialista médico se creó correctamente `)
    }

    return (

        <div id="createSpecialist-container">

            <Nav />
            <div>
                <form onSubmit={(event) => handleSubmit(event)} className='form-container'>
                   <div className='form-infoPersonal'>
                    <Person name={input.name} lastName={input.lastName} dni={input.dni}
                        email={input.email} phone={input.phone} adress={input.adress}
                        birth={input.birth} user={input.user} password={input.password}
                        handle={handleChange}
                    />

                    <div className='identificacion-personal'>
                        
                        <label htmlFor="enrollment" className='label-tipo-title-text'>IDENTIFICACION PROFESIONAL</label>
                                 
                        <input
                            id="enrollment" type="text" name="enrollment" required pattern="[0-9]+" title="El campo solo acepta números"
                            value={input.enrollment} onChange={handleChange}
                             />
                               
                        </div>
                    
                    </div>
                    
                    <div id='specialist-container'>
                        <div className='label-tipo-title'>
                        <label className='label-tipo-title-text'>TIPO DE ESPECIALDAD</label>
                        </div>
                         <div className='lista-especialidades'>
                        {
                            typeSpecialties && typeSpecialties.map((type, index) => {
                                return (
                                    <div className="typeSpeciality" key={index + "A"} >
                                        <input
                                            key={index}
                                            type="checkbox"
                                            name={type.name}
                                            value={type.name}
                                            id={type.name}
                                            onChange={handleChangeTypeSpecialities}
                                            className='input-tipo'
                                        />
                                        <label className='label-tipo' key={index + type.name}>{type.name}</label>
                                    </div>
                                )
                            })
                        }

                        </div>

                    

                    </div>
                   
                </form>
               
                     <div className='boton-crear-especialista'>
                        <button type="submit" className='boton-creacion'>CREAR</button>
                    </div> 
            </div>
        </div>
    )
}