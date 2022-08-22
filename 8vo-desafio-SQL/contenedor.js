// const { options  } = require ('./options/mariaDB')
// const knex = require('knex')(options);

class Contenedor {
    constructor( configuracion, tabla, sqliteconfig )  {
        this.configuracion = configuracion;
        this.tabla = tabla;
        this.sqliteconfig = sqliteconfig;
    }
    

    async crearTabla () {
        try {
            if(await this.configuracion.schema.hasTable(this.tabla)){ //SI YA HAY UNA TABLA EXISTENTE, LA BORRAMOS !!
                await this.configuracion.schema.dropTable(this.tabla);
                console.log('Table articulos dropped');
            }
            await this.configuracion.schema.createTable(this.tabla, table => { //Y ACA VOLVEMOS A CREAR UNA NUEVA TABLA
                table.increments('id');   //LISTO CADA FILA DE LA TABLA
                table.string('titulo', 15);
                table.float('precio');
                table.integer('socketID');
            });
            console.log(`sE CREO LA TABLA ${this.tabla}`);
        } catch (err) {
            console.log(err);
        }// finally {
        //     this.configuracion.destroy();
        // }
    };

    prueba(){
        console.log("Probando");
    }


     // insert articulos to BD
    // async InsertarenTabla  ()  {
    //     // add 5 articulos
    // const articulos = [
    //     {
    //         titulo: 'Coca-Cola',
    //         //codigo: 'COCA-COLA',
    //         precio: 2.5,
    //         imagen: 10
    //     },
    //     {
    //         titulo: 'Fanta',
    //         //codigo: 'FANTA',
    //         precio: 2.5,
    //         imagen: 10
    //     },
    //     {
    //         titulo: 'Sprite',
    //         //codigo: 'SPRITE',
    //         precio: 2.5,
    //         imagen: 10
    //     },
    //     {
    //         titulo: 'Pepsi',
    //         //codigo: 'PEPSI',
    //         precio: 2.5,
    //         imagen: 10
    //     },
    //     {
    //         titulo: '7Up',
    //         //codigo: '7UP',
    //         precio: 2.5,
    //         imagen: 10
    //     }
    // ];
    // try{
    //     if(await this.configuracion.schema.hasTable(this.tabla)){ //SI YA HAY UNA TABLA EXISTENTE, LA BORRAMOS !!
    //                 await this.configuracion( this.tabla ).insert(articulos)
    //           }
    //          console.log('articulos inserted');
    //     }
    //     catch(err) {
    //         console.log(err);
    //     }
    //     finally{
    //         this.configuracion.destroy();
    //     };
    // }
    // InsertarenTabla  ()  {
    //     // add 5 articulos
    // const articulos = [
    //     {
    //         titulo: 'Coca-Cola',
    //         //codigo: 'COCA-COLA',
    //         precio: 2.5,
    //         imagen: 10
    //     },
    //     {
    //         titulo: 'Fanta',
    //         //codigo: 'FANTA',
    //         precio: 2.5,
    //         imagen: 10
    //     },
    //     {
    //         titulo: 'Sprite',
    //         //codigo: 'SPRITE',
    //         precio: 2.5,
    //         imagen: 10
    //     },
    //     {
    //         titulo: 'Pepsi',
    //         //codigo: 'PEPSI',
    //         precio: 2.5,
    //         imagen: 10
    //     },
    //     {
    //         titulo: '7Up',
    //         //codigo: '7UP',
    //         precio: 2.5,
    //         imagen: 10
    //     }
    // ];
    
    //     this.configuracion( this.tabla ).insert(articulos)
    //     .then(()=>{console.log('articulos inserted');})      
    //     .catch(err=> { console.log(err);});
    //     .finally( () => { this.configuracion.destroy(); });
    

    //     // catch(err){
    //     //     console.log( "Error de Lectura:", err );
    //     // }    
    
    // }
    InsertarenTabla  ( prod )  {
        const articulosDePrueba = [
            {
                titulo: 'Coca-Cola',
                //codigo: 'COCA-COLA',
                precio: 2.5,
                imagen: 10
            },
            {
                titulo: 'Fanta',
                //codigo: 'FANTA',
                precio: 2.5,
                imagen: 10
            },
            {
                titulo: 'Sprite',
                //codigo: 'SPRITE',
                precio: 2.5,
                imagen: 10
            },
            {
                titulo: 'Pepsi',
                //codigo: 'PEPSI',
                precio: 2.5,
                imagen: 10
            },
            {
                titulo: '7Up',
                //codigo: '7UP',
                precio: 2.5,
                imagen: 10
            }
        ];
        this.configuracion( this.tabla ).insert( prod )
        .then(() => {
            console.log('articulos inserted');
        })
        .catch(err => {
            console.log(err);
        })
    }

    async CrearMensajes ( ) {
        if (await this.sqliteconfig.schema.hasTable(this.tabla)) {
            await this.sqliteconfig.schema.dropTable(this.tabla);
                console.log('Table articulos dropped');
        }
        try{
            
            await this.sqliteconfig.schema.createTable( this.tabla, table=>{
                table.increments('id');   //LISTO CADA FILA DE LA TABLA
                table.string('texto', 20);
                table.float('hora');
                table.string('email', 20);
            } )
            console.log(`TABLA DE MENSAJES CREADA`);
        }
        catch(err){
            console.log(err);
        }
        // finally{
        //     this.sqliteconfig.destroy();
        // }
    }

    InsertarenMensajes  ( data )  {
        const mensajesDePrueba = [
            {
                texto: 'Coca-Cola',
                //codigo: 'COCA-COLA',
                hora: 2.5,
                email: 'd@gmail.com'
            },
            {
                texto: 'Fanta',
                //codigo: 'FANTA',
                hora: 2.5,
                email: 'd@gmail.com'
            },
            {
                texto: 'Sprite',
                //codigo: 'SPRITE',
                hora: 2.5,
                email: 'd@gmail.com'
            },
            {
                texto: 'Pepsi',
                //codigo: 'PEPSI',
                hora: 2.5,
                email: 'd@gmail.com'
            },
            {
                texto: '7Up',
                //codigo: '7UP',
                hora: 2.5,
                email: 'd@gmail.com'
            }
        ];
        this.sqliteconfig( this.tabla ).insert( data )
        .then(() => {
            console.log('nuevo mensaje agregado');
        })
        .catch(err => {
            console.log(err);
        })
    }

}

const Diego = new Contenedor ( { knex } = require ('./configuracion') , 'tablaProductos_8vo_desafio', { knexsqlite } = require ('./configuracionsqlite') )

module.exports = Diego;