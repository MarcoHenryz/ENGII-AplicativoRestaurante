import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import api from '../services/api';

interface ProfileData {
    name: string;
    avatarUrl?: string;
    restaurantReviews: any[]; // Defina tipos mais específicos
    dishReviews: any[];
}

const ProfileScreen = () => {
    const { user, signOut } = useAuth();
    const [profile, setProfile] = useState<ProfileData | null>(null);

    useEffect(() => {
        if (user) {
            api.get(`/users/${user.id}`)
                .then(response => setProfile(response.data))
                .catch(error => console.error("Erro ao buscar perfil:", error));
        }
    }, [user]);

    if (!profile) {
        return <SafeAreaView style={stylesProfile.centered}><ActivityIndicator size="large" color="#FF8C00" /></SafeAreaView>;
    }

    return (
        <SafeAreaView style={stylesProfile.safeArea}>
            <ScrollView>
                <View style={stylesProfile.headerContainer}>
                    <Image source={{ uri: profile.avatarUrl || `https://placehold.co/100x100/333/FFF?text=${profile.name.charAt(0)}` }} style={stylesProfile.avatar} />
                    <Text style={stylesProfile.name}>{profile.name}</Text>
                    <TouchableOpacity style={stylesProfile.logoutButton} onPress={signOut}>
                        <Text style={stylesProfile.logoutText}>Sair</Text>
                    </TouchableOpacity>
                </View>
                <View style={stylesProfile.content}>
                    <Text style={stylesProfile.sectionTitle}>Minhas Avaliações</Text>
                    {profile.dishReviews.map(review => (
                        <View key={review.id} style={stylesProfile.reviewCard}>
                            <Text>Avaliou <Text style={{fontWeight: 'bold'}}>{review.dish.name}</Text> com nota {review.score}</Text>
                            <Text>{review.comment}</Text>
                        </View>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};
// Estilos para ProfileScreen (com pequenas adições)
const stylesProfile = StyleSheet.create({
    centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    safeArea: { flex: 1, backgroundColor: '#F8F8F8' },
    headerContainer: { alignItems: 'center', padding: 20, backgroundColor: '#FFF', borderBottomWidth: 1, borderBottomColor: '#EEE' },
    avatar: { width: 100, height: 100, borderRadius: 50 },
    name: { fontSize: 22, fontWeight: 'bold', marginTop: 10 },
    logoutButton: { position: 'absolute', top: 15, right: 15, padding: 5 },
    logoutText: { color: '#FF8C00', fontWeight: 'bold' },
    content: { padding: 20 },
    sectionTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 15 },
    reviewCard: { backgroundColor: '#FFF', borderRadius: 10, padding: 15, marginBottom: 15 },
});
export default ProfileScreen;