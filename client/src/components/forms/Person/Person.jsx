//import './Person.scss';
import React from 'react';

export default function Person({name, lastName, dni, email, phone, adress, birth, user, password, handle}) {
    return (
        <div>
            <label >INFORMACION PERSONAL</label>
            <table>
                <tbody>
                    <tr>
                        <td>
                            <label htmlFor="name">Nombre:</label>
                        </td>
                        <td>
                            <input
                                id="name" type="text" name="name" required pattern="[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]{2,48}"
                                title="El campo solo acepta letras" value={name} onChange={handle}
                            />
                        </td>
                        <td>
                            <label htmlFor="lastName">Apellido:</label>
                        </td>
                        <td>
                            <input
                                id="lastName" type="text" name="lastName" required pattern="[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]{2,64}"
                                title="El campo solo acepta letras" value={lastName} onChange={handle}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label htmlFor="dni">Identificación:</label>
                        </td>
                        <td>
                            <input
                                id="dni" type="text" name="dni" required pattern="[0-9]+" title="El campo solo acepta números"
                                value={dni} onChange={handle}
                            />
                        </td>
                        <td>
                            <label htmlFor="birth">Fecha de nacimiento:</label>
                        </td>
                        <td>
                            <input
                                id="birth" type="date" name="birth" required
                                value={birth} onChange={handle}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label htmlFor="phone">Teléfono:</label>
                        </td>
                        <td>
                            <input
                                id="phone" type="text" name="phone" required pattern="[0-9]+" title="El campo solo acepta números"
                                value={phone} onChange={handle} 
                            />
                        </td>
                        <td>
                            <label htmlFor="gener">Sexo:</label>
                        </td>
                        <td>
                            <input
                                id="femenino" type="radio" name="gener" value="femenino"  onChange={handle} 
                            />
                            <label htmlFor="femenino">Femenino</label>
                            <input
                                id="masculino" type="radio" name="gener" value="masculino" onChange={handle}
                            />
                            <label htmlFor="masculino">Masculino</label>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label htmlFor="adress">Dirección:</label>
                        </td>
                        <td>
                            <input
                                id="adress" type="text" name="adress" required
                                value={adress} onChange={handle}
                            />
                        </td>
                        <td>
                            <label htmlFor="email">Correo electrónico:</label>
                        </td>
                        <td>
                            <input
                                id="email" type="email" name="email" required pattern="^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$"
                                size="30" value={email} onChange={handle}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label htmlFor="user">Usuario:</label>
                        </td>
                        <td>
                            <input
                                id="user" type="text" name="user" required 
                                value={user} onChange={handle} title="El campo require entre 5 y 12 caracteres entre numeros y letras"
                            />
                        </td>
                        <td>
                            <label htmlFor="password">Contraseña:</label>
                        </td>
                        <td>
                            <input
                                id="password" type="password" name="password" required pattern="[A-Za-z0-9!?-]{8,12}"
                                value={password} onChange={handle}
                            />
                        </td>
                    </tr>
                </tbody>
            </table>

        </div>
    )
}