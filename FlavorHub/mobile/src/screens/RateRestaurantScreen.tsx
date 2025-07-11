import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/MainNavigator';
import StarRating from '../components/StarRating';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../contexts/AuthContext'; // NOVO
import api from '../services/api'; // NOVO

type RouteProps = RouteProp<RootStackParamList, 'RateDish'>;

const RateDishScreen = () => {
    const navigation = useNavigation();
    const route = useRoute<RouteProps>();
    const { user } = useAuth(); // Pega o usuário logado
    const { dishId, dishName, dishImageUrl } = route.params;

    const [score, setScore] = useState(0);
    const [comment, setComment] = useState('');
    const [suggestedPrice, setSuggestedPrice] = useState('');

    const handleSubmit = async () => {
        if (!user) return Alert.alert("Erro", "Você precisa estar logado para avaliar.");
        if (score === 0) return Alert.alert("Erro", "Por favor, dê uma nota para o prato.");

        try {
            await api.post(`/dishes/${dishId}/review`, {
                userId: user.id,
                score,
                comment,
                suggestedPrice: suggestedPrice ? parseFloat(suggestedPrice) : undefined,
            });
            Alert.alert("Sucesso", "Sua avaliação foi enviada!");
            navigation.goBack();
        } catch (error) {
            console.error(error);
            Alert.alert("Erro", "Não foi possível enviar sua avaliação.");
        }
    };

    return (
        <SafeAreaView style={stylesRateDish.safeArea}>
            <ScrollView style={stylesRateDish.container}>
                <Text style={stylesRateDish.title}>Avaliar Prato</Text>
                {/* ... (o resto do JSX da tela, mas agora com os `value` e `onChangeText` corretos) ... */}
                 <Text style={stylesRateDish.label}>Nota do Prato:</Text>
                <StarRating rating={score} setRating={setScore} size={30} />

                <Text style={stylesRateDish.label}>O preço está desatualizado? Faça uma sugestão de atualização:</Text>
                <TextInput style={stylesRateDish.inputPrice} placeholder="Insira o preço aqui" keyboardType="numeric" value={suggestedPrice} onChangeText={setSuggestedPrice} />

                <Text style={stylesRateDish.label}>Quer dizer mais alguma coisa?</Text>
                <TextInput style={stylesRateDish.inputComment} multiline placeholder="Escreva algo..." value={comment} onChangeText={setComment} />
                
                <TouchableOpacity style={stylesRateDish.submitButton} onPress={handleSubmit}>
                    <Text style={stylesRateDish.submitButtonText}>ENVIAR FEEDBACK</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
};
// Estilos para RateDishScreen (sem alterações)
const stylesRateDish = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: '#FFF' },
    container: { padding: 20 },
    title: { fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginBottom: 20, backgroundColor: '#FFF5EB', padding: 10, borderRadius: 10, color: '#FF8C00' },
    dishCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F8F8F8', borderRadius: 10, padding: 15, marginBottom: 20 },
    dishImage: { width: 80, height: 80, borderRadius: 10, marginRight: 15 },
    dishName: { fontSize: 18, fontWeight: 'bold' },
    dishPrice: { fontSize: 14, color: 'gray', marginVertical: 4 },
    label: { fontSize: 16, fontWeight: '500', marginTop: 20, marginBottom: 10 },
    inputPrice: { backgroundColor: '#F0F0F0', borderRadius: 10, padding: 10, fontSize: 16 },
    inputComment: { backgroundColor: '#F0F0F0', borderRadius: 10, padding: 10, height: 100, textAlignVertical: 'top' },
    attachButton: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF5EB', padding: 15, borderRadius: 10, justifyContent: 'center' },
    attachText: { color: '#FF8C00', marginLeft: 10, fontWeight: 'bold' },
    submitButton: { backgroundColor: '#FF8C00', padding: 15, borderRadius: 10, alignItems: 'center', marginTop: 30 },
    submitButtonText: { color: '#FFF', fontWeight: 'bold', fontSize: 16 },
});
export default RateDishScreen;