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
                                id="name" type="text" name="name" required pattern="^[A-Za-z]+$" title="The field only accepts letters."
                                value={name} onChange={handle}
                            />
                        </td>
                        <td>
                            <label htmlFor="lastName">Apellido:</label>
                        </td>
                        <td>
                            <input
                                id="lastName" type="text" name="lastName" required pattern="^[A-Za-z]+$" title="The field only accepts letters."
                                value={lastName}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label htmlFor="dni">Identificación:</label>
                        </td>
                        <td>
                            <input
                                id="dni" type="text" name="dni" required pattern="[0-9]+"
                                value={dni}
                            />
                        </td>
                        <td>
                            <label htmlFor="birth">Fecha de nacimiento:</label>
                        </td>
                        <td>
                            <input
                                id="birth" type="date" name="birth" required min={Date()}
                                value={birth}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label htmlFor="phone">Teléfono:</label>
                        </td>
                        <td>
                            <input
                                id="phone" type="tel" name="phone" required pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                                value={phone}
                            />
                        </td>
                        <td>
                            <label htmlFor="gener">Sexo:</label>
                        </td>
                        <td>
                            <input
                                id="feminine" type="radio" name="gener" value="feminine"
                            />

                            <label htmlFor="femenine">Femenino</label>
                            <input
                                id="male" type="radio" name="gener" value="male"
                            />
                            <label htmlFor="male">Masculino</label>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label htmlFor="address">Dirección:</label>
                        </td>
                        <td>
                            <input
                                id="address" type="text" name="address" required
                                value={adress}
                            />
                        </td>
                        <td>
                            <label htmlFor="email">Correo electrónico:</label>
                        </td>
                        <td>
                            <input
                                id="email" type="email" name="email" required pattern=".+@globex\.com" size="30"
                                value={email}
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
                                value={user}
                            />
                        </td>
                        <td>
                            <label htmlFor="password">Contraseña:</label>
                        </td>
                        <td>
                            <input
                                id="password" type="text" name="password" required
                                value={password}
                            />
                        </td>
                    </tr>
                </tbody>
            </table>

        </div>
    )
}