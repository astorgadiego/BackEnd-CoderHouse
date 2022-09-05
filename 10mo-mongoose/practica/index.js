import mongoose from "mongoose";

import { usuario } from "./modelos/usuario.js";


CRUD()

async function CRUD(params) {//NOS CONECTAMOS A LA BASE 
    try{
        const connection = await mongoose.connect("mongodb://localhost:27017/mibasemongoose", { //VA A CREAR UNA NUEVA BASE LLAMADA 
                                                                        //MISBASEMONGOOSE
            useNewUrlParser: true, //IMPORTANTE TENER CORRIENDO EL SERVIDOR CON MONGOD --DBPATH . 
            useUnifiedTopology: true 
        }); 
        console.log({ connection });//PRIMERO ESPERA LA CONECCION Y DESPUES MUESTRA LOS LOG
        console.log("Conectado a MongoDB");

        console.log("BORRAR");
        await usuario.deleteMany( {} );
        console.log("Todos los usuarios borrados");

        //----CREAR----
        console.log("CREATE");
        const datosdeUsuario = {
            nombre: "Diego",
            apellido:"Perez",
            mail: "tp@g.com",
            password: "123545"
        }

        const usuarioNuevo = new usuario ( datosdeUsuario )
        await usuarioNuevo.save();
        console.log(usuarioNuevo);
        console.log("Usuario Creado");

        //---LEER TODOS LOS USUARIOS
        console.log("READ");
        const usuarios = await usuario.find()
        console.log({ usuarios });

    }catch(err){
        console.log(err);
    }
    
}