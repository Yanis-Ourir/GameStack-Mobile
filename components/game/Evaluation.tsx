import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { Row } from "../Row";
import DynamicIcon from "../DynamicIcon";
import { Platform } from "./Platform";
import { useThemeColors } from "@/hooks/useThemeColors";
import { ThemedText } from "../ThemedText";

type Props = {
    evaluation: {
        user: {
            avatar?: {
                url: string;
            };
            pseudo: string;
        };
        rating: number;
        status: {
            color: string;
            icon: string;
            name: string;
        };
        game_time: number;
        platforms: {
            name: string;
            icon: string;
        }[];
        description: string;
    };
}

export default function EvaluationDetails({ evaluation }: Props) {
    const colors = useThemeColors();

    const tailwindColorsToHex: { [key: string]: string } = {
        'text-red-400': colors.tint,
        'text-gray-400': colors.gray,
        'text-green-500': colors.green,
    }

    return (
        <View style={styles.container}>
            <Row>
                {evaluation.user.avatar ? (
                    <Image source={{uri: `${process.env.HOST_API}/storage/${evaluation.user.avatar.url}`}} style={styles.avatar}/>
                ) : (
                    <Image source={require('@/assets/static_images/icon-default.jpg')} style={styles.avatar} />
                )}
             
                <View style={styles.infoContainer}>
                    <Row gap={4}>
                        <ThemedText variant="body">{evaluation.user.pseudo}</ThemedText>
                        <Row gap={4}>
                            {evaluation.platforms.map((platform, index) => (
                                <Platform key={index} name={platform.name} icon={platform.icon} />
                            ))}
                        </Row>
                    </Row>
                    <Row style={{}}>
                        <Row gap={4}>
                            <DynamicIcon icon={evaluation.status.icon} color={tailwindColorsToHex[evaluation.status.color]}/>
                            <ThemedText variant="body2" style={{ color: tailwindColorsToHex[evaluation.status.color] }}>{evaluation.status.name}</ThemedText>
                        </Row>
                        <ThemedText variant="body2" style={{color: colors.gray}}> - {evaluation.game_time} heures</ThemedText>
                    </Row>
                
                </View>
                <ThemedText variant="headline" style={{ color: colors.tint }}>{evaluation.rating}</ThemedText>
            </Row>
                    <ThemedText variant="body2" style={{marginTop: 12}}>{evaluation.description}</ThemedText>
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
