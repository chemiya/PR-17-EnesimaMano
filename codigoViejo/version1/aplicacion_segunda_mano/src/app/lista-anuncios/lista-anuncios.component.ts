import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ConexionSpringService } from '../conexionAPI/conexion-spring.service';
import { Anuncio } from '../modelo/app.model';

@Component({
  selector: 'app-lista-anuncios',
  templateUrl: './lista-anuncios.component.html',
  styleUrls: ['./lista-anuncios.component.css']
})
export class ListaAnunciosComponent {
  Anuncios!:Anuncio[];
 
  titulo!:String;
constructor(private router:Router, private conexionSpring:ConexionSpringService){}

ngOnInit() {
  this.getAnuncios();
  
}

getAnuncios(){
  this.conexionSpring.getAllAnuncios().subscribe(
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

miPerfil(){
  this.router.navigate(["miPerfil"])
}

detallesAnuncio(){
  this.router.navigate(["detallesAnuncio"])
}

aplicarFiltros(){
  this.conexionSpring.getAnunciosFiltro(this.titulo).subscribe(
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
