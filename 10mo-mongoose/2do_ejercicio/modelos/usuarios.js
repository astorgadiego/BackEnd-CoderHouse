import mongoose from "mongoose";

const ecommerceCollection = "usuarios"; //ESTE ES EL NOMBRE DE LA COLECCION

const usuarioSchema = new mongoose.Schema ({   //ESQUEMA

    nombre: { type: String,required : true, maxLength: 100 },
    apellido: { type: String,required : true, maxLength: [50, "EL APELLIDO ES MUY LARGO"] },
    dni: { type: String,required : true, maxLength: 100 }

})

export const Userexportado = mongoose.model ( ecommerceCollection, usuarioSchema ) //MODELO QUE HACE USO DEL ESQUEMA