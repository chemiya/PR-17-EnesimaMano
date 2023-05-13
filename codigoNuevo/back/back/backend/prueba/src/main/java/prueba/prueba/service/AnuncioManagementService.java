package prueba.prueba.service;





import java.util.List;

import prueba.prueba.dto.AnuncioDTO;
import prueba.prueba.dto.MiniaturaDTO;
import prueba.prueba.dto.UsuarioDTO;



public interface AnuncioManagementService {

    Boolean add(AnuncioDTO usuario);
    List<AnuncioDTO> buscar();
    List<AnuncioDTO> buscarDeUsuario(String id);
    Boolean edit(String id,AnuncioDTO anuncio);
    List<AnuncioDTO> buscarPorId(String id);
    Boolean delete(String id);
    Boolean actualizarMiniatura(String id,MiniaturaDTO miniatura);
    List<AnuncioDTO> anuncioCompleto(AnuncioDTO anuncio);
   
    //List<UsuarioDTO> identificar(UsuarioDTO usuario);

   /* List<PostDTO> list();

    Boolean add(PostDTO post);

    Boolean edit(String id,PostDTO post);

    Boolean delete(String id);*/


}
