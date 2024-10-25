import { Image, StyleSheet, Touchable, TouchableOpacity, View } from "react-native";
import { ThemedText } from "../ThemedText";
import { Row } from "../Row";
import { useThemeColors } from "@/hooks/useThemeColors";


type Props = {
    id: number;
    title: string;
    description: string;
    gameCount: number;
    image?: string;
}


export function ListDetails({ id, title, description, gameCount, image, ...rest }: Props) {
    const colors = useThemeColors();
    return (
        <TouchableOpacity key={id} style={styles.gameListCard} {...rest}>
            <Row>
                <Image source={{ uri: image }} style={styles.gameImage}/>
                <View>
                    <ThemedText variant="body">{title}</ThemedText>
                    <ThemedText variant="body2" style={{color: colors.gray}}>{description}</ThemedText>
                    <ThemedText variant="body2" style={{color: colors.tint}}>Nombre de jeux : {gameCount}</ThemedText>
                </View>
            </Row>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    gameListCard: {
        backgroundColor: '#171923',
        borderRadius: 12,
        marginBottom: 15,
        padding: 10,
        alignItems: 'center',
    },
    gameImage: {
        width: 100,
        height: 100,
        borderRadius: 8,
        marginRight: 10,
    },
})