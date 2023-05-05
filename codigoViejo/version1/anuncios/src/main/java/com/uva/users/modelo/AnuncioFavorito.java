package com.uva.users.modelo;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.Size;

@Entity
@Table(name = "anuncioFavorito")
public class AnuncioFavorito {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
     
    @Column(name="id_anuncio")
    @Size(max=45)
    private int idAnuncio;

    public int getIdAnuncio() {
      return this.idAnuncio;
    }

    public void setIdAnuncio(int idAnuncio) {
      this.idAnuncio = idAnuncio;
    }


    @Column(name="id_usuario")
    @Size(max=45)
    private int idUsuario;

    public int getIdUsuario() {
      return this.idUsuario;
    }

    public void setIdUsuario(int idUsuario) {
      this.idUsuario = idUsuario;
    }

    public AnuncioFavorito(){}

    public AnuncioFavorito(int idAnuncio, int idUsuario){
        this.idAnuncio=idAnuncio;
        this.idUsuario=idUsuario;
    }

}
