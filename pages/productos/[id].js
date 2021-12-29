import { useRouter } from 'next/router'
import { Fragment, useContext, useEffect, useState } from 'react'
import { FirebaseContext } from '../../firebase'
import Layout from '../../components/layout/Layout'
import styled from '@emotion/styled'
import {css} from '@emotion/react'
import formatDinstanceToNow from 'date-fns/formatDistanceToNow'
import Boton from '../../ui/Boton'
import { Campo, InputSubmit } from '../../ui/Formulario'
import { SpinnerInfinity  } from 'spinners-react';
import Link from 'next/link'
import { v4 as uuidv4 } from 'uuid';
import Swal from "sweetalert2";


const ContenedorProducto = styled.div`
 @media(min-width:768px){
     display: grid;
     grid-template-columns: 2fr 1fr;
     column-gap: 2rem;
 }
`
const ContenedorSpinner = styled.div`
  position: absolute;
  top: 50%;
  left: 46%;
  margin: -25px 0 0 -25px;

`
const Nav = styled.nav`
 a{
   width: 50%;
   margin-left: 0rem;
   color: red;
   font-family: 'PT Sans', sans-serif;

   &:last-of-type{
     margin-right: 0;
   }
 }
`

const CreadorProducto = styled.p`
padding: .5rem 2rem;
background-color: black;
color: #fff;
text-transform: uppercase;
font-weight: bold;
display: inline-block;
text-align: center;
text-shadow: 0 0 30px #fff;
box-shadow: 0 0 20px red;
`




