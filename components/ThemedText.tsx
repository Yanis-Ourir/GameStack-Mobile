import { StyleSheet, Text, TextProps, TextStyle } from "react-native"
import { useThemeColors } from "../hooks/useThemeColors";
import { Colors } from "../constants/Colors";
import { Platform } from "react-native";

const styles = StyleSheet.create({
    body: {
        fontSize: 16,
    },
    body2: {
        fontSize: 14,
    },
    headline: {
        fontSize: 36,
        lineHeight: 32,
        fontWeight: "bold"
    },
    subtitle: {
        fontSize: 24,
    },
});

type Props = TextProps & {
    variant?: keyof typeof styles,
    color?: keyof typeof Colors["light"]
    style?: TextStyle
}


export function ThemedText({ variant, color, style, ...rest }: Props) {
    const colors = useThemeColors();
    return <Text style={[styles[variant ?? 'body'], { color: colors[color ?? "grayLight"] }, style]} {...rest} />
}

