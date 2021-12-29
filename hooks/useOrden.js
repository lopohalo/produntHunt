import  {useState, useEffect, useContext} from 'react'
import { FirebaseContext } from '../firebase'

const useOrden = orden => {
    const [guardarProducto, setguardarProducto] = useState([])

  const { firebase } = useContext(FirebaseContext)

  useEffect(() => {
    const obtenerProduto = ()  => { 
      firebase.db.collection('productos').orderBy(orden, 'desc').onSnapshot(manejarSnapshot)
    }
    obtenerProduto()
    
  }, [])
  function manejarSnapshot(snapshot) {
    const guardarProducto = snapshot.docs.map(doc => {
      return{
      id: doc.id,
      ...doc.data()
      }
    })
    
    setguardarProducto(guardarProducto)
}
return{
    guardarProducto
}
}

export default useOrden;