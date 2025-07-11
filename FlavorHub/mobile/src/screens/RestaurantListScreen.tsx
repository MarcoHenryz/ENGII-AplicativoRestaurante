import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, SafeAreaView, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/MainNavigator';
import api from '../services/api';
import { Restaurant as RestaurantType } from '../types';
import { Ionicons } from '@expo/vector-icons';
import StarRating from '../components/StarRating';

type NavProps = NativeStackNavigationProp<RootStackParamList, 'RestaurantList'>;

const RestaurantListScreen = () => {
    const navigation = useNavigation<NavProps>();
    const [restaurants, setRestaurants] = useState<RestaurantType[]>([]);

    useEffect(() => {
        api.get('/restaurants').then(response => {
            setRestaurants(response.data);
        }).catch(error => console.error("Erro ao buscar restaurantes:", error));
    }, []);

    const renderItem = ({ item }: { item: RestaurantType }) => (
        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Restaurant', { restaurantId: item.id })}>
            <Image source={{ uri: item.imageUrl || 'https://placehold.co/100x100/orange/white?text=Logo' }} style={styles.image} />
            <View style={styles.info}>
                <Text style={styles.name}>{item.name}</Text>
                <StarRating rating={4} />
                <Text style={styles.details}>• Ambiente climatizado</Text>
                <Text style={styles.details}>• Bom preço</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Ionicons name="arrow-back" size={24} color="black" />
                    </TouchableOpacity>
                    <Text style={styles.title}>Restaurantes</Text>
                    <TouchableOpacity>
                        <Ionicons name="notifications-outline" size={24} color="black" />
                    </TouchableOpacity>
                </View>
                <FlatList
                    data={restaurants}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: '#FFF' },
    container: { flex: 1, padding: 16 },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
    title: { fontSize: 22, fontWeight: 'bold' },
    card: { flexDirection: 'row', backgroundColor: '#FFF5EB', borderRadius: 10, padding: 15, marginBottom: 15, alignItems: 'center' },
    image: { width: 90, height: 90, borderRadius: 10 },
    info: { marginLeft: 15, flex: 1 },
    name: { fontSize: 18, fontWeight: 'bold', marginBottom: 5 },
    details: { fontSize: 14, color: '#666', marginTop: 2 },
});

export default RestaurantListScreen;