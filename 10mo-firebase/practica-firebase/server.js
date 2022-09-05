const { database } = require("firebase-admin");
const admin = require("firebase-admin")

const serviceAccount = require (
    "../firebase/coder-test-1efa4-firebase-adminsdk-iqcdq-dcbcea5dfd.json"    
);

//COPIO LA RUTA DE DONDE ESTA EL ARCHIVO JSON CON EL CODIGO DESCARGADO!!!

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://coder-test-1efa4.firebaseio.com"//<-- IMPORTANTE: DEBO INDICARLE A QUE BASE DE DATOS QUIERO QUE SE CONECTA
            //PARA ELLO AGREGO ESTA LINEA databaseURL: "https://coder-test-1efa4.firebaseio.com" la primera parte de la URL 
            //la saco del nombre del archivo json de la acredencia en la linea 5. 
});


CRUD();

async function CRUD() {
    const db = admin.firestore(); //INICIO LA BASE DE DATOS
    const query = db.collection("usuarios"); //LAS QUERYS IRAN A UNA COLECCION LLAMADA USUARIOS
  
    try {
      /* CREATE */
      const usuarioData = {
        nombre: "Juan",
        dni: "1111111",
      };
      let doc = query.doc(); //SE CREA EL DOCUMENTO 
      await doc.create(usuarioData); //AGREGO LOS DATOS DEL USUARIO AL DOCUMENTO
  
      console.log("Usuario creado");
      //SI VOY A MI FIRESTORE ESTARA LA NUEVA COLLECION
    } catch (error) {
      console.log(error);
    }
  
    /* READ */
    query //QUERY ES LA COLECCION USUARIOS
      .get()  //DAME TODOS LOS USUARIOS DE LA COLECCION
      .then((snapshot) => {  //SACA UNA FOTO DE CADA UNO
        snapshot.forEach((doc) => {
          console.log(doc.id, "=>", doc.data()); //POR CADA USUARIO MOSTRAME SU ID Y SUS DATOS
        });
      })
      .catch((err) => {
        console.log("Error getting documents", err);
      });
  
    /* UPDATE */
    query //TOMO LA COLECCION
      .where("dni", "==", "1111111")
      .get()   // A TODOS LOS QUE TENGAN EL DNI 1111 , CAMBIARLE EL NOMBRE POR JUANITO
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          doc.ref.update({ nombre: "Juanito" });
        });
      })
      .then(() => {//QUIERO QUE DESPUES DE ACTUALIZAR, VUELVA A LEER LOS DATOS ASI QUE LE ANIDO OTRO THEN 
        console.log("Usuario actualizado");
        // mostrar usuario
        query
            .where("dni", "==", "1111111")
            .get()
            .then((snapshot) => {
                snapshot.forEach((doc) => {
                    console.log(doc.id, "=>", doc.data());
                });
            }).catch((err) => {
                console.log("Error getting documents", err);
            });
      })
      .catch((err) => {
        console.log("Error getting documents", err);
      });

  
    /* DELETE */
    query
      .where("dni", "==", "1111111")
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          doc.ref.delete();
        });
      });
  }