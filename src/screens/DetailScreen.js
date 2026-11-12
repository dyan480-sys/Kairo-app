import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import { COLORS } from '../theme/theme';

export default function DetailScreen({ route, navigation }) {
  // Estado para guardar los datos reales o los de ejemplo
  const [obraData, setObraData] = useState(null);
  const [loading, setLoading] = useState(true);

  // ID de la obra que viene desde SearchScreens (si lo pasaste) o usamos uno por defecto
  // NOTA: Para este ejemplo, asumimos que buscas por título o ID. 
  // Lo ideal es pasar el ID en navigation.navigate('Detail', { id: '1' })
  const { id } = route.params || { id: '1' }; 

  useEffect(() => {
    const fetchObraDetails = async () => {
      try {
        // INTENTAR CONECTAR CON EL BACKEND
        // Asegúrate de que tu backend esté corriendo en el puerto 3000
        const response = await fetch(`http://localhost:3000/obras/${id}`); 
        
        if (response.ok) {
          const data = await response.json();
          // Aquí mapeamos los datos de la BD a lo que necesita la UI
          setObraData({
            titulo: data.titulo,
            autor: data.autor,
            desc: data.descripcion,
            img: null, // Las imágenes locales no vienen de la BD, se manejan aparte
            generos: ['Acción', 'Fantasía'] // Ejemplo, la BD debería devolver esto
          });
        } else {
          throw new Error('Obra no encontrada');
        }
      } catch (error) {
        console.log("Usando datos locales por error de conexión:", error);
        // DATOS DE RESPALDO (Si el backend falla)
        setObraData({
          titulo: "Solo Leveling",
          autor: "Chugong",
          desc: "Sinopsis completa de Solo Leveling. Sung Jin-Woo es el cazador más débil...",
          img: require('../../assets/covers/solo-leveling.jpeg'), // Imagen local de respaldo
          generos: ["Acción", "Fantasía"]
        });
      } finally {
        setLoading(false);
      }
    };

    fetchObraDetails();
  }, [id]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.gold} />
      </View>
    );
  }

  // Datos de capítulos (por ahora simulados, luego vendrán de la BD)
  const capitulos = [
    { id: '1', num: 1, titulo: 'El comienzo' },
    { id: '2', num: 2, titulo: 'El despertar' },
    { id: '3', num: 3, titulo: 'La primera prueba' },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      
      {/* BOTÓN VOLVER ARRIBA DEL TODO (Fuera de la zona de contenido) */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>← Volver</Text>
      </TouchableOpacity>

      {/* CONTENIDO PRINCIPAL */}
      <View style={styles.mainContent}>
        
        {/* COLUMNA IZQUIERDA: PORTADA */}
        <View style={styles.coverColumn}>
          <Image 
            source={obraData.img || require('../../assets/kairo-logo.png')} 
            style={styles.coverImage} 
            resizeMode="cover"
          />
          <TouchableOpacity style={styles.readBtn}>
            <Text style={styles.readBtnText}>Leer ahora</Text>
          </TouchableOpacity>
        </View>

        {/* COLUMNA DERECHA: INFO */}
        <View style={styles.infoColumn}>
          <Text style={styles.title}>{obraData.titulo}</Text>
          <Text style={styles.author}>{obraData.autor}</Text>
          
          <View style={styles.tagsRow}>
            {obraData.generos?.map((g, i) => (
              <Text key={i} style={styles.tag}>{g}</Text>
            ))}
            <Text style={styles.tagStatus}>En Emisión</Text>
          </View>

          <Text style={styles.descTitle}>Sinopsis</Text>
          <Text style={styles.description}>{obraData.desc}</Text>
        </View>
      </View>

      <View style={styles.divider} />

      {/* LISTA DE CAPÍTULOS */}
      <View style={styles.capsContainer}>
        <Text style={styles.sectionTitle}>Capítulos ({capitulos.length})</Text>
        {capitulos.map((cap) => (
          <TouchableOpacity key={cap.id} style={styles.capItem}>
            <View style={styles.capNumBox}><Text style={styles.capNum}>{cap.num}</Text></View>
            <View style={{flex:1}}>
              <Text style={styles.capTitle}>Capítulo {cap.num}: {cap.titulo}</Text>
              <Text style={styles.capDate}>Hoy, 10:00 AM</Text>
            </View>
            <Text style={styles.downloadIcon}>⬇</Text>
          </TouchableOpacity>
        ))}
      </View>
      
      <View style={{ height: 50 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background, padding: 24, paddingTop: 60 }, // Más padding arriba para el botón
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.background },
  
  backButton: { 
    position: 'absolute', top: 50, left: 24, zIndex: 100,
    backgroundColor: COLORS.surface, paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20, borderWidth: 1, borderColor: COLORS.border
  },
  backButtonText: { color: COLORS.white, fontWeight: 'bold', fontSize: 12 },

  mainContent: { flexDirection: 'row', marginTop: 20, marginBottom: 20 },
  
  coverColumn: { width: 130, marginRight: 20 },
  coverImage: { 
    width: 130, height: 190, borderRadius: 8, marginBottom: 12,
    shadowColor: "#000", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.5, shadowRadius: 5, elevation: 8
  },
  readBtn: { backgroundColor: COLORS.gold, padding: 10, borderRadius: 8, alignItems: 'center' },
  readBtnText: { color: COLORS.background, fontWeight: 'bold', fontSize: 12 },

  infoColumn: { flex: 1 },
  title: { fontSize: 22, fontWeight: 'bold', color: COLORS.white, marginBottom: 4 },
  author: { fontSize: 14, color: COLORS.gold, marginBottom: 12 },
  
  tagsRow: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 16 },
  tag: { backgroundColor: COLORS.surface, color: COLORS.gray, paddingHorizontal: 8, paddingVertical: 3, borderRadius: 4, marginRight: 6, marginBottom: 6, fontSize: 11, borderWidth: 1, borderColor: COLORS.border },
  tagStatus: { backgroundColor: COLORS.gold, color: COLORS.background, paddingHorizontal: 8, paddingVertical: 3, borderRadius: 4, fontSize: 11, fontWeight: 'bold' },

  descTitle: { fontSize: 16, fontWeight: 'bold', color: COLORS.white, marginBottom: 6 },
  description: { fontSize: 13, color: COLORS.gray, lineHeight: 20 },

  divider: { height: 1, backgroundColor: COLORS.border, marginVertical: 10 },

  capsContainer: { paddingTop: 10 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: COLORS.white, marginBottom: 12 },
  
  capItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: COLORS.border },
  capNumBox: { width: 32, height: 32, borderRadius: 6, backgroundColor: COLORS.surface, justifyContent: 'center', alignItems: 'center', marginRight: 12, borderWidth: 1, borderColor: COLORS.border },
  capNum: { color: COLORS.gold, fontWeight: 'bold', fontSize: 12 },
  capTitle: { color: COLORS.white, fontSize: 14, fontWeight: '600' },
  capDate: { color: COLORS.gray, fontSize: 11, marginTop: 2 },
  downloadIcon: { color: COLORS.gray, fontSize: 16 },
});