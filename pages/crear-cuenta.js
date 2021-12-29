import React, { useState } from 'react'
import Layout from '../components/layout/Layout'
import { Formulario, Campo, InputSubmit, Error } from '../ui/Formulario'
import {css} from '@emotion/react'
import useValidacion from '../hooks/useValidacion'
import validarCrearCuenta from '../validacion/validarCrearCuenta'
import firebase from "../firebase/firebase";
import Router from 'next/router'
import Swal from "sweetalert2";

const STATE_INICIAL = {
  nombre: '',
  email: '',
  password: ''
}

const CrearCuenta = () => {
  
  const [error, setError] = useState(false)

  const {valores,errores, handleSubmitCrearcuenta, handleChange,onBlur } = useValidacion
  (STATE_INICIAL, validarCrearCuenta, crearCuenta)

    const{nombre, email, password} = valores;

  async function crearCuenta() {
    try {  
        await firebase.registrar(nombre, email, password)
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Your account has been successfully registered',
          showConfirmButton: false,
          timer: 1500
        })
        Router.push('/')
        
  } catch(error) {
      console.log('there was an error creating the user', error.message)
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `${error}`,
     
      })
      setError(error.message)
  }
}

  

  
  return (
    <div>
      <Layout>
          <>
        
        <h1
         css={css `
          text-align:center;
          margin-top: 5rem;
         `}
        >Create account</h1>
        <Formulario 
        onSubmit={handleSubmitCrearcuenta}
     
        >
          <Campo>
              <label htmlFor="nombre">Name</label>
              <input 
              type="text" 
              id="nombre"
              name="nombre" 
              placeholder="Your name"                
              value={nombre} 
              onChange={handleChange} 
              onBlur={onBlur}
              />
          </Campo>
           {errores.nombre && <Error>{errores.nombre}</Error>}       
          <Campo>
              <label htmlFor="email">Email</label>
              <input 
              type="email" 
              name="email" 
              placeholder="Your Email" 
              id="email" 
              value={email} 
              onChange={handleChange} 
              onBlur={onBlur}
              />
          </Campo>
          {!errores.nombre && errores.email && <Error>{errores.email}</Error>}
          <Campo>
              <label htmlFor="password">password</label>
              <input 
                  type="password" 
                  id="password" 
                  placeholder="Your Password"
                  name="password"                  
                  value={password} 
                  onChange={handleChange}
                  onBlur={onBlur}
                 />
          </Campo>
          {!errores.nombre && !errores.email && errores.password && <Error>{errores.password}</Error>}
         

          <InputSubmit 
          type="submit" 
          value="Create account" />
        </Formulario>  
        </>
      </Layout>
    </div>
  )
}

export default CrearCuenta;