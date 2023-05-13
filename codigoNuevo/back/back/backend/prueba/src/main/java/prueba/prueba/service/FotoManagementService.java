package prueba.prueba.service;





import java.util.List;

import prueba.prueba.dto.FavoritoDTO;
import prueba.prueba.dto.FotoDTO;
import prueba.prueba.dto.UsuarioDTO;



public interface FotoManagementService {

    Boolean add(FotoDTO foto);
    List<FotoDTO> buscarFotosAnuncio(String id);
    Boolean delete(String id);
   /* List<FavoritoDTO> comprobar(FavoritoDTO favorito);
    Boolean delete(String id);*/
  
   

   /* List<PostDTO> list();

    Boolean add(PostDTO post);

    Boolean edit(String id,PostDTO post);

    Boolean delete(String id);*/


}
