import './CreateSpecialist.scss';
import React, { useState, useEffect } from 'react';
import Nav from '../../Layout/Nav'
import { useDispatch, useSelector } from 'react-redux';
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
        gener: "",
        enrollment: "",
        typeSpecialties: [],
    })
    
    const handleChange = (event) => {
        setInput({
            ...input,
            [event.target.name]: event.target.value
        })
    }

    const handleChangeTypeSpecialities = (e) => {
        if (input.typeSpecialties.includes(e.target.value)) {
            setInput({
                ...input,
                typeSpecialties: input.typeSpecialties.filter(type => type !== e.target.value)

            })
        } else {
            setInput({
                ...input,
                typeSpecialties: [...input.typeSpecialties, e.target.value]
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
            gener: input.gener,
            enrollment: parseInt(input.enrollment),
            typeSpecialties: input.typeSpecialties.join(', '),

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
            gener: "",
            enrollment: 0,
            typeSpecialties: [],
        })
        alert(`El especialista médico se creó correctamente `)
    }

    return (

        <div id="createSpecialist-container">

            <Nav />
            <div>
                <form onSubmit={(event) => handleSubmit(event)}>
                    <Person name={input.name} lastName={input.lastName} dni={input.dni}
                        email={input.email} phone={input.phone} adress={input.adress}
                        birth={input.birth} user={input.user} password={input.password}
                        handle={handleChange}
                    />
                    <hr />
                    <label>TIPO DE ESPECIALDAD</label>
                    <br />
                    <br />
                    <div id="especialist-container">
                        {
                            typeSpecialties && typeSpecialties.map((type, index) => {
                                return (
                                    <div className="typeSpecialty" key={index + "A"} >
                                        <input
                                            key={index}
                                            type="checkbox"
                                            name={type}
                                            value={type}
                                            id={type}
                                            onChange={handleChangeTypeSpecialities}
                                        />
                                        <label key={index + type}>{type}</label>
                                    </div>
                                )
                            })
                        }

                    </div>
                    <div>
                        <table>
                            <tbody>
                                <tr>
                                    <td>
                                        <label htmlFor="enrollment">IDENTIFICACION PROFESIONAL:</label>
                                    </td>
                                    <td>
                                        <input
                                            id="enrollment" type="text" name="enrollment" required pattern="[0-9]+" title="El campo solo acepta números"
                                            value={input.enrollment} onChange={handleChange}
                                        />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div>
                        <button type="submit">CREAR</button>
                    </div>
                </form>
            </div>
        </div>
    )
}