import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IdentificacionComponent } from './identificacion/identificacion.component';
import { RegistroComponent } from './registro/registro.component';
import { PantallaPrincipalComponent } from './pantalla-principal/pantalla-principal.component';
import { BusquedaAnunciosComponent } from './busqueda-anuncios/busqueda-anuncios.component';
import { CrearAnuncioComponent } from './crear-anuncio/crear-anuncio.component';
import { MiPerfilComponent } from './mi-perfil/mi-perfil.component';
import { EditarPerfilComponent } from './editar-perfil/editar-perfil.component';
import { DetalleAnuncioComponent } from './detalle-anuncio/detalle-anuncio.component';
import { AnunciosFavoritosComponent } from './anuncios-favoritos/anuncios-favoritos.component';

const routes: Routes = [
  { path: 'identificacion', component: IdentificacionComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'pantallaPrincipal', component: PantallaPrincipalComponent },
  { path: 'busquedaAnuncios', component: BusquedaAnunciosComponent },
  { path: 'crearAnuncio/:id', component: CrearAnuncioComponent },
  { path: 'miPerfil/:id', component: MiPerfilComponent },
  { path: 'detalleAnuncio/:id', component: DetalleAnuncioComponent },
  { path: 'editarPerfil', component: EditarPerfilComponent },
  { path: 'favoritos', component: AnunciosFavoritosComponent },
  { path: '**', redirectTo: '/pantallaPrincipal' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
