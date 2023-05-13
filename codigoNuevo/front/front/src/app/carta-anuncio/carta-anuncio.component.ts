import { Component, Input } from '@angular/core';
import { Anuncio } from '../model/app.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-carta-anuncio',
  templateUrl: './carta-anuncio.component.html',
  styleUrls: ['./carta-anuncio.component.css']
})
export class CartaAnuncioComponent {
  @Input() anuncio!: Anuncio;//recibo el anuncio


  constructor(private router: Router) { }

  detalleAnuncio(id: any) {//voy al detalle
    this.router.navigate(['/detalleAnuncio/' + id])
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.cambiarTituloTamano();
  }

  cambiarTituloTamano() {//disminuyo letras titulo
    if (this.anuncio.titulo.length > 15) {
      this.anuncio.titulo = this.anuncio.titulo.substring(0, 12) + "..."
    }

  }
}
