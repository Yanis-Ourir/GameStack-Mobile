import { useThemeColors } from "@/hooks/useThemeColors";
import { Ionicons, SimpleLineIcons } from "@expo/vector-icons";


export default function DynamicIcon({ icon }: { icon: string | undefined }) {
    // @ts-ignore

    if(icon === 'IoGameControllerOutline') {
        return <Ionicons name="game-controller-outline" size={20} color="white" />;
    }

    return <SimpleLineIcons name="screen-desktop" size={20} color="white" />;

}