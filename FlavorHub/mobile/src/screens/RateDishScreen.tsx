import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image, TextInput, TouchableOpacity, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/MainNavigator';
import StarRating from '../components/StarRating';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../contexts/AuthContext';
import api from '../services/api';
import * as ImagePicker from 'expo-image-picker';

type RouteProps = RouteProp<RootStackParamList, 'RateDish'>;

const RateDishScreen = () => {
    const navigation = useNavigation();
    const route = useRoute<RouteProps>();
    const { user } = useAuth();
    const { dishId, dishName, dishImageUrl } = route.params;

    const [score, setScore] = useState(0);
    const [comment, setComment] = useState('');
    const [suggestedPrice, setSuggestedPrice] = useState('');
    const [image, setImage] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handlePickImage = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissionResult.granted === false) {
            Alert.alert("Permissão necessária", "Você precisa permitir o acesso à galeria para anexar uma foto.");
            return;
        }

        const pickerResult = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [4, 3],
        });

        if (pickerResult.canceled === true) {
            return;
        }

        if (pickerResult.assets && pickerResult.assets.length > 0) {
            setImage(pickerResult.assets[0].uri);
        }
    };

    const handleSubmit = async () => {
        if (!user) return Alert.alert("Erro", "Você precisa estar logado para avaliar.");
        if (score === 0) return Alert.alert("Erro", "Por favor, dê uma nota para o prato.");

        setLoading(true);
        try {
            // Em um app real, aqui a gente faria o upload da imagem para um serviço de armazenamento
            // e enviaria a URL dela para a API. Aqui, estamos apenas enviando os dados de texto.
            await api.post(`/dishes/${dishId}/review`, {
                userId: user.id,
                score,
                comment,
                suggestedPrice: suggestedPrice ? parseFloat(suggestedPrice) : undefined,
                // imageUrl: urlDaImagemSalva,
            });
            Alert.alert("Sucesso", "Sua avaliação foi enviada!");
            navigation.goBack();
        } catch (error) {
            console.error(error);
            Alert.alert("Erro", "Não foi possível enviar sua avaliação.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={stylesRateDish.safeArea}>
            <ScrollView style={stylesRateDish.container}>
                <Text style={stylesRateDish.title}>Avaliar Prato</Text>
                <View style={stylesRateDish.dishCard}>
                    <Image source={{ uri: dishImageUrl || 'https://placehold.co/80x80/FFDDC1/FF8C00?text=Prato' }} style={stylesRateDish.dishImage} />
                    <View>
                        <Text style={stylesRateDish.dishName}>{dishName}</Text>
                        <Text style={stylesRateDish.dishPrice}>Preço: R$ 35,00</Text>
                        <StarRating rating={3} />
                    </View>
                </View>

                <Text style={stylesRateDish.label}>Nota do Prato:</Text>
                <StarRating rating={score} setRating={setScore} size={30} />

                <Text style={stylesRateDish.label}>O preço está desatualizado? Faça uma sugestão:</Text>
                <TextInput style={stylesRateDish.inputPrice} placeholder="Insira o preço aqui" keyboardType="numeric" value={suggestedPrice} onChangeText={setSuggestedPrice} />

                <Text style={stylesRateDish.label}>Quer dizer mais alguma coisa?</Text>
                <TextInput style={stylesRateDish.inputComment} multiline placeholder="Escreva algo..." value={comment} onChangeText={setComment} />
                
                <Text style={stylesRateDish.label}>O que acha de adicionar uma foto?</Text>
                <TouchableOpacity style={stylesRateDish.attachButton} onPress={handlePickImage}>
                    <Ionicons name="attach" size={20} color="#FF8C00" />
                    <Text style={stylesRateDish.attachText}>Anexar imagem</Text>
                </TouchableOpacity>

                {/* Mostra a imagem selecionada */}
                {image && <Image source={{ uri: image }} style={stylesRateDish.selectedImage} />}

                <TouchableOpacity style={stylesRateDish.submitButton} onPress={handleSubmit} disabled={loading}>
                    {loading ? <ActivityIndicator color="#FFF" /> : <Text style={stylesRateDish.submitButtonText}>ENVIAR FEEDBACK</Text>}
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
};

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
    selectedImage: {
        width: '100%',
        height: 200,
        borderRadius: 10,
        marginTop: 15,
        resizeMode: 'cover',
    },
    submitButton: { backgroundColor: '#FF8C00', padding: 15, borderRadius: 10, alignItems: 'center', marginTop: 30 },
    submitButtonText: { color: '#FFF', fontWeight: 'bold', fontSize: 16 },
});

export default RateDishScreen;
