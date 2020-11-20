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
        return new Promise(function (resolve, reject) {
            firebase.auth().signInWithEmailAndPassword(usuario.getEmail(), usuario.getSenha())
                .then((obj) => {
                    resolve(obj);
                })
                .catch(error => {
                    switch (error.code) {
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
        return new Promise(function (resolve, reject) {
            firebase.auth().sendPasswordResetEmail(usuario.getEmail())
                .then((obj) => {
                    resolve(obj);
                })
                .catch(error => {
                    switch (error.code) {
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
        return new Promise(function (resolve, reject) {
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
        return new Promise(function (resolve, reject) {
            firebase.auth().createUserWithEmailAndPassword(usuario.getEmail(), usuario.getSenha())
                .then(userData => {
                    resolve(userData);
                })
                .catch(error => {
                    switch (error.code) {
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
        return new Promise(function (resolve, reject) {
            if (firebase.auth().currentUser) {
                resolve("ListaGrupos");
            }
            else {
                resolve("Inicio");
            }
        });
    }

    getUserInfo() {
        return new Promise(function (resolve, reject) {
            firebase.auth().onAuthStateChanged((user) => {
                if (user == null) {
                    reject();
                }
                else {
                    let usuario = firebase.auth().currentUser;
                    firebase.firestore()
                        .collection("Usuarios")
                        .where('email', '==', usuario.email)
                        .get().then(snapshot => {
                            snapshot.forEach(obj => {
                                usuario.username = obj.data().username;
                                usuario.imagem = obj.data().imagem;
                            });
                            resolve(usuario);
                        });
                }
            });
        });
    }

    getGruposByUserId() {
        return new Promise(function (resolve, reject) {
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
                        let grupo = doc.data();
                        grupo.id = doc.id;
                        grupos.push(grupo);
                    });

                    resolve(grupos);
                })
                .catch(err => {
                    reject("Erro ao procurar grupos!");
                });
        });
    }

    cadastrarGrupo(grupo) {
        return new Promise(function (resolve, reject) {
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

    getGrupoById(id) {
        return new Promise(function (resolve, reject) {
            let grupo = null;
            firebase.firestore()
                .collection("Grupos")
                .doc(id)
                .get()
                .then(snapshot => {
                    grupo = snapshot.data();

                    resolve(grupo);
                })
                .catch(err => {
                    reject("Erro ao procurar grupo!");
                });
        });
    }

    getPostItsByGrupoId(id) {
        return new Promise(function (resolve, reject) {
            let postIts = [];
            firebase.firestore()
                .collection("PostIts")
                .where('grupo', '==', id)
                .get()
                .then(snapshot => {
                    if (snapshot.empty) {
                        resolve(postIts);
                    }
                    snapshot.forEach(doc => {
                        let postIt = doc.data();
                        postIt.id = doc.id;
                        postIts.push(postIt);
                    });

                    resolve(postIts);
                })
                .catch(err => {
                    reject("Erro ao procurar Post-Its!");
                });
        });
    }

    deleteDocFromCollection(docId, collec) {
        return new Promise(function (resolve, reject) {
            firebase.firestore()
                .collection(collec)
                .doc(docId)
                .delete()
                .then(() => resolve());
        });
    }

    criarPostIt(idGrupo) {
        return new Promise(function (resolve, reject) {
            firebase.firestore()
                .collection("PostIts")
                .add({
                    descricao: "",
                    usuario: firebase.auth().currentUser.uid,
                    grupo: idGrupo
                })
                .then((data) => {
                    resolve(data);
                });
        });
    }

    alterarPostIt(id, descricao) {
        return new Promise(function (resolve, reject) {
            firebase.firestore()
                .collection("PostIts")
                .doc(id)
                .update({
                    descricao: descricao
                })
                .then(() => {
                    resolve();
                })
                .catch(() => {
                    reject("Este Post It não existe mais!");
                });
        });
    }

    entrarGrupo(id) {
        return new Promise(function (resolve, reject) {
            let grupo = null;
            firebase.firestore()
                .collection("Grupos")
                .doc(id)
                .get()
                .then(snapshot => {
                    grupo = snapshot.data();
                    if (grupo.membros.includes(firebase.auth().currentUser.uid)) {
                        reject("Você já está nesse grupo!");
                    }
                    else {
                        grupo.membros.push(firebase.auth().currentUser.uid);
                        firebase.firestore()
                            .collection("Grupos")
                            .doc(id)
                            .update({
                                membros: grupo.membros
                            })
                            .then(() => {
                                resolve();
                            });
                    }
                })
                .catch(err => {
                    reject("Grupo não encontrado!");
                });
        });
    }

    getTarefasByGrupoId(id) {
        return new Promise(function (resolve, reject) {
            let tarefas = [];
            firebase.firestore()
                .collection("Tarefas")
                .where('grupo', '==', id)
                .get()
                .then(snapshot => {
                    if (snapshot.empty) {
                        resolve(tarefas);
                    }
                    snapshot.forEach(doc => {
                        let tarefa = doc.data();
                        tarefa.id = doc.id;
                        tarefas.push(tarefa);
                    });

                    resolve(tarefas);
                })
                .catch(err => {
                    reject("Erro ao procurar tarefas!");
                });
        });
    }

    getAmigosByUserId() {
        return new Promise(function (resolve, reject) {
            let amigos = [];
            firebase.firestore()
                .collection("Usuarios")
                .doc(firebase.auth().currentUser.uid)
                .get()
                .then(snapshot => {
                    let usuario = snapshot.data();
                    let amigosCarregados = 0;
                    let totalAmigos = usuario.amigos.length;
                    usuario.amigos.forEach(friend => {
                        firebase.firestore()
                            .collection("Usuarios")
                            .doc(friend)
                            .get()
                            .then(doc => {
                                let amigo = doc.data();
                                amigo.id = friend;
                                amigos.push(amigo);
                                amigosCarregados++;
                                if (amigosCarregados == totalAmigos) {
                                    resolve(amigos);
                                }
                            })
                            .catch(err => {
                                reject("Erro ao procurar amigos!");
                            });
                    });
                })
                .catch(err => {
                    reject("Erro ao procurar amigos!");
                });
        });
    }
}