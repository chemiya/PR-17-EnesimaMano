import { Component } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ConexionSpringService } from '../conexionAPI/conexion-spring.service';
import { Anuncio, AnuncioFavorito, Mensaje } from '../modelo/app.model';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-detalle-anuncio',
  templateUrl: './detalle-anuncio.component.html',
  styleUrls: ['./detalle-anuncio.component.css']
})
export class DetalleAnuncioComponent {
  constructor(private router:Router,private conexionSpring:ConexionSpringService,private ruta: ActivatedRoute,private token:TokenStorageService){}
  id!: String;
  anuncio!:Anuncio;
  anuncioFavorito!:AnuncioFavorito
  currentUser:any;
  mensaje!:Mensaje;


  ngOnInit() {

    this.currentUser=this.token.getUser();
    this.anuncio={
      titulo:"",
      descripcion:"",
      precio:0,
      idVendedor:0,
      idComprador:0,
      id:0,
      datosEnvio:"",
      estado:"",
      fechaPublicacion:new Date("2000-01-01")


    }

    this.anuncioFavorito={
      idAnuncio:0,
      idUsuario:0,
      id:0
    }

    this.mensaje={
      idDestino:0,
      idCreador:0,
      contenido:"",
      id:0
    }
  


      this.ruta.paramMap.subscribe( // Capturamos el id de la URL
        params => {
          this.id = params.get('id')!;

        },
        err => console.log("Error al leer id para editar: " + err)
      )

    
      this.conexionSpring.getAnuncio(this.id).subscribe(
        resp => {
          if (resp.body == null) {
            this.router.navigate(['listaAnuncios']);
           
          } else {
            this.anuncio = resp.body!;
          
          }

          
       
        },
        err => {
          console.log("Error al traer el vino: " + err.message);
          throw err;
        }
      )
    }


detallesUsuario(){
  console.log("listaAnuncios/"+this.id+"/detallesAnuncio/"+this.anuncio.idVendedor+"/detallesUsuario")
  this.router.navigate(["listaAnuncios/"+this.id+"/detallesAnuncio/"+this.anuncio.idVendedor+"/detallesUsuario"]);

}

anadirFavoritos(){
  this.anuncioFavorito.idAnuncio=Number(this.id);

this.anuncioFavorito.idUsuario=this.currentUser.id;
this.conexionSpring.anadirFavoritos(this.anuncioFavorito).subscribe(
  resp => {
  
      console.log(resp.body)
     
    
    this.router.navigate(['listaAnuncios']);//volvemos a la pantalla principal
  },
  err => {
    console.log("Error al editar: " + err.message);
    throw err;
  }
)

}


enviarMensaje(){
this.mensaje.idCreador=this.currentUser.id;
 this.mensaje.idDestino=this.anuncio.idVendedor;
 
 this.conexionSpring.enviarMensaje(this.mensaje).subscribe(
  resp => {
  
      console.log(resp.body)
     
    
   
  },
  err => {
    console.log("Error al editar: " + err.message);
    throw err;
  }
)

}
}
