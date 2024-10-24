import { useThemeColors } from "@/hooks/useThemeColors";
import { StyleSheet, ViewProps, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


export function RootView({style, ...rest} : ViewProps) {
    const colors = useThemeColors();
    return (
        <SafeAreaView style={[styles.root, {backgroundColor: colors.backgroundColor}, style]} {...rest} />
    )
}


const styles = StyleSheet.create({
    root: {
        flex: 1,
        padding: 4,
    }
})