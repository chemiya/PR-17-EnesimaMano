package prueba.prueba.firebase;



import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.firestore.Firestore;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.cloud.FirestoreClient;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;

@Service
public class FirebaseInitializer {

    @PostConstruct
    private  void  iniFirestore() throws IOException {

       // InputStream serviceAccount = getClass().getClassLoader().getResourceAsStream("C:/Users/chema/Desktop/formacionPracticar/ZZZAPLICACION_WALLAPOP/codigoNuevo/back/prueba/prueba/prueba/src/main/java/prueba/prueba/firebase/private.json");
        FileInputStream serviceAccount =new FileInputStream("C:/Users/chema/Desktop/formacionPracticar/ZZZAPLICACION_WALLAPOP/codigoNuevo/back/back/backend/prueba/src/main/java/prueba/prueba/firebase/private.json");
        FirebaseOptions options = new FirebaseOptions.Builder()
                .setCredentials(GoogleCredentials.fromStream(serviceAccount))
                .build();

        if(FirebaseApp.getApps().isEmpty()){
            FirebaseApp.initializeApp(options);
        }
    }

    public Firestore getFirestore(){
        return FirestoreClient.getFirestore();
    }
}
