import { View, ViewProps } from "react-native";

export function Card({style, ...rest}: ViewProps) {
    return (
        <View style={[styles.card, style]} {...rest} />
    )
}

const styles = {
    card: {
        borderRadius: 10,
        padding: 10,
        border: "1px solid #FFFF",
    }
}