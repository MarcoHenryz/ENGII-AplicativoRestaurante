import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/MainNavigator';
import api from '../services/api';
import { Restaurant as RestaurantType } from '../types';
import StarRating from '../components/StarRating';
import { Ionicons } from '@expo/vector-icons';

type NavProps = NativeStackNavigationProp<RootStackParamList, 'Restaurant'>;
type RouteProps = RouteProp<RootStackParamList, 'Restaurant'>;

const RestaurantScreen = () => {
    const navigation = useNavigation<NavProps>();
    const route = useRoute<RouteProps>();
    const { restaurantId } = route.params;
    const [restaurant, setRestaurant] = useState<RestaurantType | null>(null);

    useEffect(() => {
        api.get(`/restaurants/${restaurantId}`).then(response => {
            setRestaurant(response.data);
        }).catch(error => console.error("Erro ao buscar restaurante:", error));
    }, [restaurantId]);

    if (!restaurant) {
        return <SafeAreaView><Text>Carregando...</Text></SafeAreaView>;
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView>
                <Image source={{ uri: restaurant.imageUrl || 'https://placehold.co/400x250/orange/white?text=Restaurante' }} style={styles.mainImage} />
                <View style={styles.container}>
                    <Text style={styles.name}>{restaurant.name}</Text>
                    <StarRating rating={4.5} />
                    <View style={styles.actions}>
                         <Text style={styles.actionText}>Ver avaliações</Text>
                         <TouchableOpacity onPress={() => navigation.navigate('RateRestaurant', { restaurantId: restaurant.id, restaurantName: restaurant.name })}>
                            <Text style={styles.actionText}>Fazer avaliação</Text>
                         </TouchableOpacity>
                    </View>
                    <Text style={styles.status}>Aberto</Text>
                    <Text style={styles.hours}>Fecha às 23:00</Text>
                    
                    <Text style={styles.menuTitle}>Cardápio</Text>
                    {restaurant.dishes.map(dish => (
                        <View key={dish.id} style={styles.dishCard}>
                            <Image source={{ uri: dish.imageUrl || 'https://placehold.co/80x80/FFDDC1/FF8C00?text=Prato' }} style={styles.dishImage} />
                            <View style={styles.dishInfo}>
                                <Text style={styles.dishName}>{dish.name}</Text>
                                <Text style={styles.dishPrice}>R$ {dish.price.toFixed(2)}</Text>
                                <StarRating rating={4} size={16} />
                            </View>
                            <TouchableOpacity onPress={() => navigation.navigate('RateDish', { dishId: dish.id, dishName: dish.name, dishImageUrl: dish.imageUrl })}>
                                <Text style={styles.evaluateText}>Avaliar prato</Text>
                            </TouchableOpacity>
                        </View>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: '#FFF' },
    mainImage: { width: '100%', height: 250 },
    container: { padding: 20 },
    name: { fontSize: 24, fontWeight: 'bold' },
    actions: { flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10 },
    actionText: { color: '#FF8C00', fontWeight: 'bold', fontSize: 16 },
    status: { fontSize: 16, color: 'green', fontWeight: 'bold' },
    hours: { fontSize: 16, color: 'gray' },
    menuTitle: { fontSize: 20, fontWeight: 'bold', marginTop: 20, marginBottom: 10 },
    dishCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF5EB', borderRadius: 10, padding: 10, marginBottom: 10 },
    dishImage: { width: 80, height: 80, borderRadius: 10 },
    dishInfo: { flex: 1, marginLeft: 10 },
    dishName: { fontSize: 16, fontWeight: 'bold' },
    dishPrice: { fontSize: 14, color: 'gray', marginVertical: 4 },
    evaluateText: { color: '#FF8C00', fontWeight: 'bold' },
});

export default RestaurantScreen;