package prueba.prueba.service;





import java.util.List;

import prueba.prueba.dto.AnuncioDTO;
import prueba.prueba.dto.FavoritoDTO;
import prueba.prueba.dto.UsuarioDTO;



public interface FavoritoManagementService {

    Boolean add(FavoritoDTO favorito);
    List<FavoritoDTO> comprobar(FavoritoDTO favorito);
    List<AnuncioDTO> buscarFavoritosUsuario(String id);
    Boolean delete(String id);
  
   

   /* List<PostDTO> list();

    Boolean add(PostDTO post);

    Boolean edit(String id,PostDTO post);

    Boolean delete(String id);*/


}
