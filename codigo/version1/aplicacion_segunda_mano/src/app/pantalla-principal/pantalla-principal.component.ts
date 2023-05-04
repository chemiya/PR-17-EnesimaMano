import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-pantalla-principal',
  templateUrl: './pantalla-principal.component.html',
  styleUrls: ['./pantalla-principal.component.css']
})
export class PantallaPrincipalComponent {

constructor(private router:Router){}

  identificarse(){
    this.router.navigate(['identificacion']);
  }

  registrarse(){
    this.router.navigate(['registro']);
  }
}
