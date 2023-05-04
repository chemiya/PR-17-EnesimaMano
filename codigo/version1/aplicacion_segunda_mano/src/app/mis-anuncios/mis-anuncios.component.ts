import { Component } from '@angular/core';
import { ConexionSpringService } from '../conexionAPI/conexion-spring.service';
import { Anuncio } from '../modelo/app.model';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-mis-anuncios',
  templateUrl: './mis-anuncios.component.html',
  styleUrls: ['./mis-anuncios.component.css']
})
export class MisAnunciosComponent {
  Anuncios!:Anuncio[];
 currentUser:any;
  titulo!:String;
constructor( private conexionSpring:ConexionSpringService,private token:TokenStorageService){}

ngOnInit() {
  this.currentUser=this.token.getUser();
  this.getMisAnuncios();
  
}

getMisAnuncios(){
  this.conexionSpring.getMisAnuncios(this.currentUser.id).subscribe(
    resp => {

      if (resp.status < 400) {
        this.Anuncios = resp.body!;
      } 
      console.log(this.Anuncios);
    },
    err => {
      console.log("Error al traer la lista: " + err.message);
      throw err;
    }
  )
}

}
