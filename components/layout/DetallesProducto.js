 import React from 'react'
 import styled from '@emotion/styled'
 import formatDinstanceToNow from 'date-fns/formatDistanceToNow'
 import Link from 'next/link';
 import {css} from '@emotion/react'


 const Producto = styled.li`
  padding: 4rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e1e1e1;
 `
 const DescripcionProducto = styled.div`
  flex: 0 1 600px;
  display: grid;
  grid-template-columns: 1fr 3fr;
  column-gap: 2rem;
 `

 const Titulo = styled.a`
  font-size: 2rem;
  font-weight: bold;
  margin: 0;

  :hover {
      cursor: pointer;
  }
 `

 const TextoDescripcion = styled.p`
  font-size: 1.6rem;
  margin: 0;
  color: #474B45;
 `

 const Comentarios = styled.div`
  margin-top: 2rem;
  display: flex;
  align-items: center;
  div{
      display: flex;
      align-items: center;
      border: 1px solid yellow;
      padding: .3rem 1rem;
      margin-right: 2rem;
      background-color: #69DD26;
      border-radius: 5px;
  }
  img {
      width: 2rem;
      margin-right: 2rem;
  }
  p{
      font-size: 1.6rem;
      margin-right: 1rem;
      font-weight: 700;
      &:last-of-type{
          margin: 0;
      }
  }
 `
  const Imagen = styled.img`
  width: 200px;
  height: 120px;
 `

 const VotosDislike= styled.div`
 position: relative;
 left: -15px;
 top: 9px;
  text-align: center;
  border: 0px solid #e1e1e1;
  

  div{
      font-size: 2rem;
  }
  p{
      margin: 0;
      font-size: 2rem;
      font-weight: 700;
  }
 `
  const VotosLike= styled.div`
  position: relative;
  left: 120px;
   text-align: center;
   border: 0px solid #e1e1e1;
   
 
   div{
       font-size: 2rem;
   }
   p{
       margin: 0;
       font-size: 2rem;
       font-weight: 700;
   }
  `
 
 const DetallesProducto = ({producto})=> {
     const{id, comentarios, creado, descripcion, empresa, nombre, url, urlimagen, votosLike,votosDisLike} = producto;
     return (
         <Producto>
             <DescripcionProducto>
                 <div>
                  <Imagen src={urlimagen} ></Imagen>
                 </div>
                 <div>
                     <Link href="/productos/[id]" as={`/productos/${id}`}>
                     <Titulo>{nombre}</Titulo>
                     </Link>
                     <p>{descripcion}</p>
                         <Comentarios>
                         <div>
                         <img src="/static/img/comentario.png" />
                         <TextoDescripcion>{comentarios.length} comments</TextoDescripcion>
                         </div>
                         </Comentarios>
                         
                         <p>Posted ago: {formatDinstanceToNow(new Date(creado))}</p>
                 </div>
             </DescripcionProducto>
             <VotosLike>
             <div  css={css`
                  text-align: center;
                  background-size: 4.5rem;
                  background-image: url('/static/img/like.png');
                  background-repeat: no-repeat;
                  height: 5rem;
                  width: 5rem;
                  border: none;
                  position: absolute;`}></div>
             <p  css={css`
                  
                  position: relative;
                  top: -30px;
                  left: 10px;
                 `}>{votosLike}</p>
             </VotosLike>
             <VotosDislike>
             <div  css={css`
                  text-align: center;
                  background-size: 4rem;
                  background-image: url('/static/img/dislike.png');
                  background-repeat: no-repeat;
                  height: 5rem;
                  width: 5rem;
                  border: none;
                  position: absolute;`}></div>
                  
             <p  css={css`
                  
                  position: relative;
                  top: -38px;
                  left: 10px;
                 `}>{votosDisLike}</p>
             </VotosDislike>
         </Producto>
     )
 }
 
 export default DetallesProducto
 