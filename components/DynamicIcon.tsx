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

    const tailwindColorsToHex: { [key: string]: string } = {
        'text-red-400': colors.tint,
        'text-gray-400': colors.gray,
        'text-green-500': colors.green,
    }


    if(icon && iconsConverter[icon]) {
        return <Ionicons name={iconsConverter[icon] as IoniconName} size={20} color={color ? tailwindColorsToHex[color] : colors.grayLight} />;
    }

    return <SimpleLineIcons name="screen-desktop" size={20} color={color ? tailwindColorsToHex[color] : colors.grayLight} />;

}