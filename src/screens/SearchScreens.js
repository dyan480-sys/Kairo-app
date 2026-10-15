import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

export default function SearchScreen() {
  const [step, setStep] = useState(1);
  const [result, setResult] = useState(null);

  const handleAnswer = (option) => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      setResult("¡Recomendación generada basada en tus respuestas!");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Búsqueda y Encuesta Kairo</Text>
      
      {!result ? (
        <View style={styles.card}>
          <Text style={styles.question}>Pregunta {step} de 4: ¿Qué género prefieres?</Text>
          <TouchableOpacity style={styles.btn} onPress={() => handleAnswer('Action')}><Text style={styles.btnText}>A Acción / Shonen</Text></TouchableOpacity>
          <TouchableOpacity style={styles.btn} onPress={() => handleAnswer('Romance')}><Text style={styles.btnText}>B Romance / Webtoon</Text></TouchableOpacity>
          <TouchableOpacity style={styles.btn} onPress={() => handleAnswer('Fantasy')}><Text style={styles.btnText}>C Fantasía / Isekai</Text></TouchableOpacity>
        </View>
      ) : (
        <View style={styles.card}>
          <Text style={styles.successText}>{result}</Text>
          <TouchableOpacity style={styles.btnReset} onPress={() => { setStep(1); setResult(null); }}><Text style={styles.btnText}>Repetir Encuesta</Text></TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, backgroundColor: '#121212', padding: 20, justifyContent: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', color: '#ff4757', textAlign: 'center', marginBottom: 20 },
  card: { backgroundColor: '#1e1e1e', padding: 20, borderRadius: 10, borderWidth: 1, borderColor: '#333' },
  question: { fontSize: 16, color: '#fff', marginBottom: 20, textAlign: 'center' },
  btn: { backgroundColor: '#2f3640', padding: 12, borderRadius: 6, marginBottom: 10 },
  btnReset: { backgroundColor: '#ff4757', padding: 12, borderRadius: 6, marginTop: 10 },
  btnText: { color: '#fff', textAlign: 'center', fontWeight: 'bold' },
  successText: { color: '#2ed573', fontSize: 16, textAlign: 'center', fontWeight: 'bold', marginBottom: 15 }
});