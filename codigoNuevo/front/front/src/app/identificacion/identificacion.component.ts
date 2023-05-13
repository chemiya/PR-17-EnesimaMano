import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from '../model/app.model';
import { ConexionApiService } from '../servicios/conexion-api.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-identificacion',
  templateUrl: './identificacion.component.html',
  styleUrls: ['./identificacion.component.css']
})
export class IdentificacionComponent {
  registerForm!: FormGroup;
  submitted = false;
  usuario: Usuario = {
    username: "",
    password: "",
    email: "",
    ubicacion: "",
    telefono: "",
    nombre: "",
    id: "",
    fotoRuta: ""

  }
  mensajeIncorrecto: boolean = false;

  constructor(private toastr: ToastrService, private formBuilder: FormBuilder, private cookieService: CookieService, private conexionApi: ConexionApiService, private router: Router) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({

      username: ['', Validators.required],

      password: ['', [Validators.required, Validators.minLength(6)]]

    });




  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;
    console.log("entro")
    console.log(JSON.stringify(this.registerForm.value))

    // no es valido
    if (this.registerForm.invalid) {
      return;
    }


    this.usuario.username = (this.registerForm.value['username']);
    this.usuario.password = (this.registerForm.value['password']);




    this.conexionApi.identificarUsuario(this.usuario).subscribe({//identifico el usuario
      next: data => {
        console.log("encontrado")
        console.log(data.body)
        if (data.body.length == 0) {

          this.mensajeIncorrecto = true
        } else {

          this.cookieService.set('id', data.body[0].id);
          this.cookieService.set('username', data.body[0].username);
          this.cookieService.set('fotoRuta', data.body[0].fotoRuta);

          this.router.navigate(['/busquedaAnuncios']).then(() => {
            this.toastr.success("Acceso correcto");
          })
        }



      },
      error: err => {

      }
    });

    // display form values on success
    //console.log('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value, null, 4));
  }

}
