import mongoose from "mongoose";

const alumnosCollection = "estudiantes"; //ESTE ES EL NOMBRE DE LA COLECCION

const alumnoSchema = new mongoose.Schema ({   //ESQUEMA
    nombre: { type: String,required : true, maxLength: 100 },
    apellido: { type: String,required : true, maxLength: [50, "EL APELLIDO ES MUY LARGO"] },
    edad: { type: Number,required : true, maxLength: [50, "LA EDAD ES MUY LARGO"] }, 
    dni: { type: String,required : true, maxLength: 100 },
    curso: { type: String,required : true, maxLength: [50, "EL CURSO ES MUY LARGO"] },
    nota: { type: Number,required : true, maxLength: [50, "EL NOTA ES MUY LARGO"] },

})

export const Estudiante = mongoose.model ( alumnosCollection, alumnoSchema ) //MODELO QUE HACE USO DEL ESQUEMA