import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PantallaPrincipalComponent } from './pantalla-principal/pantalla-principal.component';
import { IdentificacionComponent } from './identificacion/identificacion.component';
import { RegistroComponent } from './registro/registro.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BusquedaAnunciosComponent } from './busqueda-anuncios/busqueda-anuncios.component';
import { CrearAnuncioComponent } from './crear-anuncio/crear-anuncio.component';
import { CartaAnuncioComponent } from './carta-anuncio/carta-anuncio.component';
import {CookieService} from 'ngx-cookie-service';
import { MiPerfilComponent } from './mi-perfil/mi-perfil.component';
import { AnunciosFavoritosComponent } from './anuncios-favoritos/anuncios-favoritos.component';
import { DetalleAnuncioComponent } from './detalle-anuncio/detalle-anuncio.component';
import { EditarPerfilComponent } from './editar-perfil/editar-perfil.component';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { environment } from '../../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CarouselModule } from 'ngx-owl-carousel-o';


import { ToastrModule } from 'ngx-toastr';
import { DialogComponent } from './dialog/dialog.component';
import { MatDialogModule } from '@angular/material/dialog';








@NgModule({
  declarations: [
    AppComponent,
    PantallaPrincipalComponent,
    IdentificacionComponent,
    RegistroComponent,
    BusquedaAnunciosComponent,
    CrearAnuncioComponent,
    CartaAnuncioComponent,
    MiPerfilComponent,
    AnunciosFavoritosComponent,
    DetalleAnuncioComponent,
    EditarPerfilComponent,
    DialogComponent,
   
    
   
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    CarouselModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    MatDialogModule
    
    
  ],

  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
