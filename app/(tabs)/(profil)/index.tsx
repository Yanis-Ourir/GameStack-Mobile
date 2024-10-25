import { ListDetails } from '@/components/list/ListDetails';
import { RootView } from '@/components/RootView';
import { ThemedText } from '@/components/ThemedText';
import { gameLists } from '@/constants/Games';
import { useThemeColors } from '@/hooks/useThemeColors';
import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

export default function ProfilIndex() {
    const colors = useThemeColors();
    return (
        <RootView>
        <ScrollView style={styles.container}>

            <View style={styles.profileContainer}>
                <Image source={require('@/assets/static_images/icon-default.jpg')} style={styles.profileImage} />
                <ThemedText variant="subtitle">John Doe</ThemedText>
                <ThemedText variant='body2' style={{color: colors.gray, marginTop: 12}}>
                    Passionné de jeux vidéo depuis toujours, je suis toujours à la recherche de nouvelles expériences ludiques et immersives.
                </ThemedText>
            </View>

    
            <View style={styles.tabContainer}>
                <TouchableOpacity style={styles.tab}>
                    <ThemedText>Listes</ThemedText>
                </TouchableOpacity>
                <TouchableOpacity style={styles.tab}>
                    <ThemedText>Évaluations</ThemedText>
                </TouchableOpacity>
                <TouchableOpacity style={styles.tab}>
                    <ThemedText>Favoris</ThemedText>
                </TouchableOpacity>
                <TouchableOpacity style={styles.tab}>
                    <ThemedText>Stats</ThemedText>
                </TouchableOpacity>
            </View>

            <View style={styles.searchContainer}>
                <ThemedText variant="body" style={{color: colors.gray}}>🔍 Chercher une liste</ThemedText>
            </View>


            <View style={styles.listContainer}>
                {gameLists.map((list) => (
                    <ListDetails
                        key={list.id}
                        id={list.id}
                        title={list.title}
                        description={list.description}
                        gameCount={list.gameCount}
                        image={list.image}
                    />
                ))}
            </View>

            <TouchableOpacity style={styles.newListButton}>
                <Text style={styles.newListText}>+ Nouvelle liste</Text>
            </TouchableOpacity>
        </ScrollView>
        </RootView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#11131F',
        padding: 20,
    },
    profileContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    profileImage: {
        width: 80,
        height: 80,
        borderRadius: 40,
        marginBottom: 10,
    },
    profileName: {
        color: '#F5F5F5',
        fontSize: 22,
        fontWeight: 'bold',
    },
    profileDescription: {
        color: '#717880',
        fontSize: 14,
        textAlign: 'center',
        paddingHorizontal: 20,
    },
    tabContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    tab: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderBottomWidth: 2,
        borderBottomColor: '#C31432',
    },
    searchContainer: {
        backgroundColor: '#202330',
        borderRadius: 8,
        padding: 10,
        marginBottom: 20,
    },
    searchPlaceholder: {
        color: '#717880',
        fontSize: 16,
    },
    listContainer: {
        marginBottom: 20,
    },
    newListButton: {
        backgroundColor: '#C31432',
        borderRadius: 12,
        padding: 15,
        alignItems: 'center',
    },
    newListText: {
        color: '#F5F5F5',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

