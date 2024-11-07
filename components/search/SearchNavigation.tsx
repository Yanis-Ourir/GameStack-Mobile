import { Link } from "expo-router"
import { Row } from "../Row"
import { ThemedText } from "../ThemedText"
import { StyleSheet, TextInput, View } from "react-native"

export function SearchNavigation() {
    return (
         <>
            <Row style={styles.container}>
                <Link href="/">
                    <ThemedText variant="subtitle">Games</ThemedText>
                </Link>
                <Link href="/(search)/list">
                    <ThemedText variant="subtitle">Lists</ThemedText>
                </Link>
                <Link href="/(search)/recommendation">
                    <ThemedText variant="subtitle">Reco</ThemedText>
                </Link>
            </Row>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: "space-around",
        alignItems: "center",
    },
    searchInput: {
        padding: 10,
        margin: 10,
        backgroundColor: "white",
        borderRadius: 10,
    },
});