const producto = () => {
    const [productos, setproducto] = useState({})
    const [error, seterror] = useState(false)
    const [comentario, setcomentario] = useState({})
 
    const router = useRouter();
    const {query: {id}} = router;
    

    const { firebase, usuario } = useContext(FirebaseContext)

    useEffect(() => {
        if(id){
            const obtenerProducto = async() => {
                const productoQuery = await firebase.db.collection('productos').doc(id);
                const producto = await productoQuery.get();
                if(!producto.exists){
                   seterror(true)
                } else
                    setproducto(producto.data()) 
            }
            obtenerProducto()
        }
       
    }, [id])

    const{ comentarios, creado, descripcion, empresa, nombre, url, urlimagen, votosLike, votosDisLike, creador, hanVotadolike, hanVotadoDislike} = productos;

    const votarProductoLike = () => {
     const votosBuenos = votosLike + 1;

     if(hanVotadolike.includes(usuario.uid) || hanVotadoDislike.includes(usuario.uid) ) return;

     const nuevoHavotado = [...hanVotadolike, usuario.uid];

     firebase.db.collection('productos').doc(id).update({votosLike: votosBuenos, hanVotadolike: nuevoHavotado})

     setproducto({
       ...productos,
       votosLike: votosBuenos,
       hanVotadolike: nuevoHavotado 
     })
    }
    const votarProductoDislike = () =>{
      const votosMalos = votosDisLike + 1;
      if(hanVotadoDislike.includes(usuario.uid) || hanVotadolike.includes(usuario.uid) ) return;

     const nuevoHavotados = [...hanVotadoDislike, usuario.uid];

      firebase.db.collection('productos').doc(id).update({votosDisLike: votosMalos,  hanVotadoDislike: nuevoHavotados})

      setproducto({
        ...productos,
        votosDisLike: votosMalos, 
        hanVotadoDislike: nuevoHavotados
      })
    }

    const valorComentario = e => {
         setcomentario({
           ...comentario,
           [e.target.name]: e.target.value
         })
    }

    const esCreador = id => {
      if(creador.id === id) {
        return true;
      }
    }

    const AccionDeAgregarComentarios = e => {
      e.preventDefault()
      e.target.reset()
      
      comentario.usuarioId = usuario.uid;
      comentario.usuarioNombre = usuario.displayName;
     comentario.idComentario = uuidv4();

      const NuevosComentarios = [comentario, ...comentarios] 
      

      firebase.db.collection('productos').doc(id).update({comentarios: NuevosComentarios})
  
  
    setproducto({
      ...productos,
      comentarios: NuevosComentarios
    })
    
    }

    const SepuedeBorrarSeñorCreador = () => {
      
    }
   
     const EliminarProducto = async () => {
      if(creador.id !== usuario.uid){
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'only the creator user will delete the comment!',
         
        })
      } else {
      try {
        await firebase.db.collection('productos').doc(id).delete();
            
          router.push('/')
      } catch (error) {
          console.log(error);
      }
    }
}
const EliminarComentario = async (comentario) => {

  const ComentariosEliminados = comentarios.filter(comen => comen.idComentario !== comentario.idComentario)
  try{
   await firebase.db.collection('productos').doc(id).update( {comentarios: ComentariosEliminados});
  } catch(e){
    console.log(e)
  }

 setproducto({ 
   ...productos,
   comentarios: ComentariosEliminados
 }) 

 
 
 

}

   
    return (
        <Layout>
          {Object.keys(productos).length ===0 ? <ContenedorSpinner>
            <SpinnerInfinity  size={100} thickness={180} speed={129} color="rgba(172, 57, 59, 1)" secondaryColor="black" /> </ContenedorSpinner>:  
           <Fragment>
            {error && <Error404/>}
            <div className="contenedor">
              <h1 css={css`
                text-align: center;
                margin-top: 5rem;
              `}>{nombre}</h1>  
            <ContenedorProducto>
                <div>
                <p>Posted ago: {formatDinstanceToNow(new Date(creado))}</p>
                <p>published by:   {creador.nombre} of the company:{"  "}{"  "}{empresa}</p>
               
                <img src={urlimagen} />
                <p>{descripcion}</p>
                {usuario ? (   <h2>Add your comment</h2>):(<Nav><Link href="/login">Login to interact</Link></Nav>)}
             
                {usuario && (
                <form
                 onSubmit={AccionDeAgregarComentarios}
                >
                  <Campo>
                    <input                  
                     type="text" 
                     required 
                     name="mensaje" 
                     onChange={valorComentario}/>
                  </Campo>
                  <InputSubmit
                  type="submit" value= "Add your comment" 
                  /> 
                </form> )}
                <h2 css={css`
                 margin: 2rem 0;
                `}>Comments</h2>
                {comentarios.length === 0 ? "No comments yet" : (
                  <ul >             
                {comentarios.map((comentario,i) => (        
                  <li key={`${comentario.usuarioId}-${i}`} css={css`border: 2px solid #e1e1; padding: 2rem `}>           
                    <p>{comentario.mensaje}</p>
                    <p>Written by: 
                      <span css={css`font-weight:bold;`}>{" "}{" "}{comentario.usuarioNombre}</span></p>
                      {esCreador(comentario.usuarioId) && <CreadorProducto>is creator</CreadorProducto>}
                      <nav><ul>
        
       
              {usuario.uid == comentario.usuarioId && <button onClick={() => EliminarComentario(comentario)} css={css`background-color: white; border-color:white;  &:hover {
          cursor: pointer;
           }`}>Remove</button>  } 
    </ul></nav>
            </li>                      
                ))}                                      
                  </ul>
                )}              
                </div>
                <aside>
                 <Boton  
                     target="_blank"
                      bgColor="true"
                      href={url}

                     >Visit URL</Boton>
                <div
                 css={css`
                  margin-top: 5rem;
                 `}
                >
                  
                <p css={css`
                    text-align: center;
                  position: absolute;
                  top: 60%;
                  left: 85%;
                 `}>{votosDisLike} Votes</p>
                 {usuario && 
                 (<Boton 
                  css={css`
                  text-align: center;
                  background-size: 4rem;
                  background-image: url('/static/img/dislike.png');
                  background-repeat: no-repeat;
                  height: 5rem;
                  width: 3rem;
                  border: none;
                  position: absolute;
                  top: 65%;
                  left: 86%;`}
                  onClick={votarProductoDislike}
                 ></Boton>) }
                 
                 
                  <p css={css`
                  text-align: center;
                  position: absolute;
                  top: 60%;
                  left: 70%;
                  `}>{votosLike} Votes</p>
                 {usuario && 
                 (<Boton
                  css={css`
                  text-align: center;
                  background-size: 4rem;
                  background-image: url('/static/img/like.png');
                  background-repeat: no-repeat;
                  height: 5rem;
                  width: 3rem;
                  border: none;
                  position: absolute;
                top: 65%;
                left: 71%;`}
                 onClick={votarProductoLike}
                 ></Boton>) }
                                
                </div>
                </aside>
            </ContenedorProducto>
            {SepuedeBorrarSeñorCreador && <Boton onClick={EliminarProducto}>Delete Product</Boton>}
            </div>
            </Fragment>  
         }
        </Layout>
    

    )
}

export default producto
