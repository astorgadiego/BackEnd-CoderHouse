const Calculadora = require("./Calculadora.js")

describe( "Nuestra Calculadora", ()=> { 
    test('SUMA', () => { 
        const resultado = Calculadora.suma (2,3)
        expect ( resultado ).toEqual (5);
    })
    test('SUMA (prueba mala)', () => { 
        const resultado = Calculadora.suma (2,3)
        expect ( resultado ).toEqual (Calculadora.suma (2,3));
    })
 } )