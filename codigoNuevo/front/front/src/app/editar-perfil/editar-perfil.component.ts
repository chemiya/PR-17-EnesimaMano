import { Component } from '@angular/core';
import { Usuario } from '../model/app.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConexionApiService } from '../servicios/conexion-api.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-editar-perfil',
  templateUrl: './editar-perfil.component.html',
  styleUrls: ['./editar-perfil.component.css']
})
export class EditarPerfilComponent {
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

  fotoNueva!: File;

  constructor(private toastr: ToastrService, private fireStorage: AngularFireStorage, private formBuilder: FormBuilder, private cookieService: CookieService, private conexionApi: ConexionApiService, private router: Router) { }




  ngOnInit() {

    this.buscarUsuario(this.cookieService.get("id"))

    this.registerForm = this.formBuilder.group({


      nombre: ['', Validators.required],
      ubicacion: ['', Validators.required],
      telefono: ['', [Validators.required, Validators.pattern(/^[9|6|7][0-9]{8}$/)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]

    });


  }


  //cambio foto
  onFileChange(event: any) {
    console.log("event")
    console.log(event.target.files[0])

    this.fotoNueva = event.target.files[0];
  }

  buscarUsuario(id: any) {
    this.conexionApi.buscarUsuario(id)//busco las datos de mi usuario
      .subscribe({
        next: (data) => {

          console.log(data.body)
          this.usuario = data.body![0];

          this.registerForm.get('nombre')?.setValue(this.usuario.nombre);
          this.registerForm.get('ubicacion')?.setValue(this.usuario.ubicacion);
          this.registerForm.get('telefono')?.setValue(this.usuario.telefono);
          this.registerForm.get('email')?.setValue(this.usuario.email);
          this.registerForm.get('password')?.setValue(this.usuario.password);



        },
        error: (e) => console.error(e)
      });
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  onSubmit() {//envio formulario
    this.submitted = true;
    console.log("entro")
    console.log(JSON.stringify(this.registerForm.value))

    // no es valido
    if (this.registerForm.invalid) {
      return;
    }



    this.usuario.password = (this.registerForm.value['password']);
    this.usuario.ubicacion = (this.registerForm.value['ubicacion']);
    this.usuario.telefono = (this.registerForm.value['telefono']);
    this.usuario.nombre = (this.registerForm.value['nombre']);
    this.usuario.email = (this.registerForm.value['email']);




    if (this.fotoNueva != undefined) {
      this.actualizarFoto();

    }




    //editar datos
    this.conexionApi.editarUsuario(this.cookieService.get("id"), this.usuario).subscribe({
      next: data => {
        console.log(data);
        this.router.navigate(['/busquedaAnuncios']).then(() => {
          this.toastr.success("Datos actualizados");
        })

      },
      error: err => {

      }
    });

    // display form values on success
    //console.log('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value, null, 4));
  }


  //cambiar foto
  async actualizarFoto() {
    console.log("fotoo")
    console.log(this.fotoNueva)
    const path = `yt/${this.fotoNueva.name}`
    const uploadTask = this.fireStorage.upload(path, this.fotoNueva)
    const url = (await uploadTask).ref.getDownloadURL()
    this.usuario.fotoRuta = ((await url).toString())
    console.log("enlaceeeeeeeee")
    console.log(this.usuario.fotoRuta)

    this.conexionApi.editarFotoUsuario(this.cookieService.get("id"), this.usuario).subscribe({
      next: data => {
        console.log(data);


      },
      error: err => {

      }
    });
  }

}
