import { GameInList } from "@/components/game/GameInList";
import { GameReviewProps } from "@/components/game/GameReview";
import { GoBack } from "@/components/GoBack";
import Loader from "@/components/Loader";
import { RootView } from "@/components/RootView";
import { Row } from "@/components/Row";
import { ThemedText } from "@/components/ThemedText";
import { findListById, removeGameFromList } from "@/functions/list";
import { useThemeColors } from "@/hooks/useThemeColors";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Image, View, FlatList, StyleSheet, TouchableOpacity } from "react-native";


export default function List() {
    const colors = useThemeColors();
    const params = useLocalSearchParams();
    const {isPending, isError, data, error} = findListById(params.id);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [games, setGames] = useState<GameReviewProps[]>();

    if(isPending) {
        return (
            <Loader />
        );
    }

    if(isError) {
        return (
            <RootView>
                <ThemedText>Error: {error.message}</ThemedText>
            </RootView>
        );
    }

    async function handleDelete(gameId: number, listId: string) {
        if(!data) return;
        try {
            await removeGameFromList(gameId, listId);
            setGames(data.games.filter(game => game.id !== gameId));
            setSuccessMessage('Jeux supprimé avec succès');
            setErrorMessage('');

        } catch (error) {
            setErrorMessage('Erreur lors de la suppression du jeu');
            setSuccessMessage('');
        }
    }

    console.log(data.games[0].review);

    

    return (
        <RootView>
            <GoBack currentData="List" />
            <Row gap={8} style={{paddingTop: 24}}>
                <Image source={{ uri: process.env.EXPO_PUBLIC_IMAGE + data.image }} style={{ width: 100, height: 100, borderRadius: 8 }} />
                <View>
                    <ThemedText variant="headline">{data.name}</ThemedText>
                    <Row gap={8}>
                        {data.user?.image && process.env.EXPO_PUBLIC_IMAGE ? (
                            <Image source={{ uri: process.env.EXPO_PUBLIC_IMAGE + data.user.image }} style={styles.profileImage} />
                        ) : (
                            <Image source={require('@/assets/static_images/icon-default.jpg')} style={styles.profileImage} />
                        )}
                        <ThemedText variant="body2" style={{color: colors.grayLight}}>- {data.user.pseudo}</ThemedText>
                    </Row>
                    <ThemedText variant="body" style={{width: 300, color: colors.gray}}>{data.description}</ThemedText>
                    <ThemedText variant="body" style={{ color: colors.gray }}>Last update {new Date(data.updated_at).toLocaleDateString()}</ThemedText>
                </View>
            </Row>

            <Row style={{justifyContent: "space-between", paddingTop: 20, paddingBottom: 20}}>
                <ThemedText variant="subtitle">Games in this list</ThemedText>
                <ThemedText variant="subtitle" style={{color: colors.tint}}>{data.games.length}</ThemedText>
            </Row>

            <FlatList
                data={games ? games : data.games}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => (
                   
                    <GameInList
                            id={item.id}
                            listId = {data.id}
                            name={item.name}
                            description={item.review[0]?.description}
                            image={item.image}
                            status={item.review[0]?.status}
                            userId={data.user.id}
                            onPressDelete={() => handleDelete(item.id, data.id)}
                    />
                 
                )}
            />
        </RootView>
    );
}

const styles = StyleSheet.create({
    profileImage: {
        width: 32,
        height: 32,
        borderRadius: 50,
    }
});

