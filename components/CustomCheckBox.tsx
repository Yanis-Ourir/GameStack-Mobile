import { useEffect, useState } from "react";
import { Pressable, StyleSheet, ViewProps } from "react-native";
import { ThemedText } from "./ThemedText";
import { useThemeColors } from "@/hooks/useThemeColors";
import DynamicIcon from "./DynamicIcon";
import { Row } from "./Row";
import { platformMapping } from "@/functions/platform";

type Props = ViewProps & {
    label: string;
    icon: string;
    value: boolean;
    color?: string;
    onPress?: () => void;
}


export function CustomCheckBox({ label, icon, value, color, onPress, ...rest }: Props) {
    const colors = useThemeColors();
    const [checked, setChecked] = useState(value);
    const displayName = platformMapping(label);

    useEffect(() => {
        setChecked(value);
    }, [value]);
 
    return (
        <Pressable 
            role="checkbox"
            aria-checked={value}
            style={[styles.checkboxBase, { ...rest }, checked && {backgroundColor: colors.tint, borderColor: colors.tint}]}
            onPress={() => {
                if (onPress) onPress();
                setChecked(!checked);
            }}
        >
            <Row gap={4}>
                <DynamicIcon icon={icon} color={color ? color : ""} />
                <ThemedText variant="body">{displayName}</ThemedText>
            </Row>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    checkboxBase: {
        paddingHorizontal: 10,
        paddingVertical: 6,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        borderWidth: 2,
        borderColor: '#fff',
    },
});