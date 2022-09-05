import mongoose from "mongoose";
import { Userexportado } from "./modelos/usuarios.js";

CRUD()

async function CRUD(params) {//NOS CONECTAMOS A LA BASE 
    try{
        const connection = await mongoose.connect("mongodb+srv://Diego1:beto12@cluster0.3dsj157.mongodb.net/ecommerce?retryWrites=true&w=majority",  //VA A CREAR UNA NUEVA BASE LLAMADA 
        {                                                            //MISBASEMONGOOSE
            useNewUrlParser: true, //IMPORTANTE TENER CORRIENDO EL SERVIDOR CON MONGOD --DBPATH . 
            useUnifiedTopology: true 
        }); 
        //console.log({ connection });//PRIMERO ESPERA LA CONECCION Y DESPUES MUESTRA LOS LOG
        console.log("Conectado a MongoDB");

        // console.log("BORRAR");
        // await User.deleteMany( {} );
        // console.log("Todos los usuarios borrados");
        
        //LISTAR LOS DATOS EN CONSOLA
        console.log("LISTAR");
        const usuarios = await Userexportado.find()
        console.log(  { usuarios }  );
        //INCORPORAR UN USUARIO MAS
        console.log("CREAR");
        const datosdeUsuario = { nombre: 'Federico', apellido: 'Perez', dni: '320118321' }
        const usuarioNuevo= new Userexportado ( datosdeUsuario )
        await usuarioNuevo.save()
        console.log( usuarioNuevo );
        //BORRAR EL USUARIO TOMAS

        //actualizar el usuario llamado 'Carlos' al nombre 'Juan Carlos' y luego listar los documentos finales.

      }catch(err){
      console.log(err);
    }
    
}