import { Image, ScrollView, StyleSheet, View } from 'react-native';
import { RootView } from "@/components/RootView";
import { ThemedText } from "@/components/ThemedText";
import { useThemeColors } from "@/hooks/useThemeColors";
import { Link, useLocalSearchParams } from "expo-router";
import { FontAwesome } from '@expo/vector-icons'; // Pour afficher des icônes de notation (ex: étoiles)
import { TouchableOpacity } from 'react-native';
import { Platform } from '@/components/game/Platform';
import { Row } from '@/components/Row';
import EvaluationDetails from '@/components/game/Evaluation';
import { comments } from '@/constants/Games';
import { findGameBySlug, GameProps } from '@/functions/game';

export default function Game() {
    const colors = useThemeColors();
    const params = useLocalSearchParams();
    const { isPending, isError, data, error } = findGameBySlug(params.slug);

    if (isPending) {
        return (
            <RootView style={{justifyContent: 'center', alignItems: 'center'}}>
                <ThemedText>Loading...</ThemedText>
            </RootView>
        );
    }

    if (isError) {
        return (
            <RootView style={{justifyContent: 'center', alignItems: 'center'}}>
                <ThemedText>Error: {error.message}</ThemedText>
            </RootView>
        );
    }

    const game = data;

    return (
        <RootView>
            <ScrollView contentContainerStyle={styles.container}>
                
                <Image source={{ uri: game.image }} style={styles.gameImage} />

                
                <View>
                    <ThemedText variant="headline" style={{marginBottom: 8}}>
                        {game.name}
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
                        <ThemedText variant="body2" style={{width: "40%"}}>{game.tags.join(', ')}</ThemedText>
                        <ThemedText variant="body2" style={{ color: colors.gray }}>Release Date: {game.releaseDate}</ThemedText>
                    </Row>

                    
                    <Row style={{justifyContent: "space-between", marginVertical: 12}}>
                        <ThemedText variant="subtitle">Community Rating </ThemedText>
                        <ThemedText variant="headline" style={[{color: colors.tint}]}>{game.rating}</ThemedText>
                    </Row>
                </View>

               
                <View style={styles.commentsSection}>
                    
                    <ThemedText variant="headline">Reviews</ThemedText>
                    <Link href="/review/NieR:Automata" asChild>
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
});
