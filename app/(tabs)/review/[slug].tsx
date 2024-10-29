import { CustomCheckBox } from "@/components/CustomCheckBox";
import { Platform } from "@/components/game/Platform";
import { RootView } from "@/components/RootView";
import { Row } from "@/components/Row";
import { ThemedText } from "@/components/ThemedText";
import { statuses } from "@/constants/Games";
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

                <View style={styles.formReview}>
                    <ThemedText variant="subtitle">Create your review</ThemedText>
                    <TextInput
                        placeholder="Rate this game (0-10)"
                        keyboardType="numeric"
                        placeholderTextColor={colors.gray}
                        style={styles.numberInput}
                        maxLength={10}
                    />
                    <Row gap={8} style={{paddingVertical: 24}}>
                        {game.platforms.map(platform => (
                            <CustomCheckBox key={platform.name} label={platform.name} icon={platform.icon} value={false} />
                        ))}
                    </Row>

                    <TextInput
                        placeholder="How long did you play this game? (in hours)"
                        keyboardType="numeric"
                        placeholderTextColor={colors.gray}
                        style={styles.numberInput}
                    />

                    <View style={styles.statusGrid}>
                            {statuses.map(status => (
                                <CustomCheckBox 
                                    key={status.name} 
                                    label={status.name} 
                                    icon={status.icon} 
                                    value={false} 
                                    color={status.color}
                                />
                            ))}
                    </View>
                  
                    <TextInput
                        placeholder="Write your review here..."
                        placeholderTextColor={colors.gray}
                        multiline
                        style={styles.textArea}
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
    formReview: {
        backgroundColor: 'rgb(17 24 39)',
        paddingHorizontal: 12,
        paddingVertical: 20,
        borderRadius: 12,
    },
    numberInput: {
        backgroundColor: '#171923',
        color: '#f5f5f5',
        padding: 10,
        borderRadius: 8,
        marginTop: 10,
        borderWidth: 1,
        borderColor: '#333',
    },
    statusGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
        paddingVertical: 24,
        justifyContent: 'center'
    },
    textArea: {
        backgroundColor: '#171923',
        color: '#f5f5f5',
        padding: 10,
        borderRadius: 8,
        marginBottom: 10,
        minHeight: 100,
        textAlignVertical: 'top',
        borderWidth: 1,
        borderColor: '#333',
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