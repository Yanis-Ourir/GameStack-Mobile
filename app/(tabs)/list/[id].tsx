import { GameDetails } from "@/components/game/GameDetails";
import { GameInList } from "@/components/game/GameInList";
import { GoBack } from "@/components/GoBack";
import { RootView } from "@/components/RootView";
import { Row } from "@/components/Row";
import { ThemedText } from "@/components/ThemedText";
import { gameInList, games } from "@/constants/Games";
import { useThemeColors } from "@/hooks/useThemeColors";
import { useLocalSearchParams } from "expo-router";
import { Image, View, FlatList } from "react-native";

export default function List() {
    const colors = useThemeColors();
    const params = useLocalSearchParams();
    const listPlaceholder = {
        id: 1,
        title: 'Classiques Incontournables',
        description: 'Une collection des meilleurs jeux qui ont marqué l’histoire du jeu vidéo.',
        gameCount: 15,
        image: 'https://media.rawg.io/media/games/5a4/5a44112251d70a25291cc33757220fce.jpg',
    }

    return (
        <RootView>
            <GoBack currentData="List" />
            <Row gap={8} style={{paddingTop: 24}}>
                <Image source={{ uri: listPlaceholder.image }} style={{ width: 100, height: 100 }} />
                <View>
                    <ThemedText variant="headline">{listPlaceholder.title}</ThemedText>
                    <ThemedText variant="body" style={{width: 300, color: colors.gray}}>{listPlaceholder.description}</ThemedText>
                    <ThemedText variant="body" style={{color: colors.gray}}>Last update 24/10/2024</ThemedText>
                </View>
            </Row>

            <Row style={{justifyContent: "space-between", paddingTop: 20, paddingBottom: 20}}>
                <ThemedText variant="subtitle">Games in this list</ThemedText>
                <ThemedText variant="subtitle" style={{color: colors.tint}}>15</ThemedText>
            </Row>

            <FlatList
                data={gameInList}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => (
                   <GameInList
                        id={item.id}
                        title={item.title}
                        description={item.description}
                        image={item.image}
                        status={item.status}
                    />
            )}
            />
        </RootView>
    );
}