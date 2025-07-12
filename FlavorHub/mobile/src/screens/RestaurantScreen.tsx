import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
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
        return (
            <SafeAreaView style={stylesRestaurant.centered}>
                <ActivityIndicator size="large" color="#FF8C00" />
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={stylesRestaurant.safeArea}>
            <View style={stylesRestaurant.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={stylesRestaurant.backButton}>
                    <Ionicons name="arrow-back" size={28} color="#FFF" />
                </TouchableOpacity>
            </View>

            <ScrollView>
                <Image source={{ uri: restaurant.imageUrl || 'https://placehold.co/400x250/orange/white?text=Restaurante' }} style={stylesRestaurant.mainImage} />
                <View style={stylesRestaurant.container}>
                    <Text style={stylesRestaurant.name}>{restaurant.name}</Text>
                    <StarRating rating={4.5} />
                    <View style={stylesRestaurant.actions}>
                         <Text style={stylesRestaurant.actionText}>Ver avaliações</Text>
                         <TouchableOpacity onPress={() => navigation.navigate('RateRestaurant', { restaurantId: restaurant.id, restaurantName: restaurant.name })}>
                            <Text style={stylesRestaurant.actionText}>Fazer avaliação</Text>
                         </TouchableOpacity>
                    </View>
                    <Text style={stylesRestaurant.status}>Aberto</Text>
                    <Text style={stylesRestaurant.hours}>Fecha às 23:00</Text>
                    
                    <Text style={stylesRestaurant.menuTitle}>Cardápio</Text>
                    {restaurant.dishes.map(dish => (
                        <View key={dish.id} style={stylesRestaurant.dishCard}>
                            <Image source={{ uri: dish.imageUrl || 'https://placehold.co/80x80/FFDDC1/FF8C00?text=Prato' }} style={stylesRestaurant.dishImage} />
                            <View style={stylesRestaurant.dishInfo}>
                                <Text style={stylesRestaurant.dishName}>{dish.name}</Text>
                                <Text style={stylesRestaurant.dishPrice}>R$ {dish.price.toFixed(2)}</Text>
                                <StarRating rating={4} size={16} />
                            </View>
                            <TouchableOpacity onPress={() => navigation.navigate('RateDish', { dishId: dish.id, dishName: dish.name, dishImageUrl: dish.imageUrl })}>
                                <Text style={stylesRestaurant.evaluateText}>Avaliar prato</Text>
                            </TouchableOpacity>
                        </View>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const stylesRestaurant = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: '#FFF' },
    centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    header: {
        position: 'absolute',
        top: 40, 
        left: 0,
        right: 0,
        zIndex: 1,
        paddingHorizontal: 15,
    },
    backButton: {
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    mainImage: { width: '100%', height: 250 },
    container: { padding: 20, paddingTop: 20 },
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