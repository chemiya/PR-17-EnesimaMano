import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ConexionSpringService } from '../conexionAPI/conexion-spring.service';
import { Anuncio } from '../modelo/app.model';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-subir-anuncio',
  templateUrl: './subir-anuncio.component.html',
  styleUrls: ['./subir-anuncio.component.css']
})
export class SubirAnuncioComponent {
 tagAnadir!:String;
constructor(private conexionSpring:ConexionSpringService,private router:Router,private token:TokenStorageService){}

  anuncioVacio={
    titulo:"",
    descripcion:"",
    precio:0,
    idComprador:0,
    idVendedor:0,
    datosEnvio:"",
    fechaPublicacion:new Date("2010-01-01"),
    estado:"",
    id:0,
  
    

  };

  anuncio=this.anuncioVacio as Anuncio;
  currentUser:any;
  enviar(){
    this.currentUser = this.token.getUser();
    this.anuncio.idVendedor=this.currentUser.id;
    this.conexionSpring.subirAnuncio(this.anuncio).subscribe(
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
  }



