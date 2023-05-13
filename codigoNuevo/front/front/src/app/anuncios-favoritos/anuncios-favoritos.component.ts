import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ConexionApiService } from '../servicios/conexion-api.service';
import { Router } from '@angular/router';
import { Anuncio } from '../model/app.model';

@Component({
  selector: 'app-anuncios-favoritos',
  templateUrl: './anuncios-favoritos.component.html',
  styleUrls: ['./anuncios-favoritos.component.css']
})
export class AnunciosFavoritosComponent {

  anuncios: Anuncio[] = [];
  sinAnuncios: boolean = false;

  constructor(private cookieService: CookieService, private conexionApi: ConexionApiService, private router: Router) { }



  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

    this.buscarAnunciosFavoritos(this.cookieService.get("id"))//cojo la cookie


  }



  buscarAnunciosFavoritos(id: any) {
    this.conexionApi.buscarAnunciosFavoritos(id)//busco sus favoritos
      .subscribe({
        next: (data) => {
          console.log("encontrados")
          console.log(data.body)
          this.anuncios = data.body!;


          if (this.anuncios.length == 0) {
            this.sinAnuncios = true;
          }


        },
        error: (e) => console.error(e)
      });
  }



}
