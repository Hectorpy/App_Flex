import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Feather from 'react-native-vector-icons/Feather';
import Loading from '../Pages/Loading';
import Entrar from '../Pages/Entrar';
import Home from '../Pages/Home';
import Cadastro from '../Pages/Cadastro';
import Login from '../Pages/Login';
import Rastrear from '../Pages/Rastreamento';
import Perfil from '../Pages/Perfil';

// Cria uma instância do TabNavigator
const Tab = createBottomTabNavigator();

// Cria uma instância do StackNavigator
const Stack = createStackNavigator();

// Definição das rotas para o StackNavigator
function StackRoutes(){
  return (
      <Stack.Navigator
        screenOptions={{
          cardStyleInterpolator: ({ current, layouts }) => {
            return {
              cardStyle: {
                opacity: current.progress.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 1],
                })
              }
            };
          },
        }}
      >
        <Stack.Screen name="Loading" component={Loading} options={{ headerShown: false }} />
        <Stack.Screen name="Entrar" component={Entrar} options={{ headerShown: false }} />
        <Stack.Screen name="Cadastro" component={Cadastro} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
      </Stack.Navigator>
  );
}

// Definição das rotas para o TabNavigator
function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarShowLabel: true,
        tabBarActiveTintColor: '#FFF',
        tabBarInactiveTintColor: '#000',
        tabBarLabelStyle: {
          fontSize: 12,
        },
        tabBarStyle: {
          backgroundColor: '#25985C',
          borderTopWidth: 0,
          height: 65,
          width: 380,
          alignSelf: 'center',
          borderRadius: 30,
          marginBottom: 10
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          title: '',
          tabBarIcon: ({ color, size }) => {
            return <Feather name="home" color={color} size={40} style={{justifyContent: 'center', top: 25, height: 50}} />;
          },
        }}
      />
      <Tab.Screen
        name="Rastrear"
        component={Rastrear}
        options={{
          title: '',
          tabBarIcon: ({ color, size }) => {
            return <Feather name="truck" color={color} size={40} style={{justifyContent: 'center', top: 25, height: 50}} />;
          },
        }}
      />
      <Tab.Screen
        name="Perfil"
        component={Perfil}
        options={{
          title: '',
          tabBarIcon: ({ color, size }) => {
            return <Feather name="user" color={color} size={40} style={{justifyContent: 'center', top: 25, height: 50}} />;
          },
        }}
      />
    </Tab.Navigator>
  );
}

// Componente principal que define as rotas da aplicação
export default function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="StackRoutes" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="StackRoutes" component={StackRoutes} />
        <Stack.Screen name="TabNavigator" component={TabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}