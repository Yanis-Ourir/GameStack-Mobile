import { ButtonInput } from "@/components/ButtonInput";
import { RootView } from "@/components/RootView";
import { ThemedText } from "@/components/ThemedText";
import { logout } from "@/functions/auth";
import { useRouter } from "expo-router";

export default function Logout() {

    const router = useRouter();

    async function handleLogout() {
        try {
            await logout();
            router.push("/login");
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <RootView>
            <ThemedText>Logout</ThemedText>
            <ButtonInput label="Logout" onPress={() => handleLogout()} />
        </RootView>
    )
}