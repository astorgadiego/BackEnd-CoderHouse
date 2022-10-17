const express = require('express')

const parseArgs= require('minimist')

const { argv } = require('yargs')

const cluster = require('cluster')

const numCPU = require('os').cpus().length  //NOS VA AYUDAR A LISTAR TODOS LOS NUCLEAOS DE NUESTRO PROCESADOR


//-------------------------------------------

/*COMANDOS:
    FOREVER( SOLO MODO FORK!! EN CLUSTER EXPLOTA TODO): 
                //forever start server.js fork
                //forever start server.js cluster
                LISTAS LOS PROCESOS CON FOREVER: forever list 
                MATAR UN PROCESO: forever stopall       
                
    PM2 ( TANTO MODO FORK O MODO CLUSTER ) :
                MODO FORK:  pm2 start server.js --name="Server1" --watch -- 8080
                MODO CLUSTER:   pm2 start server.js --name="Server2" --watch -i 2 -- 8080  (MI COMPU SE TRABA SI HAGO ESTE COMANDO)
                LISTAR PROCESOS: pm2 list
                FINALIZAR PROCESOS: pm2 delete all
    
    NGINX: 
                LISTAR PROCESOS NGINX: tasklist | grep nginx

                
*/
//-------------------------------------------


const app = express()


const PORT = parseInt(process.argv[2])  || 8080  //SI NO MANDO EL PUERTO POR PARAMETRO VA A INICIAR EN EL PUERTO 8080

const comando = process.argv.slice(2)

//ESTO ES IMPORTANTE PARA PODER USAR EL RES.RENDER!!! 
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

//console.log(comando);

if (comando == 'fork') {  //-------> COMANDO: forever start server.js fork

    app.get('/', (req,res) => { 

        const proceso = process.pid
        console.log(`port: ${PORT} -> FyH: ${Date.now()} `);

        res.render('info.html',  {  numCPU , proceso, PORT} )
        //res.send(`Servidor express en ${PORT} - <b> PID ${process.pid}  </b> - <b> NGINX!!  </b> - ${new Date().toLocaleString()}`) 
    })
    
    app.listen(PORT, err => {
    
        if(!err){
            console.log(`Servidor express en ${PORT} -<b> PID ${process.pid}`);
        }
        
    })


    console.log('hola a todos');
}
else if (comando == 'cluster') {

    

    if ( cluster.isMaster ) {
        //console.log('esto es brasil');
        //console.log({numCPU});
        //console.log('PID MASTER', process.pid);
    
        
        for (let i = 0; i < numCPU; i++) { //Dentro del for, en el proceso master, creamos un worker por cada CPU.
            
            cluster.fork()
            
        }
    
        cluster.on( 'exit', (worker , code, signal) => { //Con cluster.on y el comando “exit” controlamos la salida de estos workers.
    
            console.log(`worker ${worker.process.pid} murio ${new Date().toLocaleString()} `);
            cluster.fork() 
            
        } )
    
    }else{
        //Como mencionamos antes, en los workers, es decir, cuando cluster.isMaster es falso, creamos un servidor HTTP.
        app.get('/', (req,res) => { 
            const mensaje = { 
                nombre : 'diego', 
                edad: 34
            }
            const proceso = process.pid
            res.render('info.html',  {  proceso, mensaje, numCPU, PORT } )
            //res.send(`Servidor express en ${PORT} - <b> PID ${process.pid}  </b> - ${new Date().toLocaleString()}`) 
        })
    
        app.listen(PORT, err => {
            if(!err){
                console.log(`h Servidor express en ${PORT} -<b> PID ${process.pid}`);
            }
        })
    
    }



}
else{  //----> forever start server.js 

    console.log('seguimos en argetnina');

    app.get('/', (req,res) => { 

        // console.log(`port: ${PORT} -> FyH: ${Date.now()} `);
        // res.send(`Servidor express en ${PORT} - <b> PID ${process.pid}  </b> - <b> NGINX!!  </b> - ${new Date().toLocaleString()}`) 

        const proceso = process.pid
        console.log(`port: ${PORT} -> FyH: ${Date.now()} `);

        res.render('info.html',  {  numCPU , proceso, PORT } )

    })

    app.get('/api/randoms', (req,res) => { 
        
        const proceso = process.pid

        res.render('random.html',  {  numCPU , proceso, PORT} )
    
    })
    
    app.listen(PORT, err => {
    
        if(!err){
            console.log(`Servidor express en ${PORT} -<b> PID ${process.pid}`);
        }
        
    })

}


//forever start server.js fork
//forever start server.js cluster