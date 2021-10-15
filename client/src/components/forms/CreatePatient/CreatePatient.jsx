import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Person from "../Person/Person";
import Nav from '../../Layout/Nav'
import { crearPaciente } from '../../../actions/index'

export default function CreatePatient() {
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
    const dispatch = useDispatch()
    const handleChange = (event) => {
        setInput({
            ...input,
            [event.target.name]: event.target.value
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault()

        let newPatient = {
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

        dispatch(crearPaciente(newPatient))
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
        alert(`El paciente se creó correctamente `)
    }


    return (

        <div id="createPatient-container">

            <Nav />
            <div>
                <form onSubmit={(event) => { handleSubmit(event) }}>
                    <Person
                        name={input.name} lastName={input.lastName} dni={input.dni}
                        email={input.email} phone={input.phone} adress={input.adress}
                        birth={input.birth} user={input.user} password={input.password} handle={handleChange}
                    />
                    <div>
                        <button type="submit">CREAR</button>
                    </div>
                </form>
            </div>
        </div>

    )
}