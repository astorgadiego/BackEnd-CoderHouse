// const { options  } = require ('./options/mariaDB')
// const knex = require('knex')(options);

class Contenedor {
    constructor( configuracion, tabla )  {
        this.configuracion = configuracion;
        this.tabla = tabla;
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
                table.integer('imagen');
            });
            console.log(`sE CREO LA TABLA ${this.tabla}`);
        } catch (err) {
            console.log(err);
        } finally {
            this.configuracion.destroy();
        }
    };

    prueba(){
        console.log("Probando");
    }


     // insert articulos to BD
    async InsertarenTabla  ()  {
        // add 5 articulos
    const articulos = [
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
    try{
        if(await this.configuracion.schema.hasTable(this.tabla)){ //SI YA HAY UNA TABLA EXISTENTE, LA BORRAMOS !!
                    await this.configuracion( this.tabla ).insert(articulos)
              }
             console.log('articulos inserted');
        }
        catch(err) {
            console.log(err);
        }
        finally{
            this.configuracion.destroy();
        };
    }


        catch(err){
            console.log( "Error de Lectura:", err );
        }    
    
}

const Diego = new Contenedor ( { knex } = require ('./configuracion') , 'tablaProductos_8vo_desafio' )

module.exports = Diego;