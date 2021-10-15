import React, { useState} from "react";

const SearchPatient = () => {

    const [input, setInput] =useState("")
    const handleChange = (e) => {
        setInput(e.target.value)
    }
    return (
        <>
        <input placeholder="Busque paciente" value={input} onChange={(e)=>{handleChange(e)}}></input>
        </>
    )
}

export default SearchPatient;