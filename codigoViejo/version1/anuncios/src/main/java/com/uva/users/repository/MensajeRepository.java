package com.uva.users.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import com.uva.users.modelo.Anuncio;
import com.uva.users.modelo.AnuncioFavorito;
import com.uva.users.modelo.Mensaje;




public interface MensajeRepository extends JpaRepository<Mensaje, Integer> {
    
    @Query(value="select * from mensaje r where r.id_destino=?1 ", nativeQuery = true)
    List<Mensaje> findByIdDestino(int idDestino);

    @Query(value="select * from mensaje r where r.id_creador=?1 ", nativeQuery = true)
    List<Mensaje> findByIdCreador(int idCreador);



}
