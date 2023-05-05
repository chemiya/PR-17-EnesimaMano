export interface Usuario {
    id:Number,
    nombre: String,   
    email: String,
    password: String,
    ubicacion: String,
    foto:String
  
    }

    export interface Anuncio {
        id:Number,
        idComprador:Number,
        idVendedor:Number,
        titulo: String,   
        descripcion: String,
        datosEnvio: String,
        estado: String,
        fechaPublicacion:Date,
        precio:Number,
        
      
        }

export interface AnuncioFavorito{
    idAnuncio:Number,
    idUsuario:Number,
    id:Number
}

export interface Mensaje{
    idDestino:Number,
    idCreador:number,
    contenido:String,
    id:number
}