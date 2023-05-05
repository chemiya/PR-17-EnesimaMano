package com.uva.users.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import com.uva.users.modelo.Anuncio;
import com.uva.users.modelo.AnuncioFavorito;




public interface AnuncioRepository extends JpaRepository<Anuncio, Integer> {
    
    @Query(value="select * from anuncio r where r.id_vendedor=?1 ", nativeQuery = true)
    List<Anuncio> findByVendedor(int idVendedor);



}
