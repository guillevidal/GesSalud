/* eslint-disable */
import Nav from "../Layout/Nav"
import './ProfileSpecialist.scss'
import { useDispatch, useSelector } from "react-redux"
import { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEdit } from "@fortawesome/free-solid-svg-icons"
import {rol, modificarEspecialistas, especialistaDetallado, modificarPaciente, pacienteDetallado, uploadAction } from "../../actions"
import { useEffect } from "react"
import swal from 'sweetalert';
import imagen from './images/user.png'
import axios from "axios"

export default  function ProfileSpecialist(){
 

    const dispatch = useDispatch()

    let roles = useSelector(state => state.rol)

    let especialista =  useSelector(state => state.especialistaDetallado)
    const pacienteDetail  = useSelector(state => state.pacienteDetallado)

    let [imagenBD, setImagenBD] = useState(false);

    const newData = {...especialista[0]}

    const [editar, setEditar] = useState({
        imagen : false,
        datos : false,
        cuenta : false
    })

    const [datosEsp, setDatos] = useState(especialista.length ? {
           ...especialista[0].persona
    } : null)

    const [datosPac, setDatosPac] = useState(pacienteDetail.length ?{
        ...pacienteDetail[0],
        "id" : pacienteDetail[0].paciente.id
}: null)


 
    useEffect(()=>{

        if(roles === '3'){
        dispatch(especialistaDetallado(especialista[0].id))
        }
        else{
            dispatch(pacienteDetallado(pacienteDetail[0].dni))
        }

    },[editar])

    const [image, setImage] = useState('');
    const [preview, setPreview] = useState(false);


    const [validaciones, setValidaciones] = useState(false)

    const handleImageUpload = (e) => {
        setImage(e.target.files[0]);
        setPreview(true);
      }


    const mayus = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    const handleClick = (e, op) =>  {

        e.preventDefault()

            console.log(imagenBD)
          
           if(op === 'imagen'){
            document.getElementById('upload').click()
           }
           if(op === 'imagenPac'){
            document.getElementById('uploadPac').click()
           }

           setEditar({
            ...editar,
            [op] : true
        })

        

    }

    const handleChange = async (e) =>{
        if(roles === '3'){
         setDatos({
            ...datosEsp,
            [e.target.name] : e.target.value

        })
        }
        else{
            setDatosPac({
                ...datosPac,
                [e.target.name] : e.target.value
    
            })
        }


        if(e.target.name === 'passwordActual'){
            if(roles === '3'){
            if(e.target.value !== especialista[0].persona.password){
                setValidaciones(true)
                return
            }
            else{
                setValidaciones(false)
                return
            }
        }
        else{
            if(e.target.value !== pacienteDetail[0].password){
                setValidaciones(true)
                return
            }
            else{
                setValidaciones(false)
                return
            }
        }

        }   

       
    }

    const handleClear = (e) => {
        e.preventDefault()
        setPreview(false);
        setImage('');
        setEditar({
            imagen :false,
            datos : false,
            cuenta : false
        })
    }

    const handleSubmit =   (e) =>{
        e.preventDefault()

        if(validaciones === true){
            swal({
                title: "Error!",
                text: "Tus datos no han sido modificados, verifica que sean validos",
                icon: "error"
              })
            return
        }

    if(image !== ''){
        
        let myNewFile = '';
        
        if(roles === '4'){
         myNewFile = new File([image], `${datosPac.dni}-profile`, {type: image.type});
        }
        else{
            myNewFile = new File([image], `${datosEsp.dni}-profile`, {type: image.type});
        }
        
        dispatch(uploadAction(myNewFile))
    }

/*   
 */

        if(roles === '4'){

            delete(datosPac.paciente)
            delete(datosPac.rol)
           

            let newObject = datosPac;


            dispatch(modificarPaciente(newObject))
       
        }

        else{
            delete(newData.persona)

            let newObject = {
                'id' : especialista[0].id,
                'specialty' : especialista[0].specialty,
                'enrollment' : especialista[0].enrollment,
                'personaId' : especialista[0].personaId,
                'adress': datosEsp.adress,
                'birth': datosEsp.birth,
                'dni': datosEsp.dni,
                'email': datosEsp.email,
                'gender': datosEsp.gender,
                'lastName': datosEsp.lastName,
                'name': datosEsp.name,
                'password': datosEsp.password,
                'phone': datosEsp.phone,
                'rol': datosEsp.rol,
                'user': datosEsp.user,
    
            }
    
    
             dispatch(modificarEspecialistas(newObject))
        }
       
  
        setEditar({
            imagen :false,
            datos : false,
            cuenta : false
        })

        swal({
            title: "Exito!",
            text: "Tus datos han sido modificados",
            icon: "success"
          })

    }


    const hardCodeo = (number) =>{
        
        let signos = ''

        for(let i=1; i<=number; i++){
            signos = signos + '*'
        }

        return signos
    }

    return(
        <div className='ProfileSpecialist'>
            <Nav />


            {roles === '3' && <div className='card-profile'>
                <div className='encabezado'>
                   <div className='image-label'>
                       
                   {preview ?
                       <img src={URL.createObjectURL(image)} alt="" className='imagen'/>
                       :
                       especialista[0] && especialista[0].persona.imgProfile ? 
                       <img src={`https://gessalud.herokuapp.com/images/profile/${especialista[0].dni}`} alt="" className='imagen'/>
                       :
                       <img src={imagen} alt="" className='imagen'/>
                       
                       }
                       
                   <div className='icon-label'>
                    <label  onClick={e => handleClick(e,'imagen')} className='icon'><FontAwesomeIcon icon={faEdit} /></label></div></div> 
                   <input className='file' type="file" name="imagen" id="upload" onChange={(e) => handleImageUpload(e)}/>
                    <span className='nombre'>{mayus(especialista[0].persona.name) + ' ' + mayus(especialista[0].persona.lastName) }</span>
                   <span className='especialidad'>{especialista[0].specialty}</span>
                </div> 

                <div className='informacion'>
              <div className='info'>
                    <span className='info-title'>Información profesional</span>
                    <div className='data'><span>Dni: </span><span className='data-real'>{especialista[0].persona.dni}</span></div>
                    <div className='data'><span>N° de legajo: </span><span className='data-real'>{especialista[0].enrollment}</span></div>
                    <div className='data'><span>Fecha de nacimiento: </span><span className='data-real'>{especialista[0].persona.birth}</span></div>
                </div>
                <div className='info'>
                <div className='info-edit'><span className='info-title personal'>Información personal</span><div className='icon-label-datos'><label onClick={e => handleClick(e,'datos')} className='button'><FontAwesomeIcon icon={faEdit} className='icon'/></label></div></div>

                    <div className='data'><span>Telefono: </span>{editar.datos === true ? <input type='text' value={datosEsp.phone} onChange={e => handleChange(e)} name='phone'/> : <span className='data-real'>{ especialista[0].persona.phone}</span>}</div>
                    <div className='data'><span>Email: </span>{editar.datos === true ? <input type='text' value={datosEsp.email} onChange={e => handleChange(e)} name='email'/> : <span className='data-real'>{especialista[0].persona.email}</span>}</div>
                    <div className='data'><span>Dirección: </span>{editar.datos === true ? <input type='text' value={datosEsp.adress} onChange={e => handleChange(e)} name='adress' /> : <span className='data-real'>{especialista[0].persona.adress}</span>}</div>
                </div>

                <div className='info'>
                <div className='info-edit'><span className='info-title personal'>Información de cuenta</span><div className='icon-label-datos'><label onClick={e => handleClick(e,'cuenta')} className='button'><FontAwesomeIcon icon={faEdit} className='icon'/></label></div></div>
                <div className='data'><span>usuario: </span>{editar.cuenta === true ? <input type='text' value={datosEsp.user} onChange={e => handleChange(e)} name='user'/> : <span className='data-real'>{especialista[0].persona.user }</span>}</div>
                <div className='data'><span>Contraseña actual: </span>{editar.cuenta === true ? <input type='password' onChange={e => handleChange(e)} name='passwordActual'/> : <span className='data-real'>{hardCodeo( especialista[0].persona.password.length)}</span>}</div>
                {validaciones && <label className='error'>La contraseña actual no coincide con la ingresada</label>  }
                {editar.cuenta === true && <div className='data'><span>Nueva contraseña: </span>  <input type='password' onChange={e => handleChange(e)} name='password'/> </div>}
              
               </div>
                
                </div>

                

                {(editar.imagen === true) || (editar.datos === true) || (editar.cuenta === true) ? <div className='buttons'><button onClick={e => handleSubmit(e)} name='save' className='button-change save'>Guardar cambios</button> 
                   <button onClick={e => handleClear(e)} name='clean' className='button-change discard'>Descartar cambios</button></div> : null} 
               
            </div>}

            {roles === '4' &&   <div className='card-profile'>
                <div className='encabezado'>
                   <div className='image-label'>

                   {preview ?
                       <img src={URL.createObjectURL(image)} alt="" className='imagen'/>
                       :
                       pacienteDetail[0] && pacienteDetail[0].imgProfile ? 
                       <img src={`https://gessalud.herokuapp.com/images/profile/${pacienteDetail[0].dni}`} alt="" className='imagen'/>
                       :
                       <img src={imagen} alt="" className='imagen'/>
                       
                       }
                       <div className='icon-label'><label onClick={e => handleClick(e,'imagenPac')} className='icon'><FontAwesomeIcon icon={faEdit} /></label></div></div> 
                   <input className='file' type="file" name="imagen" id="uploadPac" onChange={(e) => handleImageUpload(e)}/>
                    <span className='nombre'>{mayus(pacienteDetail[0].name) + ' ' + mayus(pacienteDetail[0].lastName) }</span>
                 </div> 

                <div className='informacion'>
                <div className='info'>
                <div className='info-edit'><span className='info-title personal'>Información personal</span><div className='icon-label-datos'><label onClick={e => handleClick(e,'datos')} className='button'><FontAwesomeIcon icon={faEdit} className='icon'/></label></div></div>
                    <div className='data'><span>Telefono: </span>{editar.datos === true ? <input type='text' value={datosPac.phone} onChange={e => handleChange(e)} name='phone'/> : <span className='data-real'>{ pacienteDetail[0].phone}</span>}</div>
                    <div className='data'><span>Email: </span>{editar.datos === true ? <input type='text' value={datosPac.email} onChange={e => handleChange(e)} name='email'/> : <span className='data-real'>{pacienteDetail[0].email}</span>}</div>
                    <div className='data'><span>Dirección: </span>{editar.datos === true ? <input type='text' value={datosPac.adress} onChange={e => handleChange(e)} name='adress' /> : <span className='data-real'>{pacienteDetail[0].adress}</span>}</div>

                </div>

                <div className='info'>
                <div className='info-edit'><span className='info-title personal'>Información de cuenta</span><div className='icon-label-datos'><label onClick={e => handleClick(e,'cuenta')} className='button'><FontAwesomeIcon icon={faEdit} className='icon'/></label></div></div>
                <div className='data'><span>usuario: </span>{editar.cuenta === true ? <input type='text' value={datosPac.user} onChange={e => handleChange(e)} name='user'/> : <span className='data-real'>{pacienteDetail[0].user }</span>}</div>
                <div className='data'><span>Contraseña actual: </span>{editar.cuenta === true ? <input type='password' onChange={e => handleChange(e)} name='passwordActual'/> : <span className='data-real'>{hardCodeo( pacienteDetail[0].password.length)}</span>}</div>
                {validaciones && <label className='error'>La contraseña actual no coincide con la ingresada</label>  }
                {editar.cuenta === true && <div className='data'><span>Nueva contraseña: </span>  <input type='password' onChange={e => handleChange(e)} name='password'/> </div>}
              
               </div>
                
                </div>

                

                 {(editar.imagenPac === true) || (editar.datos === true) || (editar.cuenta === true) ? <div className='buttons'><button onClick={e => handleSubmit(e)} name='save' className='button-change save'>Guardar cambios</button> 
                   <button onClick={e => handleClear(e)} name='clean' className='button-change discard'>Descartar cambios</button></div> : null} 
                  
            </div>}


        </div>
    )

}