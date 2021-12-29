import React, { useState, useContext } from 'react'
import Layout from '../components/layout/Layout'
import { Formulario, Campo, InputSubmit, Error } from '../ui/Formulario'
import {css} from '@emotion/react'
import useValidacion from '../hooks/useValidacion'
import validarNuevoProducto from '../validacion/validarNuevoProducto'
import {useRouter} from 'next/router'
import {FirebaseContext} from '../firebase'
import FileUploader from 'react-firebase-file-uploader'
import Swal from "sweetalert2";
import Error404 from '../components/layout/404'


const STATE_INICIAL = {
  nombre: '',
  empresa: '',
  imagen: '',
  url: '',
  descripcion: '',
}

const NuevoProducto = () => {
  const [nombreimagen, guardarNombre] = useState('');
  const [subiendo, guardarSubiendo] = useState(false);
  const [ progreso, guardarProgreso ] = useState(0);
  const [urlimagen, guardarUrlImagen] = useState('');
 
  
  const {valores,errores, handleSubmitNuevoProducto, handleChange,onBlur } = useValidacion
  (STATE_INICIAL, validarNuevoProducto, crearProducto)

    const{nombre, empresa,url, descripcion} = valores;
  
  const router = useRouter();  

  const {usuario, firebase} = useContext(FirebaseContext)

  
  const handleUploadStart = () => {
    guardarProgreso(0);
    guardarSubiendo(true);
}
 
const handleProgress = async (progreso, task) => {
    console.log(progreso);
    guardarProgreso(progreso);
    if(progreso === 100){
        handleUploadSuccess(task.snapshot.ref.name);
    }
}
 
const handleUploadError = error => {
    guardarSubiendo(error);
    console.error(error);
}
 
const handleUploadSuccess = async nombre => {
    guardarProgreso(100);
    guardarSubiendo(false);
    guardarNombre(nombre);
    await firebase.
        storage
        .ref("productos")
        .child(nombre)
        .getDownloadURL()
        .then((url) => {
            console.log(url);
            guardarUrlImagen(url);
        });
    
};
async function crearProducto() {
  if(!usuario) {
    return router.push('/login')
  }
  const producto = {
    nombre,
    empresa,
    url,
    urlimagen,
    descripcion,
    votosLike: 0,
    votosDisLike: 0,
    comentarios: [],
    creado: Date.now(),
    creador: {
      id: usuario.uid,
      nombre: usuario.displayName,
    },
    hanVotadolike: [],
    hanVotadoDislike: []
  }
  await firebase.db.collection('productos').add(producto);
  Swal.fire({
    position: 'top-end',
    icon: 'success',
    title: 'Your work has been saved',
    showConfirmButton: false,
    timer: 1500
  })
  return router.push('/')
 }
  
  return (

    <div>
      <Layout>
        {usuario ? <>
        
        <h1
         css={css `
          text-align:center;
          margin-top: 5rem;
         `}
        >New product</h1>
        <Formulario 
        onSubmit={handleSubmitNuevoProducto}
        >
          <fieldset>
            <legend>General information</legend>
         
          <Campo>
              <label htmlFor="nombre">Name</label>
              <input 
              type="text" 
              id="nombre"
              name="nombre" 
              placeholder="Your name"                
              value={nombre} 
              onChange={handleChange} 
              onKeyUp={onBlur}
              />
          </Campo>
          {errores.nombre && <Error>{errores.nombre}</Error>}
          <Campo>
              <label htmlFor="empresa">Company</label>
              <input 
              type="text" 
              id="empresa"
              name="empresa" 
              placeholder="Company name"                
              value={empresa} 
              onChange={handleChange} 
              onBlur={onBlur}
              />
          </Campo>
          {!errores.nombre && errores.empresa && <Error>{errores.empresa}</Error>}
          <Campo>
              <label htmlFor="imagen">Image</label>
              <FileUploader 
                        id="imagen"
                        accept="imagen/*"
                        name="imagen"
                        storageRef={firebase.storage.ref("productos")}
                        onUploadStart={handleUploadStart}
                        onUploadError={handleUploadError}
                        //onUploadSuccess={handleUploadSuccess}
                        onProgress={handleProgress}
                        randomizeFilename
                    />
          </Campo>
          {!errores.nombre && !errores.empresa && errores.imagen && <Error>{errores.imagen}</Error>}
          <Campo>
              <label htmlFor="url">URL</label>
              <input 
              type="url" 
              id="url"
              name="url"                           
              value={url} 
              onChange={handleChange} 
              onKeyUp={onBlur}
              />
          </Campo>
          {!errores.nombre && !errores.empresa && !errores.imagen && errores.url && <Error>{errores.url}</Error>}
          </fieldset>
          <fieldset>
          <legend>About your Product</legend>
          <Campo>
              <label htmlFor="descripcion">Description</label>
              <textarea 
              type="descripcion" 
              id="descripcion"
              name="descripcion"                           
              value={descripcion} 
              onChange={handleChange} 
              onKeyUp={onBlur}
              />
          </Campo>
          {!errores.nombre && !errores.empresa && !errores.imagen && !errores.url && errores.descripcion && <Error>{errores.descripcion}</Error>}
          </fieldset>
         
         

          <InputSubmit 
          type="submit" 
          value="Create Product" />
        </Formulario>  
        </> : <Error404/>}
          
      </Layout>
    </div>
  )
}

export default NuevoProducto;
