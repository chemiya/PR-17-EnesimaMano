package prueba.prueba.controlador;



import java.util.Date;
import java.util.HashMap;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import prueba.prueba.modelo.Anuncio;
import prueba.prueba.modelo.AnuncioFavorito;
import prueba.prueba.modelo.Mensaje;
import prueba.prueba.modelo.Usuario;
import prueba.prueba.repository.AnuncioRepository;
import prueba.prueba.repository.AnunciosFavoritosRepository;
import prueba.prueba.repository.MensajeRepository;
import prueba.prueba.repository.UsuarioRepository;



@RestController
@RequestMapping("segundaMano")
@CrossOrigin(origins = "*")
public class Controlador {
    private final AnuncioRepository repositoryAnuncio;
    private final UsuarioRepository repositoryUsuario;
    private final AnunciosFavoritosRepository repositoryFavoritos;
    private final MensajeRepository repositoryMensaje;

    Controlador(AnuncioRepository repositoryAnuncio,UsuarioRepository repositoryUsuario,AnunciosFavoritosRepository repositoryFavoritos,MensajeRepository repositoryMensaje) {
        this.repositoryAnuncio = repositoryAnuncio;
        this.repositoryUsuario=repositoryUsuario;
        this.repositoryFavoritos=repositoryFavoritos;
        this.repositoryMensaje=repositoryMensaje;
    }

    //get de anuncio--------------------------------------------------------------

     @GetMapping("/anuncios")
    public List<Anuncio> getAnuncios() {
        List<Anuncio> anuncios = new ArrayList<Anuncio>();

      
        repositoryAnuncio.findAll().forEach(anuncioVisto -> anuncios.add(anuncioVisto));

        return anuncios;

    }


    @GetMapping("/anuncios/filtro/{busqueda}")
    public List<Anuncio> getAnunciosFiltro(@PathVariable String busqueda) {
        List<Anuncio> anuncios = new ArrayList<Anuncio>();
        List<Anuncio> anunciosFiltro = new ArrayList<Anuncio>();

      
        repositoryAnuncio.findAll().forEach(anuncioVisto -> anuncios.add(anuncioVisto));

        for(int i=0;i<anuncios.size();i++){
            Anuncio comprobacion=anuncios.get(i);
            String titulo=comprobacion.getTitulo();
            if(titulo.contains(busqueda)){
                anunciosFiltro.add(comprobacion);
            }
           
        }

        return anunciosFiltro;

    }







    //post de anuncio-----------------------------------------------------------------
    @PostMapping("/anuncios")
    public String newAnuncio(@RequestBody Anuncio newAnuncio) {
       
        try {
         
            Date actual=new Date();
            newAnuncio.setFechaPublicacion(actual);
            newAnuncio.setEstado("publicado");
          
            repositoryAnuncio.save(newAnuncio);
            return "anuncio creado";
           
           
        } catch (Exception e) {

            return "no se ha podido crear el anuncio";
        }
    }




//get concreto de anuncio-----------------------------------------------
    @GetMapping(value = "/anuncios/{id}")
    public Anuncio getAnuncioById(@PathVariable int id) {

        Anuncio anuncio;
        if (repositoryAnuncio.existsById(id)) {
            anuncio = repositoryAnuncio.findById(id).get();
            return anuncio;

        } else {
            // si no se encuntra devuelve null
            return null;
        }

    }





     //get de usuario--------------------------------------------------------------

     @GetMapping("/usuarios")
    public List<Usuario> getUsuarios() {
        List<Usuario> usuarios = new ArrayList<Usuario>();

      
        repositoryUsuario.findAll().forEach(usuarioVisto -> usuarios.add(usuarioVisto));

        return usuarios;

    }


    //get de anuncios favoritos de un usuario--------------------------------------------------------------

    @GetMapping("/anuncios/favoritos/{idUsuario}")
    public List<Anuncio> getAnunciosFavoritosUsuario(@PathVariable int idUsuario) {
        List<AnuncioFavorito> anunciosFavoritos = new ArrayList<AnuncioFavorito>();
        List<Anuncio> anunciosCompletos = new ArrayList<Anuncio>();

        repositoryFavoritos.findByUsuario(idUsuario).forEach(anuncioFavoritoVisto -> anunciosFavoritos.add(anuncioFavoritoVisto));
    
        for(int i=0;i<anunciosFavoritos.size();i++){
            AnuncioFavorito anuncioFavorito=anunciosFavoritos.get(i);
            int idAnuncioFavorito=anuncioFavorito.getIdAnuncio();
            Anuncio anuncioCompleto=repositoryAnuncio.findById(idAnuncioFavorito).get();
            anunciosCompletos.add(anuncioCompleto);
            


        }
    
        return anunciosCompletos;

    }


