import React from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as firebase from 'firebase';

function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

class CadastroScreen extends React.Component {
    state = {
        nickname: "",
        email: "",
        senha: "",
        confirmarSenha: "",
        emailError: "",
        senhaError: "",
        confirmarSenhaError: "",
        cadastroError: "",
        passwordHidden: true,
        passwordIcon: 'eye',
        passwordHidden2: true,
        passwordIcon2: 'eye',
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
    changePassword2() {
        if (this.state.passwordHidden2)
        {
            this.setState({passwordIcon2: 'eye-slash'});
        }
        else
        {
            this.setState({passwordIcon2: 'eye'});
        }
        var passwordDummy = !this.state.passwordHidden2;
        this.setState({passwordHidden2: passwordDummy});
    }
    nicknameValidator() {
        if (this.state.nickname == "")
        {
            this.setState({nicknameError:"Nome de usuário não pode estar vazio!"});
            return false;
        }
        else if (this.state.nickname.length < 3)
        {
            this.setState({nicknameError:"Nome de usuário muito pequeno!"});
            return false;
        }
        else if (this.state.nickname.length > 16)
        {
            this.setState({nicknameError:"Nome de usuário muito grande!"});
            return false;
        }
        else
        {
            this.setState({nicknameError:""});
            return true;
        }
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
    confirmarSenhaValidator() {
        if (this.state.confirmarSenha != this.state.senha)
        {
            this.setState({confirmarSenhaError:"Senhas diferentes!"})
            return false;
        }
        else
        {
            this.setState({confirmarSenhaError:""});
            return true;
        }
    }
    Cadastro() {
        firebase
            .auth()
            .createUserWithEmailAndPassword(this.state.email, this.state.senha)
            .then(() => {
                firebase.firestore().collection('users').doc(this.state.email).set({
                    nickname: this.state.nickname
                });
                this.props.navigation.navigate("Login");
            })
            .catch(error => this.setState({cadastroError: error}));
    }
    render() {
        return (
            <View style={styles.container}>
                <Text style={{fontFamily: 'meriendaRegular', fontSize: 48, color: '#5B5B58'}}>Cadastro</Text>
                <View>
                    <Text style={{fontFamily: 'robotoThin', fontSize: 24, color: '#5B5B58'}}>Nome de usuário</Text>
                    <TextInput onChangeText={(text) => {this.setState({nickname: text})}} style={{height: 40, width: 230, borderColor: 'black', borderBottomWidth: 0.4, fontFamily: 'robotoThin', fontSize: 24, color: '#5B5B58',}}/>
                    <Text style={{fontFamily: 'robotoThin', color: '#A44',}}>{this.state.nicknameError}</Text>
                </View>
                <View>
                    <Text style={{fontFamily: 'robotoThin', fontSize: 24, color: '#5B5B58'}}>E-mail</Text>
                    <TextInput onChangeText={(text) => {this.setState({email: text})}} textContentType="emailAddress" style={{height: 40, width: 230, borderColor: 'black', borderBottomWidth: 0.4, fontFamily: 'robotoThin', fontSize: 24, color: '#5B5B58',}}/>
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
                </View>
                <View>
                    <Text style={{fontFamily: 'robotoThin', fontSize: 24, color: '#5B5B58'}}>Confirmar Senha</Text>
                    <View style={{flexWrap: 'wrap', alignItems: 'flex-start', flexDirection: 'row'}}>
                        <TextInput onChangeText={(text) => {this.setState({confirmarSenha: text})}} secureTextEntry={this.state.passwordHidden2} textContentType="password" style={{height: 40, width: 230, borderColor: 'black', borderBottomWidth: 0.4, fontFamily: 'robotoThin', fontSize: 24, color: '#5B5B58',}}/>
                        <View style={{marginLeft: 200, position: 'absolute'}}>
                            <TouchableOpacity onPress={() => this.changePassword2()}>
                                <Icon name={this.state.passwordIcon2} size={24} color="#5B5B58" style={{paddingBottom: 7, paddingTop: 8,}}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <Text style={{fontFamily: 'robotoThin', color: '#A44',}}>{this.state.confirmarSenhaError}</Text>
                </View>
                <View>
                    <TouchableOpacity onPress={() => { this.nicknameValidator(); this.emailValidator(); this.senhaValidator(); this.confirmarSenhaValidator(); if (this.nicknameValidator() && this.emailValidator() && this.senhaValidator() && this.confirmarSenhaValidator()) { this.Cadastro(); }}} style={{width: 230, backgroundColor: '#5B5B58', borderWidth: 10, borderColor: '#5B5B58', borderRadius: 1, alignItems: 'center',}}>
                        <Text style={{fontFamily: 'robotoThin', fontSize: 24, color: '#FFF',}}>Criar conta</Text>
                    </TouchableOpacity>
                    <Text style={{fontFamily: 'robotoThin', color: '#A44',}}>{this.state.cadastroError}</Text>
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
    return <CadastroScreen navigation={navigation}/>
}