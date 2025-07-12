import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, SafeAreaView, Image, ActivityIndicator } from 'react-native';
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
    
    
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setLoading(true); 
        setError(null);

        api.get('/restaurants')
            .then(response => {
                setRestaurants(response.data);
            })
            .catch(err => {
                console.error("Erro ao buscar restaurantes:", err);
                setError("Não foi possível carregar os restaurantes. Verifique sua conexão e se o servidor está rodando.");
            })
            .finally(() => {
                setLoading(false);
            });
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

    const renderContent = () => {
        if (loading) {
            return (
                <View style={styles.centered}>
                    <ActivityIndicator size="large" color="#FF8C00" />
                    <Text>Carregando restaurantes...</Text>
                </View>
            );
        }

        if (error) {
            return (
                <View style={styles.centered}>
                    <Ionicons name="cloud-offline-outline" size={64} color="gray" />
                    <Text style={styles.errorText}>{error}</Text>
                </View>
            );
        }

        if (restaurants.length === 0) {
            return (
                <View style={styles.centered}>
                    <Ionicons name="sad-outline" size={64} color="gray" />
                    <Text style={styles.errorText}>Nenhum restaurante encontrado.</Text>
                </View>
            );
        }

        return (
            <FlatList
                data={restaurants}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                showsVerticalScrollIndicator={false}
            />
        );
    };

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
                {renderContent()}
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

    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    errorText: {
        marginTop: 10,
        fontSize: 16,
        color: 'gray',
        textAlign: 'center',
    }
});

export default RestaurantListScreen;
