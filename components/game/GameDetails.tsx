import { Image, StyleSheet, View } from "react-native";
import { Row } from "../Row";
import { ThemedText } from "../ThemedText";

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
    return (
        <Row>
            <Image
                source={image ? { uri: image } : require('@/assets/static_images/No-Image-Placeholder.png')}
                style={styles.image}
            />
            <View style={styles.content}>
                <ThemedText variant="subtitle">{title}</ThemedText>
                <ThemedText variant="body">{platforms}</ThemedText>
                <ThemedText variant="body">{tags}</ThemedText>
                <ThemedText variant="body">{releaseDate}</ThemedText>
            </View>
                <ThemedText variant="body">{rating}</ThemedText>
        </Row>
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