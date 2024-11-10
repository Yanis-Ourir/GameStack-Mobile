import { CustomCheckBox } from "@/components/CustomCheckBox";
import ErrorMessage from "@/components/ErrorMessage";
import { Platform } from "@/components/game/Platform";
import Loader from "@/components/Loader";
import { RootView } from "@/components/RootView";
import { Row } from "@/components/Row";
import SuccessMessage from "@/components/SuccessMessage";
import { ThemedText } from "@/components/ThemedText";
import { statuses } from "@/constants/Games";
import { createEvaluation } from "@/functions/evaluation";
import { findGameBySlug } from "@/functions/game";
import { useAuthToken } from "@/hooks/useAuthToken";
import { useThemeColors } from "@/hooks/useThemeColors";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Image, ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from "react-native";

export default function Review() {
    const colors = useThemeColors();
    const params = useLocalSearchParams();
    const { isPending, isError, data, error } = findGameBySlug(params.slug);
    const [rating, setRating] = useState<number>();
    const [platforms, setPlatforms] = useState<string[]>([]);
    const [hoursPlayed, setHoursPlayed] = useState<number>();
    const [statusId, setStatusId] = useState<number | undefined>(undefined);
    const [review, setReview] = useState("");
    const token = useAuthToken();
    const [errorWhileCreating, setErrorWhileCreating] = useState<any>();
    const [successMessage, setSuccessMessage] = useState<string>();

    if (isPending) {
        return (
            <Loader />
        );
    }

    if (isError) {
        return (
            <RootView>
                <ThemedText>Error: {error.message}</ThemedText>
            </RootView>
        );
    }
    
    const handlePlatform = (platform: string) => {
        if (platforms.includes(platform)) {
            setPlatforms(platforms.filter(p => p !== platform));
        } else {
            setPlatforms([...platforms, platform]);
        }
    }

    const handleStatus = (newStatusId: number) => {
        if (statusId === newStatusId) {
            setStatusId(undefined);
        } else {
            setStatusId(newStatusId);

        }
    }

    const handleSubmit = async () => {
        if(!rating || !platforms.length || !hoursPlayed || !statusId || !review || !token) {
            setErrorWhileCreating("Please fill in all the fields");
            return;
        }

        try {
            const evaluation = await createEvaluation({
                rating: rating,
                platforms: platforms,
                gameTime: hoursPlayed.toString(),
                statusId: statusId,
                description: review,
                gameId: data.id,
                userId: token.id,
            });

            if(evaluation === 'An error occurred') { 
                setErrorWhileCreating(evaluation);
                return;
            }

            setSuccessMessage(evaluation);

            resetAllStates();

        } catch (error) {
            console.error(error);
            setErrorWhileCreating(error);
        }
    
    }

    const resetAllStates = () => {
        setRating(undefined);
        setPlatforms([]);
        setHoursPlayed(undefined);
        setStatusId(undefined);
        setReview("");
    }

    const game = data;
    return (
        <RootView>
            <ScrollView contentContainerStyle={styles.container}>

                <Image source={{ uri: game.image }} style={styles.gameImage} />


                <View style={styles.detailsContainer}>
                    <ThemedText variant="headline" style={{marginBottom: 8}}>
                        {game.name}
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

                <View style={{height: 70}}>
                    {errorWhileCreating && (
                        <ErrorMessage message={errorWhileCreating} />
                    )}
                    {successMessage && (
                        <SuccessMessage message={successMessage} />
                    )}
                </View>

                <View style={styles.formReview}>
                    <ThemedText variant="subtitle">Create your review</ThemedText>
                    <TextInput
                        placeholder="Rate this game (0-10)"
                        keyboardType="numeric"
                        placeholderTextColor={colors.gray}
                        style={styles.numberInput}
                        maxLength={10}
                        onChangeText={text => setRating(parseInt(text))}
                    />

                    <Row gap={8} style={{paddingVertical: 24}}>
                        {game.platforms.map(platform => (
                            <CustomCheckBox 
                                key={platform.name} 
                                label={platform.name} 
                                icon={platform.icon} 
                                value={false} 
                                onPress={() => handlePlatform(platform.name)}
                            />
                        ))}
                    </Row>

                    <TextInput
                        placeholder="How long did you play this game? (in hours)"
                        keyboardType="numeric"
                        placeholderTextColor={colors.gray}
                        style={styles.numberInput}
                        onChangeText={text => setHoursPlayed(parseInt(text))}
                    />

                    <View style={styles.statusGrid}>
                            {statuses.map(status => (
                                <CustomCheckBox 
                                    key={status.name} 
                                    label={status.name} 
                                    icon={status.icon} 
                                    value={statusId === status.id} 
                                    color={status.color}
                                    onPress={() => handleStatus(status.id)}
                                />
                            ))}
                    </View>
                  
                    <TextInput
                        placeholder="Write your review here..."
                        placeholderTextColor={colors.gray}
                        multiline
                        style={styles.textArea}
                        value={review}
                        onChangeText={setReview}
                    />

                    <TouchableOpacity style={styles.addReviewButton} onPress={handleSubmit}>
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
        marginBottom: 8,
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