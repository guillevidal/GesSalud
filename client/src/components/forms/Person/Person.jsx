import './Person.scss';
import React from 'react';

export default function Person({ name, lastName, dni, email, phone, adress, birth, user, password, handle }) {
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
                
            <label htmlFor="gener" className='label-person'>Sexo</label>
            <div className='sexo-input-label'>
            <label htmlFor="femenine" className='label-sexo-fem'>Femenino</label>
                
                <input
                    id="feminine" type="radio" name="gener" value="feminine"
                    className='input-person-sexo'
                />

            <label htmlFor="male" className='label-sexo-mas'>Masculino</label>
                <input
                    id="male" type="radio" name="gener" value="male"
                    className='input-person-sexo'
                />
                </div>
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
                id="user" type="text" name="user" required
                value={user} onChange={handle} title="El campo require entre 5 y 12 caracteres entre numeros y letras"
                className='input-person'
            />
            </div>
            
            <div className='label-input-person'>
            <label htmlFor="password" className='label-person'>Contraseña</label>

            <input
                id="password" type="password" name="password" required pattern="[A-Za-z0-9!?-]{8,12}"
                value={password} onChange={handle}
                className='input-person'
            />
            </div>
        </div>
    
    </div>
    )
}