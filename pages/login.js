import React, { useState } from 'react'
import Layout from '../components/layout/Layout'
import { Formulario, Campo, InputSubmit, Error } from '../ui/Formulario'
import {css} from '@emotion/react'
import useValidacion from '../hooks/useValidacion'
import validarIniciarSesion from '../validacion/validarIniciarSesion'
import firebase from "../firebase/firebase";
import Router from 'next/router'
import Swal from "sweetalert2";



const STATE_INICIAL = {
  email: '',
  password: ''
}

const Login = () => {
  
  const [error, setError] = useState(false)

  const {valores,errores, handleSubmitIniciarSesion , handleChange,onBlur } = useValidacion
  (STATE_INICIAL, validarIniciarSesion, iniciarSesion)

    const{ email, password} = valores;

  async function iniciarSesion() {
    try {  
        await firebase.login(email, password)
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Your work has been saved',
          showConfirmButton: false,
          timer: 1500
        })
        Router.push('/')
  } catch(error) {
      console.log('hubo un error al autenticar el usuario', error.message)
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
        >Log in</h1>
        <Formulario 
        onSubmit={handleSubmitIniciarSesion }
        >
         
          <Campo>
              <label htmlFor="email">Email</label>
              <input 
              type="email" 
              name="email" 
              placeholder="Tu Email" 
              id="email" 
              value={email} 
              onChange={handleChange} 
              onBlur={onBlur}
              />
          </Campo>
          {errores.email && <Error>{errores.email}</Error>}
          <Campo>
              <label htmlFor="password">password</label>
              <input 
                  type="password" 
                  id="password" 
                  placeholder="Tu Password"
                  name="password"                  
                  value={password} 
                  onChange={handleChange}
                  onBlur={onBlur}
                 />
          </Campo>
          {!errores.email && errores.password && <Error>{errores.password}</Error>}
          <InputSubmit 
          type="submit" 
          value="Log in"/>
        </Formulario>  
        </>
      </Layout>
    </div>
  )
}

export default Login;
