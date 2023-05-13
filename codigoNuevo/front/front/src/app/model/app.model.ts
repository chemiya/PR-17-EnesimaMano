export interface Usuario {
    id:string,
    nombre: string,   
    email: string,
    password: string,
    ubicacion: string,
    username:string,
    telefono:string,
    fotoRuta:string

    
  
    }


export interface Anuncio{
    precio:number,
    titulo:string,
    descripcion:string,
    datosEnvio:string,
    idUsuario:string
    id:string,
    miniatura:string
}

export interface Favorito{
    idUsuario:string,
    idAnuncio:string,
    id:string
}

export interface Foto{
    idAnuncio:string,
    ruta:string
    id:string
}

export interface Miniatura{
    miniatura:string,
    
}


export class FileUpload {
    key!: string;
    name!: string;
    url!: string;
    file: File;
  
    constructor(file: File) {
      this.file = file;
    }
  }


