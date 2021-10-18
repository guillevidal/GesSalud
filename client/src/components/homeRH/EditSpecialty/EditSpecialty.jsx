import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Person from '../../forms/Person/Person';
import Nav from "../../Layout/Nav";
import { obtenerEspecialidades } from '../../../actions/index'

export default function EditSpecialty() {
    const capitalFirstLetter = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1)
    }
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(obtenerEspecialidades())
    }, [])

    const specialtyDetail = useSelector(state => state.especialistaDetallado)
    const typeSpecialties = useSelector((state) => state.especialidades)
    const [error, setError] = useState({})
    const validationCreateSpecialty = (input) => {
        let errors = {};
        if (input.gender.length === 0) {
            errors.gender = 'Seleccione un tipo de genero'
        }
        if (input.specialty.length === 0) {
            errors.specialty = 'Seleccione al menos un tipo de especialidad'
        }
        return errors;
    }

    const [input, setInput] = useState({
        name: specialtyDetail[0].persona.name,
        lastName: specialtyDetail[0].persona.lastName,
        dni: specialtyDetail[0].persona.dni,
        email: specialtyDetail[0].persona.email,
        phone: specialtyDetail[0].persona.phone,
        adress: specialtyDetail[0].persona.adress,
        birth: specialtyDetail[0].persona.birth,
        user: specialtyDetail[0].persona.user,
        password: specialtyDetail[0].persona.password,
        gender: "",
        enrollment: specialtyDetail[0].enrollment,
        specialty: specialtyDetail[0].specialty.split(', '),
    })

    const handleChange = (event) => {
        setInput({
            ...input,
            [event.target.name]: event.target.value
        })
        setError(validationCreateSpecialty({
            ...input,
            [event.target.name]: event.target.value
        }))
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

    const handleSubmit = (event) => {
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
            gender: input.gender,
            enrollment: parseInt(input.enrollment),
            specialty: input.specialty.join(', '),

        }

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
        alert(`El especialista médico ${capitalFirstLetter(input.name)} ${capitalFirstLetter(input.lastName)} se modificó correctamente `)
    }


    return (
        <div id="createSpecialist-container">
            <Nav />
            <div>
                <form className='form-container'>
                    <div className='form-infoPersonal'>
                        <Person
                            name={input.name} lastName={input.lastName} dni={input.dni}
                            email={input.email} phone={input.phone} adress={input.adress}
                            birth={input.birth} user={input.user} password={input.password}
                            handle={handleChange} error={error}
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
                       {/*  <div className='label-tipo-title'>

                            <label className='label-tipo-title-text'>ESPECIALIDADES ASIGNADAS</label>
                        </div>
                        <div className='lista-especialidades'>
                            {
                                input.specialty.length > 0 && input.specialty.map((type, index) => {
                                    return (
                                        <div className="typeSpeciality" key={index + "B"} >
                                            <label className='label-tipo' key={index + type}>{type}</label>
                                        </div>
                                    )
                                })
                            }
                        </div> */}
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
                        {
                            error.specialty && (
                                <span>{error.specialty}</span>
                            )
                        }
                    </div>
                    <div className='boton-crear-especialista'>
                        <Link to='/homeRRHH'>
                            <button className='boton-creacion' >CANCELAR</button>
                        </Link>
                        <button type="submit" className='boton-creacion' >MODIFICAR</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

