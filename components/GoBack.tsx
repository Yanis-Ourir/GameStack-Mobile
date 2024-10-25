import { router } from "expo-router";
import { Row } from "./Row";
import { Image, Pressable } from "react-native";
import { ThemedText } from "./ThemedText";

type Props = {
    currentData?: string;
}

export function GoBack({ currentData } : Props) {
    return (
        <Pressable onPress={router.back}>
            <Row gap={8}>
                <Image source={require("../assets/images/Arrow-back.png")} style={{ width: 20, height: 20 }} />
                <ThemedText variant="body2">{currentData ? currentData : "Back"}</ThemedText>
            </Row>
        </Pressable>
    )
}