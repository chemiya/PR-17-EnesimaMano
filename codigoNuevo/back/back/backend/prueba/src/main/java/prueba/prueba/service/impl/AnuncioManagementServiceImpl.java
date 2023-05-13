package prueba.prueba.service.impl;


import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.CollectionReference;
import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.Query;
import com.google.cloud.firestore.QuerySnapshot;
import com.google.cloud.firestore.WriteResult;

import prueba.prueba.dto.AnuncioDTO;
import prueba.prueba.dto.FavoritoDTO;
import prueba.prueba.dto.MiniaturaDTO;
import prueba.prueba.dto.UsuarioDTO;
import prueba.prueba.firebase.FirebaseInitializer;
import prueba.prueba.service.AnuncioManagementService;
import prueba.prueba.service.UsuarioManagementService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ExecutionException;

@Service
public class AnuncioManagementServiceImpl implements AnuncioManagementService {

    @Autowired
    private FirebaseInitializer firebase;

    @Override
    public Boolean add(AnuncioDTO anuncio) {
        Map<String, Object> docData = getDocData(anuncio);

      

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
    public List<AnuncioDTO> buscar() {
        List<AnuncioDTO> response = new ArrayList<>();
        AnuncioDTO anuncio;

        ApiFuture<QuerySnapshot> querySnapshotApiFuture = getCollection().get();
        try {
            for (DocumentSnapshot doc : querySnapshotApiFuture.get().getDocuments()) {
                anuncio = doc.toObject(AnuncioDTO.class);
                anuncio.setId(doc.getId());
                response.add(anuncio);
            }
            return response;
        } catch (Exception e) {
            return null;
        }
    }

    @Override
    public List<AnuncioDTO> buscarDeUsuario(String id) {
        List<AnuncioDTO> response = new ArrayList<>();
        AnuncioDTO anuncio;

        ApiFuture<QuerySnapshot> querySnapshotApiFuture = getCollection().whereEqualTo("idUsuario", id).get();


        try {
            for (DocumentSnapshot doc : querySnapshotApiFuture.get().getDocuments()) {
                anuncio = doc.toObject(AnuncioDTO.class);
                anuncio.setId(doc.getId());
                response.add(anuncio);
            }
            return response;
        } catch (Exception e) {
            return null;
        }
    }


    
    @Override
    public Boolean edit(String id, AnuncioDTO anuncio) {
        Map<String, Object> docData = getDocData(anuncio);
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
    public Boolean actualizarMiniatura(String id, MiniaturaDTO miniatura) {
      
        ApiFuture<WriteResult> writeResultApiFuture = getCollection().document(id).update("miniatura", miniatura.getMiniatura());
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
    public List<AnuncioDTO> buscarPorId(String id) {
        List<AnuncioDTO> response = new ArrayList<>();
        AnuncioDTO anuncioRecorrer;

        ApiFuture<DocumentSnapshot> querySnapshotApiFuture = getCollection().document(id).get();
        //ApiFuture<WriteResult> writeResultApiFuture = getCollection().document(id).get();


        try {
            DocumentSnapshot doc = querySnapshotApiFuture.get();
            anuncioRecorrer = doc.toObject(AnuncioDTO.class);
            anuncioRecorrer.setId(doc.getId());
                response.add(anuncioRecorrer);
            
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


    
    @Override
    public List<AnuncioDTO> anuncioCompleto(AnuncioDTO anuncio) {
        List<AnuncioDTO> response = new ArrayList<>();
        AnuncioDTO anuncioRecorrer;

        ApiFuture<QuerySnapshot> querySnapshotApiFuture = getCollection().whereEqualTo("datosEnvio", anuncio.getDatosEnvio()).whereEqualTo("descripcion", anuncio.getDescripcion()).whereEqualTo("titulo", anuncio.getTitulo()).whereEqualTo("precio", anuncio.getPrecio()).whereEqualTo("idUsuario", anuncio.getIdUsuario()).get();


        try {
            for (DocumentSnapshot doc : querySnapshotApiFuture.get().getDocuments()) {
                anuncioRecorrer = doc.toObject(AnuncioDTO.class);
                anuncioRecorrer.setId(doc.getId());
                response.add(anuncioRecorrer);
            }
            return response;
        } catch (Exception e) {
            return null;
        }
    }

  

 
   /*  @Override
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
    }*/


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
        return firebase.getFirestore().collection("anuncios");
    }

    private Map<String, Object> getDocData(AnuncioDTO anuncio) {
        Map<String, Object> docData = new HashMap<>();
        docData.put("titulo", anuncio.getTitulo());
        docData.put("descripcion", anuncio.getDescripcion());
        docData.put("precio", anuncio.getPrecio());
        docData.put("datosEnvio", anuncio.getDatosEnvio());
        docData.put("idUsuario", anuncio.getIdUsuario());
        docData.put("miniatura", anuncio.getMiniatura());
       
        
        return docData;
    }
}
