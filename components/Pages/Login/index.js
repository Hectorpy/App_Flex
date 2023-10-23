import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, Text, StyleSheet, TextInput, SafeAreaView, Alert, TouchableWithoutFeedback, Keyboard } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Feather from 'react-native-vector-icons/FontAwesome';
import Gicon from '../../img/google-icon.svg';
import Logo from '../../img/LogoFlex.svg';
import firebase from "../../firebase/firebaseConnection";
import Eye from '../../img/eye.svg';
import Eyeoff from '../../img/eye-off.svg';
import SetaEP from '../../img/SetaEP.svg';

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [userName, setUserName] = useState('');

  // Função para alternar a visibilidade da senha
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // UseEffect para carregar o nome do usuário a partir do Firebase
  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        firebase
          .database()
          .ref(`usuarios/${user.uid}/nome`)
          .once('value')
          .then((snapshot) => {
            const nome = snapshot.val();
            setUserName(nome);
          })
          .catch((error) => {
            console.error('Erro ao recuperar o nome do usuário:', error);
          });
      }
    });

    return unsubscribe; // Cancela a inscrição no Firebase quando o componente é desmontado
  }, []);

  // Função para efetuar o login
  async function logar() {
    await firebase
      .auth()
      .signInWithEmailAndPassword(email, pass)
      .then(() => {
        alert(`Bem-vindo: ${userName}`);
        navigation.navigate('TabNavigator');
      })
      .catch((error) => {
        if (error.code === 'auth/weak-password') {
          alert('Sua senha deve ter pelo menos 6 caracteres!')
          return;
        }
        if (error.code === 'auth/invalid-email') {
          alert('Email Inválido');
          setEmail('');
          return;
        } else {
          alert('Ops, algo deu errado!')
          return;
        }
      })
  };

  return (
    <TouchableWithoutFeedback style={{ flex: 1 }} onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <TouchableOpacity>
          <SetaEP style={{ color: '#000', height: 100 }} />
        </TouchableOpacity>
        <Logo style={{ top: -100 }} />
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
            <Eye  size={24} color="black" style={{top: -90, left: 130}}/>
          ) : (
            <Eyeoff name="eye" size={24} color="black" style={{top: -90, left: 130}}/>
          )}
        </TouchableOpacity>
        <View style={styles.linha}></View>
        <View style={styles.iconButtonsContainer}>
          <TouchableOpacity style={styles.iconButton}>
            <View style={styles.circleButton}>
              <Gicon />
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <View style={styles.circleButton}>
              <Feather name="apple" size={40} style={[styles.icons, { top: -2.7 }]} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <View style={styles.circleButton}>
              <Feather name="facebook" size={40} style={[styles.icons, { color: '#2271B3', top: -2.5 }]} />
            </View>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.btnsetaR} onPress={logar}>
          <Text style={{ fontSize: 20, fontFamily: 'Segoe UI Bold', color: 'white' }}>Entrar</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Cadastro')}>
          <Text>Não possui cadastro ?</Text>
        </TouchableOpacity>
        <Text style={{ fontSize: 15, color: 'grey', top: 115 }}>®Flex</Text>
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
    top: -30,
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
    top: -50
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
    top: -55
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
})