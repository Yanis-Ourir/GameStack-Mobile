import { Platform } from "@/components/game/Platform";
import { RootView } from "@/components/RootView";
import { Row } from "@/components/Row";
import { ThemedText } from "@/components/ThemedText";
import { useThemeColors } from "@/hooks/useThemeColors";
import { Image, ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from "react-native";

export default function Review() {
    const colors = useThemeColors();
    const game = {
        id: 1,
        title: 'Super Mario Bros.',
        description: 'Super Mario Bros. is a platform game developed and published by Nintendo. Players control Mario, or his brother Luigi in multiplayer mode, as they travel the Mushroom Kingdom to rescue Princess Toadstool from Bowser.',
        image: 'https://media.rawg.io/media/games/5a4/5a44112251d70a25291cc33757220fce.jpg',
        rating: 4.5,
        releaseDate: '13/09/1985',
        genres: ['Platformer', 'Adventure', 'RPG', 'Action', 'Arcade'],
        platforms: [
            {
                name: 'NES',
                icon: 'IoGameControllerOutline',
            },
            {
                name: 'Test',
                icon: 'IoGameControllerOutline',
            },
            {
                name: 'GameCube',
                icon: 'IoGameControllerOutline',
            },
        ],
    };
    return (
        <RootView>
            <ScrollView contentContainerStyle={styles.container}>

                <Image source={{ uri: game.image }} style={styles.gameImage} />


                <View style={styles.detailsContainer}>
                    <ThemedText variant="headline" style={{marginBottom: 8}}>
                        {game.title}
                    </ThemedText>
                    <Row gap={8}>
                        {game.platforms.map(platform => (
                            <Platform key={platform.name} name={platform.name} icon={platform.icon} />
                        ))}
                    </Row>

                    <ThemedText variant="body" style={{ color: colors.gray, paddingVertical: 12 }}>
                        {game.description}
                    </ThemedText>

                    <Row style={{ justifyContent: "space-between", marginVertical: 8 }}>
                        <ThemedText variant="subtitle">Community Rating </ThemedText>
                        <ThemedText variant="headline" style={[{ color: colors.tint }]}>{game.rating}</ThemedText>
                    </Row>
                </View>

                <View>
                    <ThemedText variant="subtitle">Create your review</ThemedText>
                    <TextInput
                        placeholder="Write your review here..."
                        multiline
                        style={{
                            backgroundColor: '#171923',
                            color: '#f5f5f5',
                            padding: 10,
                            borderRadius: 8,
                            marginBottom: 10,
                        }}
                    />
                    <TouchableOpacity style={styles.addReviewButton}>
                        <ThemedText variant="body" style={styles.addReviewText}>Add a Review</ThemedText>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </RootView>

    )
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
    detailsContainer: {
        marginBottom: 20,
    },
    addReviewButton: {
        marginVertical: 10,
        backgroundColor: '#C31432',
        paddingVertical: 12,
        borderRadius: 50,
        alignItems: 'center',
    },
    addReviewText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});