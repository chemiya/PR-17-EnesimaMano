import { Component } from '@angular/core';
import { ConexionSpringService } from '../conexionAPI/conexion-spring.service';
import { Mensaje } from '../modelo/app.model';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-mensajes',
  templateUrl: './mensajes.component.html',
  styleUrls: ['./mensajes.component.css']
})
export class MensajesComponent {
  MensajesCreador!:Mensaje[];
  MensajesDestino!:Mensaje[];
  currentUser:any;
 

constructor( private conexionSpring:ConexionSpringService,private token:TokenStorageService){}

ngOnInit() {
  this.currentUser=this.token.getUser();
  this.getMensajesCreador();
  this.getMensajesDestino();
  
}

getMensajesCreador(){
  this.conexionSpring.getMensajesCreador(this.currentUser.id).subscribe(
    resp => {

      if (resp.status < 400) {
        this.MensajesCreador=(resp.body!)
      } 
     
    },
    err => {
      console.log("Error al traer la lista: " + err.message);
      throw err;
    }
  )
}

getMensajesDestino(){
  this.conexionSpring.getMensajesDestino(this.currentUser.id).subscribe(
    resp => {

      if (resp.status < 400) {
        this.MensajesDestino=(resp.body!)
      } 
     
    },
    err => {
      console.log("Error al traer la lista: " + err.message);
      throw err;
    }
  )
}
}

