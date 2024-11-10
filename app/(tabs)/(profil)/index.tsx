import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Href, Link, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { useThemeColors } from '@/hooks/useThemeColors';
import { checkToken, logout } from '@/functions/auth';
import { findGameListOfUser, ListProps } from '@/functions/list';
import { findUserById, UserProps } from '@/functions/user';
import { RootView } from '@/components/RootView';
import { ThemedText } from '@/components/ThemedText';
import Loader from '@/components/Loader';
import { ListDetails } from '@/components/list/ListDetails';
import { Row } from '@/components/Row';

export default function ProfilIndex() {
    const router = useRouter();
    const colors = useThemeColors();
    const [user, setUser] = useState<UserProps>();
    const [isLoading, setIsLoading] = useState(true);
    const [userError, setError] = useState<Error | null>(null);
    const [data, setData] = useState<ListProps[] | null>(null);
    const [modalVisible, setModalVisible] = useState(false);

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
                const lists = await findGameListOfUser(token.id);
                setData(lists as ListProps[]);
            } catch (error: any) {
                setError(error);
            } finally {
                setIsLoading(false);
            }
        }
        fetchData();
    }, []);

    async function handleLogout() {
        try {
            await logout();
            router.push("/login");
        } catch (error) {
            console.error(error);
        }
    }

    if (isLoading) return <Loader />;
    if (userError) return <RootView><ThemedText>Error: {userError.message}</ThemedText></RootView>;

    const profilEdit = '/profil/edit' as Href;

    return (
        <RootView>
            <ScrollView style={styles.container}>
                <View style={styles.profileContainer}>
              
                        <View style={styles.settings}>
                            <View>

                            </View>
                            {user?.image ? (
                                <Image source={{ uri: process.env.EXPO_PUBLIC_IMAGE + user.image.url }} style={styles.profileImage} />
                            ) : (
                                <Image source={require('@/assets/static_images/icon-default.jpg')} style={styles.profileImage} />
                            )}

                            <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
                                <Ionicons name="settings-outline" size={24} color={colors.gray} />
                            </TouchableOpacity>
                        </View>

                        <Modal
                            animationType="fade"
                            transparent={true}
                            visible={modalVisible}
                            onRequestClose={() => setModalVisible(false)}
                        >
                            <TouchableOpacity
                                style={styles.modalOverlay}
                                onPress={() => setModalVisible(false)}
                            >
                                <View style={[styles.popover, { backgroundColor: colors.backgroundColor }]}>
                                <Link href={"/edit"} asChild>
                                    <TouchableOpacity>
                                        <Row gap={8}>
                                            <Ionicons name="create-outline" size={24} color={colors.grayLight} />
                                            <ThemedText style={[styles.popoverText]}>Edit profil</ThemedText>
                                        </Row>
                                    </TouchableOpacity>
                                </Link>

                         
                                    <TouchableOpacity onPress={() => handleLogout()}>
                                        <Row gap={8}>
                                            <Ionicons name="log-out-outline" size={24} color={colors.tint} />
                                            <ThemedText style={[styles.popoverText, { color: colors.tint }]}>Disconnect</ThemedText>
                                        </Row>
                                    </TouchableOpacity>
                          
                                </View>
                            </TouchableOpacity>
                        </Modal>
                    

                    <ThemedText variant="subtitle">{user?.pseudo}</ThemedText>
                    <ThemedText variant='body2' style={{ color: colors.gray, marginTop: 12 }}>
                        {user?.description ? user.description : 'Pas de description'}
                    </ThemedText>
                </View>


                <View style={styles.tabContainer}>
                    <TouchableOpacity style={styles.tab}>
                        <ThemedText>Lists</ThemedText>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.tab}>
                        <ThemedText>Evaluations</ThemedText>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.tab}>
                        <ThemedText>Favoris</ThemedText>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.tab}>
                        <ThemedText>Stats</ThemedText>
                    </TouchableOpacity>
                </View>

                <View style={styles.searchContainer}>
                    <ThemedText variant="body" style={{ color: colors.gray }}>🔍 Search a list</ThemedText>
                </View>


                <View style={styles.listContainer}>
                    {isLoading && <ThemedText>Loading...</ThemedText>}
                    {userError && <ThemedText>Error: {userError}</ThemedText>}

                    {data && data.length > 0 ? data.map((list) => (
                            <ListDetails
                                key={list.id}
                                id={list.id}
                                title={list.name}
                                description={list.description}
                                gameCount={list.games}
                                image={list.image}
                            />
                    )
                    ) : (
                        <ThemedText>There is no list yet !</ThemedText>
                    )}
                </View>
                <Link href="/list/new" asChild>
                    <TouchableOpacity style={styles.newListButton}>
                        <Text style={styles.newListText}>+ New list</Text>
                    </TouchableOpacity>
                </Link>
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
        alignSelf: 'center',
        marginLeft: 20,
    },
    settings: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        alignItems: 'center',
        marginBottom: 20,
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    popover: {
        position: 'absolute',
        top: 70,
        right: 20,
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOpacity: 0.3,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
        elevation: 5,
    },
    popoverText: {
        fontSize: 16,
        paddingVertical: 6,
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

