package prueba.prueba.excepcion;


import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;
@ResponseStatus(code = HttpStatus.UNPROCESSABLE_ENTITY)
public class AnuncionExcepcion extends RuntimeException{
    public AnuncionExcepcion(String mensaje) {
    super(mensaje);
}
}

