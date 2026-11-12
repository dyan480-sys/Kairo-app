import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { COLORS } from '../theme/theme';

export default function ProfileScreen({ navigation, route }) {
  const usuario = route.params?.usuario || { nombre: 'Usuario', monedas: 0, nivel: 0 };

  const handleLogout = () => {
    navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.headerTitle}>Perfil KAIRO</Text>
      
      {/* Tarjeta de Información Principal */}
      <View style={styles.card}>
        <View style={styles.avatarContainer}>
          <Text style={styles.avatarText}>{usuario.nombre.charAt(0).toUpperCase()}</Text>
        </View>
        <Text style={styles.userName}>{usuario.nombre}</Text>
        <Text style={styles.userRank}>Rango: Lector Nuevo</Text>
        
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{usuario.nivel}</Text>
            <Text style={styles.statLabel}>Nivel</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.statItem}>
            <Text style={styles.statValueGold}>{usuario.monedas} 🪙</Text>
            <Text style={styles.statLabel}>Monedas</Text>
          </View>
        </View>
      </View>

      {/* Lista de Opciones estilo moderno */}
      <View style={styles.menuContainer}>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>Mis Obras Guardadas</Text>
          <Text style={styles.menuArrow}>›</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>Historial de Lectura</Text>
          <Text style={styles.menuArrow}>›</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>Configuración</Text>
          <Text style={styles.menuArrow}>›</Text>
        </TouchableOpacity>
      </View>

      {/* Botón de Cerrar Sesión Elegante */}
      <TouchableOpacity style={styles.btnLogout} onPress={handleLogout}>
        <Text style={styles.btnLogoutText}>Cerrar Sesión</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background, padding: 24 },
  headerTitle: { fontSize: 28, fontWeight: 'bold', color: COLORS.white, marginBottom: 24, marginTop: 20 },
  
  card: { 
    backgroundColor: COLORS.surface, borderRadius: 20, padding: 24, 
    alignItems: 'center', marginBottom: 24, borderWidth: 1, borderColor: COLORS.border 
  },
  avatarContainer: { 
    width: 80, height: 80, borderRadius: 40, backgroundColor: COLORS.gold, 
    justifyContent: 'center', alignItems: 'center', marginBottom: 16 
  },
  avatarText: { fontSize: 32, fontWeight: 'bold', color: COLORS.background },
  userName: { fontSize: 22, fontWeight: 'bold', color: COLORS.white, marginBottom: 4 },
  userRank: { fontSize: 14, color: COLORS.gray, marginBottom: 20, textTransform: 'uppercase', letterSpacing: 1 },
  
  statsRow: { flexDirection: 'row', width: '100%', justifyContent: 'space-around', alignItems: 'center' },
  statItem: { alignItems: 'center' },
  statValue: { fontSize: 20, fontWeight: 'bold', color: COLORS.white },
  statValueGold: { fontSize: 20, fontWeight: 'bold', color: COLORS.gold },
  statLabel: { fontSize: 12, color: COLORS.gray, marginTop: 4 },
  divider: { width: 1, height: 40, backgroundColor: COLORS.border },

  menuContainer: { marginBottom: 24 },
  menuItem: { 
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    backgroundColor: COLORS.surface, padding: 18, borderRadius: 12, marginBottom: 10,
    borderWidth: 1, borderColor: 'transparent' 
  },
  menuText: { fontSize: 16, color: COLORS.white, fontWeight: '500' },
  menuArrow: { fontSize: 20, color: COLORS.gray },

  btnLogout: { 
    backgroundColor: 'transparent', borderWidth: 1, borderColor: COLORS.error, 
    padding: 16, borderRadius: 12, alignItems: 'center', marginTop: 10 
  },
  btnLogoutText: { color: COLORS.error, fontWeight: 'bold', fontSize: 16 },
});