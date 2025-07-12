// mobile/src/screens/HomeScreen.tsx
// ARQUIVO CORRIGIDO

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView, Image, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/MainNavigator';
import { Ionicons } from '@expo/vector-icons';

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const HomeScreen = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
            <TouchableOpacity onPress={() => Alert.alert("Botão Voltar", "Esta é a tela principal.")}>
                <Ionicons name="arrow-back" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity>
                <Ionicons name="notifications-outline" size={24} color="black" />
            </TouchableOpacity>
        </View>

        <View style={styles.searchBar}>
            <Ionicons name="search" size={20} color="gray" />
            <Text style={styles.searchText}>Buscar</Text>
        </View>

        <View style={styles.shortcuts}>
            <TouchableOpacity style={styles.shortcutButton} onPress={() => navigation.navigate('RestaurantList')}>
                <Image source={{ uri: 'https://placehold.co/60x60/FFDDC1/FF8C00?text=Prato' }} style={styles.shortcutIcon} />
                <Text>Restaurantes</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.shortcutButton} onPress={() => navigation.navigate('RestaurantList')}>
                <Image source={{ uri: 'https://placehold.co/60x60/FFDDC1/FF8C00?text=Stars' }} style={styles.shortcutIcon} />
                <Text>Avaliar Restaurante</Text>
            </TouchableOpacity>
        </View>

        <TouchableOpacity style={[styles.card, { backgroundColor: '#FF8C00' }]} onPress={() => navigation.navigate('RestaurantList')}>
            <Text style={styles.cardTitle}>Descubra as melhores opções para você em Arapongas</Text>
            <View style={styles.cardButton}>
                <Text style={styles.cardButtonTextOrange}>Melhores opções</Text>
            </View>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.card, { backgroundColor: '#FFF', borderWidth: 1, borderColor: '#FF8C00' }]} onPress={() => Alert.alert("Em Breve", "Funcionalidade de sugestão de restaurante em desenvolvimento!")}>
            <Text style={[styles.cardTitle, { color: '#000' }]}>O Flavor Hub esqueceu de algum restaurante?</Text>
            <View style={[styles.cardButton, { backgroundColor: '#FF8C00'}]}>
                <Ionicons name="location-outline" size={16} color="#FFF" />
                <Text style={styles.cardButtonTextWhite}>Sugerir Restaurante</Text>
            </View>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: '#FFF' },
    container: { flex: 1, paddingHorizontal: 20 },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 15 },
    searchBar: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F0F0F0', borderRadius: 10, padding: 10, marginVertical: 10 },
    searchText: { color: 'gray', marginLeft: 10 },
    shortcuts: { flexDirection: 'row', justifyContent: 'space-around', marginVertical: 20 },
    shortcutButton: { alignItems: 'center', padding: 10, backgroundColor: '#FFF5EB', borderRadius: 15, width: 150 },
    shortcutIcon: { width: 60, height: 60, marginBottom: 10, borderRadius: 30 },
    card: { borderRadius: 15, padding: 20, marginBottom: 20, alignItems: 'center' },
    cardTitle: { fontSize: 18, fontWeight: 'bold', textAlign: 'center', marginBottom: 15 },
    cardButton: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 20 },
    cardButtonTextOrange: { color: '#FF8C00', fontWeight: 'bold' },
    cardButtonTextWhite: { color: '#FFF', fontWeight: 'bold', marginLeft: 5 },
});

export default HomeScreen;
