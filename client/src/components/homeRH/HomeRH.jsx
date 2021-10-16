import React, {useState} from 'react';
import {useDispatch} from "react-redux";
// import NavBar from './NavBar';
import Cards from './Cards';
import Paged from './Paged';
import {obtenerEspecialistaPorNombre} from '../../actions/index';
import {obtenerEspecialistas} from '../../actions/index';

const HomeReHu = () => {
    
    const [input, setInput] = useState("");

    const dispatch = useDispatch();

    function handleInput(e){         
        setInput(e.target.value);
    }

    function handleName() {
        dispatch(obtenerEspecialistaPorNombre(input));
        setInput("");
    }

    function handleEspecialidad() {
        dispatch(obtenerEspecialistas(input));
        setInput("");
    }

    return (
        <div>
            <div>
                {/* <NavBar /> */}
            </div>
            <div>
                <input type="text" placeholder="Buscar por nombre" onChange={handleInput} value={input}/>
                <button onClick={() => {handleName()}}>Buscar</button>
            </div>
            <div>
                <input type="text" placeholder="Buscar por especialidad" onChange={handleInput} value={input}/>
                <button onClick={() => {handleEspecialidad()}}>Buscar</button>
            </div>
            <div>
                {/*<Cards />*/} 
            </div>
            <div>
                {/*<Paged />*/}
            </div>
        </div>
    )
}
export default HomeReHu;