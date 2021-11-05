/* eslint-disable */
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector} from "react-redux";
import Person from "../Person/Person";
import Nav from '../../Layout/Nav'
import { crearPaciente } from '../../../actions/index'
import './CreatePatient.scss'
import '../Person/Person.scss'
import swal from 'sweetalert';

export default function CreatePatient() {
    const capitalFirstLetter = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1)
    }
    const dispatch = useDispatch()
    
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
        medication: { value: "", error: null },
        emergencyContact: { value: "", error: null },
        disease: { value: "", error: null },
        creationDate: { value: "", error: null },
        diagnostic: { value: "", error: null },
        date: { value: "", error: null },
        derivation: { value: "", error: null },

    })

    const pacientes = useSelector(state => state.pacientes)
    const [validation, setValidation] = useState(true)

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
        } else if(value.length < 8 || value.length > 11) {
            setInput({ ...input, dni: { value, error: "El número ingresado no es valido" } })
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
        if (value === "+54") {
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
        } else if(/^\d{0,9}$/.test(value) || value.length > 13) {
            setInput({ ...input, phone: { value, error: "El número ingresado no es valido" } })
        }else{
            setInput({ ...input, phone: { value, error: null }})
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

    const handleMedication = (event) => {
        const { value } = event.target
        if (value === "") {
            setInput({ ...input, medication: { value, error: "Campo requerido" } })
        };
        if (value.length > 0) {

            if (value[0]?.includes(" ")) {
                setInput({ ...input, medication: { value, error: "No debe contener espacions al inicio" } })
            } else if (/\W/.test(value.replace(/\s/g, "_"))) {
                setInput({ ...input, medication: { value, error: "No debe contener caracteres especiales" } })

            } else if (/\d/.test(value)) {
                setInput({ ...input, medication: { value, error: "No debe contener numeros" } })
            } else {

                setInput({ ...input, medication: { value, error: null } })
            }
        }
    }

    const handleDisease = (event) => {
        const { value } = event.target
        if (value === "") {
            setInput({ ...input, disease: { value, error: "Campo requerido" } })
        };
        if (value.length > 0) {

            if (value[0]?.includes(" ")) {
                setInput({ ...input, disease: { value, error: "No debe contener espacions al inicio" } })
            } else if (/\W/.test(value.replace(/\s/g, "_"))) {
                setInput({ ...input, disease: { value, error: "No debe contener caracteres especiales" } })

            } else if (/\d/.test(value)) {
                setInput({ ...input, disease: { value, error: "No debe contener numeros" } })
            } else {

                setInput({ ...input, disease: { value, error: null } })
            }
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
    const handleSubmit =  (event) => {
        event.preventDefault()

        let creationDate = new Date();
        creationDate = creationDate.toDateString().slice(4, 15);

        console.log(typeof input.birth.value)
        if (!input.name.error && !input.lastName.error && !input.password.error && !input.email.error && !input.phone.error
            && !input.user.error  && !input.birth.error && !input.gender.error && !input.dni.error
            && !input.adress.error && !input.medication.error && !input.emergencyContact.error 
            && !input.disease.error) {

            if (input.name.value.length === 0 || input.lastName.value.length === 0 || input.password.value.length === 0 || input.email.value.length === 0 || input.phone.value.length === 0
                || input.user.value.length === 0 || input.birth.value.length === 0 || input.gender.value.length === 0 || input.dni.value.length === 0
                || input.adress.value.length === 0 || input.medication.value.length === 0 || input.emergencyContact.value.length === 0 
                || input.disease.value.length === 0) {
                setValidation(false)
                return


            }else{
                let newPatient = {
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
                    medication: input.medication.value,
                    emergencyContact: parseInt(input.emergencyContact.value),
                    disease: input.disease.value,
                    creationDate: creationDate,
                    diagnostic: "",
                    date: "",
                    derivation: ""
                }
                if(!pacientes[0]){
                     dispatch(crearPaciente(newPatient))
                    
                    swal({
                        title: "Paciente creado",
                        text: `El paciente ${capitalFirstLetter(input.name.value) + ' '}  ${capitalFirstLetter(input.lastName.value)} se creó correctamente `,
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
                        gender: { value: "", error: "Seleccione un genero", ad: null },
                        medication: { value: "", error: null },
                        emergencyContact: { value: "", error: null },
                        disease: { value: "", error: null },
                        creationDate: { value: "", error: null },
                        diagnostic: { value: "", error: null },
                        date: { value: "", error: null },
                        derivation: { value: "", error: null },
                
                    })
                    return
                }else{
                    for (let index = 0; index < pacientes.length; index++) {

                        if (pacientes[index].persona.dni === newPatient.dni) {

                            alert("El DNI ya esta registado")
                            setValidation(false)
                            return
                        }
                        if (pacientes[index].persona.email===newPatient.email){
                            alert("El EMAIL ya esta registado")
                            setValidation(false)
                            return
                        }
                        if (pacientes[index].persona.user===newPatient.user){
                            alert("El USUARIO ya esta registado")
                            setValidation(false)
                            return
                        }
 
                    } 

                     dispatch(crearPaciente(newPatient))
                    swal({
                        title: "Paciente creado",
                        text: `El paciente ${capitalFirstLetter(input.name.value) + ' '}  ${capitalFirstLetter(input.lastName.value)} se creó correctamente `,
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
                        gender: { value: "", error: "Seleccione un genero", ad: null },
                        medication: { value: "", error: null },
                        emergencyContact: { value: "", error: null },
                        disease: { value: "", error: null },
                        creationDate: { value: "", error: null },
                        diagnostic: { value: "", error: null },
                        date: { value: "", error: null },
                        derivation: { value: "", error: null },
                
                    })
                    return  
                }
            }
            
        }else{
            setValidation(false)
                return 
        }





       

    }


    



    return (

        <div id="createPatient-container">

            <Nav />

            <form className='createPatient-form'>

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
                        <label htmlFor="medication" className='label-interno'>Medicación: </label>
                        <textarea
                            id="medication" type="text" name="medication"
                            value={input.medication.value} onChange={(e) => handleMedication(e)}
                            className='inputs' />
                        {input.medication.error && <span className='error-label'>{input.medication.error}</span>}
                    </div>
                    <div className='label-textarea'>    
                        <label htmlFor="disease" className='label-interno'>Enfermedades: </label>
                        <textarea
                            id="disease" type="text" name="disease"
                            value={input.disease.value} onChange={(e) => handleDisease(e)}
                            className='inputs' />
                        {input.disease.error && <span className='error-label'>{input.disease.error}</span>}
                        </div>
                        <div className='label-textarea'>
                            <label htmlFor="emergencyContact" className='label-interno'>Contacto de emergencia: </label>

                            <input
                                id="emergencyContact" type="text" name="emergencyContact"
                                value={input.emergencyContact.value} onChange={(e) => handleContactEmergy(e)}
                                className='input-emergencia'
                            />
                            {input.emergencyContact.error && <span className='error-label'>{input.emergencyContact.error}</span>}
                        </div>
                    
                </div>
              
                <div className='boton-crear-paciente'>
                <div className='errors'>       
                        {!validation && <span className='error-label'>Completa correctamente el formulario</span>}
                    </div>  

                    <button onClick={(e) => handleSubmit(e)} className='boton-crear'>CREAR</button>
                </div>
            </form>
        </div>

    )
}