package prueba.prueba.service.impl;


import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.CollectionReference;
import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.Query;
import com.google.cloud.firestore.QuerySnapshot;
import com.google.cloud.firestore.WriteResult;

import prueba.prueba.dto.FavoritoDTO;
import prueba.prueba.dto.FotoDTO;
import prueba.prueba.dto.UsuarioDTO;
import prueba.prueba.firebase.FirebaseInitializer;
import prueba.prueba.service.FavoritoManagementService;
import prueba.prueba.service.FotoManagementService;
import prueba.prueba.service.UsuarioManagementService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ExecutionException;

@Service
public class FotoManagementServiceImpl implements FotoManagementService {

    @Autowired
    private FirebaseInitializer firebase;

    @Override
    public Boolean add(FotoDTO foto) {
        Map<String, Object> docData = getDocData(foto);

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
    public List<FotoDTO> buscarFotosAnuncio(String id) {
        List<FotoDTO> response = new ArrayList<>();
        FotoDTO fotoRecorrer;

        ApiFuture<QuerySnapshot> querySnapshotApiFuture = getCollection().whereEqualTo("idAnuncio", id).get();
        //ApiFuture<WriteResult> writeResultApiFuture = getCollection().document(id).get();


        try {
            for (DocumentSnapshot doc : querySnapshotApiFuture.get().getDocuments()) {
            fotoRecorrer = doc.toObject(FotoDTO.class);
            fotoRecorrer.setId(doc.getId());
                response.add(fotoRecorrer);
            
            
            }
            return response;
        } catch (Exception e) {
            return null;
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
    }


    /* 
    @Override
    public List<FavoritoDTO> comprobar(FavoritoDTO favorito) {
        List<FavoritoDTO> response = new ArrayList<>();
        FavoritoDTO favoritoRecorrer;

        ApiFuture<QuerySnapshot> querySnapshotApiFuture = getCollection().whereEqualTo("idUsuario", favorito.getIdUsuario()).whereEqualTo("idAnuncio", favorito.getIdAnuncio()).get();


        try {
            for (DocumentSnapshot doc : querySnapshotApiFuture.get().getDocuments()) {
                favoritoRecorrer = doc.toObject(FavoritoDTO.class);
                favoritoRecorrer.setId(doc.getId());
                response.add(favoritoRecorrer);
            }
            return response;
        } catch (Exception e) {
            return null;
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
    }

   

 
    /*
    @Override
    public List<UsuarioDTO> identificar(UsuarioDTO usuario) {
        List<UsuarioDTO> response = new ArrayList<>();
        UsuarioDTO usuarioRecorrer;

        ApiFuture<QuerySnapshot> querySnapshotApiFuture = getCollection().whereEqualTo("username", usuario.getUsername()).get();


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
        return firebase.getFirestore().collection("fotos");
    }

    private Map<String, Object> getDocData(FotoDTO foto) {
        Map<String, Object> docData = new HashMap<>();
        docData.put("ruta", foto.getRuta());
        docData.put("idAnuncio", foto.getIdAnuncio());
        
        
        return docData;
    }
}
