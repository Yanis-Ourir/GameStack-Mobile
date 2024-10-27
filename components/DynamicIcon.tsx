import { useThemeColors } from "@/hooks/useThemeColors";
import { Ionicons, SimpleLineIcons } from "@expo/vector-icons";

type Props = {
    icon: string | undefined;
    color?: string;
}

type IoniconName = "trash-outline" | "game-controller-outline" | "checkmark-circle" | "add-circle-outline" | "play";


export default function DynamicIcon({ icon, color }: Props) {
    const colors = useThemeColors();

    const iconsConverter: { [key: string]: string } = {
        'IoTrashOutline': 'trash-outline',
        'IoGameControllerOutline': 'game-controller-outline',
        'IoCheckmarkCircleOutline': 'checkmark-circle',
        'IoAddCircleOutline': 'add-circle-outline',
        'IoPlay': 'play',
    }


    if(icon && iconsConverter[icon]) {
        return <Ionicons name={iconsConverter[icon] as IoniconName} size={20} color={color ? color : colors.grayLight} />;
    }

    return <SimpleLineIcons name="screen-desktop" size={20} color={color ? color : colors.grayLight} />;

}