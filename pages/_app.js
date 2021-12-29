import firebase from '../firebase/firebase';
import {FirebaseContext} from '../firebase';
import useAutentificacion from '../hooks/useAutentificacion'

const MyApp = props => {
  
  const usuario = useAutentificacion();
  console.log(usuario)

  const {Component, pageProps} = props
  return (
    <FirebaseContext.Provider
     value={{
       firebase,
       usuario
      }}
    >
     <Component {...pageProps} />
    </FirebaseContext.Provider>
  )
}

export default MyApp