    @GetMapping("/anuncios/mios/{idUsuario}")
    public List<Anuncio> getAnunciosUsuario(@PathVariable int idUsuario) {
       
        List<Anuncio> anuncios = new ArrayList<Anuncio>();

        repositoryAnuncio.findByVendedor(idUsuario).forEach(anuncioVisto -> anuncios.add(anuncioVisto));
    
     
    
        return anuncios;

    }

    @PostMapping("/anuncios/favoritos/anadir")
    public String anadirAnuncioFavorito(@RequestBody AnuncioFavorito newAnuncioFavorito) {
     
        try {
         
          
          
            repositoryFavoritos.save(newAnuncioFavorito);
            return "anuncio creado";
           
           
        } catch (Exception e) {
  
            return "no se ha podido crear el anuncio";
        }
    }



    
//get concreto de usuario-----------------------------------------------
@GetMapping(value = "/usuarios/{id}")
public Usuario getUsuarioById(@PathVariable int id) {

    Usuario usuario;
    if (repositoryUsuario.existsById(id)) {
        usuario = repositoryUsuario.findById(id).get();
        return usuario;

    } else {
        // si no se encuntra devuelve null
        return null;
    }

}



//get concreto de mensaje destino-----------------------------------------------
@GetMapping(value = "/mensajes/destino/{id}")
public List<Mensaje> getMensajesByIdDestino(@PathVariable int id) {
List<Mensaje> mensajes=new ArrayList<Mensaje>();
    repositoryMensaje.findByIdDestino(id).forEach(mensajeVisto -> mensajes.add(mensajeVisto));
    return mensajes;
   

}


//get concreto de mensaje creador-----------------------------------------------
@GetMapping(value = "/mensajes/creador/{id}")
public List<Mensaje> getMensajesByIdCreador(@PathVariable int id) {
List<Mensaje> mensajes=new ArrayList<Mensaje>();
    repositoryMensaje.findByIdCreador(id).forEach(mensajeVisto -> mensajes.add(mensajeVisto));
    return mensajes;
   

}


  //post de mensaje-----------------------------------------------------------------
  @PostMapping("/mensajes/escribir")
  public String escribirMensaje(@RequestBody Mensaje newMensaje) {
     
      try {
       
        
        
          repositoryMensaje.save(newMensaje);
          return "anuncio creado";
         
         
      } catch (Exception e) {

          return "no se ha podido crear el anuncio";
      }
  }


  @PutMapping(value = "/anuncios/editar/{id}")
  public String editarAnuncioById(@PathVariable int id, @RequestBody Anuncio anuncio) {
      if (repositoryAnuncio.existsById(id)) {
          Anuncio anuncioCorrespondiente = repositoryAnuncio.findById(id).get();

          anuncioCorrespondiente.setTitulo(anuncio.getTitulo());
          anuncioCorrespondiente.setPrecio(anuncio.getPrecio());
          anuncioCorrespondiente.setEstado(anuncio.getEstado());
          anuncioCorrespondiente.setDescripcion(anuncio.getDescripcion());
         


        

          repositoryAnuncio.save(anuncioCorrespondiente);
          return "actualizado correctamente";
      } else {
          return "no existe ese usuario";
      }

  }



