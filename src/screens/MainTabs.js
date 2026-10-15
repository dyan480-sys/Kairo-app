import React from 'react';
import { createBottomTabNavigation } from '@react-navigation/bottom-tabs';
import { View, Text, StyleSheet } from 'react-native';

// Pantallas temporales para cada pestaña del menú inferior
function CatalogScreen() {
  return (
    <View style={styles.screen}><Text style={styles.text}>Catálogo de Obras (Kairo)</Text></View>
  );
}

function SearchScreen() {
  return (
    <View style={styles.screen}><Text style={styles.text}>Búsqueda y Categorías / Encuesta</Text></View>
  );
}

function LibraryScreen() {
  return (
    <View style={styles.screen}><Text style={styles.text}>Mi Biblioteca y Progreso</Text></View>
  );
}

function ProfileScreen() {
  return (
    <View style={styles.screen}><Text style={styles.text}>Perfil y Monedas</Text></View>
  );
}

const Tab = createBottomTabNavigation();

export default function MainTabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false, tabBarStyle: { backgroundColor: '#121212', borderTopColor: '#333' }, tabBarActiveTintColor: '#ff4757' }}>
      <Tab.Screen name="Catálogo" component={CatalogScreen} />
      <Tab.Screen name="Buscar" component={SearchScreen} />
      <Tab.Screen name="Biblioteca" component={LibraryScreen} />
      <Tab.Screen name="Perfil" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#121212', justifyContent: 'center', alignItems: 'center' },
  text: { color: '#fff', fontSize: 18, fontWeight: 'bold' }
});