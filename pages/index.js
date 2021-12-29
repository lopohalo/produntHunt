import useOrden from '../hooks/useOrden'
import Layout from '../components/layout/Layout'

import DetallesProducto from '../components/layout/DetallesProducto'

//!import styled from '@emotion/styled'



const Home = () => {

  const {guardarProducto} = useOrden('creado') 
  
  
  return (
    <div>
      <Layout>
     <div className="listado-productos">
       <div className="contenedor">
         <ul className="bg-white">
        
           {guardarProducto.map(producto => (
             
        
               <DetallesProducto
              key={producto.id}
             producto={producto} 

            />
           
            
           ))}
          
           </ul>
         </div>
     </div>
      </Layout>
    </div>
  )
}

export default Home


