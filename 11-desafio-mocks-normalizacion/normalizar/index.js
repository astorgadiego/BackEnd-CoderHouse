// Normalizar la estructura del objeto en formato JSON empresa.json (disponible en la carpeta de la clase) que describe el organigrama de una empresa. El gerente y el encargado figuran en el array de empleados de la empresa.
// Imprimir por consola el objeto normalizado y la longitud del objeto original y del normalizado. Comparar los resultados.

// Nota: En adelante, utilizar la siguiente función 'print' para imprimir el contenido de un objeto:

// const util = require('util')
// function print(objeto) {
//     console.log(util.inspect(objeto,false,12,true))
// }

import { schema, normalize, denormalize } from "normalizr";
import util from "util";
import fs from "fs";

const empresa = JSON.parse(fs.readFileSync("./empresa.json", "utf8"));

const empleadoSchema = new schema.Entity("empleados"); //DEFINO LA PRIMERA ENTIDAD

const empresaSchema = new schema.Entity("empresa", { //DEFINO LA SEGUNDA ENTIDAD
    gerente: empleadoSchema,
    encargado: empleadoSchema,
    empleados: [ empleadoSchema ],
  });

const normalizedEmpresa = normalize(empresa, empresaSchema); //LE MADNAMOS LA EMPRESA ORIGINAL
                                                    //Y LUEGO INDICAMOS EL ESQUEMA QUE QUERES UTILIZAR

const denormalizedEmpresa = denormalize(
    normalizedEmpresa.result, //LA REFERENCIA A LA EMPRESA A USAR
    empresaSchema,  //EL ESQUEMA QUE USAMOS
    normalizedEmpresa.entities //LISTA DE LAS ENTIDADES
  );

function print(objeto) {
    console.log(util.inspect(objeto, false, 12, true), {
      length: JSON.stringify(objeto).length,
    });
}

print(normalizedEmpresa);
print(denormalizedEmpresa);