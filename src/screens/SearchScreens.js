import React from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { COLORS } from '../theme/theme';

// Imports de tus portadas locales
import soloLevelingImg from '../../assets/covers/solo-leveling.jpeg';
import deathNoteImg from '../../assets/covers/death-note.jpeg';
import drStoneImg from '../../assets/covers/dr-stone.jpg';
import fmaImg from '../../assets/covers/Fullmetal-Alchemist.jpg';
import casateImg from '../../assets/covers/casate-con-mi-esposo.jpeg';
import doncellaImg from '../../assets/covers/la-doncella-secreta-del-conde.jpg';
import operacionImg from '../../assets/covers/operacion-amor-puro.jpg';

export default function SearchScreens({ navigation }) {
  const categorias = ["Acción", "Fantasía", "Romance", "Drama", "Misterio"]; 

  const mangasDestacados = [
    { id: '1', titulo: "Solo Leveling", genero: "Acción / Fantasía", capitulos: "Cap. 5", img: soloLevelingImg },
    { id: '2', titulo: "Death Note", genero: "Misterio / Drama", capitulos: "Cap. 7", img: deathNoteImg },
    { id: '3', titulo: "Dr. Stone", genero: "Ciencia Ficción", capitulos: "Cap. 6", img: drStoneImg },
    { id: '4', titulo: "Fullmetal Alchemist", genero: "Fantasía / Drama", capitulos: "Cap. 5", img: fmaImg },
    { id: '5', titulo: "Cásate con mi esposo", genero: "Romance / Drama", capitulos: "Cap. 7", img: casateImg },
    { id: '6', titulo: "La doncella secreta del conde", genero: "Romance / Fantasía", capitulos: "Cap. 8", img: doncellaImg },
    { id: '7', titulo: "Operación: Amor Puro", genero: "Comedia / Romance", capitulos: "Cap. 5", img: operacionImg },
  ];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.headerTitle}>Explorar KAIRO</Text>
      
      <TextInput 
        placeholder="Buscar mangas, webtoons o autores..." 
        placeholderTextColor={COLORS.gray} 
        style={styles.searchInput} 
      />
      
      <Text style={styles.sectionTitle}>Categorías Populares</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesRow}>
        {categorias.map((cat, index) => (
          <TouchableOpacity key={index} style={styles.categoryChip}>
            <Text style={styles.categoryText}>{cat}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <Text style={styles.sectionTitle}>Obras Recomendadas</Text>
      
      {mangasDestacados.map((item) => (
        <TouchableOpacity 
          key={item.id} 
          style={styles.card}
          onPress={() => navigation.navigate('Detail', { 
            obra: { 
              titulo: item.titulo, 
              autor: item.genero.split('/')[0].trim(), 
              desc: `Sinopsis completa de ${item.titulo}. Sung Jin-Woo es el cazador más débil...`,
              img: item.img // <--- AQUÍ SE PASA LA IMAGEN CORRECTA
            } 
          })}
        >
          <Image source={item.img} style={styles.cardImage} resizeMode="cover" />
          
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle} numberOfLines={2}>{item.titulo}</Text>
            <Text style={styles.cardGenre}>{item.genero}</Text>
            <Text style={styles.cardChapters}>{item.capitulos}</Text>
            
            <View style={{marginTop: 'auto', alignItems: 'flex-end'}}>
               <Text style={styles.btnDetails}>Ver detalles ›</Text>
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background, padding: 24, paddingTop: 50 },
  headerTitle: { fontSize: 28, fontWeight: 'bold', color: COLORS.white, marginBottom: 16 },
  searchInput: { backgroundColor: COLORS.surface, color: COLORS.white, paddingHorizontal: 16, paddingVertical: 12, borderRadius: 10, borderWidth: 1, borderColor: COLORS.border, fontSize: 15, marginBottom: 20 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: COLORS.gold, marginBottom: 12, marginTop: 10 },
  categoriesRow: { marginBottom: 20 },
  categoryChip: { backgroundColor: COLORS.surface, paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, marginRight: 10, borderWidth: 1, borderColor: COLORS.border, height: 38, justifyContent: 'center' },
  categoryText: { color: COLORS.white, fontSize: 14, fontWeight: '500' },
  
  card: { 
    flexDirection: 'row', 
    backgroundColor: COLORS.surface, 
    padding: 12, 
    borderRadius: 12, 
    borderWidth: 1, 
    borderColor: COLORS.border, 
    marginBottom: 14,
    height: 140 
  },
  cardImage: { 
    width: 90, 
    height: '100%', 
    borderRadius: 8, 
    marginRight: 16 
  },
  cardContent: {
    flex: 1, 
    justifyContent: 'space-between', 
    paddingVertical: 4
  },
  cardTitle: { 
    fontSize: 16, 
    fontWeight: 'bold', 
    color: COLORS.white, 
    marginBottom: 4,
    lineHeight: 20
  },
  cardGenre: { fontSize: 13, color: COLORS.gray, marginBottom: 4 },
  cardChapters: { fontSize: 12, color: COLORS.gold, fontWeight: '600' },
  btnDetails: { color: COLORS.gold, fontSize: 12, fontWeight: 'bold' },
});