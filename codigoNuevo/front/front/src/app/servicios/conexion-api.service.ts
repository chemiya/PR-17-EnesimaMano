import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Anuncio, Favorito, Foto, Miniatura, Usuario } from '../model/app.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConexionApiService {

  private static readonly BASE_URI = 'http://localhost:8080/';
  constructor(private http: HttpClient) { }


  registrarUsuario(usuario:Usuario): Observable<HttpResponse<any>> {
    let url = ConexionApiService.BASE_URI+"usuarios/registrar";
    
  
    return this.http.post(url, usuario, { observe: 'response', responseType: 'text' });
  }


  guardarFotoAnuncio(foto:Foto): Observable<HttpResponse<any>> {
    let url = ConexionApiService.BASE_URI+"fotos/guardar";
    
  
    return this.http.post(url, foto, { observe: 'response', responseType: 'text' });
  }

  crearAnuncio(anuncio:Anuncio): Observable<HttpResponse<any>> {
    let url = ConexionApiService.BASE_URI+"anuncios/crear";
    
  
    return this.http.post(url, anuncio, { observe: 'response', responseType: 'text' });
  }

  identificarUsuario(usuario:Usuario): Observable<HttpResponse<any>> {
    let url = ConexionApiService.BASE_URI+"usuarios/identificar";
    
  
    return this.http.post(url, usuario, { observe: 'response' });
  }

  comprobarFavorito(favorito:Favorito): Observable<HttpResponse<any>> {
    let url = ConexionApiService.BASE_URI+"favoritos/comprobar";
    
  
    return this.http.post(url, favorito, { observe: 'response' });
  }

  eliminarFavorito(idFavorito:string): Observable<HttpResponse<any>> {
    let url = ConexionApiService.BASE_URI+"favoritos/eliminar/"+idFavorito;
    return this.http.delete(url, { observe: 'response' });
  }

  eliminarAnuncio(idAnuncio:string): Observable<HttpResponse<any>> {
    let url = ConexionApiService.BASE_URI+"anuncios/eliminar/"+idAnuncio;
    return this.http.delete(url, { observe: 'response' });
  }

  eliminarFotoAnuncio(idFoto:string): Observable<HttpResponse<any>> {
    let url = ConexionApiService.BASE_URI+"fotos/eliminar/"+idFoto;
    return this.http.delete(url, { observe: 'response' });
  }



  /*buscarParametros(minimo:number,maximo:number,nombre:string): Observable<HttpResponse<any>> {
    let url = ConexionApiService.BASE_URI+"anuncios/buscarParametros?minimo="+minimo+"&maximo="+maximo+"&nombre="+nombre;
    
  
    return this.http.get<Anuncio[]>(url, { observe: 'response' });
  }*/

  guardarFavorito(favorito:Favorito): Observable<HttpResponse<any>> {
    let url = ConexionApiService.BASE_URI+"favoritos/guardar";
    
    return this.http.post(url, favorito, { observe: 'response' });
    
  }

  buscarAnuncios(): Observable<HttpResponse<Anuncio[]>> {
    let url = ConexionApiService.BASE_URI+"anuncios/buscar";
    return this.http.get<Anuncio[]>(url, { observe: 'response' });
  }

  buscarAnunciosFavoritos(id:any): Observable<HttpResponse<Anuncio[]>> {
    let url = ConexionApiService.BASE_URI+"favoritos/buscarFavoritosUsuario/"+id;
    return this.http.get<Anuncio[]>(url, { observe: 'response' });
  }

  buscarAnunciosDeUsuario(id:any): Observable<HttpResponse<Anuncio[]>> {
    let url = ConexionApiService.BASE_URI+"anuncios/buscarDeUsuario/"+id;
    return this.http.get<Anuncio[]>(url, { observe: 'response' });
  }

  buscarFotosAnuncio(id:any): Observable<HttpResponse<Foto[]>> {
    let url = ConexionApiService.BASE_URI+"fotos/buscarFotosAnuncio/"+id;
    return this.http.get<Foto[]>(url, { observe: 'response' });
  }

  buscarUsuario(id:any): Observable<HttpResponse<Usuario[]>> {
    let url = ConexionApiService.BASE_URI+"usuarios/buscar/"+id;
    return this.http.get<Usuario[]>(url, { observe: 'response' });
  }

  buscarAnuncio(id:any): Observable<HttpResponse<Anuncio[]>> {
    let url = ConexionApiService.BASE_URI+"anuncios/buscar/"+id;
    return this.http.get<Anuncio[]>(url, { observe: 'response' });
  }

  buscarAnuncioCompleto(anuncio:Anuncio): Observable<HttpResponse<any>> {
    let url = ConexionApiService.BASE_URI+"anuncios/buscarAnuncioCompleto";
    
  
    return this.http.post(url, anuncio, { observe: 'response' });
  }


  editarAnuncio(id: String, anuncio:Anuncio): Observable<HttpResponse<any>> {

    let url = ConexionApiService.BASE_URI +"anuncios/editar/"+ id;
    return this.http.put(url, anuncio, { observe: 'response', responseType: 'text' });
  }

  editarFotoUsuario(id: String, usuario:Usuario): Observable<HttpResponse<any>> {

    let url = ConexionApiService.BASE_URI +"usuarios/editarFoto/"+ id;
    return this.http.put(url, usuario, { observe: 'response', responseType: 'text' });
  }

  editarUsuario(id: String, usuario:Usuario): Observable<HttpResponse<any>> {

    let url = ConexionApiService.BASE_URI +"usuarios/editar/"+ id;
    return this.http.put(url, usuario, { observe: 'response', responseType: 'text' });
  }

  actualizarMiniatura(idAnuncio: String, miniatura:Miniatura): Observable<HttpResponse<any>> {

    let url = ConexionApiService.BASE_URI +"anuncios/actualizarMiniatura/"+ idAnuncio;
    return this.http.put(url, miniatura, { observe: 'response', responseType: 'text' });
  }
 
}
