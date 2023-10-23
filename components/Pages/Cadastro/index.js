import React, { useState, useEffect } from "react";
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import * as Facebook from 'expo-auth-session/providers/facebook';
import { View, TouchableOpacity, Text, StyleSheet, TextInput, SafeAreaView, Alert, TouchableWithoutFeedback, Keyboard, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Feather from 'react-native-vector-icons/FontAwesome';
import SetaR from '../../img/SetaR.svg';
import Gicon from '../../img/google-icon.svg';
import Logo from '../../img/LogoFlex.svg';
import firebase from "../../firebase/firebaseConnection";
import Home from "../Home";
import Login from "../Login";
import { Platform } from 'react-native'
import * as AppleAuthentication from 'expo-apple-authentication'
import Eye from '../../img/eye.svg';
import Eyeoff from '../../img/eye-off.svg';

WebBrowser.maybeCompleteAuthSession();

export function Auth() {
  const navigation = useNavigation();
  if (Platform.OS === 'ios')
    return (
      <AppleAuthentication.AppleAuthenticationButton
        buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
        buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
        cornerRadius={5}
        style={{ width: 200, height: 64 }}
        onPress={async () => {
          try {
            const credential = await AppleAuthentication.signInAsync({
              requestedScopes: [
                AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                AppleAuthentication.AppleAuthenticationScope.EMAIL,
              ],
            })
            // Sign in via Supabase Auth.
            if (credential.identityToken) {
              const {
                error,
                data: { user },
              } = await supabase.auth.signInWithIdToken({
                provider: 'apple',
                token: credential.identityToken,
              })
              console.log(JSON.stringify({ error, user }, null, 2))
              if (!error) {
                // Se o login for bem-sucedido, faça alguma coisa
              }
            } else {
              throw new Error('No identityToken.')
            }
          } catch (e) {
            if (e.code === 'ERR_REQUEST_CANCELED') {
              // Manipule o cancelamento do fluxo de login
            } else {
              // Manipule outros erros
            }
          }
        }}
      />
    )
  return <>{/* Implemente opções de autenticação no Android. */}</>
}

export default function Cadastro() {
  const [showPassword, setShowPassword] = useState(false);
  const [accesToken, setAcessToken] = useState(null);
  const [request2, response2, promptAsync2] = Facebook.useAuthRequest({
    clientId: "871397000994223"
  });
  const [user, setUser] = useState(null);
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId: "82890792665-ontj3eb4rj1lvam6kfr3p9gmoes7f8hl.apps.googleusercontent.com",
    iosClientId: "817056137785-ki3lncu0cm25j94u00i69bn4arua9fdk.apps.googleusercontent.com",
    androidClientId: "817056137785-35qun78nnkb68a7o6npoftjm9qacdpj1.apps.googleusercontent.com"
  });
  const navigation = useNavigation();
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    if (response2 && response2.type === 'success' && response2.authentication) {
      (async () => {
        const userInfoResponse = await fetch(
          `https://graph.facebook.com/me?access_token=${response2.authentication.accessToken}&fields=id,name,picture.type(large)`
        );
        const userInfo = await userInfoResponse.json();
        setUser(userInfo);
      })();
    }
  }, [response2]);

  const handlePressAsync = async () => {
    const result = await promptAsync2();
    if (result.type !== 'success') {
      alert("Algo deu errado");
      return;
    }
  };
  useEffect(() => {
    if (response?.type == "success") {
      setAcessToken(response.authentication.accessToken);
      accesToken && fetchUserInfo();
    }
  }, [response, accesToken]);

  async function fetchUserInfo() {
    let response = await fetch("https://www.googleapis.com/userinfo/v2/me", {
      headers: { Authorization: `Bearer ${accesToken}` }
    });
    const userinfo = await response.json();
    setUser(userinfo);
  }

  const ShowUserInfo = () => {
    // Exibir informações do usuário
  }

  async function navegarParaHome() {
    await firebase.auth().createUserWithEmailAndPassword(email, pass)
      .then((value) => {
        firebase.database().ref('usuarios').child(value.user.uid).set({
          nome: nome
        })
        navigation.navigate('Login')
        alert('Conta Cadastrada com Sucesso!')
      })
      .catch((error) => {
        if (error.code === 'auth/weak-password') {
          alert('Sua senha deve ter pelo menos 6 caracteres!')
          setPass('');
          return;
        }
        if (error.code === 'auth/email-already-in-use') {
          alert('Este endereço de e-mail já está em uso. Tente fazer login em vez disso.');
          setEmail('');
          return;
        }
        if (error.code === 'auth/operation-not-allowed') {
          alert('A criação de novos usuários não está permitida no momento. Entre em contato com o suporte.');
          setEmail('');
          setPass('');
          return;
        }
        if (error.code === 'auth/network-request-failed') {
          alert('Houve um problema de conexão com a rede. Verifique sua conexão e tente novamente.');
          return;
        }
        if (!/[A-Z]/.test(pass)) {
          alert('A senha deve conter pelo menos uma letra maiúscula.');
          setPass('');
          return;
        }
        if (error.code === 'auth/invalid-email') {
          alert('Email Inválido');
          setEmail('');
          return;
        }
      })
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <Logo style={{ top: -70 }} />
        <TextInput
          placeholder="Digite seu nome"
          placeholderTextColor='#707070'
          style={styles.inputs}
          onChangeText={(texto) => setNome(texto)}
          value={nome}
        />
        <TextInput
          placeholder="Digite seu e-mail"
          placeholderTextColor='#707070'
          style={styles.inputs}
          onChangeText={(texto) => setEmail(texto)}
          value={email}
        />

        <TextInput
          placeholder="Digite sua senha"
          placeholderTextColor='#707070'
          style={styles.inputs}
          onChangeText={(texto) => setPass(texto)}
          value={pass}
          secureTextEntry={!showPassword}
        />
        <TouchableOpacity onPress={togglePasswordVisibility}>
          {showPassword ? (
            <Eye size={24} color="black" style={{ top: -81, left: 130 }} />
          ) : (
            <Eyeoff name="eye" size={24} color="black" style={{ top: -81, left: 130 }} />
          )}
        </TouchableOpacity>
        <View style={styles.linha}></View>
        <View style={styles.iconButtonsContainer}>
          <TouchableOpacity style={styles.iconButton} onPress={() => {
            promptAsync();
          }}>
            <View style={styles.circleButton}>
              <Gicon />
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <View style={styles.circleButton}>
              <Feather name="apple" size={40} style={[styles.icons, { top: -2.7 }]} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton} onPress={handlePressAsync}>
            <View style={styles.circleButton}>
              <Feather name="facebook" size={40} style={[styles.icons, { color: '#2271B3', top: -2.5 }]} />
            </View>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.btnsetaR} onPress={navegarParaHome}>
          <Text style={{ fontSize: 20, fontFamily: 'Segoe UI Bold', color: 'white' }}>Cadastrar</Text>
        </TouchableOpacity>
        <Text style={{ top: 75, fontSize: 15, color: 'grey', top: 70 }}>®Flex</Text>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
    alignItems: 'center',
    justifyContent: 'center'
  },
  inputs: {
    width: 326,
    height: 67,
    borderColor: '#000',
    padding: 20,
    top: -20,
    marginBottom: 15,
    backgroundColor: '#CCCC',
    fontFamily: 'Segoe UI Bold',
    fontSize: 15,
  },
  iconButtonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    top: -35
  },
  iconButton: {
    margin: 10,
  },
  circleButton: {
    width: 55,
    height: 55,
    borderRadius: 55 / 2,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icons: {
    padding: 10,
  },
  linha: {
    height: 1,
    width: 320,
    backgroundColor: 'black',
    top: -47
  },
  btnsetaR: {
    width: 326,
    height: 70,
    backgroundColor: "#000",
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    top: -10,
    borderRadius: 25
  }
});