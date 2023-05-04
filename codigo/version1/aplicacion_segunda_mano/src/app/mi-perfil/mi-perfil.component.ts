import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-miPerfil',
  templateUrl: './mi-perfil.component.html',
  styleUrls: ['./mi-perfil.component.css']
})
export class MiPerfilComponent implements OnInit {
  currentUser: any;

  constructor(private token: TokenStorageService,private router:Router) { }
  //coge los datos del storage
  ngOnInit(): void {
    this.currentUser = this.token.getUser();
  }

  subirAnuncio(){
    this.router.navigate(["subirAnuncio"])
  }

 
  anunciosFavoritos(){
    this.router.navigate(["anunciosFavoritos"])
  }

  mensajes(){
    this.router.navigate(["mensajes"])
  }

  misAnuncios(){
    this.router.navigate(["misAnuncios"])
  }
}
