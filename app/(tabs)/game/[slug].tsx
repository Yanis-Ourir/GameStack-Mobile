import { Image, ScrollView, StyleSheet, View } from 'react-native';
import { RootView } from "@/components/RootView";
import { ThemedText } from "@/components/ThemedText";
import { useThemeColors } from "@/hooks/useThemeColors";
import { useLocalSearchParams } from "expo-router";
import { FontAwesome } from '@expo/vector-icons'; // Pour afficher des icônes de notation (ex: étoiles)
import { TouchableOpacity } from 'react-native';

export default function Game() {
    const colors = useThemeColors();
    const params = useLocalSearchParams();

    // Simulation des données du jeu
    const game = {
        id: 1,
        title: 'Super Mario Bros.',
        description: 'Super Mario Bros. is a platform game developed and published by Nintendo. Players control Mario, or his brother Luigi in multiplayer mode, as they travel the Mushroom Kingdom to rescue Princess Toadstool from Bowser.',
        image: 'https://media.rawg.io/media/games/5a4/5a44112251d70a25291cc33757220fce.jpg',
        rating: 4.5,
        releaseDate: '13/09/1985',
        genres: ['Platformer'],
        platforms: ['NES'],
        developers: ['Nintendo'],
        publishers: ['Nintendo'],
    };

    // Simulation des commentaires
    const comments = [
        { id: 1, user: 'JohnDoe', comment: 'An iconic game that defined my childhood!', rating: 5 },
        { id: 2, user: 'JaneGamer', comment: 'Timeless classic, still fun to play.', rating: 4 },
        { id: 3, user: 'PlayerOne', comment: 'A bit outdated, but still a legend in gaming.', rating: 4 },
    ];

    return (
        <RootView>
            <ScrollView contentContainerStyle={styles.container}>
                {/* Image du jeu */}
                <Image source={{ uri: game.image }} style={styles.gameImage} />

                {/* Détails du jeu */}
                <View style={styles.detailsContainer}>
                    <ThemedText variant="headline" style={styles.title}>
                        {game.title}
                    </ThemedText>
                    <ThemedText variant="body" style={styles.description}>
                        {game.description}
                    </ThemedText>

                    {/* Informations supplémentaires */}
                    <View style={styles.infoRow}>
                        <ThemedText variant="body2">Release Date: {game.releaseDate}</ThemedText>
                        <ThemedText variant="body2">Genres: {game.genres.join(', ')}</ThemedText>
                        <ThemedText variant="body2">Platforms: {game.platforms.join(', ')}</ThemedText>
                        <ThemedText variant="body2">Developers: {game.developers.join(', ')}</ThemedText>
                        <ThemedText variant="body2">Publishers: {game.publishers.join(', ')}</ThemedText>
                    </View>

                    {/* Rating */}
                    <View style={styles.ratingContainer}>
                        <ThemedText variant="body">Community Rating: </ThemedText>
                        <View style={styles.stars}>
                            {[...Array(Math.round(game.rating))].map((_, index) => (
                                <FontAwesome key={index} name="star" size={20} color={colors.tint} />
                            ))}
                        </View>
                        <ThemedText variant="body" style={styles.ratingText}>{game.rating.toFixed(1)}</ThemedText>
                    </View>
                </View>

                {/* Commentaires */}
                <View style={styles.commentsSection}>
                    <ThemedText variant="headline" style={styles.commentsTitle}>Comments & Reviews</ThemedText>
                    {comments.map(comment => (
                        <View key={comment.id} style={styles.commentCard}>
                            <View style={styles.commentHeader}>
                                <ThemedText variant="body2" style={styles.commentUser}>{comment.user}</ThemedText>
                                <View style={styles.stars}>
                                    {[...Array(comment.rating)].map((_, index) => (
                                        <FontAwesome key={index} name="star" size={16} color={colors.tint} />
                                    ))}
                                </View>
                            </View>
                            <ThemedText variant="body2" style={styles.commentText}>
                                {comment.comment}
                            </ThemedText>
                        </View>
                    ))}
                </View>

                {/* Ajouter un commentaire */}
                <TouchableOpacity style={styles.addCommentButton}>
                    <ThemedText variant="body" style={styles.addCommentText}>Add a Comment</ThemedText>
                </TouchableOpacity>
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
        marginTop: 20,
        backgroundColor: '#C31432',
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
    },
    addCommentText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});
