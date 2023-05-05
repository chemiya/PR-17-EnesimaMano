package prueba.prueba.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import prueba.prueba.modelo.AnuncioFavorito;






public interface AnunciosFavoritosRepository extends JpaRepository<AnuncioFavorito, Integer> {
    
    @Query(value="select * from anuncio_favorito r where r.id_usuario=?1 ", nativeQuery = true)
    List<AnuncioFavorito> findByUsuario(int idUsuario);



}
