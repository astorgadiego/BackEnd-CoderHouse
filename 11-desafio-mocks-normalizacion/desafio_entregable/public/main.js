//ESTO VIENE A REPRESENTAR EL LADO DEL CLIENTE

const socket = io (); //CONECCION ESTABLECIDA!! YA PUEDO USAR LOS SOCKETS DEL LADO DEL CLIENTE :)

const productosRecibidos = document.getElementById ( 'productosRecibidos' )
const btnSend = document.getElementById ('btnSend')
const foto = document.getElementById ('foto')

let fecha = new Date();



function addMessage( e ) {

    const NuevosMensajes = {
        id: 'Mensajes',
        autor : {
            id: document.getElementById( "email" ).value,
            nombre: document.getElementById ( "nombre" ).value,
            apellido: document.getElementById ( "apellido" ).value,
            edad: document.getElementById ( "edad" ).value,
            avatar: document.getElementById ( "avatar" ).value,
            hora : `${fecha}`
            }
        ,
        texto : { id: 1 ,  texto:document.getElementById ( "mensaje" ).value } 
         
    };
    socket.emit( "nuevo-mensaje", NuevosMensajes )
    return false //POR TEMAS DE FRONT SIEMPRE DEBE RETORNAR ALGO 
}

function MostrarMensajes( Arraymensajes ) {
    const hmtl = Arraymensajes.map( elem => { 
        return(` <div> 
                    <strong class="email">${elem.email}</strong> <span class="hora">${elem.hora}</span>: 
                    <em class="mensaje" >Mensaje: ${elem.texto}</em> <img class="" src="${elem.avatar}" alt="Error al cargar">
                 </div>`)
     }).join( "" );
     document.getElementById( "mensajesrecibidos" ).innerHTML = hmtl;
     //document.getElementById( "hora" ).innerHTML = fecha;

}

function MostrarPorcentaje ( porcentajeDeCompresion ) {
    const html = `<div>%${porcentajeDeCompresion}</div>`
    document.getElementById("porcentaje").innerHTML = html
}


//CADA MENSAJE NUEVO SE ENVIA AL SERVIDOR.CON LA ESTRUCTURA QUE SE PIDE. EL NOMBRE DEL EVENTO ES INPUTEXT


socket.on ( "Tabla de Productos", ListadeProductos => { renderizador ( ListadeProductos ) } )

socket.on ( "ID de mensaje", Arraymensajes=> MostrarMensajes ( Arraymensajes ) )
socket.on ( "porcentaje", porcentajeDeCompresion=> MostrarPorcentaje ( porcentajeDeCompresion ) )