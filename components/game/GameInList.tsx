import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { Row } from "../Row";
import { ThemedText } from "../ThemedText";
import { useThemeColors } from "@/hooks/useThemeColors";

type Props = {
    id: number;
    title: string;
    description?: string;
    image?: string;
    status?: string;
}

export function GameInList({ id, title, description, image, status }: Props) {
    const colors = useThemeColors();
    return (
        <TouchableOpacity style={{paddingTop: 12}}>
            <Row>
                <Image
                    source={image ? { uri: image } : require('@/assets/static_images/No-Image-Placeholder.png')}
                    style={styles.image}
                />
                <View style={styles.content}>
                    <ThemedText variant="body">{title}</ThemedText>
                    <ThemedText variant="body2" style={{ color: colors.gray }}>{description ? description : ""}</ThemedText>
                    <ThemedText variant="body2" style={{ color: colors.gray }}>{status ? status : ""}</ThemedText>
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