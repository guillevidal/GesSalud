import React, { useState } from "react";
import { useSelector } from "react-redux";
import Nav from '../../../Layout/Nav';
import './CreateAgenda.scss';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function CreateAgenda() {

    const specialities = useSelector(state => state.especialidades)
    const [startDate, setStartDate] = useState(new Date());

    return (
        <div id="createAgenda">
            <Nav />
            <div>
                <div>
                    <label>Seleccione Especialidad</label>
                </div>
                <select>
                    <option>Especialidades...</option>
                    {
                        specialities.length > 0 && specialities.map(type => {
                            return (
                                <>
                                    <option key={type.name} value={type.name} id={type.name}  >{type.name}</option>
                                </>
                            )
                        })
                    }
                </select>
                <div>
                    <label>Seleccione Especialista</label>
                </div>
                <select>
                    <option>Especialista...</option>
                </select>
                <div>
                    <label>Fecha y hora inicial</label>
                    <DatePicker 
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        minDate={startDate}
                    />
                </div>
                <div>
                    <label>Fecha y hora final</label>
                    <DatePicker
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        minDate={startDate}
                    />
                </div>
            </div>
        </div>
    )
}

export default CreateAgenda;