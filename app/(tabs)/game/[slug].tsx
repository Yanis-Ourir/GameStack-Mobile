import { Image, ScrollView, StyleSheet, View } from 'react-native';
import { RootView } from "@/components/RootView";
import { ThemedText } from "@/components/ThemedText";
import { useThemeColors } from "@/hooks/useThemeColors";
import { useLocalSearchParams } from "expo-router";
import { FontAwesome } from '@expo/vector-icons'; // Pour afficher des icônes de notation (ex: étoiles)
import { TouchableOpacity } from 'react-native';
import { Platform } from '@/components/game/Platform';
import { Row } from '@/components/Row';
import EvaluationDetails from '@/components/game/Evaluation';
import { comments } from '@/constants/Games';

export default function Game() {
    const colors = useThemeColors();
    const params = useLocalSearchParams();

    
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
                    <ThemedText variant="headline" style={styles.title}>
                        {game.title}
                    </ThemedText>
                    <Row gap={8}>
                        {game.platforms.map(platform => (
                            <Platform key={platform.name} name={platform.name} icon={platform.icon} />
                        ))}
                    </Row>

                    <ThemedText variant="body" style={{color: colors.gray, paddingVertical: 12}}>
                        {game.description}
                    </ThemedText>

                    
                    <Row style={{justifyContent: "space-between"}}>
                        <ThemedText variant="body2" style={{width: "40%"}}>{game.genres.join(', ')}</ThemedText>
                        <ThemedText variant="body2" style={{ color: colors.gray }}>Release Date: {game.releaseDate}</ThemedText>
                    </Row>

                    
                    <Row style={{justifyContent: "space-between", marginVertical: 12}}>
                        <ThemedText variant="subtitle">Community Rating </ThemedText>
                        <ThemedText variant="headline" style={[{color: colors.tint}]}>{game.rating}</ThemedText>
                    </Row>
                </View>

               
                <View style={styles.commentsSection}>
                    
                    <ThemedText variant="headline">Reviews</ThemedText>
                    <TouchableOpacity style={styles.addCommentButton}>
                        <ThemedText variant="body" style={styles.addCommentText}>Add a Review</ThemedText>
                    </TouchableOpacity>
                    {comments.map(comment => (
                      <EvaluationDetails key={comment.id} evaluation={comment} />
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
        marginBottom: 20,
    },
    detailsContainer: {
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    description: {
        fontSize: 16,
        color: '#f5f5f5',
        marginBottom: 10,
    },
    infoRow: {
        marginBottom: 10,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
    },
    stars: {
        flexDirection: 'row',
        marginLeft: 5,
    },
    ratingText: {
        marginLeft: 5,
        fontSize: 16,
    },
    commentsSection: {
        marginTop: 20,
    },
    commentsTitle: {
        marginBottom: 10,
    },
    commentCard: {
        backgroundColor: '#171923',
        padding: 10,
        borderRadius: 8,
        marginBottom: 15,
    },
    commentHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 5,
    },
    commentUser: {
        fontWeight: 'bold',
    },
    commentText: {
        fontSize: 14,
        color: '#f5f5f5',
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
});
