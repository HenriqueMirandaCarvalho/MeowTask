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

    getTarefaById(id) {
        return new Promise(function (resolve, reject) {
            let tarefa = null;
            firebase.firestore()
                .collection("Tarefas")
                .doc(id)
                .get()
                .then(snapshot => {
                    tarefa = snapshot.data();

                    resolve(tarefa);
                })
                .catch(err => {
                    reject("Erro ao procurar tarefa!");
                });
        });
    }

    updateDescricaoTarefa(id, descricao) {
        return new Promise(function (resolve, reject) {
            let tarefa = null;
            firebase.firestore()
                .collection("Tarefas")
                .doc(id)
                .update({
                    descricao: descricao
                })
                .then(() => {
                    resolve();
                })
                .catch(err => {
                    reject("Erro ao atualizar tarefa!");
                });
        });
    }
}