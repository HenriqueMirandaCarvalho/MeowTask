import { Alert } from "react-native";
import * as firebase from 'firebase';
import '@firebase/firestore';
import '@firebase/auth';

export default class Conexao {
    constructor() {
        if (!firebase.apps.length) {
            var firebaseConfig = {
                apiKey: "AIzaSyApt9TUJkguD9IDJ2LmU4ReiqF06hPLH4o",
                authDomain: "meowtask-ea038.firebaseapp.com",
                databaseURL: "https://meowtask-ea038.firebaseio.com",
                projectId: "meowtask-ea038",
                storageBucket: "meowtask-ea038.appspot.com",
                messagingSenderId: "256053222242",
                appId: "1:256053222242:web:92e7b03603d6674e2d2a3b",
                measurementId: "G-FJH8MESQTJ"
            };
            firebase.initializeApp(firebaseConfig);
        }
    }

    entrarUsuario(usuario) {
        return new Promise(function(resolve, reject) {
            firebase.auth().signInWithEmailAndPassword(usuario.getEmail(), usuario.getSenha())
            .then((obj) => {
                resolve(obj);
            })
            .catch(error => {
                switch(error.code)
                {
                    case "auth/invalid-email":
                        Alert.alert("Erro", "Email inválido!");
                        break;
                    case "auth/user-disabled":
                        Alert.alert("Erro", "Usuário desabilitado!");
                        break;
                    case "auth/user-not-found":
                        Alert.alert("Erro", "Usuário não encontrado!");
                        break;
                    case "auth/wrong-password":
                        Alert.alert("Erro", "Senha incorreta!");
                        break;
                    case "auth/too-many-requests":
                        Alert.alert("Erro", "Muitas tentativas!");
                        break;
                    default:
                        Alert.alert("Erro", "Erro desconhecido! (código do erro: " + error.code + ")");
                        break;
                }
            });
        });
    }

    esqueciUsuario(usuario) {
        return new Promise(function(resolve, reject) {
            firebase.auth().sendPasswordResetEmail(usuario.getEmail())
            .then((obj) => {
                resolve(obj);
            })
            .catch(error => {
                switch(error.code)
                {
                    case "auth/invalid-email":
                        Alert.alert("Erro", "Email inválido!");
                        break;
                    case "auth/user-not-found":
                        Alert.alert("Erro", "Usuário não encontrado!");
                        break;
                    case "auth/too-many-requests":
                        Alert.alert("Erro", "Muitas tentativas!");
                        break;
                    default:
                        Alert.alert("Erro", "Erro desconhecido! (código do erro: " + error.code + ")");
                        break;
                }
            });
        });
    }

    cadastrarUsuario(usuario, userData) {
        return new Promise(function(resolve, reject) {
            firebase.firestore()
            .collection('Usuarios')
            .doc(userData.user.uid)
            .set({
                email: usuario.getEmail(),
                username: usuario.getNome(),
                imagem: "1",
                amigos: []
            })
            .then((data) => {
                userData.user.sendEmailVerification();
                resolve(data);
            });
        });
    }

    criarUsuario(usuario) {
        return new Promise(function(resolve, reject) {
            firebase.auth().createUserWithEmailAndPassword(usuario.getEmail(), usuario.getSenha())
            .then(userData => {
                resolve(userData);
            })
            .catch(error => {
                switch(error.code)
                {
                    case "auth/email-already-in-use":
                        Alert.alert("Erro", "Email já está em uso!");
                        break;
                    case "auth/invalid-email":
                        Alert.alert("Erro", "Email inválido!");
                        break;
                    case "auth/operation-not-allowed":
                        Alert.alert("Erro", "Operação não permitida!");
                        break;
                    case "auth/weak-password":
                        Alert.alert("Erro", "Senha fraca!");
                        break;
                    default:
                        Alert.alert("Erro", "Erro desconhecido! (código do erro: " + error.code + ")");
                        break;
                }
            });
        });
    }

    checkLogin() {
        return new Promise(function(resolve, reject) {
            if (firebase.auth().currentUser) {
                resolve("ListaGrupos");
            }
            else {
                resolve("Inicio");
            }
        });
    }

    getUser() {
        return new Promise(function(resolve, reject) {
            if (!firebase.auth().currentUser) {
                reject();
            }
            let usuarioAtual = [];
            usuarioAtual[0] = firebase.auth().currentUser;
            firebase.firestore()
            .collection("Usuarios")
            .where('email', '==', usuarioAtual[0].email)
            .get().then(snapshot => {
                snapshot.forEach(obj => {
                    usuarioAtual[1] = obj.data();
                });
                resolve(usuarioAtual);
            });
        });
    }

    getGruposByUserId() {
        return new Promise(function(resolve, reject) {
            let grupos = [];
            firebase.firestore()
            .collection("Grupos")
            .where('membros', 'array-contains', firebase.auth().currentUser.uid)
            .get()
            .then(snapshot => {
                if (snapshot.empty) {
                    resolve(grupos);
                }
                snapshot.forEach(doc => {
                    grupos.push(doc.data());
                });

                resolve(grupos);
            })
            .catch(err => {
                reject("Erro ao procurar grupos!");
            });
        });
    }

    cadastrarGrupo(grupo) {
        return new Promise(function(resolve, reject) {
            firebase.firestore()
            .collection('Grupos')
            .add({
                nome: grupo.getNome(),
                imagem: grupo.getImagem(),
                membros: [firebase.auth().currentUser.uid]
            })
            .then((data) => {
                resolve(data);
            });
        });
    }
}