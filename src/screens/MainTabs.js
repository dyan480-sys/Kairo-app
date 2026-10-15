import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, StyleSheet } from 'react-native';

import SearchScreen from './SearchScreens';
import LibraryScreen from './LibraryScreen';
import ProfileScreen from './ProfileScreen';

function CatalogScreen() {
  return (
    <View style={styles.screen}><Text style={styles.text}>Catálogo de Obras - Kairo</Text></View>
  );
}

const Tab = createBottomTabNavigator();

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