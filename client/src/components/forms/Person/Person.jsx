/*eslint-disable*/
import './Person.scss';

export default function Person() {
    return (
        <div>
            <label >INFORMACION PERSONAL</label>
            <form>
                <table>
                    <tbody>
                        <tr>
                            <td>
                                <label htmlFor="name">Nombre:</label>
                            </td>
                            <td>
                                <input
                                    id="name" type="text" name="name" required pattern="^[A-Za-z]+$" title="The field only accepts letters."
                                />
                            </td>
                            <td>
                                <label htmlFor="lastname">Apellido:</label>
                            </td>
                            <td>
                                <input
                                    id="lastname" type="text" name="lastname" required pattern="^[A-Za-z]+$" title="The field only accepts letters."
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label htmlFor="dni">Identificación:</label>
                            </td>
                            <td>
                                <input
                                    id="dni" type="text" name="phonenumber" required pattern="[0-9]+"
                                />
                            </td>
                            <td>
                                <label htmlFor="birth">Fecha de nacimiento:</label>
                            </td>
                            <td>
                                <input
                                    id="birth" type="date" name="birth" required min={Date()}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label htmlFor="phonenumber">Teléfono:</label>
                            </td>
                            <td>
                                <input
                                    id="phonenumber" type="tel" name="phonenumber" required pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
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
                                />
                            </td>
                            <td>
                                <label htmlFor="email">Correo electrónico:</label>
                            </td>
                            <td>
                                <input
                                    id="email" type="email" name="email" required pattern=".+@globex\.com" size="30"
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>
        </div>
    )
}