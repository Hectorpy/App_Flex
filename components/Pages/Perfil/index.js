import React, { useEffect, useState } from "react";
import { View, Text, SafeAreaView, Image, StyleSheet, TouchableOpacity } from "react-native";
import firebase from "../../firebase/firebaseConnection";

export default function Perfil() {
  const [userName, setUserName] = useState('');

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

  return (
    <SafeAreaView>
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity>
          <Image
            source={require("../../img/SemFoto.png")}
            style={styles.semFoto}
          />
        </TouchableOpacity>
        <Text style={{ fontSize: 20, fontFamily: 'Segoe UI Bold', top: 66, left: 60 }}>{userName}</Text>
      </View>
      <TouchableOpacity style={styles.btns}>
        <Text style={styles.textBtn}>Editar Perfil:</Text>
      </TouchableOpacity>
      <View style={styles.linha}></View>
      <TouchableOpacity style={styles.btns}>
        <Text style={styles.textBtn}>Histórico de Compras</Text>
      </TouchableOpacity>
      <View style={styles.linha}></View>
      <TouchableOpacity style={styles.btns}>
        <Text style={styles.textBtn}>Rastreamento</Text>
      </TouchableOpacity>
      <View style={styles.linha}></View>
      <TouchableOpacity style={styles.btns}>
        <Text style={styles.textBtn}>Mudar para Produtor</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  semFoto: {
    width: 97,
    height: 97,
    borderWidth: 1,
    borderColor: '#25985C',
    borderRadius: 97 / 2,
    left: 33,
    top: 39
  },
  linha: {
    height: 1,
    width: 329,
    backgroundColor: 'black',
    top: 120,
    left: 40
  },
  textBtn: {
    fontSize: 20,
    fontFamily: 'Segoe UI Bold',
    padding: 30,
  },
  btns: {
    top: 120,
    left: 40
  }
})