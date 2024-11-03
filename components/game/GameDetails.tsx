import { Image, StyleSheet, View, TouchableOpacity } from "react-native";
import { Row } from "../Row";
import { ThemedText } from "../ThemedText";
import { useThemeColors } from "@/hooks/useThemeColors";
import { Platform } from "./Platform";
import { Link } from "expo-router";

type Props = {
    id: number;
    name: string;
    platforms?: Platform[];
    tags?: string[];
    releaseDate: string;
    rating: number;
    image?: string;
    slug: string;
}

type Platform = {
    name: string;
    icon: string;
}


export function GameDetails({id, name, platforms, tags, releaseDate, rating, image, slug}: Props) {
    const colors = useThemeColors();
    
    const platformsFiltered = (platforms ?? []).filter((platform, index) => index < 2);

    return (
        <Link href={`/game/${slug}`} asChild>
        <TouchableOpacity>
            <Row style={styles.game}>
                    <Image
                        source={image ? { uri: image } : require('@/assets/static_images/No-Image-Placeholder.png')}
                        style={styles.image}
                    />
                    <View style={styles.content}>
                        <ThemedText variant="body">{name}</ThemedText>
                        <Row gap={8} style={{paddingVertical: 12}}>
                        {platformsFiltered && platformsFiltered.map((platform) => (
                            <Platform key={platform.name} name={platform.name} icon={platform.icon} />
                        ))}
                        </Row>
                        <Row gap={8}>
                            <ThemedText variant="body2" style={{color: colors.gray}}>{tags?.join(', ')}</ThemedText>
                            <ThemedText variant="body2" style={{ color: colors.tint }}>{releaseDate}</ThemedText>
                        </Row>
                    </View>
                        <ThemedText variant="subtitle" style={{color: colors.tint}}>{rating}</ThemedText>
            </Row>
        </TouchableOpacity>
        </Link>
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