export default function validarCrearCuenta(valores){
    let errores = {}

    if(!valores.nombre){
        errores.nombre = "The name is required"
    }

    if(!valores.email){
        errores.email="Email is required"
    } else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(valores.email)){
        errores.email = "Invalid email"
    }

    if(!valores.password){
        errores.password = "The password is mandatory";

    } else if(valores.password.length <6 ){
        errores.password = "The password must be at least 6 characters"
    }

    return errores;
}