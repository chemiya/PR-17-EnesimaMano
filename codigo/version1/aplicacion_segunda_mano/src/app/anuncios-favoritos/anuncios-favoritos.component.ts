import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ConexionSpringService } from '../conexionAPI/conexion-spring.service';
import { Anuncio } from '../modelo/app.model';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-anuncios-favoritos',
  templateUrl: './anuncios-favoritos.component.html',
  styleUrls: ['./anuncios-favoritos.component.css']
})
export class AnunciosFavoritosComponent {
  constructor(private router:Router, private conexionSpring:ConexionSpringService,private token:TokenStorageService){}
  Anuncios!:Anuncio[];
  currentUser:any;
  
  ngOnInit() {
   this.currentUser=this.token.getUser();
    this.getAnunciosFavoritos();
    
  }
  
  getAnunciosFavoritos(){
    this.conexionSpring.getAnunciosFavoritos(this.currentUser.id).subscribe(
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
