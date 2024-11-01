import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { Row } from "../Row";
import { ThemedText } from "../ThemedText";
import { useThemeColors } from "@/hooks/useThemeColors";
import { StatusProps } from "./GameReview";

type Props = {
    id: number;
    name: string;
    description?: string;
    image?: string;
    status?: StatusProps;
}

export function GameInList({ id, name, description, image, status }: Props) {
    const colors = useThemeColors();
    return (
        <TouchableOpacity style={{paddingTop: 12}}>
            <Row>
                <Image
                    source={image ? { uri: image } : require('@/assets/static_images/No-Image-Placeholder.png')}
                    style={styles.image}
                />
                <View style={styles.content}>
                    <ThemedText variant="body">{name}</ThemedText>
                    <ThemedText variant="body2" style={{ color: colors.gray }}>{description ? description : ""}</ThemedText>
                    <ThemedText variant="body2" style={{ color: colors.gray }}>{status ? status.name : ""}</ThemedText>
                </View>
            </Row>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    image: {
        width: 100,
        height: 100,
        borderRadius: 10,
    },
    content: {
        flex: 1,
        marginLeft: 10,
    }
})