class NegocioAPI {

    constructor(servicioPago) {
        this.servicioPago = servicioPago
    }

    venderProducto(producto) {
        // logica de negocio

        this.servicioPago.pagar(1, producto.monto)

        return 1
    }

}

class ServicioPago {

    pagar(id, monto){
        console.log("Pagando con ServicioPago")
    }
}

class NuevoServicioPago{

    pagar(id, monto){
        console.log("Pagando con NuevoServicioPago")
    }
}

class OtroServicioPago{

    pagar(id, monto){
        console.log("Pagando con OtroServicioPago")
    }
}


const negocio = new NegocioAPI(new OtroServicioPago());
const producto = {monto: 10}
negocio.venderProducto(producto)