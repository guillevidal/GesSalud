import React, {useState} from 'react';
import {useDispatch} from "react-redux";
// import NavBar from './NavBar';
import Cards from './Cards';
import {obtenerEspecialistaPorNombre} from '../../actions/index';
import {obtenerEspecialistas} from '../../actions/index';

export default function HomeRH() {
    
    const [inputName, setInputName] = useState("");
    const [inputEspecialista, setInputEspecialista] = useState("");

    const dispatch = useDispatch();

    function handleInputName(e){         
        setInputName(e.target.value);
    }

    function handleName() {
        dispatch(obtenerEspecialistaPorNombre(inputName));
        setInputName("");
    }

    function handleInputEspecialista(e){         
        setInputEspecialista(e.target.value);
    }

    function handleEspecialidad() {
        dispatch(obtenerEspecialistas(inputEspecialista));
        setInputEspecialista("");
    }

    return (
        <div>
            <div>
                {/* <NavBar /> */}
            </div>
            <div>
                <input type="text" placeholder="Buscar por nombre" onChange={handleInputName} value={inputName}/>
                <button onClick={() => {handleName()}}>Buscar</button>
            </div>
            <div>
                <input type="text" placeholder="Buscar por especialidad" onChange={handleInputEspecialista} value={inputEspecialista}/>
                <button onClick={() => {handleEspecialidad()}}>Buscar</button>
            </div>
            <div>
                <Cards /> 
            </div>

        </div>
    )
}
