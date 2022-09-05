import mongoose from "mongoose";
import { Estudiante } from "./modelos/alumno.js";

CRUD()

async function CRUD(params) {//NOS CONECTAMOS A LA BASE 
    try{
        const connection = await mongoose.connect("mongodb+srv://Diego1:beto12@cluster0.3dsj157.mongodb.net/?retryWrites=true&w=majority", { //VA A CREAR UNA NUEVA BASE LLAMADA 
                                                                        //DESDE ATLAS CON MI USUARIO Y CONTRASEÑA
            useNewUrlParser: true, //IMPORTANTE TENER CORRIENDO EL SERVIDOR CON MONGOD --DBPATH . 
            useUnifiedTopology: true 
        }); 
        //console.log({ connection });//PRIMERO ESPERA LA CONECCION Y DESPUES MUESTRA LOS LOG
        console.log("Conectado a MongoDB");

        console.log("BORRAR");
        await Estudiante.deleteMany( {} );
        console.log("Todos los estudiantes borrados");
        //----CREAR----
        console.log("CREATE");
        const datosdeAlumno = [
            { nombre: 'Pedro', apellido: 'Mei', edad: 21, dni: '31155898', curso: '1A', nota: 7 },
            { nombre: 'Ana', apellido: 'Gonzalez', edad: 32, dni: '27651878', curso: '1A', nota: 8 },
            { nombre: 'José', apellido: 'Picos', edad: 29, dni: '34554398', curso: '2A', nota: 6 },
            { nombre: 'Lucas', apellido: 'Blanco', edad: 22, dni: '30355874', curso: '3A', nota: 10 },
            { nombre: 'María', apellido: 'García', edad: 36, dni: '29575148', curso: '1A', nota: 9 },
            { nombre: 'Federico', apellido: 'Perez', edad: 41, dni: '320118321', curso: '2A', nota: 5 },
            { nombre: 'Tomas', apellido: 'Sierra', edad: 19, dni: '38654790', curso: '2B', nota: 4 },
            { nombre: 'Carlos', apellido: 'Fernández', edad: 33, dni: '26935670', curso: '3B', nota: 2 },
            { nombre: 'Fabio', apellido: 'Pieres', edad: 39, dni: '4315388', curso: '1B', nota: 9 },
            { nombre: 'Daniel', apellido: 'Gallo', edad: 25, dni: '37923460', curso: '3B', nota: 2 }
        ]

        await Estudiante.insertMany( datosdeAlumno )
        console.log("Estudiantes Creados");

        //ORDENADOS ALFABETICAMENTE SEGUN SU NOMBRE
        const estudiantesporOrdenAlfabetico = await Estudiante.find( {}, null, { sort: { nombre : 1 } } )//(SIN FILTRO, SIN PROYECCION , ORDENAR POR NOMBRE)
        console.log( { estudiantesporOrdenAlfabetico } );

        //EL ESTUDIANTE MAS JOVEN
        const EstudianteMasJoven = await Estudiante.find( {}, null, { sort: { edad: 1 } } ).limit(1);
        console.log({ EstudianteMasJoven });

        //ESTUDIANTES DEL CURSO 2A
        const curso2a= await Estudiante.find( { curso:"2A" } )
        console.log( { curso2a } );

        //EL SEGUNDO MAS JOVEN
        const segundomasjoven =  await Estudiante.find( {}, null, {sort: { edad: 1 } } ).skip(1).limit(1);
        console.log( { segundomasjoven } );

        //SOLO LOS NOMBRES Y APELLIDOS DE LOS EST. CON SU CURSO, ORDENADOS POR APELLIDO DESCENDENTE
        const NombreYApellido = await Estudiante.find( {}, { nombre: 1, apellido: 1, curso:1 }, {sort: { apellido : -1 }} );
        console.log( { NombreYApellido } );

        //ESTUDIANTES QUE SACARON 10
        const ninos10 = await Estudiante.find( {nota:10} )
        console.log( {ninos10} );

        //PROMEDIO DE NOTAS
        const promedio = [ ...await Estudiante.find({}) ]
                        .reduce(( acc,curr ) =>{  
                            return acc + curr.nota
                        },0 ) / await Estudiante.find({}).countDocuments();
        console.log( { promedio } );

        //PROMEDIO DEL CURSO 1A
        const prom1A = [ ...await Estudiante.find({ curso:"1A" }) ]
                        .reduce(( acc,curr ) =>{  
                        return acc + curr.nota
                        },0 ) / await Estudiante.find({ curso: "1A" }).countDocuments();
        console.log( { prom1A } );

        // Actualizar el dni del estudiante Lucas Blanco a 20355875
        await Estudiante.updateOne({dni: '30355874'}, {dni: '20355875'});
        console.log("Dni actualizado");

        // Agregar un campo 'ingreso' a todos los documentos con el valor false
        await Estudiante.updateMany({}, {ingreso: false});
        console.log("Ingreso actualizado");

        // Modificar el valor de 'ingreso' a true para todos los estudiantes que pertenezcan al curso 1A
        await Estudiante.updateMany({curso: '1A'}, {ingreso: true});
        console.log("Ingreso actualizado");

        // Listar los estudiantes que aprobaron (hayan sacado de 4 en adelante) sin los campos de _id y __v
        const estudiantesAprobados = await Estudiante.find({nota: {$gte: 4}}, {_id: 0, __v: 0});
        console.log({estudiantesAprobados});

        // Listar los estudiantes que posean el campo 'ingreso' en true sin los campos de _id y __v
        const estudiantesIngresoTrue = await Estudiante.find({ingreso: true}, {_id: 0, __v: 0});
        console.log({estudiantesIngresoTrue});

        // Borrar de la colección de estudiantes los documentos cuyo campo 'ingreso' esté en true
        await Estudiante.deleteMany({ingreso: true});
        console.log("Estudiantes borrados");

        // Listar el contenido de la colección estudiantes utilizando la consola, imprimiendo en cada caso los datos almacenados (sin el campo __v) junto a su fecha de creación obtenida del ObjectID en formato YYYY/MM/DD HH:mm:SS.
        const estudiantes = await Estudiante.find({}, {_id: 0, __v: 0});
        console.log({estudiantes});
        //-----TODAS LAS OPERACIONES SE HICIERON PERO SE HCIERON EN ATLAS, NO EN MI BASE LOCAL------                
      }catch(err){
      console.log(err);
    }
    
}