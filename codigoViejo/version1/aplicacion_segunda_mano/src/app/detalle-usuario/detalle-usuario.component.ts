import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConexionSpringService } from '../conexionAPI/conexion-spring.service';
import { Usuario } from '../modelo/app.model';

@Component({
  selector: 'app-detalle-usuario',
  templateUrl: './detalle-usuario.component.html',
  styleUrls: ['./detalle-usuario.component.css']
})
export class DetalleUsuarioComponent {
  constructor(private ruta: ActivatedRoute, private router: Router,private conexionSpring:ConexionSpringService){}
  id!: String;
  usuario!:Usuario;
  ngOnInit() {
    this.usuario={
      nombre:"",
      email:"",
      foto:"",
      ubicacion:"",
      password:"",
      id:0
    }

      this.ruta.paramMap.subscribe( // Capturamos el id de la URL
        params => {
          this.id = params.get('idUsuario')!;
          console.log(this.id)

        },
        err => console.log("Error al leer id para editar: " + err)
      )

      //buscamos el usuario
      this.conexionSpring.getUsuario(this.id).subscribe(
        resp => {
          if (resp.body == null) {//si no se encuentra el usuario
            this.router.navigate(['listaAnuncios']);
           
          } else {//si no lo guardamos para mostrarlo
            this.usuario = resp.body!;
          
          }


        },
        err => {
          console.log("Error al traer el vino: " + err.message);
          throw err;
        }
      )
    }
  }



