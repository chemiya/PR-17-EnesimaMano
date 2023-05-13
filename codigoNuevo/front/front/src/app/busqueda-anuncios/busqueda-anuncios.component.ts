import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';

import { faUser } from '@fortawesome/free-solid-svg-icons';
import { ConexionApiService } from '../servicios/conexion-api.service';
import { Router } from '@angular/router';
import { Anuncio, Usuario } from '../model/app.model';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-busqueda-anuncios',
  templateUrl: './busqueda-anuncios.component.html',
  styleUrls: ['./busqueda-anuncios.component.css']
})
export class BusquedaAnunciosComponent {
  faBars = faBars;
  faHeart = faHeart;
  faUser = faUser;
  faPlus = faPlus
  faCircleXmark = faCircleXmark;
  anuncios!: Anuncio[];
  anunciosOriginales!: Anuncio[];
  username!: string;
  fotoRuta!: string;
  registerForm!: FormGroup;
  submitted = false;
  minimo!: number;
  maximo!: number;
  nombre!: string;
  sinAnuncios: boolean = false;
  cargando: boolean = true;
  usuario!: Usuario;
  constructor(private toastr: ToastrService, private formBuilder: FormBuilder, private cookieService: CookieService, private conexionApi: ConexionApiService, private router: Router) { }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

    setTimeout(() => {
      this.buscarAnuncios();
      this.buscarUsuario(this.cookieService.get("id"))//con tiempo de margen para que se actualice todo
      this.cargando = false;
    }, 4000)



    console.log(this.cookieService.get("id"))
    this.buscarUsuario(this.cookieService.get("id"))

    console.log(this.fotoRuta)


    this.registerForm = this.formBuilder.group({


      minimo: ['', Validators.required],
      maximo: ['', Validators.required],


    });





  }



  cerrarSesion() {

    this.cookieService.delete("id")//quitamos cookie
    this.router.navigate(['/pantalalPrincipal']).then(() => {
      this.toastr.success("Sesión cerrada");
    })
  }


  buscarUsuario(id: any) {
    this.conexionApi.buscarUsuario(id)//busco las datos de mi usuario
      .subscribe({
        next: (data) => {
          console.log("usuario encontrado")
          console.log(data.body)
          this.usuario = data.body![0];


        },
        error: (e) => console.error(e)
      });
  }



  get f() { return this.registerForm.controls; }

  buscarAnuncios() {
    this.conexionApi.buscarAnuncios()//busco los anuncios
      .subscribe({
        next: (data) => {
          console.log("encontrados")
          console.log(data.body)
          this.anuncios = data.body!;
          this.anunciosOriginales = data.body!;

          if (this.anuncios.length == 0) {
            this.sinAnuncios = true;
          }





        },
        error: (e) => console.error(e)
      });
  }




  onSubmit() {
    this.submitted = true;
    console.log("entro")
    console.log(JSON.stringify(this.registerForm.value))

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }


    this.minimo = (this.registerForm.value['minimo']);
    this.maximo = (this.registerForm.value['maximo']);


    var nuevos = [];//filtro los anuncios cargados
    nuevos = this.anunciosOriginales.filter(anuncio => anuncio.precio > this.minimo && anuncio.precio < this.maximo)

    this.anuncios = nuevos;



    /*this.conexionApi.buscarParametros(this.minimo,this.maximo,this.nombre).subscribe({
      next: data => {
        console.log(data);
        
       
      },
      error: err => {
     
      }
    });*/

    // display form values on success
    //console.log('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value, null, 4));
  }
}

