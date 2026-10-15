import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';

export default function ProfileScreen() {
  const handleBuyCoins = () => {
    Alert.alert("Sistema de Compra", "Redirigiendo al sistema de pago para adquirir monedas y beneficios.");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perfil de Usuario - Kairo</Text>
      
      <View style={styles.card}>
        <Text style={styles.name}>Vilma Dayana (Lector)</Text>
        <Text style={styles.info}>Nivel de Lector: Nivel 3 (Activo)</Text>
        <Text style={styles.info}>Monedas disponibles: 🪙 50</Text>
        <Text style={styles.info}>Obras guardadas en Biblioteca: 4</Text>
        <Text style={styles.info}>Comentarios realizados: 12</Text>

        <TouchableOpacity style={styles.btnBuy} onPress={handleBuyCoins}>
          <Text style={styles.btnText}>Comprar Monedas y Beneficios</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212', padding: 20, justifyContent: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', color: '#ff4757', textAlign: 'center', marginBottom: 20 },
  card: { backgroundColor: '#1e1e1e', padding: 20, borderRadius: 10, borderWidth: 1, borderColor: '#333' },
  name: { fontSize: 20, color: '#fff', fontWeight: 'bold', marginBottom: 10 },
  info: { fontSize: 15, color: '#ccc', marginBottom: 8 },
  btnBuy: { backgroundColor: '#2ed573', padding: 14, borderRadius: 6, marginTop: 15 },
  btnText: { color: '#fff', textAlign: 'center', fontWeight: 'bold', fontSize: 16 }
});
