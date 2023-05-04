import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IdentificacionComponent } from './identificacion/identificacion.component';
import { RegistroComponent } from './registro/register.component';

import { MiPerfilComponent } from './mi-perfil/mi-perfil.component';


import { AuthInterceptor, authInterceptorProviders } from './_helpers/auth.interceptor';
import { AuthService } from './_services/auth.service';
import { AuthGuard } from './_services/auth.guard';
import { PantallaPrincipalComponent } from './pantalla-principal/pantalla-principal.component';
import { ListaAnunciosComponent } from './lista-anuncios/lista-anuncios.component';
import { DetalleAnuncioComponent } from './detalle-anuncio/detalle-anuncio.component';
import { DetalleUsuarioComponent } from './detalle-usuario/detalle-usuario.component';
import { SubirAnuncioComponent } from './subir-anuncio/subir-anuncio.component';
import { AnunciosFavoritosComponent } from './anuncios-favoritos/anuncios-favoritos.component';
import { MisAnunciosComponent } from './mis-anuncios/mis-anuncios.component';
import { MensajesComponent } from './mensajes/mensajes.component';
import { EditarAnuncioComponent } from './editar-anuncio/editar-anuncio.component';



@NgModule({
  declarations: [
    AppComponent,
    IdentificacionComponent,
    RegistroComponent,
   
    MiPerfilComponent,
    PantallaPrincipalComponent,
    ListaAnunciosComponent,
    DetalleAnuncioComponent,
    DetalleUsuarioComponent,
    SubirAnuncioComponent,
    AnunciosFavoritosComponent,
    MisAnunciosComponent,
    MensajesComponent,
    EditarAnuncioComponent,
   
   
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [ AuthService, AuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
