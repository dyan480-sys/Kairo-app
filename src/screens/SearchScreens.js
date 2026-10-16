// src/screens/SearchScreens.js
import React from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { COLORS } from '../theme/theme';

export default function SearchScreens() {
  // [FUTURO]: Estos géneros y mangas se cargarán dinámicamente desde PostgreSQL mediante la API REST
  const categorias = ["Acción", "Fantasía", "Romance", "Isekai", "Webtoon"];
  const mangasDestacados = [
    { id: '1', titulo: "El Despertar del Monarca", genero: "Acción / Fantasía", capitulos: "Cap. 28" },
    { id: '2', titulo: "Crónicas de la Noche Estelar", genero: "Seinen / Ciencia Ficción", capitulos: "Cap. 12" },
  ];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.headerTitle}>Explorar KAIRO</Text>
      
      <TextInput 
        placeholder="Buscar mangas, webtoons o autores..." 
        placeholderTextColor={COLORS.textSecondary}
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
        <View key={item.id} style={styles.card}>
          <Text style={styles.cardTitle}>{item.titulo}</Text>
          <Text style={styles.cardGenre}>{item.genero} • {item.capitulos}</Text>
          <TouchableOpacity style={styles.btnRead}>
            <Text style={styles.btnReadText}>Leer Ahora</Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 24,
    paddingTop: 50,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: 16,
  },
  searchInput: {
    backgroundColor: COLORS.surfaceLight,
    color: COLORS.textPrimary,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
    fontSize: 15,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.accent,
    marginBottom: 12,
    marginTop: 10,
  },
  categoriesRow: {
    marginBottom: 20,
  },
  categoryChip: {
    backgroundColor: COLORS.surface,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
    height: 38,
    justifyContent: 'center',
  },
  categoryText: {
    color: COLORS.textPrimary,
    fontSize: 14,
    fontWeight: '500',
  },
  card: {
    backgroundColor: COLORS.surface,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 14,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  cardGenre: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginBottom: 12,
  },
  btnRead: {
    backgroundColor: COLORS.primary,
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  btnReadText: {
    color: COLORS.textPrimary,
    fontWeight: 'bold',
    fontSize: 13,
  },
});