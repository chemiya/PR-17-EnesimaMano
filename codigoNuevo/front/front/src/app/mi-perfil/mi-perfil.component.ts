import { Component } from '@angular/core';
import { Anuncio, Usuario } from '../model/app.model';
import { FormBuilder } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { ConexionApiService } from '../servicios/conexion-api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-mi-perfil',
  templateUrl: './mi-perfil.component.html',
  styleUrls: ['./mi-perfil.component.css']
})
export class MiPerfilComponent {

  anuncios!: Anuncio[];
  usuario!: Usuario;
  avisoNinguno: boolean = false;
  botonEditar: boolean = false;

  constructor(private route: ActivatedRoute, private formBuilder: FormBuilder, private cookieService: CookieService, private conexionApi: ConexionApiService, private router: Router) { }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

    if (this.route.snapshot.params["id"] == "usuario") {//busco dependiendo si mi perfil o no
      this.buscarUsuario(this.cookieService.get("id"))
      this.buscarAnunciosDeUsuario(this.cookieService.get("id"));
      this.botonEditar = true;
    } else {
      this.buscarUsuario(this.route.snapshot.params["id"])
      this.buscarAnunciosDeUsuario(this.route.snapshot.params["id"]);
    }






  }

  buscarUsuario(id: any) {
    this.conexionApi.buscarUsuario(id)//busco las datos de mi usuario
      .subscribe({
        next: (data) => {
          console.log(data.body)
          this.usuario = data.body![0];


        },
        error: (e) => console.error(e)
      });
  }

  buscarAnunciosDeUsuario(id: any) {
    this.conexionApi.buscarAnunciosDeUsuario(id)//busco las anuncios de mi usuario
      .subscribe({
        next: (data) => {
          console.log(data.body)
          if (data.body!.length == 0) {
            this.avisoNinguno = true;
          } else {
            this.anuncios = data.body!;
          }



        },
        error: (e) => console.error(e)
      });
  }


  editarPerfil() {
    this.router.navigate(['/editarPerfil'])
  }
}
