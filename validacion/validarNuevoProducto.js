export default function validarNuevoProducto(valores){
    let errores = {}

    if(!valores.nombre){
        errores.nombre = "The name is required"
    }

    if(!valores.empresa){
        errores.empresa= "The company name is required"
    }

    if(!valores.url){
        errores.url="The url of the product is mandatory"
    } else if(!/^(ftp|http|https):\/\/[^ "]+$/.test(valores.url)){
        errores.url = "Url not valid"
    }

    if(!valores.descripcion){
        errores.descripcion="Please write a brief description of your company"
    }



  
    
    
    return errores;
}