/* eslint-disable */
import "./Landing";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClinicMedical, faUserMd } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { rol } from "../../actions";
import { Redirect } from "react-router-dom";
import axios from "axios";
import { especialistaDetallado, pacienteDetallado } from "../../actions"


export default function Landing() {
  const dispatch = useDispatch();
  const status = useSelector((state) => state.rol);
  
    useEffect(()=>{

    let obtengoToken = localStorage.getItem('access-token')
    axios.get('/whoami', { 
     headers:  { 
        authorization : obtengoToken
      }
  })
  .then(res => {
    if(res.data.rol){
      dispatch(rol(res.data.rol))
    }
  }) 
    
 

   },[])   
 
  const [input, setInput] = useState({
    user: "",
    pass: "",
  });

  const handleChange = (e) => {
    e.preventDefault();

    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

      axios.post('/autenticar', { 

        usuario: input.user,
        password: input.pass
    })
    .then(data => {

    if(data.data.token) {
        localStorage.setItem('access-token', data.data.token)
        
        dispatch(rol(data.data.persona.rol));

        if(data.data.persona.rol === '3'){
          dispatch(especialistaDetallado(data.data.persona.especialistaId));
          }
          else if(data.data.persona.rol === '4'){
            dispatch(pacienteDetallado(data.data.persona.dni));
          }
        }
    else {
    alert(data.data.mensaje)
    }
    }) 
 

    
/* 
     dispatch(rol(input.user));  */


  };

  return (
    <div id="landing-container">
      {status === "1" && <Redirect to="/patientPys" />}
      {status === "2" && <Redirect to="/homeRRHH" />}
      {(status === "3" || status === "4") && <Redirect to="/homeUser" />}
      {status === "5" && <Redirect to="/LandingAdmin" />}


      <div id="landing-header">
        <div id="landing-title">
          <FontAwesomeIcon icon={faClinicMedical} className="icon-salud" />
          <span className="landing-title-text">GesSalud</span>
        </div>
      </div>

      <div id="landing-login">
        <form className="landing-form">
          <FontAwesomeIcon icon={faUserMd} className="icon-login" />
          <label htmlFor="" className="form-title">
            Iniciar Sesión
          </label>
          <div className="landing-form-inputs">
            <div className="label-input">
              <label htmlFor="" className="label">
                Usuario
              </label>
              <input
                type="text"
                name="user"
                value={input.user}
                className="input"
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="label-input">
              <label htmlFor="" className="label">
                Contraseña
              </label>
              <input
                type="password"
                name="pass"
                value={input.pass}
                className="input"
                onChange={(e) => handleChange(e)}
              />
            </div>
          </div>
          <button className="boton-login" onClick={(e) => handleSubmit(e)}>
            Ingresar
          </button>
        </form>
      </div>
    </div>
  );
}
