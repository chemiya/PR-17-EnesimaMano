package com.uva.users.modelo;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.Size;




@Entity
@Table(name = "anuncio")
public class Anuncio {
    @Id
    @GeneratedValue
    private int idAnuncio;

    public int getId() {
      return this.idAnuncio;
    }

    public void setId(int id) {
      this.idAnuncio = id;
    }



    @Column(name="id_comprador")
    @Size(max=45)
    private int idComprador;

    public int getIdComprador() {
      return this.idComprador;
    }

    public void setIdComprador(int idComprador) {
      this.idComprador = idComprador;
    }




    @Column(name="id_vendedor")
    @Size(max=45)
    private int idVendedor;

    public int getIdVendedor() {
      return this.idVendedor;
    }

    public void setIdVendedor(int idVendedor) {
      this.idVendedor = idVendedor;
    }

   


    @Column(name="titulo")
    private String titulo;

    public String getTitulo() {
      return this.titulo;
    }

    public void setTitulo(String titulo) {
      this.titulo = titulo;
    }




    @Column(name="descripcion")
    private String descripcion;

    public String getDescripcion() {
      return this.descripcion;
    }

    public void setDescripcion(String descripcion) {
      this.descripcion = descripcion;
    }




    @Column(name="datos_envio")
    private String datosEnvio;

    public String getDatosEnvio() {
      return this.datosEnvio;
    }

    public void setDatosEnvio(String datosEnvio) {
      this.datosEnvio = datosEnvio;
    }




    @Column(name="estado")
    private String estado;

    public String getEstado() {
      return this.estado;
    }

    public void setEstado(String estado) {
      this.estado = estado;
    }




    @Column(name="fecha_publicacion")
    private Date fechaPublicacion;

    public Date getFechaPublicacion() {
      return this.fechaPublicacion;
    }

    public void setFechaPublicacion(Date fechaPublicacion) {
      this.fechaPublicacion = fechaPublicacion;
    }
    



    @Column(name="precio")
    private Float precio;

    public Float getPrecio() {
      return this.precio;
    }

    public void setPrecio(Float price) {
      this.precio = price;
    }




    @Column(name="fotos")
    @ElementCollection(targetClass=String.class)
    private List<String> fotos;

    public List<String> getFotos() {
      return this.fotos;
    }

    public void setFotos(List<String> fotos) {
      this.fotos = fotos;
    }



    @Column(name="tags")
    @ElementCollection(targetClass=String.class)
    private List<String> tags;

    public List<String> getTags() {
      return this.tags;
    }

    public void setTags(List<String> tags) {
      this.tags = tags;
    }
    
   

    Anuncio(){

    }

    Anuncio(int id, String titulo, String descripcion, int idVendedor, int idComprador, String estado, Date fechaPublicacion, Float precio,List<String>fotos, List<String>tags ,String datosEnvio){
     this.idAnuncio=id;
     this.titulo=titulo;
     this.descripcion=descripcion;
     this.idVendedor=idVendedor;
     this.idComprador=idComprador;
     this.datosEnvio=datosEnvio;
     this.fechaPublicacion=fechaPublicacion;
     this.estado=estado;
     this.tags=tags;
     this.fotos=fotos;
     this.precio=precio;


    }

   
}


/*
{
"name":"cdhes22dd222223",
  "firstName":"chema",
   "lastName":"lozano",
   "email":"csshss1322@gmail.com",
   "password":"cont1234",
  "role":0,
  "enabled":true,
  "createdAt":"2017-04-03",
  "updatedAt":"2017-03-03"
  
  
}




*/ 
