import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';

export default function LibraryScreen() {
  const [coins, setCoins] = useState(20); // Monedas iniciales simuladas
  const [lastChapter, setLastChapter] = useState(27); // Último capítulo guardado (ejemplo: cap 27)

  const handleReadChapter = (isLocked) => {
    if (isLocked) {
      if (coins >= 30) {
        setCoins(coins - 30);
        Alert.alert("¡Éxito!", "Capítulo anticipado desbloqueado con 30 monedas.");
      } else {
        Alert.alert("Saldo insuficiente", "Necesitas más monedas para ver este capítulo anticipado.");
      }
    } else {
      Alert.alert("Leyendo", `Continuando desde tu último progreso: Capítulo ${lastChapter}`);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mi Biblioteca Kairo</Text>
      <Text style={styles.coinsText}>Monedas actuales: 🪙 {coins}</Text>

      <View style={styles.card}>
        <Text style={styles.obraTitle}>Obra: El Despertar del Monarca</Text>
        <Text style={styles.progress}>Progreso guardado: Capítulo {lastChapter}</Text>
        
        <TouchableOpacity style={styles.btnRead} onPress={() => handleReadChapter(false)}>
          <Text style={styles.btnText}>Continuar Lectura (Gratis)</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnLocked} onPress={() => handleReadChapter(true)}>
          <Text style={styles.btnText}>Desbloquear Capítulo Anticipado (30 🪙)</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212', padding: 20, justifyContent: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', color: '#ff4757', textAlign: 'center', marginBottom: 10 },
  coinsText: { fontSize: 16, color: '#f1c40f', textAlign: 'center', marginBottom: 20, fontWeight: 'bold' },
  card: { backgroundColor: '#1e1e1e', padding: 20, borderRadius: 10, borderWidth: 1, borderColor: '#333' },
  obraTitle: { fontSize: 18, color: '#fff', fontWeight: 'bold', marginBottom: 5 },
  progress: { fontSize: 14, color: '#aaa', marginBottom: 15 },
  btnRead: { backgroundColor: '#007AFF', padding: 12, borderRadius: 6, marginBottom: 10 },
  btnLocked: { backgroundColor: '#e67e22', padding: 12, borderRadius: 6 },
  btnText: { color: '#fff', textAlign: 'center', fontWeight: 'bold' }
});