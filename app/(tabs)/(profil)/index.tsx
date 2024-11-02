import { ListDetails } from '@/components/list/ListDetails';
import { RootView } from '@/components/RootView';
import { ThemedText } from '@/components/ThemedText';
import { gameLists } from '@/constants/Games';
import { checkToken } from '@/functions/auth';
import { findGameListOfUser, ListProps } from '@/functions/list';
import { findUserById, UserProps } from '@/functions/user';
import { useThemeColors } from '@/hooks/useThemeColors';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

export default function ProfilIndex() {
    const router = useRouter();
    const colors = useThemeColors();
    const [user, setUser] = useState<UserProps>();
    const [isLoading, setIsLoading] = useState(true);
    const [userError, setError] = useState<Error | null>(null);
    const { isPending, isError, data, error } = findGameListOfUser('9d28505b-4fee-4954-bf4d-2dff83798551');


    useEffect(() => {
        async function fetchData() {
            const token = await checkToken();
            if (!token) {
                router.push('/login');
                return;
            }

            try {
                const user = await findUserById(token.id);
                setUser(user);
            } catch (error: any) {
                setError(error);
            } finally {
                setIsLoading(false);
            }
        }
        fetchData();
       
    }, []);

    if(isLoading) {
        return (
            <RootView>
                <ThemedText>Loading...</ThemedText>
            </RootView>
        );
    }

    if(userError) {
        return (
            <RootView>
                <ThemedText>Error: {userError.message}</ThemedText>
            </RootView>
        );
    }


    return (
        <RootView>
            <ScrollView style={styles.container}>

                <View style={styles.profileContainer}>
                    {user?.image ? (
                        <Image source={{ uri: process.env.EXPO_PUBLIC_IMAGE + user.image.url }} style={styles.profileImage} />
                    ) : (
                        <Image source={require('@/assets/static_images/icon-default.jpg')} style={styles.profileImage} />
                    )}
                    <ThemedText variant="subtitle">{user?.pseudo}</ThemedText>
                    <ThemedText variant='body2' style={{ color: colors.gray, marginTop: 12 }}>
                        {user?.description ? user.description : 'Pas de description'}
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
                    <ThemedText variant="body" style={{ color: colors.gray }}>🔍 Chercher une liste</ThemedText>
                </View>


                <View style={styles.listContainer}>
                    {isPending && <ThemedText>Loading...</ThemedText>}
                    {isError && <ThemedText>Error: {error.message}</ThemedText>}

                    {data && data.map((list) => (
                        <ListDetails
                            key={list.id}
                            id={list.id}
                            title={list.name}
                            description={list.description}
                            gameCount={list.games}
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
        padding: 8,
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
        borderRadius: 50,
        padding: 15,
        alignItems: 'center',
        marginBottom: 32,
    },
    newListText: {
        color: '#F5F5F5',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

