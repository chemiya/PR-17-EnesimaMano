package prueba.prueba.controller;




import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import prueba.prueba.dto.UsuarioDTO;
import prueba.prueba.service.UsuarioManagementService;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping(value = "/usuarios")
public class UsuarioController {

    @Autowired
    private UsuarioManagementService service;

    @PostMapping(value = "/registrar")
    public ResponseEntity add(@RequestBody UsuarioDTO usuario){
        return new ResponseEntity(service.add(usuario), HttpStatus.OK);
    }

    @PostMapping(value = "/identificar")
    public ResponseEntity identificar(@RequestBody UsuarioDTO usuario){

        return new ResponseEntity(service.identificar(usuario), HttpStatus.OK);
    }

    @GetMapping(value = "/buscar/{id}")
    public ResponseEntity buscarPorId(@PathVariable String id){
        return new ResponseEntity(service.buscarPorId(id), HttpStatus.OK);
    }

    @PutMapping(value = "/editar/{id}")
    public ResponseEntity edit(@PathVariable String id, @RequestBody UsuarioDTO usuario){
        return new ResponseEntity(service.edit(id,usuario), HttpStatus.OK);
    }

    @PutMapping(value = "/editarFoto/{id}")
    public ResponseEntity editFotoUsuario(@PathVariable String id, @RequestBody UsuarioDTO usuario){
        return new ResponseEntity(service.editFotoUsuario(id,usuario), HttpStatus.OK);
    }


    /*
    @GetMapping(value = "/greet/{name}")
    public String greet(@PathVariable(value = "name") String name){
        return  "Hello, "+name;
    }

    @GetMapping(value = "/list")
    public ResponseEntity list(){
        return new ResponseEntity(service.list(), HttpStatus.OK);
    }

    @PostMapping(value = "/add")
    public ResponseEntity add(@RequestBody PostDTO post){
        return new ResponseEntity(service.add(post), HttpStatus.OK);
    }

    @PutMapping(value = "/{id}/update")
    public ResponseEntity edit(@PathVariable(value = "id") String id, @RequestBody PostDTO post){
        return new ResponseEntity(service.edit(id,post), HttpStatus.OK);
    }

    @DeleteMapping(value = "/{id}/delete")
    public ResponseEntity delete(@PathVariable(value = "id") String id){
        return  new ResponseEntity(service.delete(id), HttpStatus.OK);
    }*/

}