  /*    @GetMapping("/availability")
    public List<Disponibilidad> getReservaDisponibilidad() {
        List<Anuncio> reservas = new ArrayList<Anuncio>();

        repository.findAll().forEach(reservaVisto -> reservas.add(reservaVisto));

        //ArrayList<Integer>numeroHabitaciones=new ArrayList<Integer>();
        List<Disponibilidad>numeroHabitaciones=new ArrayList<Disponibilidad>();
        LocalDate hoy=LocalDate.now();
        LocalDate mesMargen=hoy.plusDays(31);
        for(LocalDate inicio=hoy; inicio.isBefore(mesMargen);inicio=inicio.plusDays(1)){
            //dia 1=25 de diciembre
            //busca reservas cuya fecha de inicio se igual o anterior al 25 de diciembre:23,24,25
            //de esas busca las que cuya fecha final sea posterior al 25 dediciembre:26,27,28
            //devuelve 10-el numero de habitaciones utilizadas de las que cumplen eso
            int maximo=10;
            for(int i=0;i<reservas.size();i++){
                Anuncio comprobar=reservas.get(i);

                if(comprobar.getDateIn().isBefore(inicio) ||comprobar.getDateIn().isEqual(inicio) ){
                    if(comprobar.getDateOut().isAfter(inicio)){
                        maximo=maximo-comprobar.getUnits();
                    }
                }
            }
            
            Disponibilidad nueva=new Disponibilidad(inicio,maximo);
            numeroHabitaciones.add(nueva);

        }

        return numeroHabitaciones;

    }

     @GetMapping(value = "/{id}")
    public Anuncio getReservaById(@PathVariable int id) {

        Anuncio reserva;
        if (repository.existsById(id)) {
            reserva = repository.findById(id).get();
            return reserva;

        } else {
            // si no se encuntra devuelve null
            return null;
        }

    }*/

/* 
    @PostMapping
    public String newReserva(@RequestBody Anuncio newReserva) {
       
        try {
            Date date=new Date();
            newReserva.setCreatedAt(date);
            newReserva.setStatus("Pending");


           List<Disponibilidad> dispons= getReservaDisponibilidad();
            boolean validez=true;
           for(int i=0;i<dispons.size();i++){
            Disponibilidad dispo=dispons.get(i);
            if(dispo.getFecha().isBefore(newReserva.getDateOut()) &&dispo.getFecha().isAfter(newReserva.getDateIn())  ){
                if(dispo.getNumero()<newReserva.getUnits()){
                    validez=false;
                }
            }

            if(dispo.getFecha().isEqual(newReserva.getDateIn()) ){
                if(dispo.getNumero()<newReserva.getUnits()){
                    validez=false;
                }
            }
            
           }


           if(validez){
            repository.save(newReserva);
            return "Nueva reserva creada";
           }else{
            return "no se ha podido crear la reserva. el numero de habitaciones solicitadas no esta disponible en esas fechas";
           }
           
        } catch (Exception e) {

            return "no se ha podido crear la reserva";
        }
    }

     @PutMapping(value = "/{id}")
    public String actualizarReservaById(@PathVariable int id, @RequestBody Anuncio reserva) {
        if (repository.existsById(id)) {
            Anuncio reservaCorrespondiente = repository.findById(id).get();

            reservaCorrespondiente.setUnits(reserva.getUnits());
            reservaCorrespondiente.setNumGuest(reserva.getNumGuest());
            reservaCorrespondiente.setStatus(reserva.getStatus());
            reservaCorrespondiente.setDateIn(reserva.getDateIn());
            reservaCorrespondiente.setDateOut(reserva.getDateOut());


            Date date=new Date();
            reservaCorrespondiente.setUpdatedAt(date);

            repository.save(reservaCorrespondiente);
            return "actualizado correctamente";
        } else {
            return "no existe ese usuario";
        }

    }*/

    /* 

    // crear usuario
    @PostMapping
    public String newUsuario(@RequestBody Usuario newUsuario) {
        try {
            repository.save(newUsuario);
            return "Nuevo usuario creado";
        } catch (Exception e) {

            return "no se ha podido crear el usuario";
        }
    }

    // obtener todos lo usuarios
    @GetMapping
    public List<Usuario> getUsuarios() {
        List<Usuario> usuarios = new ArrayList<Usuario>();

        repository.findAll().forEach(usuarioVisto -> usuarios.add(usuarioVisto));

        return usuarios;

    }

    // Ambiguous mapping. Cannot map 'controladorUsuario' method
    // com.uva.users.controlador.ControladorUsuario#getUsuariosEnabled(boolean)
    // to {GET [/users]}: There is already 'controladorUsuario' bean method
    // com.uva.users.controlador.ControladorUsuario#getUsuarios() mapped.

    // obtener solo segun campo de enabled
    // tengo que poner algo en la url para diferenciarlo del get normal
    // si quito ("/tipo") me sale la excepcion de arriba
    @GetMapping("/tipo")
    public List<Usuario> getUsuariosEnabled(@RequestParam boolean enabled) {
        List<Usuario> usuarios = new ArrayList<Usuario>();

        repository.findByEnabled(enabled).forEach(usuarioVisto -> usuarios.add(usuarioVisto));
        return usuarios;

    }

    // obtener un usuario concreto
    @GetMapping(value = "/{id}")
    public Usuario getUsuarioById(@PathVariable int id) {

        Usuario usuario;
        if (repository.existsById(id)) {
            usuario = repository.findById(id).get();
            return usuario;

        } else {
            // si no se encuntra devuelve null
            return null;
        }

    }

    // actualizar usuario
    @PutMapping(value = "/{id}")
    public String actualizarUsuarioById(@PathVariable int id, @RequestBody Usuario usuario) {
        if (repository.existsById(id)) {
            Usuario usuarioCorrespondiente = repository.findById(id).get();

            usuarioCorrespondiente.setCreatedAt(usuario.getCreatedAt());
            usuarioCorrespondiente.setUpdatedAt(usuario.getUpdatedAt());
            usuarioCorrespondiente.setEnabled(usuario.isEnabled());
            usuarioCorrespondiente.setEmail(usuario.getEmail());
            usuarioCorrespondiente.setPassword(usuario.getPassword());
            usuarioCorrespondiente.setRole(usuario.getRole());
            usuarioCorrespondiente.setFirstName(usuario.getFirstName());
            usuarioCorrespondiente.setLastName(usuario.getLastName());
            usuarioCorrespondiente.setUsername(usuario.getUsername());

            repository.save(usuarioCorrespondiente);
            return "actualizado correctamente";
        } else {
            return "no existe ese usuario";
        }

    }

    // obtener usuario por nombre similar
    @GetMapping("/buscarNombre/{nombre}")
    public Usuario buscarNombre(@PathVariable String nombre) {
        List<Usuario> usuarios = new ArrayList<Usuario>();
        usuarios = repository.findByName(nombre);
        if (usuarios.isEmpty()) {
            return null;
        } else {
            return usuarios.get(0);
        }

    }

    //identificacion por usuario y contrasena
    //me imagino que en la realidad se hara de una manera mas segura
    @GetMapping("/identificacion/{nombre}/{contrasena}")
    public Usuario identificacion(@PathVariable String nombre,@PathVariable String contrasena) {
        List<Usuario> usuarios = new ArrayList<Usuario>();
        usuarios = repository.findByIdentificacion(nombre,contrasena);
        if (usuarios.isEmpty()) {
            return null;
        } else {
            return usuarios.get(0);
        }

    }


    /*@GetMapping("/identificacionJWT/{email}")
    public Usuario identificacionJWT(@PathVariable String email) {
        List<Usuario> usuarios = new ArrayList<Usuario>();
        usuarios = repository.findByEmail(email);
        if (usuarios.isEmpty()) {
            return null;
        } else {
            return usuarios.get(0);
        }

    }*/



