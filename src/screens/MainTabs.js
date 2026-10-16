// src/screens/MainTabs.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LibraryScreen from './LibraryScreen';
import ProfileScreen from './ProfileScreen';
import SearchScreens from './SearchScreens';
import { COLORS } from '../theme/theme';
import { Text } from 'react-native';

const Tab = createBottomTabNavigator();

export default function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: COLORS.surface, // Fondo oscuro espacial para la barra
          borderTopColor: COLORS.border,
          height: 60,
          paddingBottom: 8,
        },
        tabBarActiveTintColor: COLORS.accent, // Color brillante cuando la pestaña está activa
        tabBarInactiveTintColor: COLORS.textSecondary, // Color inactivo
      }}
    >
      {/* [FUTURO]: Aquí irá la pantalla principal del Catálogo de Mangas y Cómics */}
      <Tab.Screen 
        name="Biblioteca" 
        component={LibraryScreen} 
        options={{
          tabBarLabel: 'Biblioteca',
          tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 18 }}>📚</Text>
        }}
      />
      <Tab.Screen 
        name="Buscar" 
        component={SearchScreens} 
        options={{
          tabBarLabel: 'Explorar',
          tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 18 }}>🔍</Text>
        }}
      />
      <Tab.Screen 
        name="Perfil" 
        component={ProfileScreen} 
        options={{
          tabBarLabel: 'Perfil',
          tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 18 }}>👤</Text>
        }}
      />
    </Tab.Navigator>
  );
}