import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Anuncio, FileUpload, Foto } from '../model/app.model';
import { ConexionApiService } from '../servicios/conexion-api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { FileUploadService } from '../servicios/file-upload.service';
import { ToastrService } from 'ngx-toastr';

export interface urlsModificar {
  foto: Foto,
  eliminar: number

}

@Component({
  selector: 'app-crear-anuncio',
  templateUrl: './crear-anuncio.component.html',
  styleUrls: ['./crear-anuncio.component.css']
})



export class CrearAnuncioComponent {
  registerForm!: FormGroup;
  submitted = false;
  anuncio: Anuncio = {
    titulo: "",
    descripcion: "",
    datosEnvio: "",
    precio: 0,
    idUsuario: "",
    id: "",
    miniatura: ""


  }

  idCreado!: string;

  titulo!: string;
  avisoFotos!: boolean;
  currentFileUpload?: FileUpload;

  constructor(private toastr: ToastrService, private route: ActivatedRoute, private uploadService: FileUploadService, private formBuilder: FormBuilder, private cookieService: CookieService, private conexionApi: ConexionApiService, private router: Router) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({

      titulo: ['', Validators.required],
      precio: ['', Validators.required],
      descripcion: ['', Validators.required],
      datosEnvio: ['', Validators.required],


    });



    if (this.route.snapshot.params["id"] == "nuevo") {//compruebo si hay parametro
      this.titulo = "Crear anuncio"
    } else {
      this.titulo = "Editar anuncio"
      this.buscarAnuncio(this.route.snapshot.params["id"]);
      this.buscarFotosAnuncio(this.route.snapshot.params["id"]);
    }


  }




  /*
  eliminarFoto(id:any,event:any){
  
  
   
     this.urlsModificar.map(elemento=>{
      if(elemento.foto.id==id){
        elemento.eliminar=1;
      }
     })
    
  
  }*/






  buscarAnuncio(id: any) {
    this.conexionApi.buscarAnuncio(id)//busco las datos del anuncio
      .subscribe({
        next: (data) => {
          console.log(data.body)
          this.anuncio = data.body![0]

          this.registerForm.get('titulo')?.setValue(this.anuncio.titulo);
          this.registerForm.get('precio')?.setValue(this.anuncio.precio);
          this.registerForm.get('descripcion')?.setValue(this.anuncio.descripcion);
          this.registerForm.get('datosEnvio')?.setValue(this.anuncio.datosEnvio);





        },
        error: (e) => console.error(e)
      });
  }





  buscarFotosAnuncio(id: any) {
    this.conexionApi.buscarFotosAnuncio(id)//busco las fotos del anuncio
      .subscribe({
        next: (data) => {
          console.log("fotos")
          console.log(data.body)
          this.fotos = data.body!;

          this.fotos.forEach(foto => {
            var urlsModificarNueva = {
              foto: foto,
              eliminar: 0
            }
            this.urlsModificar.push(urlsModificarNueva)
          })

          console.log(this.urlsModificar)


        },
        error: (e) => console.error(e)
      });
  }




  urlsModificar: urlsModificar[] = []

  fotos: Foto[] = [];

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }




  subirDefinitivo() {//creo o edito
    this.submitted = true;
    console.log("entro")
    console.log(JSON.stringify(this.registerForm.value))

    // ampos validos
    if (this.registerForm.invalid) {
      return;
    }

    if (this.selectedFiles.length == 0 && this.titulo == "Crear anuncio") {
      this.avisoFotos = true;
      return;
    }

    //this.upload()

    this.anuncio.precio = (this.registerForm.value['precio']);
    this.anuncio.titulo = (this.registerForm.value['titulo']);
    this.anuncio.descripcion = (this.registerForm.value['descripcion']);
    this.anuncio.datosEnvio = (this.registerForm.value['datosEnvio']);
    this.anuncio.idUsuario = this.cookieService.get("id");



    if (this.titulo == "Crear anuncio") {
      this.conexionApi.crearAnuncio(this.anuncio).subscribe({//creo el anuncio
        next: data => {
          console.log(data);


          this.conexionApi.buscarAnuncioCompleto(this.anuncio)//busco el anuncio
            .subscribe({
              next: (data) => {
                console.log("encontrado")
                console.log(data.body)
                this.idCreado = data.body[0].id;
                this.upload();



              },
              error: (e) => console.error(e)
            });







          this.router.navigate(['/busquedaAnuncios']).then(() => {
            this.toastr.success("Anuncio creado");//navego
          })








        },
        error: err => {

        }
      });
    } else {


      /*
      this.urlsModificar.forEach(elemento => {
        if (elemento.eliminar == 1) {
          this.conexionApi.eliminarFotoAnuncio(elemento.foto.id).subscribe({
            next: data => {


            },
            error: err => {

            }
          });
        }
      })*/


      console.log("miniatura")
      console.log(this.anuncio.miniatura)


      //edito el anuncio
      this.conexionApi.editarAnuncio(this.anuncio.id, this.anuncio).subscribe({
        next: data => {
          console.log(data);
          this.router.navigate(['/busquedaAnuncios']).then(() => {
            this.toastr.success("Datos actualizados");
          })

        },
        error: err => {

        }
      });
    }




    // display form values on success
    //console.log('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value, null, 4));
  }


  //para mostrar las fotos
  selectedFiles: File[] = [];
  selectFile(event: any): void {
    //this.selectedFiles = event.target.files;
    this.selectedFiles.push(event.target.files[0])
    console.log(this.selectedFiles)
    this.avisoFotos = false;
    this.mostrar(event)
  }

  urls: string[] = []
  mostrar(event: any) {
    if (event.target.files) {
      for (var i = 0; i < File.length; i++) {
        var reader = new FileReader()
        if (event.target.files[i] != undefined) {
          reader.readAsDataURL(event.target.files[i])
          reader.onload = (event: any) => {
            this.urls.push(event.target.result)
            console.log(this.urls)
          }
        }

      }
    }
  }



  //subir la imagen
  upload(): void {


    for (const file of this.selectedFiles) {
      this.currentFileUpload = new FileUpload(file);
      this.uploadService.pushFileToStorage(this.currentFileUpload, this.idCreado).subscribe(

        error => {
          console.log(error);
        }
      );
    }



  }

}
