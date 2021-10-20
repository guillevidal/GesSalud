/* eslint-disable */
//import './Person.scss';
import React from 'react';

export default function Person({ name, lastName, dni, email, phone, adress, birth, user, password, gender,
handleName, handleLastName, handleDni, handleBrith, handlePhone, handleGender, handleAdress, handleEmail, 
handleUser, handlePassword}) {
    return (
        <div className='createPerson'>

            <div className='label-person-title'>
                <label className='label-person-title-text'>INFORMACION PERSONAL</label>
            </div>

            <div className='person-data'>

                <div className='label-input-person'>
                    <label htmlFor="name" className='label-person'>Nombre</label>

                    <input
                        id="name" type="text" name="name" 
                        value={name.value} onChange={(e)=>handleName(e)}
                        className='input-person'
                    />
                {name.error&&<p>{name.error}</p>}
                </div>
                <div className='label-input-person'>
                    <label htmlFor="lastName" className='label-person'>Apellido</label>

                    <input
                        id="lastName" type="text" name="lastName"
                        value={lastName.value} onChange={(e)=>handleLastName(e)}
                        className='input-person'
                    />
                    {lastName.error&&<p>{lastName.error}</p>}
                </div>

                <div className='label-input-person'>
                    <label htmlFor="dni" className='label-person'>Identificación</label>

                    <input
                        id="dni" type="text" name="dni"
                        value={dni.value} onChange={(e)=>{handleDni(e)}}
                        className='input-person'
                    />
                    {dni.error&&<p>{dni.error}</p>}
                </div>

                <div className='label-input-person'>
                    <label htmlFor="birth" className='label-person'>Fecha de nacimiento</label >
                    {birth.error&&<p>{birth.error}</p>}

                    <input
                        id="birth" type="date" name="birth" 
                        value={birth.value} onChange={(e)=>handleBrith(e)}
                        className='input-person'
                    />
                </div>

                <div className='label-input-person'>
                    <label htmlFor="phone" className='label-person'>Teléfono</label>

                    <input
                        id="phone" type="text" name="phone"
                        value={phone.value} onChange={(e)=>{handlePhone(e)}}
                        className='input-person'
                    />
                    {phone.error&&<p>{phone.error}</p>}
                </div>


                <div className='label-input-person-sexo'>

                    <label htmlFor="gender" className='label-person'>Sexo</label>
                    <div className='sexo-input-label'>
                        <label htmlFor="femenino" className='label-sexo-fem'>Femenino</label>

                        <input
                            id="feminino" type="radio" name="gender" value="femenino"
                            className='input-person-sexo' onChange={(e)=>{handleGender(e)}}
                        />

                        <label htmlFor="masculino" className='label-sexo-mas'>Masculino</label>
                        <input
                            id="masculino" type="radio" name="gender" value="masculino"
                            className='input-person-sexo'  onChange={(e)=>{handleGender(e)}}
                        />
                        {gender.error&&<p>{gender.error}</p>}
                        {gender.ad&&<p>{gender.ad}</p>}
                    </div>

                </div>


                <div className='label-input-person'>
                    <label htmlFor="adress" className='label-person'>Dirección</label>

                    <input
                        id="adress" type="text" name="adress"
                        value={adress.value} onChange={(e)=>{handleAdress(e)}}
                        className='input-person'
                    />
                    {adress.error&&<p>{adress.error}</p>}
                </div>

                <div className='label-input-person'>
                    <label htmlFor="email" className='label-person'>Correo electrónico</label>

                    <input
                        id="email" type="email" name="email" 
                        size="30" value={email.value} onChange={(e)=>{handleEmail(e)}}
                        className='input-person'
                    />
                    {email.error&&<p>{email.error}</p>}
                </div>

                <div className='label-input-person'>
                    <label htmlFor="user" className='label-person'>Usuario</label>

                    <input
                        id="user" type="email" name="user" 
                        value={user.value} onChange={(e)=>handleUser(e)} 
                        className='input-person'
                    />
                    {user.error&&<p>{user.error}</p>}
                </div>

                <div className='label-input-person'>
                    <label htmlFor="password" className='label-person'>Contraseña</label>

                    <input
                        id="password" type="password" name="password" 
                        value={password.value} onChange={(e)=>{handlePassword(e)}} 
                        className='input-person'
                    />
                    {password.error&&<p>{password.error}</p>}
                </div>
            </div>

        </div>
    )
}