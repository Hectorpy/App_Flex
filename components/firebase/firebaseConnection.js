// Importa a biblioteca Firebase e os módulos necessários (auth e database)
import firebase from "firebase/app";
import 'firebase/auth';
import 'firebase/database';

// Configuração do Firebase com as credenciais do projeto Firebase
let firebaseConfig = {
    apiKey: "AIzaSyBwsCzRYQRMjG3bSwp1rhoMShESS8fmnoE",
    authDomain: "flex-pi.firebaseapp.com",
    databaseURL: "https://flex-pi-default-rtdb.firebaseio.com",
    projectId: "flex-pi",
    storageBucket: "flex-pi.appspot.com",
    messagingSenderId: "945149941046",
    appId: "1:945149941046:web:c85085f770debd85324f97",
    measurementId: "G-EP6L4095BP"
};


// Verifica se o Firebase já foi inicializado em outra parte do código
if (!firebase.apps.length) {
    // Inicializa o Firebase com a configuração fornecida
    firebase.initializeApp(firebaseConfig);
}

// Exporta o objeto do Firebase configurado, que pode ser usado em outras partes do código
export default firebase;