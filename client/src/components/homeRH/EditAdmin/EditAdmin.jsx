/* eslint-disable */
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { modificarAdministrativo, obtenerAdministrativos, resetearAdministrativoDetallado } from "../../../actions/index.js"
import { Link } from "react-router-dom";
import Nav from "../../Layout/Nav.jsx"
import Person from "../../forms/Person/Person.jsx";
import swal from "sweetalert";
import { Redirect } from "react-router";
const EditAdmin = () => {
    const administrativoDetallado = useSelector(state => state.administrativoDetallado)
    const administrativos = useSelector(state => state.administrativos)
    const dispatch = useDispatch()
    const [input, setInput] = useState({
        name: { value: administrativoDetallado[0]?.persona.name, error: null },
        lastName: { value: administrativoDetallado[0]?.persona.lastName, error: null },
        dni: { value: administrativoDetallado[0]?.persona.dni, error: null },
        email: { value: administrativoDetallado[0]?.persona.email, error: null },
        phone: { value: administrativoDetallado[0]?.persona.phone, error: null },
        adress: { value: administrativoDetallado[0]?.persona.adress, error: null },
        birth: { value: administrativoDetallado[0]?.persona.birth, error: null },
        user: { value: administrativoDetallado[0]?.persona.user, error: null },
        password: { value: administrativoDetallado[0]?.persona.password, error: null },
        gender: { value: administrativoDetallado[0]?.persona.gender, error: null, ad: "El genero seleccionado es: " + administrativoDetallado[0]?.persona.gender },
        status: { value: administrativoDetallado[0]?.status, error: null },
        rol: {value: administrativoDetallado[0]?.persona.rol, error: null}
    })
    const [volver, setVolver] = useState(false)
    const [validation, setValidation] = useState(true);

    useEffect(() => {
        setTimeout(() => { setValidation(true) }, 2500)
    }, [validation])

    const capitalFirstLetter = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1)
    }
    const especialistas = useSelector(state => state.especialistas)
    const pacientes = useSelector(state => state.pacientes)
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
        } else if(value.length < 7 || value.length > 11) {
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
    const handleStatus = (e) => {
        const {value} = e.target
        setInput({ ...input, status : {value, error: null}})
    }
    const handleRol = (e) => {
        if(e.target.value!=="Rol..."){
            const {value} = e.target
            setInput({ ...input, rol : {value, error: null}})

        }
    }
    const handleSubmit = (event) => {
        event.preventDefault()
        
        if (!input.name.error && !input.lastName.error && !input.password.error && !input.email.error && !input.phone.error
            && !input.user.error  && !input.birth.error && !input.dni.error
             && !input.adress.error) {

            if (input.name.value.length === 0 || input.lastName.value.length === 0 || input.password.value.length === 0 || input.email.value.length === 0 || input.phone.value.length === 0
                || input.user.value.length === 0  || input.birth.value.length === 0 || input.dni.value.length === 0
                || input.adress.value.length === 0) {
                setValidation(false)
                return

            } else {
                let filtro = administrativos.filter((esp) => { return esp.persona.dni !== administrativoDetallado[0]?.persona.dni })
                let filtro2 = administrativos.filter((esp) => { return esp.persona.email !== administrativoDetallado[0]?.persona.email })
                let filtro3 = administrativos.filter((esp) => { return esp.persona.user !== administrativoDetallado[0]?.persona.user })
                
                if (filtro.length > 0) {
                    
                    for (let index = 0; index < filtro.length; index++) {
                       
                        if (parseInt(filtro[index].persona.dni) === parseInt(input.dni.value)) {
                            
                            setValidation(false)
                            swal({
                                icon : 'warning',
                                title : "El DNI  que intenta modificar ya se encuentra registrado"
                            })
                            return
                        }

                }
                if(filtro2.length> 0){
                    for (let index = 0; index < filtro2.length; index++){
                        if (filtro2[index].persona.email===input.email.value) {
                            setValidation(false)
                            swal({
                                icon : 'warning',
                                title :"El EMAIL  que intenta modificar ya se encuentra registrado"
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
                                title :"El USUARIO  que intenta modificar ya se encuentra registrado"
                            })
                            return
                        }
                    }
                }
 
            } 
     
       
           
            }
        }else{
            setValidation(false)
            return
        }
        let access = false
        pacientes.forEach(element => {
            if(parseInt(input.dni.value)===element.persona.dni || 
            input.email.value.toLowerCase() === element.persona.email.toLowerCase() ||
            input.user.value.toLowerCase() === element.persona.user.toLowerCase()){
                access=true
                swal({

                    title: "Error",
                    text: `El dni, usuario, o email ingresado ya esta registrado en un paciente`,
                    icon: "error",

                })
            }
        })
       
        especialistas.forEach(element => {
            if(parseInt(input.dni.value)===element.persona.dni || 
            input.email.value.toLowerCase() === element.persona.email.toLowerCase() ||
            input.user.value.toLowerCase() === element.persona.user.toLowerCase()){
                access=true
                swal({

                    title: "Error",
                    text: `El dni, usuario, o email ingresado ya esta registrado en un especialista`,
                    icon: "error",

                })
            }
        }) 
       if(!access){
           let newAdmin = {
               
               id: administrativoDetallado[0].id,
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
               status: input.status.value,
               rol: input.rol.value
   
           }
           
           dispatch(modificarAdministrativo(newAdmin));
           swal({
               icon :'success',
               title :`${capitalFirstLetter(input.name?.value)} ${capitalFirstLetter(input.lastName?.value)} se modificó correctamente`,
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

    }

    const handleCancel = (e) => {
        dispatch(resetearAdministrativoDetallado())
    }

    return (
        <div id="createSpecialist-container">
        {volver && <Redirect to='homeRRHH' />}
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
                        {<div className='statuss'>
                          <select onChange={(e) => handleStatus(e)} className='select'>
                              <option value={input.status.value?true:false}>{input.status.value?"Activo":"Inactivo"}</option>
                              <option value={!input.status.value?true:false}>{!input.status.value?"Activo":"Inactivo"}</option>
                          </select>
                             
                       
                            <select onChange={(e) => handleRol(e)} className='select'>
                              <option>Rol...</option>
                              <option value="1">Rol PYS</option>
                              <option value="2">Rol RRHH</option>
                          </select>
                         </div>}
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
export default EditAdmin;