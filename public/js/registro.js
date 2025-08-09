console.log("script cargado okaa...!!!")


let inputNombre=document.getElementById("first_name")
let inputApellido=document.getElementById("last_name")
let inputEmail=document.getElementById("email")
let inputPassword=document.getElementById("password")

let divMensajes=document.getElementById("mensajes")
let btnSubmit=document.getElementById("btnRegSubmit")

btnSubmit.addEventListener("click", async(e)=>{
    e.preventDefault()
    
    let first_name=inputNombre.value.trim()
    let last_name=inputApellido.value.trim()
    let email=inputEmail.value.trim()
    let password=inputPassword.value.trim()

    if(!first_name||!last_name||!email || !password   ){
        divMensajes.textContent=`Todos los campos son requeridos`
        setTimeout(() => {
            divMensajes.textContent=``
        }, 3000);
        return 
    }

    // let respuesta=await fetch("/api/sessions/register", {
        let respuesta=await fetch("./api/sessions/register", {
    
        method:"post", 
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify({first_name,last_name,email, password})
    })
    let datos=await respuesta.json()
    if(respuesta.status>=400){
        divMensajes.textContent=datos.error
        setTimeout(() => {
            divMensajes.textContent=``
        }, 3000);
        return 
    }else{
        window.location.href="/login"
    }

})