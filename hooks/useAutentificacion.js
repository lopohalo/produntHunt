import { useEffect, useState } from 'react';
import firebase from '../firebase/firebase';

const useAutentificacion = () => {

   const [ usuarioAutenticado, setusuario ] = useState(null)

    useEffect(() => {
        const unsuscribe = firebase.auth.onAuthStateChanged(usuario => {
            if(usuario) {
                setusuario(usuario)
            } else {
                setusuario(null)
            }
        })
        return() => unsuscribe();
    }, [])
    return usuarioAutenticado;
}

export default useAutentificacion
