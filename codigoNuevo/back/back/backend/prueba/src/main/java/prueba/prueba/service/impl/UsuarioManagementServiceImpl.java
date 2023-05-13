package prueba.prueba.service.impl;


import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.CollectionReference;
import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.Query;
import com.google.cloud.firestore.QuerySnapshot;
import com.google.cloud.firestore.WriteResult;

import prueba.prueba.dto.UsuarioDTO;
import prueba.prueba.firebase.FirebaseInitializer;

import prueba.prueba.service.UsuarioManagementService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ExecutionException;

@Service
public class UsuarioManagementServiceImpl implements UsuarioManagementService {

    @Autowired
    private FirebaseInitializer firebase;

    @Override
    public Boolean add(UsuarioDTO usuario) {
      
        Map<String, Object> docData = getDocData(usuario);

        ApiFuture<WriteResult> writeResultApiFuture = getCollection().document().create(docData);

        try {
            if(null != writeResultApiFuture.get()){
                return Boolean.TRUE;
            }
            return Boolean.FALSE;
        } catch (Exception e) {
            return Boolean.FALSE;
        }
    }

 
    @Override
    public List<UsuarioDTO> identificar(UsuarioDTO usuario) {
        List<UsuarioDTO> response = new ArrayList<>();
        UsuarioDTO usuarioRecorrer;

        ApiFuture<QuerySnapshot> querySnapshotApiFuture = getCollection().whereEqualTo("username", usuario.getUsername()).whereEqualTo("password", usuario.getPassword()).get();


        try {
            for (DocumentSnapshot doc : querySnapshotApiFuture.get().getDocuments()) {
                usuarioRecorrer = doc.toObject(UsuarioDTO.class);
                usuarioRecorrer.setId(doc.getId());
                response.add(usuarioRecorrer);
            }
            return response;
        } catch (Exception e) {
            return null;
        }
    }

    @Override
    public List<UsuarioDTO> buscarPorId(String id) {
        List<UsuarioDTO> response = new ArrayList<>();
        UsuarioDTO usuarioRecorrer;

        ApiFuture<DocumentSnapshot> querySnapshotApiFuture = getCollection().document(id).get();
        //ApiFuture<WriteResult> writeResultApiFuture = getCollection().document(id).get();


        try {
            DocumentSnapshot doc = querySnapshotApiFuture.get();
                usuarioRecorrer = doc.toObject(UsuarioDTO.class);
                usuarioRecorrer.setId(doc.getId());
                response.add(usuarioRecorrer);
            
            return response;
        } catch (Exception e) {
            return null;
        }
    }

    @Override
    public Boolean edit(String id, UsuarioDTO usuario) {
        Map<String, Object> docData = getDocData(usuario);
        ApiFuture<WriteResult> writeResultApiFuture = getCollection().document(id).set(docData);
        
        try {
            if(null != writeResultApiFuture.get()){
                return Boolean.TRUE;
            }
            return Boolean.FALSE;
        } catch (Exception e) {
            return Boolean.FALSE;
        }
    }

    @Override
    public Boolean editFotoUsuario(String id, UsuarioDTO usuario) {
        Map<String, Object> docData = getDocData(usuario);
        System.out.println(usuario.getFotoRuta());
        ApiFuture<WriteResult> writeResultApiFuture = getCollection().document(id).update("fotoRuta",usuario.getFotoRuta());
        
        try {
            if(null != writeResultApiFuture.get()){
                return Boolean.TRUE;
            }
            return Boolean.FALSE;
        } catch (Exception e) {
            return Boolean.FALSE;
        }
    }


    /* 
    @Override
    public List<PostDTO> list() {
        List<PostDTO> response = new ArrayList<>();
        PostDTO post;

        ApiFuture<QuerySnapshot> querySnapshotApiFuture = getCollection().get();
        try {
            for (DocumentSnapshot doc : querySnapshotApiFuture.get().getDocuments()) {
                post = doc.toObject(PostDTO.class);
                post.setId(doc.getId());
                response.add(post);
            }
            return response;
        } catch (Exception e) {
            return null;
        }
    }

    @Override
    public Boolean add(PostDTO post) {
        Map<String, Object> docData = getDocData(post);

        ApiFuture<WriteResult> writeResultApiFuture = getCollection().document().create(docData);

        try {
            if(null != writeResultApiFuture.get()){
                return Boolean.TRUE;
            }
            return Boolean.FALSE;
        } catch (Exception e) {
            return Boolean.FALSE;
        }
    }


    @Override
    public Boolean edit(String id, PostDTO post) {
        Map<String, Object> docData = getDocData(post);
        ApiFuture<WriteResult> writeResultApiFuture = getCollection().document(id).set(docData);
        try {
            if(null != writeResultApiFuture.get()){
                return Boolean.TRUE;
            }
            return Boolean.FALSE;
        } catch (Exception e) {
            return Boolean.FALSE;
        }
    }

    @Override
    public Boolean delete(String id) {
        ApiFuture<WriteResult> writeResultApiFuture = getCollection().document(id).delete();
        try {
            if(null != writeResultApiFuture.get()){
                return Boolean.TRUE;
            }
            return Boolean.FALSE;
        } catch (Exception e) {
            return Boolean.FALSE;
        }
    }*/

    private CollectionReference getCollection() {
        return firebase.getFirestore().collection("usuarios");
    }

    private Map<String, Object> getDocData(UsuarioDTO usuario) {
        Map<String, Object> docData = new HashMap<>();
        docData.put("username", usuario.getUsername());
        docData.put("ubicacion", usuario.getUbicacion());
        docData.put("password", usuario.getPassword());
        docData.put("telefono", usuario.getTelefono());
        docData.put("email", usuario.getEmail());
        docData.put("nombre", usuario.getNombre());
        docData.put("fotoRuta","https://firebasestorage.googleapis.com/v0/b/fir-db-for-spring-boot-76fd9.appspot.com/o/NOBORRAR%2Fgenerico.png?alt=media&token=451dbad4-a3e5-42cd-abdc-2bf496dc2de0");
        
        return docData;
    }
}
