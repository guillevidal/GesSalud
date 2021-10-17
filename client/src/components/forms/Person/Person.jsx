//import './Person.scss';
import React from 'react';

export default function Person({ name, lastName, dni, email, phone, adress, birth, user, password, handle, error }) {
    return (
        <div className='createPerson'>

            <div className='label-person-title'>
                <label className='label-person-title-text'>INFORMACION PERSONAL</label>
            </div>

            <div className='person-data'>

                <div className='label-input-person'>
                    <label htmlFor="name" className='label-person'>Nombre</label>

                    <input
                        id="name" type="text" name="name" required pattern="[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]{2,48}"
                        title="El campo solo acepta letras" value={name} onChange={handle}
                        className='input-person'
                    />
                </div>

                <div className='label-input-person'>
                    <label htmlFor="lastName" className='label-person'>Apellido</label>

                    <input
                        id="lastName" type="text" name="lastName" required pattern="[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]{2,64}"
                        title="El campo solo acepta letras" value={lastName} onChange={handle}
                        className='input-person'
                    />
                </div>

                <div className='label-input-person'>
                    <label htmlFor="dni" className='label-person'>Identificación</label>

                    <input
                        id="dni" type="text" name="dni" required pattern="[0-9]+" title="El campo solo acepta números"
                        value={dni} onChange={handle}
                        className='input-person'
                    />
                </div>

                <div className='label-input-person'>
                    <label htmlFor="birth" className='label-person'>Fecha de nacimiento</label>

                    <input
                        id="birth" type="date" name="birth" required
                        value={birth} onChange={handle}
                        className='input-person'
                    />
                </div>

                <div className='label-input-person'>
                    <label htmlFor="phone" className='label-person'>Teléfono</label>

                    <input
                        id="phone" type="text" name="phone" required pattern="[0-9]+" title="El campo solo acepta números"
                        value={phone} onChange={handle}
                        className='input-person'
                    />
                </div>


                <div className='label-input-person-sexo'>

                    <label htmlFor="gender" className='label-person'>Sexo</label>
                    <div className='sexo-input-label'>
                        <label htmlFor="femenino" className='label-sexo-fem'>Femenino</label>

                        <input
                            id="feminino" type="radio" name="gender" value="feminino"
                            className='input-person-sexo' onChange={handle}
                        />

                        <label htmlFor="masculino" className='label-sexo-mas'>Masculino</label>
                        <input
                            id="masculino" type="radio" name="gender" value="masculino"
                            className='input-person-sexo' onChange={handle}
                        />
                    </div>
                    {
                        error.gender && (
                            <span>{error.gender}</span>
                        )
                    }
                </div>


                <div className='label-input-person'>
                    <label htmlFor="adress" className='label-person'>Dirección</label>

                    <input
                        id="adress" type="text" name="adress" required
                        value={adress} onChange={handle}
                        className='input-person'
                    />
                </div>

                <div className='label-input-person'>
                    <label htmlFor="email" className='label-person'>Correo electrónico</label>

                    <input
                        id="email" type="email" name="email" required pattern="^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$"
                        size="30" value={email} onChange={handle}
                        className='input-person'
                    />
                </div>

                <div className='label-input-person'>
                    <label htmlFor="user" className='label-person'>Usuario</label>

                    <input
                        id="user" type="email" name="user" required pattern="^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$"
                        value={user} onChange={handle} 
                        className='input-person'
                    />
                </div>

                <div className='label-input-person'>
                    <label htmlFor="password" className='label-person'>Contraseña</label>

                    <input
                        id="password" type="password" name="password" required pattern="[A-Za-z0-9!?-]{8,12}"
                        value={password} onChange={handle} title='Ingrese de 8 a 12 caracteres entre numeros y letras'
                        className='input-person'
                    />
                </div>
            </div>

        </div>
    )
}