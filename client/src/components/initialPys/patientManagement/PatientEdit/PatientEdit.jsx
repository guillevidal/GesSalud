/* eslint-disable */

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch} from "react-redux";
import { Link } from "react-router-dom";
import Nav from '../../../Layout/Nav';
import Person from '../../../forms/Person/Person.jsx';
import {modificarPaciente, obtenerPacientes, resetearPacienteDetallado} from "../../../../actions/index.js"
import swal from "sweetalert";
import { Redirect } from "react-router";

export default function PatientEdit() {
    const capitalFirstLetter = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1)
    }
    const patientDetail = useSelector(state => state.pacienteDetallado)
    const pacientes = useSelector(state => state.pacientes)
    const dispatch = useDispatch()

    const [volver, setVolver] = useState(false)

    const [input, setInput] = useState({
        name: {value: patientDetail[0]?.name, error: null},
        lastName: {value: patientDetail[0]?.lastName, error: null},
        dni: {value: patientDetail[0]?.dni, error: null},
        email: {value: patientDetail[0]?.email, error: null},
        phone: {value: patientDetail[0]?.phone, error: null},
        adress: {value: patientDetail[0]?.adress, error: null},
        birth: {value: patientDetail[0]?.birth, error: null},
        user: {value: patientDetail[0]?.user, error: null},
        password: {value: patientDetail[0]?.password, error: null},
        gender: {value: patientDetail[0]?.gender , error: null , ad: "el genero seleccionado es: "+ patientDetail[0]?.gender},
        emergencyContact: {value: patientDetail[0]?.paciente.emergencyContact, error: null}

    })
    const [validation, setValidation]= useState(true)
    useEffect(() => {
        setTimeout(() => { setValidation(true) }, 2500)
    }, [validation])

    useEffect(async () => {
        await dispatch(obtenerPacientes())
    }, [])
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


    const handleContactEmergy = (event) => {
        const { value } = event.target
        if (value === "") {
            setInput({ ...input, emergencyContact: { value, error: "Campo requerido" } })
        }
        if (value[0]?.includes(" ")) {
            setInput({ ...input, emergencyContact: { value, error: "No debe contener espacions al inicio" } })
        } else if (value.includes(" ")) {
            setInput({ ...input, emergencyContact: { value, error: "No debe contener espacios" } })
        } else if (/\W/.test(value.replace(/\s/g, "_"))) {
            setInput({ ...input, emergencyContact: { value, error: "No debe contener caracteres especiales" } })
        } else if (/\D/.test(value)) {
            setInput({ ...input, emergencyContact: { value, error: "No debe contener letras" } })
        } else {
            setInput({ ...input, emergencyContact: { value, error: null } })
        }
    }

    const handleReset = () => {
        dispatch(resetearPacienteDetallado())
    }

    const handleSubmit =  (event) => {
        event.preventDefault()

        if (!input.name.error && !input.lastName.error && !input.password.error && !input.email.error && !input.phone.error
            && !input.user.error  && !input.birth.error  && !input.dni.error
            && !input.adress.error  && !input.emergencyContact.error 
            ) {

            if (input.name.value.length === 0 || input.lastName.value.length === 0 || input.password.value.length === 0 || input.email.value.length === 0 || input.phone.value.length === 0
                || input.user.value.length === 0 || input.birth.value.length === 0 || input.dni.value.length === 0
                || input.adress.value.length === 0 || input.emergencyContact.value.length === 0 
                ) {
                setValidation(false)
                return
            }else{ 

                let filtro = pacientes.filter((pat) => { return pat.persona.dni !== patientDetail[0]?.dni})
                let filtro2 = pacientes.filter((pat) => { return pat.persona.email !== patientDetail[0]?.email })
                let filtro3 = pacientes.filter((pat) => { return pat.persona.user !== patientDetail[0]?.user })
                
                if (filtro.length > 0) {
                    console.log("Aquiiiiii",filtro)
                    for (let index = 0; index < filtro.length; index++) {
                        
                        if (filtro[index].persona.dni === parseInt(input.dni.value)) {
                            
                            setValidation(false)
                            swal({
                                icon : 'warning',
                                title : "El DNI  que intenta modificar ya se encuentra registrado"
                            })
                            return
                        }

                    }
                }

                if(filtro2.length> 0){
                    for (let index = 0; index < filtro2.length; index++){
                        if (filtro2[index].persona.email===input.email.value) {
                            setValidation(false)
                            swal({
                                icon : 'warning',
                                title : "El EMAIL  que intenta modificar ya se encuentra registrado"
                            })
                            return
                        }
                    }
                }
                if(filtro3.length> 0){
                    for (let index = 0; index < filtro3.length; index++){
                        if (filtro3[index].persona.user===input.user.value) {
                            setValidation(false)
                            swal({
                                icon : 'warning',
                                title : "El Usuario  que intenta modificar ya se encuentra registrado"
                            })
                            return
                        }
                    }
                }

            }
        }else{
            setValidation(false)
            return 
        }





        let newPatient = {
            personaId: patientDetail[0]?.paciente.personaId,
            id: patientDetail[0]?.paciente.id,
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
            emergencyContact: parseInt(input.emergencyContact.value)
        }
        
        
        dispatch(modificarPaciente(newPatient));

        swal({
            icon :'success',
            title :`${capitalFirstLetter(input.name?.value)} ${capitalFirstLetter(input.lastName?.value)} se modificó correctamente!`,
            text : `¿Desea continuar con la edicion?`,
            
            buttons: ['Volver', true],
          })
          .then((willDelete) => {
            if (willDelete) {
              return
            } else {
              setVolver(true)
            }
          });

        return

    }

    return (
        <div id="createPatient-container">

            {volver && <Redirect to='patientPys'/>}
            <Nav />

            <form className='createPatient-form' onSubmit={handleSubmit}>
                <div className='information-person'>

                <Person name={input.name} lastName={input.lastName} dni={input.dni}
                        email={input.email} phone={input.phone} adress={input.adress}
                        birth={input.birth} user={input.user} password={input.password} gender={input.gender}
                        handleName={handleName} handleLastName={handleLastName} handleDni={handleDni}
                        handleBrith={handleBrith} handlePhone={handlePhone} handleGender={handleGender}
                        handleAdress={handleAdress} handleEmail={handleEmail} handleUser={handleUser}
                        handlePassword={handlePassword}
                    />


                </div>
                <div className='information-clinic'>
                <div className='label-title'>
                        <label className='label-title-text'>INFORMACION CLINICA</label>
                    </div>
                    <div className='label-textarea'>
                        <label htmlFor="emergencyContact" className='label-interno'>Contacto de emergencia: </label>

                        <input
                            id="emergencyContact" type="text" name="emergencyContact" required pattern="[0-9]+"
                            title="El campo solo acepta números" value={input.emergencyContact.value} onChange={(e) => handleContactEmergy(e)}
                            className='input-emergencia'
                        />
                        {input.emergencyContact.error && <p>{input.emergencyContact.error}</p>}
                    </div>
                </div>
                <div className='errors'>       
                        {!validation && <span className='error-label'>Completa correctamente el formulario</span>}
                    </div>   <div className='boton-crear-paciente'>
                    <Link to="/patientPys" onClick={handleReset}>
                        <button className='boton-crear'>CANCELAR</button>
                    </Link>
                    <button onClick={(e)=>handleSubmit(e)} className='boton-crear'>MODIFICAR</button>
                </div>
            </form>

        </div>
    )
}
