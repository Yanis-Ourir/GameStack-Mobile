import { useThemeColors } from "@/hooks/useThemeColors";
import { Button, Pressable, StyleSheet, ViewProps } from "react-native";
import { ThemedText } from "./ThemedText";

type Props = ViewProps & {
    label: string;
    onPress: () => void;
}

export function ButtonInput({label, style, onPress, ...rest}: Props) {
    const colors = useThemeColors();
    return (
        <Pressable onPress={onPress} style={[styles.button, style, {backgroundColor: colors.redInput}]} {...rest}>
            <ThemedText variant="subtitle" style={{alignSelf: "center"}}>{label}</ThemedText>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    button: {
        padding: 10,
        margin: 10,
        borderRadius: 50,
        borderWidth: 1,
    }
})