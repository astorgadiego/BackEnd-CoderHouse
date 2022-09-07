//IMPORTAMOS EL NORMALIZR
import { schema, normalize, denormalize } from 'normalizr';
import util from 'util';

class Normalizador  {
    constructor ( Arraymensajes ) {
        this.array = Arraymensajes
    }

    Normalizar ( ) {
        const authorSchema = new schema.Entity('autores')
        const mensajeSchema = new schema.Entity('mensaje', {
            texto : [authorSchema]
        })
        // const textoSchema = new schema.Entity('texto',{
        //     autores :  authorSchema,
        //     texto: [ mensajeSchema ] 
        // })
        //const MensajesNormalizados = normalize ( this.array , textoSchema )
        const MensajesNormalizados = normalize ( this.array , mensajeSchema )
        console.log(JSON.stringify( MensajesNormalizados ).length)
        return MensajesNormalizados
    }

    Desnormalizar ( ) {
        const authorSchema = new schema.Entity('autores')
        const mensajeSchema = new schema.Entity('mensaje')
        const textoSchema = new schema.Entity('texto',{
            autores :  authorSchema,
            texto: [ mensajeSchema ] 
        })
        const MensajesNormalizados = normalize ( this.array , textoSchema )
        const MensajesDesnormalizados = denormalize ( MensajesNormalizados , textoSchema , MensajesNormalizados.entities )
        return MensajesDesnormalizados;

    }

    Porcentaje () {
        const authorSchema = new schema.Entity('autores')
        const mensajeSchema = new schema.Entity('mensaje', {
            texto : [authorSchema]
        })
        // const textoSchema = new schema.Entity('texto',{
        //     autores :  authorSchema,
        //     texto: [ mensajeSchema ] 
        // })
        //const MensajesNormalizados = normalize ( this.array , textoSchema )
        const MensajesNormalizados = normalize ( this.array , mensajeSchema )
        const porcentajeDeCompresion = ( 100 * JSON.stringify(MensajesNormalizados).length / JSON.stringify( this.array ).length ).toFixed(2)
        return porcentajeDeCompresion
    }

}

export default Normalizador