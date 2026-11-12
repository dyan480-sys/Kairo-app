// src/theme/theme.js
export const COLORS = {
  // Identidad de Marca
  background: '#080808',      // Negro profundo
  surface: '#17141D',         // Carbón (tarjetas)
  gold: '#D4AF37',            // Dorado (acciones principales)
  beige: '#F5E6C8',           // Beige (detalles secundarios)
  white: '#F5F3F7',           // Blanco suave (textos)
  gray: '#AAA3B3',            // Gris (placeholders, bordes)
  
  // Estados Funcionales (Discretos)
  error: '#991B1B',           // Rojo apagado
  errorText: '#FECACA',       // Texto legible sobre rojo oscuro
  success: '#065F46',         // Verde bosque
  successText: '#A7F3D0',     // Texto legible sobre verde oscuro
  
  // Auxiliares
  border: '#2A2535',          // Bordes sutiles
  overlay: 'rgba(0, 0, 0, 0.85)' // Fondo modal
};

export const STYLES = {
  card: { backgroundColor: COLORS.surface, borderRadius: 16, padding: 16, borderWidth: 1, borderColor: COLORS.border },
  buttonPrimary: { backgroundColor: COLORS.gold, borderRadius: 12, paddingVertical: 14, alignItems: 'center' },
  buttonTextPrimary: { color: COLORS.background, fontWeight: 'bold', fontSize: 16 },
  input: { backgroundColor: COLORS.surface, color: COLORS.white, borderRadius: 12, padding: 14, borderWidth: 1, borderColor: COLORS.border }
};