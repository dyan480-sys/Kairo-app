// Dentro del return de ReaderScreen.js
<View style={styles.controls}>
  <TouchableOpacity style={styles.controlBtn} onPress={goToPrevPage}>
    <Text style={styles.controlText}>← Anterior</Text>
  </TouchableOpacity>
  
  <Text style={styles.pageIndicator}>{paginaActual} / {totalPaginas}</Text>

  <TouchableOpacity style={styles.controlBtn} onPress={goToNextPage}>
    <Text style={styles.controlText}>Siguiente →</Text>
  </TouchableOpacity>
</View>

// Estilos para los controles
const styles = StyleSheet.create({
  // ... otros estilos
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'rgba(0,0,0,0.8)',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  controlBtn: { backgroundColor: COLORS.primary, padding: 10, borderRadius: 5 },
  controlText: { color: 'white', fontWeight: 'bold' },
  pageIndicator: { color: 'white', fontSize: 16 },
});