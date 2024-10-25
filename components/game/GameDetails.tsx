import { Image, StyleSheet, View, TouchableOpacity } from "react-native";
import { Row } from "../Row";
import { ThemedText } from "../ThemedText";
import { useThemeColors } from "@/hooks/useThemeColors";

type Props = {
    id: number;
    title: string;
    platforms: string;
    tags: string;
    releaseDate: string;
    rating: number;
    image?: string;
}


export function GameDetails({id, title, platforms, tags, releaseDate, rating, image}: Props) {
    const colors = useThemeColors();
    return (
        <TouchableOpacity>
            <Row style={styles.game}>
                    <Image
                        source={image ? { uri: image } : require('@/assets/static_images/No-Image-Placeholder.png')}
                        style={styles.image}
                    />
                    <View style={styles.content}>
                        <ThemedText variant="body">{title}</ThemedText>
                        <ThemedText variant="body2">{platforms}</ThemedText>
                        <ThemedText variant="body2" style={{color: colors.gray}}>{tags}</ThemedText>
                        <ThemedText variant="body2" style={{ color: colors.gray }}>{releaseDate}</ThemedText>
                    </View>
                        <ThemedText variant="subtitle" style={{color: colors.tint}}>{rating}</ThemedText>
            </Row>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    game: {
        margin: 5,
    },
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