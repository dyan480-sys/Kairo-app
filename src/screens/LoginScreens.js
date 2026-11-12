import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, Modal } from 'react-native';
import { COLORS } from '../theme/theme';

export default function LoginScreen({ navigation }) {
  const [esRegistro, setEsRegistro] = useState(false);
  const [nombre, setNombre] = useState(''); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cargando, setCargando] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('error');

  const API_URL = 'http://localhost:3000/usuarios';

  const showAlert = (message, type = 'error') => {
    setAlertMessage(message); setAlertType(type); setModalVisible(true);
  };

  const handleAuthAction = async () => {
    if (!password || password.length < 8) { showAlert('La contraseña debe tener al menos 8 caracteres.'); return; }
    if (esRegistro && (!nombre || !email)) { showAlert('Por favor completa todos los campos.'); return; }

    setCargando(true);
    try {
      const endpoint = esRegistro ? '/registro' : '/login';
      const bodyData = esRegistro ? { nombre, correo: email, contrasena: password } : { correo: email, contrasena: password };
      const respuesta = await fetch(`${API_URL}${endpoint}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(bodyData) });
      const data = await respuesta.json();

      if (respuesta.ok) {
        setCargando(false);
        if (esRegistro) { showAlert('¡Cuenta creada con éxito! Ahora inicia sesión.', 'success'); setEsRegistro(false); setPassword(''); } 
        else { navigation.navigate('MainTabs', { screen: 'Perfil', params: { usuario: data.usuario } }); }
      } else { setCargando(false); showAlert(data.message || 'Ocurrió un error inesperado.'); }
    } catch (error) { setCargando(false); showAlert('No se pudo conectar con el servidor backend.'); }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.headerTitle}>KAIRO</Text>
        <Text style={styles.welcomeText}>{esRegistro ? 'Registro de Usuario' : 'Gestor de Historias'}</Text>
        {esRegistro && <TextInput placeholder="Nombre de usuario" placeholderTextColor={COLORS.gray} style={styles.input} value={nombre} onChangeText={setNombre} />}
        <TextInput placeholder="Correo electrónico" placeholderTextColor={COLORS.gray} style={styles.input} value={email} onChangeText={setEmail} autoCapitalize="none" keyboardType="email-address" />
        <TextInput placeholder="Contraseña (mín. 8 caracteres)" placeholderTextColor={COLORS.gray} secureTextEntry style={styles.input} value={password} onChangeText={setPassword} />
        
        <TouchableOpacity style={styles.btnLogin} onPress={handleAuthAction} disabled={cargando}>
          {cargando ? <ActivityIndicator color={COLORS.background} /> : <Text style={styles.btnLoginText}>{esRegistro ? 'Crear Cuenta' : 'Iniciar Sesión'}</Text>}
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.btnRegister} onPress={() => { setEsRegistro(!esRegistro); setAlertMessage(''); }}>
          <Text style={styles.btnRegisterText}>{esRegistro ? '¿Ya tienes cuenta? Inicia sesión' : '¿No tienes cuenta? Regístrate'}</Text>
        </TouchableOpacity>
      </View>

      <Modal animationType="fade" transparent={true} visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={[styles.modalTitle, { color: alertType === 'success' ? COLORS.successText : COLORS.errorText }]}>{alertType === 'success' ? 'Éxito' : 'Alerta'}</Text>
            <Text style={styles.modalMessage}>{alertMessage}</Text>
            <TouchableOpacity style={[styles.modalButton, { backgroundColor: alertType === 'success' ? COLORS.gold : COLORS.error }]} onPress={() => setModalVisible(false)}>
              <Text style={styles.modalButtonText}>Entendido</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background, justifyContent: 'center', alignItems: 'center', padding: 20 },
  card: { width: '100%', maxWidth: 400, backgroundColor: COLORS.surface, padding: 30, borderRadius: 20, borderWidth: 1, borderColor: COLORS.border },
  headerTitle: { fontSize: 32, fontWeight: 'bold', color: COLORS.gold, textAlign: 'center', marginBottom: 5, letterSpacing: 2 },
  welcomeText: { fontSize: 14, color: COLORS.gray, textAlign: 'center', marginBottom: 25 },
  input: { backgroundColor: COLORS.background, color: COLORS.white, paddingHorizontal: 16, paddingVertical: 14, borderRadius: 12, borderWidth: 1, borderColor: COLORS.border, marginBottom: 15, fontSize: 15 },
  btnLogin: { backgroundColor: COLORS.gold, padding: 16, borderRadius: 12, alignItems: 'center', marginTop: 10 },
  btnLoginText: { color: COLORS.background, fontWeight: 'bold', fontSize: 16 },
  btnRegister: { marginTop: 20, alignItems: 'center' },
  btnRegisterText: { color: COLORS.beige, fontSize: 13, fontWeight: '600' },
  modalOverlay: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.overlay },
  modalCard: { width: '85%', maxWidth: 350, backgroundColor: COLORS.surface, borderRadius: 16, padding: 25, alignItems: 'center', borderWidth: 1, borderColor: COLORS.border },
  modalTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  modalMessage: { fontSize: 15, color: COLORS.white, textAlign: 'center', marginBottom: 25, lineHeight: 22 },
  modalButton: { paddingVertical: 12, paddingHorizontal: 30, borderRadius: 8, width: '100%', alignItems: 'center' },
  modalButtonText: { color: COLORS.white, fontWeight: 'bold', fontSize: 15 },
});