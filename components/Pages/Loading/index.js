import React, {useEffect, useRef} from "react";
import { View, Image, ActivityIndicator, Text, StyleSheet, Animated} from "react-native";
import Logo from '../../img/LogoFlex.svg';
import { useNavigation } from "@react-navigation/native";


export default function Loading(){
    const navigation = useNavigation();
    const fadeAnim = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        // Simule um tempo de carregamento, por exemplo, 2 segundos
        setTimeout(() => {
          // Navegue para a próxima tela após o tempo de carregamento
          navigation.navigate('Entrar');
        }, 2000);
      }, []);

    return(
        <View style={styles.container}>
            <Logo/>
        </View>
    )
}


const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#f7f7f7',
        alignItems: 'center',
        justifyContent: 'center'
    }
})