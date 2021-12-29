import { useEffect, useState } from 'react';
import { useRouter } from 'next/dist/client/router';
import Layout from '../components/layout/Layout'

import useOrden from '../hooks/useOrden'
import DetallesProducto from '../components/layout/DetallesProducto'


const Buscar = () => {
  const [resultado, setresultado] = useState([])
  const {guardarProducto} = useOrden('creado') 
  
  const router = useRouter();
  const {query: {q}} = router;

  useEffect(() => {
 
    if (!q) return;

    const busqueda = q.toLowerCase();
    const filtro = guardarProducto.filter(producto => {
        return (
          producto.nombre.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(busqueda) ||
          producto.descripcion.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(busqueda)
        )
    })
    setresultado(filtro);
}, [q, guardarProducto])
  
  return (
    <div>
    <Layout>
   <div className="listado-productos">
     <div className="contenedor">
       <ul className="bg-white">
      
         {resultado.map(producto => (
           
      
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

export default Buscar
