import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Person from '../../forms/Person/Person';
import Nav from "../../Layout/Nav";

import { obtenerEspecialidades, modificarEspecialistas, obtenerEspecialistas, resetearEspecialistaDetallado } from "../../../actions/index.js";



export default function EditSpecialty() {
    
    const capitalFirstLetter = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1)
    }

    const dispatch = useDispatch();
    const specialtyDetail = useSelector(state => state.especialistaDetallado)
    useEffect(async () => {
        await dispatch(obtenerEspecialidades())
        await dispatch(obtenerEspecialistas())
    }, [])

    const especialistas = useSelector(state => state.especialistas)
    const typeSpecialties = useSelector((state) => state.especialidades)
    const [validation, setValidation] = useState(true);


    const [input, setInput] = useState({
        name: { value: specialtyDetail[0]?.persona.name, error: null },
        lastName: { value: specialtyDetail[0]?.persona.lastName, error: null },
        dni: { value: specialtyDetail[0]?.persona.dni, error: null },
        email: { value: specialtyDetail[0]?.persona.email, error: null },
        phone: { value: specialtyDetail[0]?.persona.phone, error: null },
        adress: { value: specialtyDetail[0]?.persona.adress, error: null },
        birth: { value: specialtyDetail[0]?.persona.birth, error: null },
        user: { value: specialtyDetail[0]?.persona.user, error: null },
        password: { value: specialtyDetail[0]?.persona.password, error: null },
        gender: { value: specialtyDetail[0]?.persona.gender, error: null, ad: "El genero seleccionado es: " + specialtyDetail[0]?.persona.gender },
        enrollment: { value: specialtyDetail[0]?.enrollment, error: null },
        specialty: { value: specialtyDetail[0]?.specialty.split(', '), error: null },
    })

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
        if(!input.specialty.value[0]){
            setInput({ ...input, specialty: {value: [value], error: null}})
            return
        }else{
            for (let index = 0; index < input.specialty.value.length; index++) {

                if(input.specialty.value[index].toLowerCase()=== value.toLowerCase()){

                    setInput({ ...input, specialty: {value: [...input.specialty.value], error: "Ya ha seleccionado esta opcion"}})
                    return
                }
                
            }
            setInput({ ...input, specialty: {value: [...input.specialty.value, value], error: null}})
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

    const handleCancel = () => {
        dispatch(resetearEspecialistaDetallado())
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        
        if (!input.name.error && !input.lastName.error && !input.password.error && !input.email.error && !input.phone.error
            && !input.user.error && !input.specialty.error && !input.birth.error && !input.dni.error
            && !input.enrollment.error && !input.adress.error) {

            if (input.name.value.length === 0 || input.lastName.value.length === 0 || input.password.value.length === 0 || input.email.value.length === 0 || input.phone.value.length === 0
                || input.user.value.length === 0 && input.specialty.value.length === 0 || input.birth.value.length === 0 || input.dni.value.length === 0
                || input.enrollment.value.length === 0 || input.adress.value.length === 0) {
                setValidation(false)
                return

            } else {
                let filtro = especialistas.filter((esp) => { return esp.id !== specialtyDetail[0]?.id })
                let filtro2 = especialistas.filter((esp) => { return esp.persona.email !== specialtyDetail[0]?.persona.email })
                let filtro3 = especialistas.filter((esp) => { return esp.persona.user !== specialtyDetail[0]?.persona.user })
                let filtro4 = especialistas.filter((esp) => { return esp.enrollment !== specialtyDetail[0]?.enrollment })
                if (filtro.length > 0) {
                    
                    for (let index = 0; index < filtro.length; index++) {
                        console.log("Aquiiiiii", filtro.length )
                        if (parseInt(filtro[index].persona.dni) === parseInt(input.dni.value)) {
                            
                            setValidation(false)
                            alert("El DNI  que intenta modificar ya se encuentra registrado")
                            return
                        }

                }
                if(filtro2.length> 0){
                    for (let index = 0; index < filtro2.length; index++){
                        if (filtro2[index].persona.email===input.email.value) {
                            setValidation(false)
                            alert("El EMAIL  que intenta modificar ya se encuentra registrado")
                            return
                        }
                    }
                }
                if(filtro3.length> 0){
                    for (let index = 0; index < filtro3.length; index++){
                        if (filtro3[index].persona.user===input.user.value) {
                            setValidation(false)
                            alert("El Usuario  que intenta modificar ya se encuentra registrado")
                            return
                        }
                    }
                }
                if(filtro4.length> 0){
                    for (let index = 0; index < filtro4.length; index++){
                        if (filtro4[index].enrollment===parseInt(input.enrollment.value)) {
                            setValidation(false)
                            alert("La identificacion profesional que intenta modificar ya se encuentra registrado")
                            return
                        }
                    }
                }
                if(input.specialty.value.length===0){
                    setValidation(false)
                            alert("Debe seleccionar por lo menos un tipo de especialidad")
                            return
                }
            } 
     
                
            }
        }else{
            setValidation(false)
            return
        }

       
        let newSpecialist = {
            personaId: specialtyDetail[0].personaId,
            id: specialtyDetail[0].id,
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
        
        alert(`El especialista médico ${capitalFirstLetter(input.name?.value)} ${capitalFirstLetter(input.lastName?.value)} se modificó correctamente `)
        dispatch(modificarEspecialistas(newSpecialist));
        dispatch(obtenerEspecialistas())
        return

    }


    return (
        <div id="createSpecialist-container">
            <Nav />
            <div>
                <form className='form-container' onSubmit={handleSubmit}>
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
                        </div>
                    </div>
                    <div id='specialist-container'>

                        <div className='label-tipo-title'>

                            <label className='label-tipo-title-text'>TIPO DE ESPECIALDAD</label>
                        </div>
                        <div className='lista-especialidades'>


                            <select onChange={(e) => { handleChangeTypeSpecialities(e) }}>
                                <option>Tipos de esp...</option>
                                {typeSpecialties && typeSpecialties.map((type, index) => {
                                    return (
                                        <option value={type.name} key={index} id={type.name} name={type.name}>{type.name}</option>
                                    )
                                })}
                            </select>
                            {input.specialty.value[0] ? input.specialty.value.map((type, index) => {
                                return (
                                    <div className='preview'><span className='text'>{type}</span><button onClick={(e) => handleDeleteTypeSpecialities(e)} value={type} className='eliminar-esp'>X</button></div>
                                )
                            }) : <p>Seleccione un tipo de especialista</p>}

                        </div>

                    </div>
                    <div className='boton-crear-especialista'>
                        <Link to='/homeRRHH' onClick={handleCancel}>
                            <button className='boton-creacion' >CANCELAR</button>
                        </Link>
                        {!validation && <p>Diligencie correctamente el formulario</p>}
                        <button onClick={(e) => handleSubmit(e)} className='boton-creacion' >MODIFICAR</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

