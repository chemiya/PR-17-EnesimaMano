import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Anuncio, AnuncioFavorito, Mensaje, Usuario } from '../modelo/app.model';

@Injectable({
  providedIn: 'root'
})
export class ConexionSpringService {

  idJuntos: String = "";
  
  private static readonly BASE_URI = 'http://localhost:8081/segundaMano/';
  constructor(private http: HttpClient) { }

  getUsuario(id: String): Observable<HttpResponse<Usuario>> {
    let url = ConexionSpringService.BASE_URI +"usuarios/"+ id;
    return this.http.get<Usuario>(url, { observe: 'response' });
}

getAllAnuncios(): Observable<HttpResponse<Anuncio[]>> {
  let url = ConexionSpringService.BASE_URI+"anuncios";
  return this.http.get<Anuncio[]>(url, { observe: 'response' });
}

getAnunciosFavoritos(id:number): Observable<HttpResponse<Anuncio[]>> {
  let url = ConexionSpringService.BASE_URI+"anuncios/favoritos/"+id;
  return this.http.get<Anuncio[]>(url, { observe: 'response' });
}

getMensajesCreador(id:number): Observable<HttpResponse<Mensaje[]>> {
  let url = ConexionSpringService.BASE_URI+"mensajes/creador/"+id;
  return this.http.get<Mensaje[]>(url, { observe: 'response' });
}

getMensajesDestino(id:number): Observable<HttpResponse<Mensaje[]>> {
  let url = ConexionSpringService.BASE_URI+"mensajes/destino/"+id;
  return this.http.get<Mensaje[]>(url, { observe: 'response' });
}

getAnunciosFiltro(titulo:String): Observable<HttpResponse<Anuncio[]>> {
  let url = ConexionSpringService.BASE_URI+"anuncios/filtro/"+titulo;
  return this.http.get<Anuncio[]>(url, { observe: 'response' });
}

modificarAnuncio(id: String, anuncio:Anuncio): Observable<HttpResponse<any>> {

  let url = ConexionSpringService.BASE_URI +"anuncios/editar/"+ id;
  return this.http.put(url, anuncio, { observe: 'response', responseType: 'text' });
}

getAnuncio(id: String): Observable<HttpResponse<Anuncio>> {
  let url = ConexionSpringService.BASE_URI +"anuncios/"+ id;
  return this.http.get<Anuncio>(url, { observe: 'response' });
}

getMisAnuncios(id:number): Observable<HttpResponse<Anuncio[]>> {
  let url = ConexionSpringService.BASE_URI+"anuncios/mios/"+id;
  return this.http.get<Anuncio[]>(url, { observe: 'response' });
}



subirAnuncio(anuncio:Anuncio): Observable<HttpResponse<any>> {
  let url = ConexionSpringService.BASE_URI+"anuncios";
  

  return this.http.post(url, anuncio, { observe: 'response', responseType: 'text' });
}

anadirFavoritos(anuncioFavorito:AnuncioFavorito): Observable<HttpResponse<any>> {
  let url = ConexionSpringService.BASE_URI+"anuncios/favoritos/anadir";
  

  return this.http.post(url, anuncioFavorito, { observe: 'response', responseType: 'text' });
}

enviarMensaje(mensaje:Mensaje): Observable<HttpResponse<any>> {
  let url = ConexionSpringService.BASE_URI+"mensajes/escribir";
  

  return this.http.post(url, mensaje, { observe: 'response', responseType: 'text' });
}

/*
  getAllUsuarios(): Observable<HttpResponse<Usuario[]>> {
    let url = ClienteApiRestService.BASE_URI;
    return this.http.get<Usuario[]>(url, { observe: 'response' });
  }

  identificacion(name:string,contrasena:string): Observable<HttpResponse<Usuario[]>> {
    let url = ClienteApiRestService.BASE_URI+"identificacion/"+name+"/"+contrasena;
    return this.http.get<Usuario[]>(url, { observe: 'response' });
  }



  buscarNombre(nombre:String): Observable<HttpResponse<Usuario>> {
    let url = ClienteApiRestService.BASE_URI+"buscarNombre/"+nombre;
    return this.http.get<Usuario>(url, { observe: 'response' });
  }

  
  buscarEmail(nombre:String): Observable<HttpResponse<Usuario>> {
    let url = ClienteApiRestService.BASE_URI+"buscarEmail/"+nombre;
    return this.http.get<Usuario>(url, { observe: 'response' });
  }


  
  getUsuariosEnabled(enabled:String): Observable<HttpResponse<Usuario[]>> {
    
    if(enabled==="true" ||enabled==="false"){
      let url = ClienteApiRestService.BASE_URI+"tipo?enabled="+enabled;
    return this.http.get<Usuario[]>(url, { observe: 'response' });
    }else{
      let url = ClienteApiRestService.BASE_URI;
    return this.http.get<Usuario[]>(url, { observe: 'response' });
    }

    
  }


  
  anadirUsuario(usuario:Usuario): Observable<HttpResponse<any>> {
    let url = ClienteApiRestService.BASE_URI;
    

    return this.http.post(url, usuario, { observe: 'response', responseType: 'text' });
}


modificarUsuario(id: String, usuario:Usuario): Observable<HttpResponse<any>> {

    let url = ClienteApiRestService.BASE_URI + id;
    return this.http.put(url, usuario, { observe: 'response', responseType: 'text' });
}



  borrarUsuario(id: String): Observable<HttpResponse<any>> {
    let url = ClienteApiRestService.BASE_URI + id;
    return this.http.delete(url, { observe: 'response', responseType: 'text' });
  }


  
  activarUsuarios(user_id: Number[]): Observable<HttpResponse<any>> {


   
    for (let id of user_id) {
      this.idJuntos = id + "," + this.idJuntos;
      
    }

    this.idJuntos = this.idJuntos.substring(0, this.idJuntos.length - 1);


    let url = ClienteApiRestService.BASE_URI + "enabled?user_id=" + this.idJuntos;

 
    this.idJuntos = "";
    return this.http.put(url, null, { observe: 'response', responseType: 'text' });
  }


  desactivarUsuarios(user_id: Number[]): Observable<HttpResponse<any>> {
  
    for (let id of user_id) {
      this.idJuntos = id + "," + this.idJuntos;
      console.log(this.idJuntos);
    }

    this.idJuntos = this.idJuntos.substring(0, this.idJuntos.length - 1);
    let url = ClienteApiRestService.BASE_URI + "disabled?user_id=" + this.idJuntos;

    this.idJuntos = "";
    return this.http.put(url, null, { observe: 'response', responseType: 'text' });
  }



  getUsuario(id: String): Observable<HttpResponse<Usuario>> {
    let url = ClienteApiRestService.BASE_URI + id;
    return this.http.get<Usuario>(url, { observe: 'response' });
}*/

}
