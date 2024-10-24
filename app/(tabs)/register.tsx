import { ButtonInput } from "@/components/ButtonInput";
import { CustomInput } from "@/components/CustomInput";
import { RootView } from "@/components/RootView";
import { ThemedText } from "@/components/ThemedText";
import { useThemeColors } from "@/hooks/useThemeColors";
import { Link } from "expo-router";
import { useState } from "react";
import { Image, StyleSheet, TextInput, View } from "react-native";

export default function Register() {
    const colors = useThemeColors();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // https://www.youtube.com/watch?v=h_vHui2QgnU
    return (
        <RootView>
            <Image source={require("@/assets/images/place_holder_logo.png")} style={styles.logo} />
            <ThemedText variant="headline" style={{ alignSelf: "center", paddingTop: 20 }}>Register</ThemedText>

            <View style={styles.form}>
                <View>
                    <ThemedText>Pseudo : </ThemedText>
                    <TextInput
                        value={email}
                        onChangeText={setEmail}
                        style={[styles.input, { borderColor: colors.grayLight, backgroundColor: colors.inputBackground }]}
                        autoCorrect={false}
                        autoCapitalize="none"
                    />
                </View>
                <View>
                    <ThemedText>Email : </ThemedText>
                    <TextInput
                        value={email}
                        onChangeText={setEmail}
                        style={[styles.input, { borderColor: colors.grayLight, backgroundColor: colors.inputBackground }]}
                        autoCorrect={false}
                        autoCapitalize="none"
                    />
                </View>
                <View>
                    <ThemedText>Password : </ThemedText>
                    <TextInput
                        value={password}
                        onChangeText={setPassword}
                        style={[styles.input, { borderColor: colors.grayLight, backgroundColor: colors.inputBackground }]}
                        secureTextEntry={true}
                        autoCorrect={false}
                        autoCapitalize="none"
                    />
                </View>

        
                <ButtonInput label="Register" onPress={() => { }} style={[styles.button, { backgroundColor: colors.redInput }]} />
                <Link href="/login">
                    <ThemedText style={{ color: colors.gray }}>Already have an account ? </ThemedText>
                </Link>
            </View>



        </RootView>
    );
}

const styles = StyleSheet.create({
    logo: {
        width: 150,
        height: 150,
        alignSelf: "center",
    },
    form: {
        padding: 10,
        margin: 10,
        flex: 1,
        flexDirection: "column",
        gap: 20,
    },
    input: {
        padding: 10,
        margin: 10,
        borderRadius: 50,
        borderWidth: 0.2,
        color: "#FFFF",
    },
    button: {
        padding: 10,
        margin: 10,
        borderRadius: 50,
        borderWidth: 1,
    }
})