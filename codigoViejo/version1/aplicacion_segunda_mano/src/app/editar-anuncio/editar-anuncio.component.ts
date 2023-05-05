import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConexionSpringService } from '../conexionAPI/conexion-spring.service';
import { Anuncio } from '../modelo/app.model';

@Component({
  selector: 'app-editar-anuncio',
  templateUrl: './editar-anuncio.component.html',
  styleUrls: ['./editar-anuncio.component.css']
})
export class EditarAnuncioComponent {
anuncio!:Anuncio;
id!:String;
constructor(private router:Router,private ruta:ActivatedRoute, private conexionSpring:ConexionSpringService){}
ngOnInit(): void {
  //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
  //Add 'implements OnInit' to the class.
  this.anuncio={
    titulo:"",
    descripcion:"",
    precio:0,
    idVendedor:0,
    idComprador:0,
    id:0,
    datosEnvio:"",
    estado:"",
    fechaPublicacion:new Date("2000-01-01"),
  


  }


  this.ruta.paramMap.subscribe( // Capturamos el id de la URL
  params => {
    this.id = params.get('id')!;
    console.log(this.id)

  },
  err => console.log("Error al leer id para editar: " + err)
)


this.conexionSpring.getAnuncio(this.id).subscribe(
  resp => {
    if (resp.body == null) {//si no se encuentra el usuario
      this.router.navigate(['listaAnuncios']);
     
    } else {//si no lo guardamos para mostrarlo
      this.anuncio = resp.body!;
    
    }


  },
  err => {
    console.log("Error al traer el vino: " + err.message);
    throw err;
  }
)
}


editar(){
  this.conexionSpring.modificarAnuncio(String(this.anuncio.id), this.anuncio).subscribe(
    resp => {
      if (resp.status < 400) {
      

      } else {

     
      }
      this.router.navigate(['miPerfil']); // Volvemos a la pantalla principal
    },
    err => {
      console.log("Error al editar: " + err.message);
      throw err;
    }
  )
}

}

