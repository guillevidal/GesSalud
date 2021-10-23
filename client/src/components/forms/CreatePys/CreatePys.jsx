/* eslint-disable */
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Person from "../Person/Person.jsx";
import { crearAdministrativo, resetearAdministrativoCreado } from "../../../actions/index.js"
const CreatePyS = () => {
    const capitalFirstLetter = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1)
    }
    const dispatch = useDispatch()
    const [validation, setValidation] = useState(true)
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

    })

    const administrativos = useSelector(state => state.administrativos)

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
    const handleSubmit = (event) => {
        event.preventDefault()

        if (!input.name.error && !input.lastName.error && !input.password.error && !input.email.error && !input.phone.error
            && !input.user.error && !input.birth.error && !input.dni.error
            && !input.adress.error) {

            if (input.name.value.length === 0 || input.lastName.value.length === 0 || input.password.value.length === 0 || input.email.value.length === 0 || input.phone.value.length === 0
                || input.user.value.length === 0 || input.birth.value.length === 0 || input.dni.value.length === 0
                || input.adress.value.length === 0) {
                setValidation(false)
                return

            } else {

                if (administrativos.length > 0) {

                    for (let index = 0; index < administrativos.length; index++) {

                        if (parseInt(administrativos[index].persona.dni) === parseInt(input.dni.value)) {

                            setValidation(false)
                            alert("El DNI  que intenta crear ya se encuentra registrado")
                            return
                        }

                        if (administrativos[index].persona.email === input.email.value) {
                            setValidation(false)
                            alert("El EMAIL  que intenta crear ya se encuentra registrado")
                            return
                        }

                        if (administrativos[index].persona.user === input.user.value) {
                            setValidation(false)
                            alert("El Usuario  que intenta crear ya se encuentra registrado")
                            return
                        }

                    }

                }


            }
        } else {
            setValidation(false)
            return
        }


        let newAdmin = {
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
            rol: "1"

        }

        alert(`El Administrativo ${capitalFirstLetter(input.name?.value)} ${capitalFirstLetter(input.lastName?.value)} se creo correctamente `)
        dispatch(crearAdministrativo(newAdmin));
        return

    }

    const handleCancel = (e) => {
        dispatch(resetearAdministrativoCreado())
    }

    return (
        <div className="information-person">

            <Person name={input.name} lastName={input.lastName} dni={input.dni}
                email={input.email} phone={input.phone} adress={input.adress}
                birth={input.birth} user={input.user} password={input.password} gender={input.gender}
                handleName={handleName} handleLastName={handleLastName} handleDni={handleDni}
                handleBrith={handleBrith} handlePhone={handlePhone} handleGender={handleGender}
                handleAdress={handleAdress} handleEmail={handleEmail} handleUser={handleUser}
                handlePassword={handlePassword}
            />
            {!validation && <p>Diligencie correctamente el formulario</p>}
            <div className='boton-crear-paciente'>

                <button onClick={(e) => handleSubmit(e)} className='boton-crear'>CREAR</button>
            </div>
        </div>
    )
}

export default CreatePyS