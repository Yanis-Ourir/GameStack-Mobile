import { ButtonInput } from "@/components/ButtonInput";
import { CustomInput } from "@/components/CustomInput";
import { RootView } from "@/components/RootView";
import { Row } from "@/components/Row";
import SuccessMessage from "@/components/SuccessMessage";
import { ThemedText } from "@/components/ThemedText";
import { login } from "@/functions/auth";
import { useThemeColors } from "@/hooks/useThemeColors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Link, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Image, StyleSheet, TextInput, View } from "react-native";

export default function Login() {
    const router = useRouter();
    const colors = useThemeColors();
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [successRegister, setSuccessRegister] = useState<string>("");

    useEffect(() => {
        async function checkRegistration() {
            const registration = await AsyncStorage.getItem('success');
            if (registration) {
                setSuccessRegister("Registration successful");
                await AsyncStorage.removeItem('success');
            }
        }
        checkRegistration();
    }, [])

    function handleSubmit() {
        try {
            login(email, password);
            router.push("/");
        } catch (error) {
            console.error(error);
        }
    }

    // https://www.youtube.com/watch?v=h_vHui2QgnU
    return (
        <RootView>
            <Image source={require("@/assets/images/place_holder_logo.png")} style={styles.logo} />
            <ThemedText variant="headline" style={{alignSelf: "center"}}>Login</ThemedText>

            {successRegister && <SuccessMessage message={successRegister}/>}

            <View style={styles.form}>
                <View>
                    <ThemedText>Email : </ThemedText>
                    <TextInput 
                        value={email} 
                        onChangeText={setEmail} 
                        style={[styles.input, {borderColor: colors.grayLight, backgroundColor: colors.inputBackground}]}
                        autoCorrect={false}
                        autoCapitalize="none"
                        />
                </View>
                <View>
                    <ThemedText>Password : </ThemedText>                
                    <TextInput 
                        value={password} 
                        onChangeText={setPassword} 
                        style={[styles.input, { borderColor: colors.grayLight, backgroundColor: colors.inputBackground}]}
                        secureTextEntry={true}
                        autoCorrect={false}
                        autoCapitalize="none"
                        />
                </View>

                <ButtonInput label="Login" onPress={() => handleSubmit()} style={[styles.button, { backgroundColor: colors.redInput }]} />

                <Row style={{alignSelf: "center"}}>
                    <ThemedText style={{ color: colors.gray }}>Don't have an account yet ? </ThemedText>
                    <Link href="/register">
                        <ThemedText style={{ color: colors.tint, textDecorationLine: "underline" }}>Sign in</ThemedText>
                    </Link>
                </Row>


            </View>

           

        </RootView>    
    );
}

const styles = StyleSheet.create({
    logo: {
        width: 150,
        height: 150,
        alignSelf: "center",
        marginTop: 50,
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