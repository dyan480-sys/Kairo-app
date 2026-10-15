import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Importamos todas las pantallas de tu carpeta src/screens/
import SplashScreen from './src/screens/SplashScreen';
import LoginScreen from './src/screens/LoginScreens';
import MainTabs from './src/screens/MainTabs';
import LibraryScreen from './src/screens/LibraryScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import SearchScreen from './src/screens/SearchScreens';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
        {/* 1. Pantalla de Bienvenida (Logo inicial de 2-3 segundos) */}
        <Stack.Screen name="Splash" component={SplashScreen} />
        
        {/* 2. Pantalla de Inicio de Sesión / Registro */}
        <Stack.Screen name="Login" component={LoginScreen} />
        
        {/* 3. Menú Principal (Barra inferior de navegación) */}
        <Stack.Screen name="MainTabs" component={MainTabs} />
        
        {/* 4. Pantallas secundarias de soporte para las pestañas */}
        <Stack.Screen name="Library" component={LibraryScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Search" component={SearchScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}