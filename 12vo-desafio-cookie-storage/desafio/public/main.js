function redirigir () {
    let url =  "http://localhost:8080" 
    window.location.href = url  //---->window.location CLAVE PARA PODER REDIRIGR AUTMATICAMENTE A OTRA PAGINA
    //window.alert(url)
}

setTimeout( redirigir , 3000)