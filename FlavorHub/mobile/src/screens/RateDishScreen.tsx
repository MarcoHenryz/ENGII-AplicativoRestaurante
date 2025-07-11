import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/MainNavigator';
import StarRating from '../components/StarRating';
import { Ionicons } from '@expo/vector-icons';

type RouteProps = RouteProp<RootStackParamList, 'RateDish'>;

const RateDishScreen = () => {
    const route = useRoute<RouteProps>();
    const { dishName, dishImageUrl } = route.params;
    const [rating, setRating] = useState(0);

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView style={styles.container}>
                <Text style={styles.title}>Avaliar Prato</Text>
                <View style={styles.dishCard}>
                    <Image source={{ uri: dishImageUrl || 'https://placehold.co/80x80/FFDDC1/FF8C00?text=Prato' }} style={styles.dishImage} />
                    <View>
                        <Text style={styles.dishName}>{dishName}</Text>
                        <Text style={styles.dishPrice}>Preço: R$ 35,00</Text>
                        <StarRating rating={3} />
                    </View>
                </View>

                <Text style={styles.label}>Nota do Prato:</Text>
                <StarRating rating={rating} setRating={setRating} size={30} />

                <Text style={styles.label}>O preço está desatualizado? Faça uma sugestão de atualização:</Text>
                <TextInput style={styles.inputPrice} placeholder="Insira o preço aqui" keyboardType="numeric" />

                <Text style={styles.label}>Quer dizer mais alguma coisa?</Text>
                <TextInput style={styles.inputComment} multiline placeholder="Escreva algo..." />

                <Text style={styles.label}>O que acha de adicionar uma foto?</Text>
                <TouchableOpacity style={styles.attachButton}>
                    <Ionicons name="attach" size={20} color="#FF8C00" />
                    <Text style={styles.attachText}>Anexar imagem</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.submitButton}>
                    <Text style={styles.submitButtonText}>ENVIAR FEEDBACK</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
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