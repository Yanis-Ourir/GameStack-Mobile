import React from "react";
import { View, StyleSheet } from "react-native";
import { ThemedText } from "../ThemedText";
import { useThemeColors } from "@/hooks/useThemeColors";
import DynamicIcon from "../DynamicIcon";
import { Row } from "../Row";
import { LinearGradient } from "expo-linear-gradient";

type Props = {
    name: string;
    icon: string;
}

export function Platform({ name, icon }: Props) {
    const platformMapping: { [key: string]: string } = {
        "PlayStation 2": "PS2",
        "PlayStation 3": "PS3",
        "PlayStation 4": "PS4",
        "PlayStation 5": "PS5",
        "Xbox Series S/X": "XSS/XSX",
        "Xbox One": "XOne",
        "Nintendo Switch": "Switch",
    };

    const displayName = platformMapping[name] || name;
    const colors = useThemeColors();

    return (
        <LinearGradient
            colors={['#C31432', 'purple']}
            style={styles.container}
            >
            <Row gap={4}>
                <DynamicIcon icon={icon} />
                <ThemedText variant="body2" style={{color: colors.grayLight}}>{displayName}</ThemedText>
            </Row>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "blue",
        width: "auto",
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 25,
        alignSelf: "flex-start",
    },
    background: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: 300,
    },
});
