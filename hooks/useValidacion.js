import { useEffect, useState } from "react"
import Swal from "sweetalert2";




const useValidacion = (stateInicial, validar, fn) => {
   const [valores, setValores] = useState(stateInicial)
   const [errores, setErrores] = useState({})
   const [submit, setSubmit] = useState(false)


    useEffect(() => {
    if(submit) {
        const noErrores = Object.keys(errores).length === 0;
       
        if(noErrores) {
            fn();
        }
        setSubmit(false)
    }
    }, [errores])

    const handleChange = e => {
    setValores({
        ...valores,
        [e.target.name] : e.target.value
    })
    }

    const handleSubmitCrearcuenta = e => {
       e.preventDefault();
       const erroresValidacion = validar(valores);
       setErrores(erroresValidacion);
       
       if(!valores.nombre || !valores.password || !valores.email) {
           return Swal.fire('Todos los campos son obligatorios')
       } 
       
        setSubmit(true);
     
    }
    const handleSubmitIniciarSesion = e => {
        e.preventDefault();
        const erroresValidacion = validar(valores);
        setErrores(erroresValidacion);
        
        if( !valores.password || !valores.email) {
            return Swal.fire('Todos los campos son obligatorios')
        } 
        
         setSubmit(true);
      
     }
     const handleSubmitNuevoProducto = e => {
        e.preventDefault();
        const erroresValidacion = validar(valores);
        setErrores(erroresValidacion);
        
        if(!valores.nombre || !valores.descripcion || !valores.url || !valores.empresa) {
            return Swal.fire('Todos los campos son obligatorios')
        } 
        
         setSubmit(true);
      
     }


     
    

    const onBlur = () => {
        const erroresValidacion = validar(valores);
        setErrores(erroresValidacion);
        setTimeout(() => {
            setErrores({});
           }, 1200);
    }

   
    return { 
    valores,
    errores,
    submit,
    handleSubmitCrearcuenta,
    handleSubmitIniciarSesion,
    handleSubmitNuevoProducto,
    handleChange, 
    onBlur
    
    };
}
export default useValidacion;