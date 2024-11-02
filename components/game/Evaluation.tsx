import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { Row } from "../Row";
import DynamicIcon from "../DynamicIcon";
import { Platform } from "./Platform";
import { useThemeColors } from "@/hooks/useThemeColors";
import { ThemedText } from "../ThemedText";
import { EvaluationProps } from "@/functions/evaluation";



export default function EvaluationDetails({ id, rating, description, game_time, status, platforms, user }: EvaluationProps) {
    const colors = useThemeColors();

    const tailwindColorsToHex: { [key: string]: string } = {
        'text-red-400': colors.tint,
        'text-gray-400': colors.gray,
        'text-green-500': colors.green,
    }

    const filteredEvaluations = platforms.filter((evaluation, index) => index < 2);

  

    return (
        <View style={styles.container}>
            <Row>
                {user.image ? (
                    <Image source={{uri: process.env.EXPO_PUBLIC_IMAGE + user.image.url}} style={styles.avatar}/>
                ) : (
                    <Image source={require('@/assets/static_images/icon-default.jpg')} style={styles.avatar} />
                )}
             
                <View style={styles.infoContainer}>
                    <Row gap={8}>
                        <ThemedText variant="body">{user.pseudo}</ThemedText>
                        <Row gap={4}>
                            {filteredEvaluations.map((platform, index) => (
                                <Platform key={index} name={platform.name} icon={platform.icon} />
                            ))}
                        </Row>
                    </Row>
                    <Row style={{}}>
                        <Row gap={4}>
                            <DynamicIcon icon={status.icon} color={status.color}/>
                            <ThemedText variant="body2" style={{ color: tailwindColorsToHex[status.color]}}>{status.name}</ThemedText>
                        </Row>
                        <ThemedText variant="body2" style={{color: colors.gray}}> - {game_time} heures</ThemedText>
                    </Row>
                
                </View>
                <ThemedText variant="headline" style={{ color: colors.tint }}>{rating}</ThemedText>
            </Row>
                    <ThemedText variant="body2" style={{marginTop: 12}}>{description}</ThemedText>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: "gray",
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    infoContainer: {
        marginLeft: 16,
        flex: 1,
    },
});
