package prueba.prueba.service;





import java.util.List;

import prueba.prueba.dto.UsuarioDTO;



public interface UsuarioManagementService {

    Boolean add(UsuarioDTO usuario);
    List<UsuarioDTO> identificar(UsuarioDTO usuario);
    List<UsuarioDTO> buscarPorId(String id);
    Boolean edit(String id,UsuarioDTO post);
    Boolean editFotoUsuario(String id,UsuarioDTO post);

   /* List<PostDTO> list();

    Boolean add(PostDTO post);

    Boolean edit(String id,PostDTO post);

    Boolean delete(String id);*/


}
