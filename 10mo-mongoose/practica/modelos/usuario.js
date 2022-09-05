import mongoose from "mongoose";

const usuariosCollection = "usuarios";

const usuarioSchema = new mongoose.Schema ({   //ESQUEMA
    nombre: { type: String,required : true, maxLength: 100 },
    apellido: { type: String,required : true, maxLength: [50, "EL APELLIDO ES MUY LARGO"] },
    mail: { type: String,required : true, maxLength: 100 },
    password: { type: String,required : true, maxLength: 100 },

})

export const usuario = mongoose.model ( usuariosCollection, usuarioSchema ) //MODELO QUE HACE USO DEL ESQUEMA