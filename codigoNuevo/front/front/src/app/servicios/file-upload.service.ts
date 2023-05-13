import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { AngularFireStorage } from '@angular/fire/compat/storage';

import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { FileUpload, Foto, Miniatura } from '../model/app.model';
import { ConexionApiService } from './conexion-api.service';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  private basePath = '/uploads';
foto:Foto={
  idAnuncio:"",
  ruta:"",
  id:""
}
  constructor(private db: AngularFireDatabase, private storage: AngularFireStorage, private conexionApi:ConexionApiService) { }

  pushFileToStorage(fileUpload: FileUpload,idAnuncio:any): Observable<number | undefined> {
    const filePath = `${this.basePath}/${fileUpload.file.name}`;
    const storageRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, fileUpload.file);
    var contador=0;

    uploadTask.snapshotChanges().pipe(
      finalize(() => {
        storageRef.getDownloadURL().subscribe(downloadURL => {
          fileUpload.url = downloadURL;
          console.log(fileUpload.url)
          fileUpload.name = fileUpload.file.name;
          this.saveFileData(fileUpload);

          this.foto.ruta=fileUpload.url;
          this.foto.idAnuncio=idAnuncio;
          var miniatura:Miniatura={
            miniatura:this.foto.ruta
          }

          if(contador==0){
            this.conexionApi.actualizarMiniatura(this.foto.idAnuncio,miniatura).subscribe({
              next: data => {
                console.log(data);
               
               
              },
              error: err => {
             
              }
            });
            contador++;
          }

          this.conexionApi.guardarFotoAnuncio(this.foto).subscribe({
            next: data => {
              console.log(data);
             
             
            },
            error: err => {
           
            }
          });


        });
      })
    ).subscribe();

    return uploadTask.percentageChanges();
  }


  
  private saveFileData(fileUpload: FileUpload): void {
    this.db.list(this.basePath).push(fileUpload);
  }
}
