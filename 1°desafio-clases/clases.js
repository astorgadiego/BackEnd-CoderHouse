class Usuario {
    constructor ( nombre, apellido, libros, mascotas ){
        this.nombre = nombre;
        this.apellido = apellido;
        this.libros = libros;
        this.mascotas = mascotas;
    }

    static ListadeLibros = [{Titulo: "La Iliada", Autor: "Homero"},{Titulo:"Viaje al Centro de la Tierra ", Autor:"Julio Verne"}]

    static ListadePerros = ["Beto", "Fito","Maguie","Rocko"]

    getListaLibros ( ){
        console.log(Usuario.ListadeLibros);
    }

    getListaMascotas(){
        console.log(Usuario.ListadePerros);
    }

    getFullName(){
        console.log(`El nombre completo del Usuario es : ${this.nombre} ${this.apellido}`);
    }

    addMascota ( nombredeperro ){
        Usuario.ListadePerros.push( nombredeperro )
        return  Diego1.getListaMascotas();
            
    }

    countMascotas (  ){
        return Usuario.ListadePerros.length
    }

    addBook ( nombredelibro, nombredeautor ){
        Usuario.ListadeLibros.push( {Titulo: nombredelibro, Autor: nombredeautor } )
        Diego1.getListaLibros()
    }

    getBookNames(  ){
        const solotitulo=[]
        Usuario.ListadeLibros.forEach(element => { solotitulo.push(element.Titulo) });
        console.log(solotitulo);

    }

}

const Diego1 = new Usuario ( "Diego", "Astorga", [{Titulo:"La Nausea", Autor: "Jean Paul Sartre"},{Titulo:"100 años de soledad", Autor:"Garcia Marquez"}], ["Beto", "Fito"]  )

//console.log(Diego1.addMascota("Maguie"));
Diego1.getFullName()
Diego1.addMascota("Lola")
console.log(Diego1.countMascotas())
Diego1.addBook( "El Manantial","Ayn Road" )
Diego1.getBookNames()