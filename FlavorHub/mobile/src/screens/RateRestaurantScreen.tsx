import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TextInput, TouchableOpacity, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/MainNavigator';
import StarRating from '../components/StarRating';
import { useAuth } from '../contexts/AuthContext';
import api from '../services/api';

type RouteProps = RouteProp<RootStackParamList, 'RateRestaurant'>;

const RateRestaurantScreen = () => {
    const navigation = useNavigation();
    const route = useRoute<RouteProps>();
    const { user } = useAuth();
    const { restaurantId, restaurantName } = route.params;

    const [foodRating, setFoodRating] = useState(0);
    const [drinkRating, setDrinkRating] = useState(0);
    const [ambianceRating, setAmbianceRating] = useState(0);
    const [serviceRating, setServiceRating] = useState(0);
    const [comment, setComment] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        if (!user) return Alert.alert("Erro", "Você precisa estar logado para avaliar.");
        if (foodRating === 0 || serviceRating === 0 || ambianceRating === 0) {
            return Alert.alert("Campos obrigatórios", "Por favor, avalie a Comida, o Ambiente e o Atendimento.");
        }

        setLoading(true);
        try {
            await api.post(`/restaurants/${restaurantId}/review`, {
                userId: user.id,
                foodScore: foodRating,
                serviceScore: serviceRating,
                ambianceScore: ambianceRating,
                accessibilityScore: 5,
                comment: comment,
            });

            Alert.alert("Sucesso!", "Sua avaliação foi enviada.");
            navigation.goBack();

        } catch (error) {
            console.error(error);
            Alert.alert("Erro", "Não foi possível enviar sua avaliação.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView style={styles.container}>
                <Text style={styles.title}>Avaliar Restaurante</Text>
                <Text style={styles.restaurantName}>{restaurantName}</Text>
                
                <Text style={styles.subTitle}>Diga o que achou de {restaurantName}?</Text>
                
                <View style={styles.ratingRow}>
                    <Text style={styles.label}>Comida:</Text>
                    <StarRating rating={foodRating} setRating={setFoodRating} />
                </View>
                <View style={styles.ratingRow}>
                    <Text style={styles.label}>Bebida:</Text>
                    <StarRating rating={drinkRating} setRating={setDrinkRating} />
                </View>
                <View style={styles.ratingRow}>
                    <Text style={styles.label}>Ambiente:</Text>
                    <StarRating rating={ambianceRating} setRating={setAmbianceRating} />
                </View>
                <View style={styles.ratingRow}>
                    <Text style={styles.label}>Atendimento:</Text>
                    <StarRating rating={serviceRating} setRating={setServiceRating} />
                </View>

                <Text style={styles.labelComment}>Quer dizer mais alguma coisa?</Text>
                <TextInput
                    style={styles.inputComment}
                    multiline
                    placeholder="Seu comentário (opcional)"
                    value={comment}
                    onChangeText={setComment}
                />

                <TouchableOpacity style={styles.submitButton} onPress={handleSubmit} disabled={loading}>
                    {loading ? (
                        <ActivityIndicator color="#FFF" />
                    ) : (
                        <Text style={styles.submitButtonText}>ENVIAR FEEDBACK</Text>
                    )}
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: '#FFF' },
    container: { padding: 20 },
    title: { fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginBottom: 10, backgroundColor: '#FFF5EB', padding: 10, borderRadius: 10, color: '#FF8C00' },
    restaurantName: { fontSize: 20, fontWeight: '600', textAlign: 'center', marginBottom: 20 },
    subTitle: { fontSize: 18, fontWeight: '500', marginBottom: 15 },
    ratingRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15, paddingVertical: 10 },
    label: { fontSize: 16 },
    labelComment: { fontSize: 16, fontWeight: '500', marginTop: 20, marginBottom: 10 },
    inputComment: { backgroundColor: '#F0F0F0', borderRadius: 10, padding: 10, height: 100, textAlignVertical: 'top' },
    submitButton: { backgroundColor: '#FF8C00', padding: 15, borderRadius: 10, alignItems: 'center', marginTop: 30 },
    submitButtonText: { color: '#FFF', fontWeight: 'bold', fontSize: 16 },
});

export default RateRestaurantScreen;