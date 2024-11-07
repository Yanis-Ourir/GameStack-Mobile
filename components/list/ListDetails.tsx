import { Image, StyleSheet, Touchable, TouchableOpacity, View } from "react-native";
import { ThemedText } from "../ThemedText";
import { Row } from "../Row";
import { useThemeColors } from "@/hooks/useThemeColors";
import { Link } from "expo-router";


type Props = {
    id: string;
    title: string;
    description: string;
    gameCount: number;
    image?: string;
}

const imagePath = process.env.EXPO_PUBLIC_IMAGE;
export function ListDetails({ id, title, description, gameCount, image, ...rest }: Props) {
    const colors = useThemeColors();
    return (
        <Link href={{pathname: "./list/[id]", params: {id: id}}} asChild>
            <TouchableOpacity key={id} style={styles.gameListCard} {...rest}>
                    <Row>
                        <Image source={{ uri: imagePath ? imagePath + image : "" }} style={styles.gameImage}/>
                        <View style={{width: "65%"}}>
                            <ThemedText variant="body">{title}</ThemedText>
                            <ThemedText variant="body2" style={{color: colors.gray}}>{description}</ThemedText>
                        </View>
                        <View>
                            <ThemedText variant="body2" style={{color: colors.gray}}>Games</ThemedText>
                            <ThemedText variant="subtitle" style={{color: colors.tint, textAlign: "center"}}>{gameCount}</ThemedText>
                        </View>
                    </Row>
            </TouchableOpacity>
        </Link>
    )
}

const styles = StyleSheet.create({
    gameListCard: {
        borderRadius: 12,
        padding: 16,
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#333',
    },
    gameImage: {
        width: 100,
        height: 100,
        borderRadius: 10,
        marginRight: 10,
    },
})