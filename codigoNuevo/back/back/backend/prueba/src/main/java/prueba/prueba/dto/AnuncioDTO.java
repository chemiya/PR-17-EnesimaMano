package prueba.prueba.dto;



import lombok.Data;

@Data
public class AnuncioDTO {

    private String id;
    private String idUsuario;
    private String titulo;
    private String descripcion;
    private String datosEnvio;
    private int precio;
    private String miniatura;
    

}
