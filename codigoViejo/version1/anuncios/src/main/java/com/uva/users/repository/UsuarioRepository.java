package com.uva.users.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import com.uva.users.modelo.Anuncio;
import com.uva.users.modelo.Usuario;




public interface UsuarioRepository extends JpaRepository<Usuario, Integer> {
    




}