    /*
    nueva ruta para la identificacion con la otra api
    paso como parametro en el url el email que es por lo que se identifica el usuario


     * nested exception is java.lang.IllegalStateException: Ambiguous mapping. Cannot map 'controladorUsuario' method
com.uva.users.controlador.ControladorUsuario#identificacionJWT(String)
to {GET [/users]}: There is already 'controladorUsuario' bean method
com.uva.users.controlador.ControladorUsuario#getUsuarios() mapped.
     * 
     * 
     * 
     * 
     */

     /* 
    @GetMapping("/identificacionJWT")
    public Usuario identificacionJWT(@RequestParam String email) {
        List<Usuario> usuarios = new ArrayList<Usuario>();
        usuarios = repository.findByEmail(email);
        if (usuarios.isEmpty()) {
            return null;
        } else {
            return usuarios.get(0);
        }

    }




    // obtener usuario por email similar
    @GetMapping("/buscarEmail/{email}")
    public Usuario buscarEmail(@PathVariable String email) {
        List<Usuario> usuarios = new ArrayList<Usuario>();
        usuarios = repository.findByEmail(email);
        if (usuarios.isEmpty()) {
            return null;
        } else {
            return usuarios.get(0);
        }
    }

    // eliminar usuario
    @DeleteMapping(value = "/{id}")
    public String borrarUsuarioById(@PathVariable int id) {
        if (repository.existsById(id)) {
            repository.deleteById(id);
            return "eliminado con exito";
        } else {
            return "no existe con ese id";
        }

    }

    // activar usuarios
    @PutMapping("/enabled")
    public String activarUsuarios(@RequestParam List<Integer> user_id) {
        int id_actualizar;
        int contadorActualizados = user_id.size();
        for (int i = 0; i < user_id.size(); i++) {//recorres la lista
            id_actualizar = user_id.get(i);

            if (repository.existsById(id_actualizar)) {//si se encuentra lo actualizas
                Usuario usuarioCorrespondiente = repository.findById(id_actualizar).get();

                usuarioCorrespondiente.setEnabled(true);

                repository.save(usuarioCorrespondiente);
                contadorActualizados--;

            }

        }

        if (contadorActualizados == 0) {
            return "se han actualizado todos";
        } else {
            return "no se han actualizado todos";
        }

    }

    @PutMapping("/disabled")
    public String desactivarUsuarios(@RequestParam List<Integer> user_id) {
        int id_actualizar;
        int contadorActualizados = user_id.size();
        for (int i = 0; i < user_id.size(); i++) {
            id_actualizar = user_id.get(i);

            if (repository.existsById(id_actualizar)) {//recorres la lista y si se encuentra lo actualizas
                Usuario usuarioCorrespondiente = repository.findById(id_actualizar).get();

                usuarioCorrespondiente.setEnabled(false);

                repository.save(usuarioCorrespondiente);
                contadorActualizados--;

            }

        }

        if (contadorActualizados == 0) {
            return "se han actualizado todos";
        } else {
            return "no se han actualizado todos";
        }

    }*/

}
