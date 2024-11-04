import { Image, ScrollView, StyleSheet, View, Modal } from 'react-native';
import { RootView } from "@/components/RootView";
import { ThemedText } from "@/components/ThemedText";
import { useThemeColors } from "@/hooks/useThemeColors";
import { Link, router, useLocalSearchParams } from "expo-router";
import { FontAwesome } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import { Platform } from '@/components/game/Platform';
import { Row } from '@/components/Row';
import EvaluationDetails from '@/components/game/Evaluation';
import { findGameBySlug } from '@/functions/game';
import Loader from '@/components/Loader';
import { useEffect, useState } from 'react';
import { addGameToList, findListAndCheckIfGameIsIn, ListDetailsProps, ListProps } from '@/functions/list';
import { checkToken } from '@/functions/auth';
import DynamicIcon from '@/components/DynamicIcon';
import ErrorMessage from '@/components/ErrorMessage';
import SuccessMessage from '@/components/SuccessMessage';

export default function Game() {
    const colors = useThemeColors();
    const params = useLocalSearchParams();
    const { isPending, isError, data, error } = findGameBySlug(params.slug);
    const [modalVisible, setModalVisible] = useState(false);
    const [lists, setLists] = useState<ListDetailsProps[]>([]);
    const [loadingLists, setLoadingLists] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [successMessage, setSuccessMessage] = useState<string>('');

    useEffect(() => {
        setErrorMessage('');
        setSuccessMessage('');
    }, []);

  

    if (isPending) return <Loader />;
    if (isError) {
        return (
            <RootView style={{ justifyContent: 'center', alignItems: 'center' }}>
                <ThemedText>Error: {error.message}</ThemedText>
            </RootView>
        );
    }

    const game = data;

    const fetchListsAndOpenModal = async () => {
        setModalVisible(!modalVisible);
        const token = await checkToken();
        setLoadingLists(true);
        if (!token) {
            router.push('/login');
            return;
        }
        const response = await findListAndCheckIfGameIsIn(token.id, game.id);
        setLists(response);
        setLoadingLists(false);
    }

    async function addGameToSelectedList(idList: string) {
        if (!game) return;
        try {
            const response = await addGameToList(idList, game.id);
            if (response.error) {
                setErrorMessage(response.error);
                setSuccessMessage('');
                return;
            }
            setSuccessMessage('Game added to list');
            setErrorMessage('');
        } catch (error) {
            setErrorMessage('An error occured');
            setSuccessMessage('');
        }
    }

    return (
        <RootView>
            <ScrollView contentContainerStyle={styles.container}>

                <Image source={{ uri: game.image }} style={styles.gameImage} />

                <View>
                    <ThemedText variant="headline" style={{ marginBottom: 8 }}>{game.name}</ThemedText>
                    <Row gap={8}>
                        {game.platforms.map(platform => (
                            <Platform key={platform.name} name={platform.name} icon={platform.icon} />
                        ))}
                    </Row>

                    <ThemedText variant="body" style={{ color: colors.gray, paddingVertical: 12 }}>
                        {game.description}
                    </ThemedText>

                    <Row style={{ justifyContent: "space-between" }}>
                        <ThemedText variant="body2" style={{ width: "40%" }}>{game.tags.join(', ')}</ThemedText>
                        <ThemedText variant="body2" style={{ color: colors.gray }}>Release Date: {game.release_date}</ThemedText>
                    </Row>

                    {/* Community Rating and "Add to List" Button */}
                    <Row style={{ justifyContent: "space-between", marginVertical: 12 }}>
                        <ThemedText variant="subtitle">Community Rating </ThemedText>
                        <ThemedText variant="headline" style={[{ color: colors.tint }]}>{game.rating}</ThemedText>
                    </Row>

                    <TouchableOpacity
                        onPress={() => fetchListsAndOpenModal()}
                        style={styles.addToListButton}
                    >
                        <ThemedText style={styles.addToListText}>+ Ajouter à une liste</ThemedText>
                    </TouchableOpacity>

                    <Modal
                        transparent={true}
                        animationType="slide"
                        visible={modalVisible}
                        onRequestClose={() => setModalVisible(false)}
                    >
                        <View style={styles.modalOverlay}>
                            <View style={[styles.modalContent, { backgroundColor: colors.backgroundColor }]}>
                                <ThemedText variant="subtitle" style={{ marginBottom: 12 }}>Sélectionnez une liste</ThemedText>
                                {loadingLists && <Loader />}
                                <View style={{ height: 70 }}>
                                    {errorMessage && (
                                        <ErrorMessage message={errorMessage} />
                                    )}
                                    {successMessage && (
                                        <SuccessMessage message={successMessage} />
                                    )}
                                </View>
                                {lists.map(list => (
                                    <TouchableOpacity
                                        key={list.id}
                                        style={styles.listItem}
                                        onPress={() => addGameToSelectedList(list.id)}
                                    >
                                        <View style={styles.listRow}>
                                            <Image source={{ uri: process.env.EXPO_PUBLIC_IMAGE + list.image }} style={{ width: 50, height: 50, borderRadius: 8 }} />
                                            <ThemedText>{list.name}</ThemedText>
                                            <DynamicIcon icon={list.is_game_in_list ? 'IoCheckmarkCircleOutline' : 'IoAddCircleOutline'} color={list.is_game_in_list ? 'text-green-500' : 'text-gray-400'}/>
                                        </View>
                                    </TouchableOpacity>
                                ))}
                                <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeModalButton}>
                                    <ThemedText style={styles.closeModalText}>Fermer</ThemedText>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
                </View>

                <View style={styles.commentsSection}>
                    <ThemedText variant="headline">Reviews</ThemedText>
                    <Link href={`/evaluation/${data.slug}`} asChild>
                        <TouchableOpacity style={styles.addCommentButton}>
                            <ThemedText variant="body" style={styles.addCommentText}>Add a Review</ThemedText>
                        </TouchableOpacity>
                    </Link>
                    {data.evaluations && data.evaluations.map(evaluation => (
                        <EvaluationDetails
                            key={evaluation.id}
                            id={evaluation.id}
                            rating={evaluation.rating}
                            description={evaluation.description}
                            game_time={evaluation.game_time}
                            status={evaluation.status}
                            platforms={evaluation.platforms}
                            user={evaluation.user}
                        />
                    ))}
                </View>
            </ScrollView>
        </RootView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#11131F',
    },
    gameImage: {
        width: '100%',
        height: 200,
        borderRadius: 12,
        marginBottom: 8,
    },
    addToListButton: {
        backgroundColor: '#C31432',
        paddingVertical: 12,
        borderRadius: 50,
        alignItems: 'center',
        marginVertical: 10,
    },
    addToListText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    commentsSection: {
        marginTop: 20,
    },
    addCommentButton: {
        marginVertical: 10,
        backgroundColor: '#C31432',
        paddingVertical: 12,
        borderRadius: 50,
        alignItems: 'center',
    },
    addCommentText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '80%',
        padding: 20,
        borderRadius: 12,
        alignItems: 'center',
    },
    listItem: {
        paddingVertical: 10,
        width: '100%',
        alignItems: 'center',
        borderBottomWidth: 0.5,
        borderBottomColor: '#C31432',
    },
    closeModalButton: {
        marginTop: 15,
        padding: 10,
        alignItems: 'center',
    },
    closeModalText: {
        color: '#C31432',
        fontWeight: 'bold',
    },
    listRow: {
        width: "100%",
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    }
});
