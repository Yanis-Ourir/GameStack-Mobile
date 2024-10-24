import { useThemeColors } from "@/hooks/useThemeColors";
import { StyleSheet, TextInput, ViewProps } from "react-native";

type Props = ViewProps & {
    label: string;
    placeholder?: string;
    value?: string;
    onChangeText?: (value: string) => void;
}

const colors = useThemeColors();

export function CustomInput({label, placeholder, value, style}: Props) {
    return (
        <>
            <label>{label}</label>
            <TextInput value={value} placeholder={placeholder} style={[styles.input, style]}/>
        </>
    );
}

const styles = StyleSheet.create({
    input: {
        padding: 10,
        margin: 10,
        borderRadius: 50,
        borderWidth: 1,
        borderColor: colors.grayLight,
        color: "#FFFF",
    }
});