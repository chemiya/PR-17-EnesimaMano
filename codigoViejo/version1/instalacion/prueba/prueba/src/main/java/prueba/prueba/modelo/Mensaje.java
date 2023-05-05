package prueba.prueba.modelo;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.Size;

@Entity
@Table(name = "mensaje")
public class Mensaje {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
     
    @Column(name="id_creador")
    private int idCreador;

    public int getIdCreador() {
        return this.idCreador;
    }

    public void setIdCreador(int idCreador) {
        this.idCreador = idCreador;
    }


   @Column(name="id_destino")
    private int idDestino;

   public int getIdDestino() {
       return this.idDestino;
   }

   public void setIdDestino(int idDestino) {
       this.idDestino = idDestino;
   }



   @Column(name="contenido")
    private String contenido;

   public String getContenido() {
       return this.contenido;
   }

   public void setContenido(String contenido) {
       this.contenido = contenido;
   }

   public Mensaje(){

   }

   public Mensaje(int id, int idCreador, int idDestino,String contenido){
    this.id=id;
    this.idCreador=idCreador;
    this.idDestino=idDestino;
    this.contenido=contenido;

   }

}
