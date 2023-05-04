import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegistroComponent } from './registro/register.component';
import { IdentificacionComponent } from './identificacion/identificacion.component';

import { MiPerfilComponent } from './mi-perfil/mi-perfil.component';
import { AuthGuard } from './_services/auth.guard';
import { PantallaPrincipalComponent } from './pantalla-principal/pantalla-principal.component';
import { ListaAnunciosComponent } from './lista-anuncios/lista-anuncios.component';
import { SubirAnuncioComponent } from './subir-anuncio/subir-anuncio.component';

import { AnunciosFavoritosComponent } from './anuncios-favoritos/anuncios-favoritos.component';
import { DetalleAnuncioComponent } from './detalle-anuncio/detalle-anuncio.component';
import { DetalleUsuarioComponent } from './detalle-usuario/detalle-usuario.component';
import { MensajesComponent } from './mensajes/mensajes.component';
import { MisAnunciosComponent } from './mis-anuncios/mis-anuncios.component';
import { EditarAnuncioComponent } from './editar-anuncio/editar-anuncio.component';


const routes: Routes = [
  //rutas y sus componentes
  
  { path: 'identificacion', component: IdentificacionComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'pantallaPrincipal', component: PantallaPrincipalComponent },
  { path: 'listaAnuncios', component: ListaAnunciosComponent , canActivate:[AuthGuard]},
  { path: 'miPerfil', component: MiPerfilComponent , canActivate:[AuthGuard]},
  { path: 'subirAnuncio', component: SubirAnuncioComponent, canActivate:[AuthGuard]},
  { path: 'mensajes', component: MensajesComponent, canActivate:[AuthGuard]},
  { path: 'misAnuncios', component: MisAnunciosComponent, canActivate:[AuthGuard]},
  { path: 'misAnuncios/:id/editarAnuncio', component: EditarAnuncioComponent, canActivate:[AuthGuard]},
  { path: 'anunciosFavoritos', component: AnunciosFavoritosComponent, canActivate:[AuthGuard]},
  { path: 'listaAnuncios/:id/detallesAnuncio', component: DetalleAnuncioComponent, canActivate:[AuthGuard]},
  { path: 'listaAnuncios/:id/detallesAnuncio/:idUsuario/detallesUsuario', component: DetalleUsuarioComponent, canActivate:[AuthGuard]},

  { path: '', redirectTo: 'pantallaPrincipal', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
