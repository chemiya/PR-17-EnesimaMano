import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConexionApiService } from '../servicios/conexion-api.service';
import { Usuario } from '../model/app.model';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  registerForm!: FormGroup;
  submitted = false;
  usuario:Usuario={
    username:"",
    password:"",
    email:"",
    ubicacion:"",
    telefono:"",
    nombre:"",
    id:"",
    fotoRuta:""

  }

  constructor(private toastr:ToastrService, private formBuilder: FormBuilder, private conexionApi:ConexionApiService,private router: Router) { }

  ngOnInit() {
      this.registerForm = this.formBuilder.group({
         
          username: ['', Validators.required],
          nombre: ['', Validators.required],
          ubicacion: ['', Validators.required],
          telefono: ['', [Validators.required,Validators.pattern(/^[9|6|7][0-9]{8}$/)]],
          email: ['', [Validators.required, Validators.email]],
          password: ['', [Validators.required, Validators.minLength(6)]]
         
      });

      
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  onSubmit() {
      this.submitted = true;
      console.log("entro")
      console.log(JSON.stringify(this.registerForm.value))

      // stop here if form is invalid
      if (this.registerForm.invalid) {
          return;
      }

      
      this.usuario.username=(this.registerForm.value['username']);
      this.usuario.password=(this.registerForm.value['password']);
      this.usuario.ubicacion=(this.registerForm.value['ubicacion']);
      this.usuario.telefono=(this.registerForm.value['telefono']);
      this.usuario.nombre=(this.registerForm.value['nombre']);
      this.usuario.email=(this.registerForm.value['email']);

    

      this.conexionApi.registrarUsuario(this.usuario).subscribe({//registro el usuario
        next: data => {
          console.log(data);
          this.router.navigate(['/identificacion']).then(()=>{
            this.toastr.success("Acceso correcto");
          })
         
        },
        error: err => {
       
        }
      });

      // display form values on success
      //console.log('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value, null, 4));
  }

 
}
