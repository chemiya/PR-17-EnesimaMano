import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConexionApiService } from '../servicios/conexion-api.service';
import { Anuncio, Favorito, Foto } from '../model/app.model';
import { CookieService } from 'ngx-cookie-service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-detalle-anuncio',
  templateUrl: './detalle-anuncio.component.html',
  styleUrls: ['./detalle-anuncio.component.css']
})
export class DetalleAnuncioComponent {






  anuncio!: Anuncio;
  favorito: Favorito = {
    idUsuario: "",
    idAnuncio: "",
    id: ""
  }
  botonGuardarFavorito: boolean = true;
  botonesCreador: boolean = false;
  username!: string;
  fotoRuta!: string;
  seleccionada!: string
  indice: number = 0;
  fotos: Foto[] = [];


  constructor(public toastr: ToastrService, public dialog: MatDialog, private route: ActivatedRoute, private cookieService: CookieService, private router: Router, private conexionApi: ConexionApiService) { }

  ngOnInit(): void {

    this.buscarAnuncio(this.route.snapshot.params["id"]);//busco los datos
    this.comprobarFavorito(this.route.snapshot.params["id"])
    this.buscarFotosAnuncio(this.route.snapshot.params["id"]);


  }

  buscarAnuncio(id: any) {
    this.conexionApi.buscarAnuncio(id)//busco el anuncio
      .subscribe({
        next: (data) => {
          console.log(data.body)
          this.anuncio = data.body![0];

          if (this.anuncio.idUsuario == this.cookieService.get("id")) {
            this.botonesCreador = true;
          } else {
            this.botonesCreador = false;
          }


          this.conexionApi.buscarUsuario(this.anuncio.idUsuario)//busco el usuario
            .subscribe({
              next: (data) => {
                console.log(data.body)
                this.username = data.body![0].username;
                this.fotoRuta = data.body![0].fotoRuta;






              },
              error: (e) => console.error(e)
            });






        },
        error: (e) => console.error(e)
      });
  }


  //siguiente foto
  siguiente() {
    console.log(this.indice)
    console.log(this.fotos.length)
    if (this.indice + 1 < this.fotos.length) {
      this.indice = this.indice + 1
      this.actualizar()
    }

  }


  //anterior foto
  anterior() {
    console.log("seleccionada")
    if (this.indice - 1 >= 0) {
      this.indice = this.indice - 1
      this.actualizar()
    }

  }


  //actualizo foto
  actualizar() {
    //console.log(this.fotos[this.indice])
    this.seleccionada = this.fotos[this.indice].ruta
  }



  //busco las fotos
  buscarFotosAnuncio(id: any) {
    this.conexionApi.buscarFotosAnuncio(id)//busco las datos de mi usuario
      .subscribe({
        next: (data) => {
          console.log("fotos")
          console.log(data.body)
          this.fotos = data.body!;
          this.actualizar()

        },
        error: (e) => console.error(e)
      });
  }





  //elimino el anuncio
  eliminarAnuncio() {
    const dialogo = this.dialog.open(DialogComponent, {//vista de dialogo
      data: this.anuncio.titulo
    })

    dialogo.afterClosed().subscribe(res => {
      if (res == true) {
        this.conexionApi.eliminarAnuncio(this.anuncio.id)//elimino
          .subscribe({
            next: (data) => {
              console.log("elimino")

              this.router.navigate(['/busquedaAnuncios'])



            },
            error: (e) => console.error(e)
          });
      }
    });




  }

  //voy a los detalles
  detallesUsuario() {
    this.router.navigate(['/miPerfil/' + this.anuncio.idUsuario])
  }



  //voy a editar
  editarAnuncio() {
    this.router.navigate(['/crearAnuncio/' + this.anuncio.id])
  }



  //miras si esta favortio
  comprobarFavorito(idAnuncio: any) {
    this.favorito.idUsuario = this.cookieService.get("id");
    this.favorito.idAnuncio = idAnuncio;
    this.conexionApi.comprobarFavorito(this.favorito)//compruebo favorito
      .subscribe({
        next: (data) => {
          console.log("favorito")
          console.log(data.body)
          if (data.body.length > 0) {
            this.botonGuardarFavorito = false;
            this.favorito = data.body[0]




          }


        },
        error: (e) => console.error(e)
      });
  }





  eliminarFavorito() {




    this.conexionApi.eliminarFavorito(this.favorito.id)//elimino de favorito
      .subscribe({
        next: (data) => {
          console.log("elimino")

          this.botonGuardarFavorito = true;
          this.toastr.success("Anuncio eliminado de favorito");


        },
        error: (e) => console.error(e)
      });
  }



  //lo guarda de favorito
  guardarFavorito(id: any) {
    this.favorito.idUsuario = this.cookieService.get("id");
    this.favorito.idAnuncio = id;
    this.conexionApi.guardarFavorito(this.favorito)
      .subscribe({
        next: (data) => {
          console.log(data.body)
          this.botonGuardarFavorito = false;
          this.comprobarFavorito(this.route.snapshot.params["id"])


          this.toastr.success("Anuncio guardado como favorito");



        },
        error: (e) => console.error(e)
      });
  }
}
