import React from 'react';
import { Alert, StyleSheet, Text, TextInput, View, TouchableOpacity, StatusBar, AsyncStorage, DevSettings } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as firebase from 'firebase';

function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

class LoginScreen extends React.Component {
    state = {
        email: "",
        senha: "",
        emailError: "",
        senhaError: "",
        loginError: "",
        passwordHidden: true,
        passwordIcon: 'eye',
    }
    changePassword() {
        if (this.state.passwordHidden)
        {
            this.setState({passwordIcon: 'eye-slash'});
        }
        else
        {
            this.setState({passwordIcon: 'eye'});
        }
        var passwordDummy = !this.state.passwordHidden;
        this.setState({passwordHidden: passwordDummy});
    }
    emailValidator() {
        if (this.state.email == "")
        {
            this.setState({emailError:"E-mail não pode estar vazio!"});
            return false;
        }
        else if (!validateEmail(this.state.email))
        {
            this.setState({emailError:"E-mail inválido!"});
            return false;
        }
        else
        {
            this.setState({emailError:""});
            return true;
        }
    }
    senhaValidator() {
        if (this.state.senha == "")
        {
            this.setState({senhaError:"Senha não pode estar vazia!"})
            return false;
        }
        else if (this.state.senha.length < 8)
        {
            this.setState({senhaError:"Senha deve ter no mínimo 8 caracteres!"})
            return false;
        }
        else
        {
            this.setState({senhaError:""});
            return true;
        }
    }
    Login() {
        var nickname = "";
        firebase
            .auth()
            .signInWithEmailAndPassword(this.state.email, this.state.senha)
            .then(user => {
                AsyncStorage.setItem("email", this.state.email);
                AsyncStorage.setItem("senha", this.state.password);
                firebase.firestore().collection('users').doc(this.state.email).get().then(doc => {
                    AsyncStorage.setItem("nickname", doc.data().nickname);
                    this.forceUpdate();
                });
            })
            .catch(error => Alert.alert("Falha no Login", "Credenciais de login incorretas!", [{text:'OK'}], {cancelable: false}));
    }
    render() {
        AsyncStorage.getItem("nickname").then((item) => {
			if (item) {
                DevSettings.reload();
			}
		});
        return (
            <View style={styles.container}>
                <Text style={{fontFamily: 'meriendaRegular', fontSize: 64, color: '#5B5B58'}}>Login</Text>
                <View>
                    <Text style={{fontFamily: 'robotoThin', fontSize: 24, color: '#5B5B58'}}>E-mail</Text>
                    <TextInput onChangeText={(text) => {this.setState({email: text.toLowerCase()})}} textContentType="emailAddress" style={{height: 40, width: 230, borderColor: 'black', borderBottomWidth: 0.4, fontFamily: 'robotoThin', fontSize: 24, color: '#5B5B58',}}/>
                    <Text style={{fontFamily: 'robotoThin', color: '#A44',}}>{this.state.emailError}</Text>
                </View>
                <View>
                    <Text style={{fontFamily: 'robotoThin', fontSize: 24, color: '#5B5B58'}}>Senha</Text>
                    <View style={{flexWrap: 'wrap', alignItems: 'flex-start', flexDirection: 'row'}}>
                        <TextInput onChangeText={(text) => {this.setState({senha: text})}} secureTextEntry={this.state.passwordHidden} textContentType="password" style={{height: 40, width: 230, borderColor: 'black', borderBottomWidth: 0.4, fontFamily: 'robotoThin', fontSize: 24, color: '#5B5B58',}}/>
                        <View style={{marginLeft: 200, position: 'absolute'}}>
                            <TouchableOpacity onPress={() => this.changePassword()}>
                                <Icon name={this.state.passwordIcon} size={24} color="#5B5B58" style={{paddingBottom: 7, paddingTop: 8,}}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <Text style={{fontFamily: 'robotoThin', color: '#A44',}}>{this.state.senhaError}</Text>
                    <TouchableOpacity style={{marginLeft: 100,}}>
                        <Text style={{fontFamily: 'robotoThin', color: '#5B5B58',}}>Esqueci minha senha</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity onPress={() => { this.emailValidator(); this.senhaValidator(); if (this.emailValidator() && this.senhaValidator()) { this.Login(); }}} style={{width: 230, backgroundColor: '#5B5B58', borderWidth: 10, borderColor: '#5B5B58', borderRadius: 1, alignItems: 'center',}}>
                        <Text style={{fontFamily: 'robotoThin', fontSize: 24, color: '#FFF',}}>Entrar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Cadastro')} style={{marginTop: 10, width: 230, backgroundColor: 'transparent', borderWidth: 10, borderColor: 'transparent', borderRadius: 1, alignItems: 'center',}}>
                        <Text style={{fontFamily: 'robotoThin', fontSize: 24, color: '#5B5B58',}}>Criar conta</Text>
                    </TouchableOpacity>
                </View>
                <StatusBar translucent backgroundColor="#E6E2D6"/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
		backgroundColor: '#EAE6DA',
		justifyContent: 'space-evenly',
		alignItems: 'center',
	},
});

export default ({navigation}) => {
    return <LoginScreen navigation={navigation}/>
}