import React from "react";
import { SafeAreaView, StyleSheet, Text, TouchableOpacity } from "react-native";
import Logo from '../../img/LogoFlex.svg';
import { useNavigation } from "@react-navigation/native";

export default function Entrar() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      {/* Botão para navegar para a tela de login */}
      <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('Login')}>
        <Text style={styles.textBtn}>Fazer Login</Text>
      </TouchableOpacity>

      {/* Botão para navegar para a tela de cadastro */}
      <TouchableOpacity style={styles.btn2} onPress={() => navigation.navigate('Cadastro')}>
        <Text style={styles.textBtn2}>Fazer Cadastro</Text>
      </TouchableOpacity>

      {/* Componente de logotipo */}
      <Logo style={{ top: -50, marginLeft: 4, alignSelf: 'center', justifyContent: 'center', alignItems: 'center' }} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
    alignItems: 'center',
    justifyContent: 'center'
  },
  btn: {
    top: 350,
    alignSelf: 'center',
    width: 326,
    height: 83,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000000',
    borderRadius: 35,
    marginTop: 15
  },
  btn2: {
    top: 350,
    alignSelf: 'center',
    width: 326,
    height: 83,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 35,
    marginTop: 15,
    borderWidth: 1,
    borderColor: "#000000"
  },
  textBtn: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'Segoe UI Bold'
  },
  textBtn2: {
    color: "#000000",
    fontSize: 20,
    fontFamily: 'Segoe UI Bold'
  },
})