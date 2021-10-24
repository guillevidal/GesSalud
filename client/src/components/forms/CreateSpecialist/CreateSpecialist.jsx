/* eslint-disable */
import './CreateSpecialist.scss';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Person from '../Person/Person';
import {
    crearEspecialista,
} from '../../../actions/index.js'

import swal from 'sweetalert';



export default function CreateSpecialist() {
    const capitalFirstLetter = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1)
    }

    const [input, setInput] = useState({
        name: { value: "", error: null },
        lastName: { value: "", error: null },
        dni: { value: "", error: null },
        email: { value: "", error: null },
        phone: { value: "", error: null },
        adress: { value: "", error: null },
        birth: { value: "", error: "Seleccione una fecha" },
        user: { value: "", error: null },
        password: { value: "", error: null },
        gender: { value: "", error: "Seleccione un genero", ad: null },
        enrollment: { value: "", error: null },
        specialty: { value: [], error: null }
    })
    const [validation, setValidation] = useState(true)
    const dispatch = useDispatch()
    const typeSpecialties = useSelector((state) => state.especialidades)
    const especialistas = useSelector(state => state.especialistas)


    useEffect(() => {
        if (input.specialty.error) {
            setTimeout(() => { setInput({ ...input, specialty: { value: [...input.specialty.value], error: null } }) }, 2500)
        }
    }, [input.specialty.error])
    useEffect(() => {
        setTimeout(() => { setValidation(true) }, 2500)
    }, [validation])



    const handleName = (event) => {
        const { value } = event.target
        if (value === "") {
            setInput({ ...input, name: { value, error: "Campo requerido" } })
        };
        if (value.length > 0) {

            if (value[0]?.includes(" ")) {
                setInput({ ...input, name: { value, error: "No debe contener espacions al inicio" } })
            } else if (/\W/.test(value.replace(/\s/g, "_"))) {
                setInput({ ...input, value, error: "No debe contener caracteres especiales" })

            } else if (/\d/.test(value)) {
                setInput({ ...input, name: { value, error: "No debe contener numeros" } })
            } else {

                setInput({ ...input, name: { value, error: null } })
            }
        }
    }

    const handleLastName = (event) => {
        const { value } = event.target
        if (value === "") {
            setInput({ ...input, lastName: { value, error: "Campo requerido" } })
        };
        if (value.length > 0) {

            if (value[0]?.includes(" ")) {
                setInput({ ...input, lastName: { value, error: "No debe contener espacions al inicio" } })
            } else if (/\W/.test(value.replace(/\s/g, "_"))) {
                setInput({ ...input, lastName: { value, error: "No debe contener caracteres especiales" } })

            } else if (/\d/.test(value)) {
                setInput({ ...input, lastName: { value, error: "No debe contener numeros" } })
            } else {

                setInput({ ...input, lastName: { value, error: null } })
            }
        }
    }

    const handleDni = (event) => {
        const { value } = event.target
        if (value === "") {
            setInput({ ...input, dni: { value, error: "Campo requerido" } })
        };
        if (value[0]?.includes(" ")) {
            setInput({ ...input, dni: { value, error: "No debe contener espacions al inicio" } })
        } else if (value.includes(" ")) {
            setInput({ ...input, dni: { value, error: "No debe contener espacios" } })
        } else if (/\W/.test(value.replace(/\s/g, "_"))) {
            setInput({ ...input, dni: { value, error: "No debe contener caracteres especiales" } })
        } else if (/\D/.test(value)) {
            setInput({ ...input, dni: { value, error: "No debe contener letras" } })
        } else {
            setInput({ ...input, dni: { value, error: null } })
        }
    }

    const handleBrith = (event) => {
        const { value } = event.target
        setInput({ ...input, birth: { value, error: null } })
    }

    const handleAdress = (event) => {
        const { value } = event.target
        if (value === "") {
            setInput({ ...input, adress: { value, error: "Campo requerido" } })
        } if (value[0]?.includes(" ")) {
            setInput({ ...input, adress: { value, error: "No debe contener espacions al inicio" } })
        } else {
            setInput({ ...input, adress: { value, error: null } })
        }
    }


    const handlePhone = (event) => {
        const { value } = event.target
        if (value === "") {
            setInput({ ...input, phone: { value, error: "Campo requerido" } })
        }
        if (value[0]?.includes(" ")) {
            setInput({ ...input, phone: { value, error: "No debe contener espacions al inicio" } })
        } else if (value.includes(" ")) {
            setInput({ ...input, phone: { value, error: "No debe contener espacios" } })
        } else if (/\W/.test(value.replace(/\s/g, "_"))) {
            setInput({ ...input, phone: { value, error: "No debe contener caracteres especiales" } })
        } else if (/\D/.test(value)) {
            setInput({ ...input, phone: { value, error: "No debe contener letras" } })
        } else {
            setInput({ ...input, phone: { value, error: null } })
        }
    }

    const handleGender = (event) => {
        const { value } = event.target
        setInput({ ...input, gender: { value, error: null } })
    }

    const handleEmail = (event) => {
        const { value } = event.target

        if (value === "") {
            setInput({ ...input, email: { value, error: "Campo requerido" } })
        };
        if (value[0]?.includes(" ")) {
            setInput({ ...input, email: { value, error: "No debe contener espacions al inicio" } })
        } else if (value.includes(" ")) {
            setInput({ ...input, email: { value, error: "No debe contener espacios" } })
        } else if (!/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(value)) {
            setInput({ ...input, email: { value, error: "No es una direccion de correo valida" } })
        } else {
            setInput({ ...input, email: { value, error: null } })
        }
    }

    const handleUser = (event) => {
        const { value } = event.target

        if (value === "") {
            setInput({ ...input, user: { value, error: "Campo requerido" } })
        };
        if (value[0]?.includes(" ")) {
            setInput({ ...input, user: { value, error: "No debe contener espacions al inicio" } })
        } else if (value.includes(" ")) {
            setInput({ ...input, user: { value, error: "No debe contener espacios" } })
        } else if (!/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(value)) {
            setInput({ ...input, user: { value, error: "No es una direccion de correo valida" } })
        } else {
            setInput({ ...input, user: { value, error: null } })
        }
    }
    const handlePassword = (event) => {
        const { value } = event.target
        if (value === "") {
            setInput({ ...input, password: { value, error: "Campo requerido" } })

        };

        if (!/[A-Za-z0-9!?-]{8,12}/.test(value)) {
            setInput({ ...input, password: { value, error: "Debe contener entre 8-12 caracteres, numeros y letras" } })

        } else {
            setInput({ ...input, password: { value, error: null } })
        }

    }

    const handleEnrollment = (event) => {
        const { value } = event.target
        if (value === "") {
            setInput({ ...input, enrollment: { value, error: "Campo requerido" } })

        }
        if (value[0]?.includes(" ")) {
            setInput({ ...input, enrollment: { value, error: "No debe contener espacions al inicio" } })
        } else if (value.includes(" ")) {
            setInput({ ...input, enrollment: { value, error: "No debe contener espacios" } })
        } else if (/\D/.test(value)) {
            setInput({ ...input, enrollment: { value, error: "No debe contener letras" } })
        } else {
            setInput({ ...input, enrollment: { value, error: null } })
        }
    }


    const handleChangeTypeSpecialities = (e) => {
        e.preventDefault()
        const { value } = e.target
        if (!input.specialty.value[0]) {
            setInput({ ...input, specialty: { value: [value], error: null } })
            return
        } else {
            for (let index = 0; index < input.specialty.value.length; index++) {

                if (input.specialty.value[index].toLowerCase() === value.toLowerCase()) {

                    setInput({ ...input, specialty: { value: [...input.specialty.value], error: "Ya ha seleccionado esta opcion" } })
                    return
                }

            }
            setInput({ ...input, specialty: { value: [...input.specialty.value, value], error: null } })
            return
        }

    }
    const handleDeleteTypeSpecialities = (event) => {
        event.preventDefault()
        const { value } = event.target;
        let arrDelete = []
        for (let index = 0; index < input.specialty.value.length; index++) {
            if (input.specialty.value[index].toLowerCase() !== value.toLowerCase()) {
                arrDelete = [...arrDelete, input.specialty.value[index]]
            }

        }
        setInput({
            ...input, specialty: {
                value: arrDelete,
                error: null
            }
        })

    }

    const handleSubmit = (event) => {
        event.preventDefault()

        if (!input.name.error && !input.lastName.error && !input.password.error && !input.email.error && !input.phone.error
            && !input.user.error && !input.specialty.error && !input.birth.error && !input.gender.error && !input.dni.error
            && !input.enrollment.error && !input.adress.error) {

            if (input.name.value.length === 0 || input.lastName.value.length === 0 || input.password.value.length === 0 || input.email.value.length === 0 || input.phone.value.length === 0
                || input.user.value.length === 0 && input.specialty.value.length === 0 || input.birth.value.length === 0 || input.gender.value.length === 0 || input.dni.value.length === 0
                || input.enrollment.value.length === 0 || input.adress.value.length === 0) {
                setValidation(false)

            } else {

                let newSpecialist = {
                    name: input.name.value.toLowerCase(),
                    lastName: input.lastName.value.toLowerCase(),
                    dni: parseInt(input.dni.value),
                    email: input.email.value,
                    phone: input.phone.value,
                    adress: input.adress.value.toLowerCase(),
                    birth: input.birth.value,
                    user: input.user.value,
                    password: input.password.value,
                    gender: input.gender.value,
                    enrollment: parseInt(input.enrollment.value),
                    specialty: input.specialty.value.join(', '),

                }

                if (!especialistas[0]) {
                    if (!newSpecialist.specialty[0]) {
                        alert("Seleccione algun tipo de especialidad")
                        setValidation(false)
                        return
                    } else {

                        dispatch(crearEspecialista(newSpecialist))

                        swal({
                            title: "Especialista médico creado",
                            text: `El especialista ${capitalFirstLetter(input.name.value) + ' '}  ${capitalFirstLetter(input.lastName.value)} se creó correctamente `,
                            icon: "success",

                        })
                        setInput({
                            name: { value: "", error: null },
                            lastName: { value: "", error: null },
                            dni: { value: "", error: null },
                            email: { value: "", error: null },
                            phone: { value: "", error: null },
                            adress: { value: "", error: null },
                            birth: { value: "", error: "Seleccione una fecha" },
                            user: { value: "", error: null },
                            password: { value: "", error: null },
                            gender: { value: "", error: "Seleccione un genero" },
                            enrollment: { value: "", error: null },
                            specialty: { value: [], error: null }
                        })
                        return
                    }
                } else {

                    for (let index = 0; index < especialistas.length; index++) {

                        if (especialistas[index].persona.dni === newSpecialist.dni) {

                            alert("El DNI ya esta registado")
                            setValidation(false)
                            return
                        }
                        if (especialistas[index].persona.email === newSpecialist.email) {
                            alert("El EMAIL ya esta registado")
                            setValidation(false)
                            return
                        }
                        if (especialistas[index].persona.user === newSpecialist.user) {
                            alert("El USUARIO ya esta registado")
                            setValidation(false)
                            return
                        }
                        if (especialistas[index].enrollment === newSpecialist.enrollment) {
                            alert("La identificacion profesional ya esta registada")
                            setValidation(false)
                            return
                        }
                    }
                    if (!newSpecialist.specialty[0]) {
                        alert("Seleccione algun tipo de especialidad")
                        setValidation(false)
                        return
                    } else {

                        dispatch(crearEspecialista(newSpecialist))
                        swal({

                            title: "Especialista médico creado",
                            text: `El especialista ${capitalFirstLetter(input.name.value) + ' '}  ${capitalFirstLetter(input.lastName.value)} se creó correctamente `,
                            icon: "success",

                        })
                        setInput({
                            name: { value: "", error: null },
                            lastName: { value: "", error: null },
                            dni: { value: "", error: null },
                            email: { value: "", error: null },
                            phone: { value: "", error: null },
                            adress: { value: "", error: null },
                            birth: { value: "", error: "Seleccione una fecha" },
                            user: { value: "", error: null },
                            password: { value: "", error: null },
                            gender: { value: "", error: "Seleccione un genero" },
                            enrollment: { value: "", error: null },
                            specialty: { value: [], error: null }
                        })

                        return
                    }
                }




            }
        } else {

            setValidation(false)
            return
        }
    }

    return (

        <div id="createSpecialist-container">


            <div>
                <form className='form-container'>
                    <div className='form-infoPersonal'>
                        <Person name={input.name} lastName={input.lastName} dni={input.dni}
                            email={input.email} phone={input.phone} adress={input.adress}
                            birth={input.birth} user={input.user} password={input.password} gender={input.gender}
                            handleName={handleName} handleLastName={handleLastName} handleDni={handleDni}
                            handleBrith={handleBrith} handlePhone={handlePhone} handleGender={handleGender}
                            handleAdress={handleAdress} handleEmail={handleEmail} handleUser={handleUser}
                            handlePassword={handlePassword}
                        />

                        <div className='identificacion-personal'>

                            <label htmlFor="enrollment" className='label-tipo-title-text'>IDENTIFICACION PROFESIONAL</label>

                            <input
                                id="enrollment" type="text" name="enrollment"
                                value={input.enrollment.value} onChange={(e) => handleEnrollment(e)}
                            />
                            {input.enrollment.error && <span className='error-label'>{input.enrollment.error}</span>}
                        </div>

                    </div>

                    <div id='specialist-container'>

                        <div className='label-tipo-title'>
                            <label className='label-tipo-title-text'>TIPO DE ESPECIALIDADES</label>
                        </div>

                        <div className='lista-especialidades'>
                            <div className='select'>
                                <select onChange={(e) => { handleChangeTypeSpecialities(e) }} >
                                    <option >Tipos de especialidades</option>
                                    {typeSpecialties && typeSpecialties.map((type, index) => {
                                        return (
                                            <option value={type.name} key={index} id={type.name} name={type.name}>{type.name}</option>
                                        )
                                    })}
                                </select>

                            </div>

                            {input.specialty.value[0] ? input.specialty.value.map((type, index) => {
                                return (
                                    <div className='preview'><span className='text'>{type}</span><button onClick={(e) => handleDeleteTypeSpecialities(e)} value={type} className='eliminar-esp'>X</button></div>
                                )
                            }) : <span className='error-label-especialidad'>Seleccione un tipo de especialidad</span>}

                            {input.specialty.error && <span className='error-label-especialidad'>{input.specialty.error}</span>}

                        </div>

                    </div>
                    <div className='boton-crear-especialista'>
                        {!validation && <span className='error-label'>Completa correctamente el formulario</span>}
                        <button onClick={(event) => handleSubmit(event)} className='boton-creacion' >CREAR</button>
                    </div>
                </form>


            </div>
        </div>
    )
}