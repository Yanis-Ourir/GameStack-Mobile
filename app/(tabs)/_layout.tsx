import { Tabs } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useThemeColors } from '@/hooks/useThemeColors';

export default function TabLayout() {
    const colors = useThemeColors();
    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: colors.redInput,
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: colors.tabColor,
                },
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Home',
                    tabBarIcon: ({ color, focused }) => (
                        <Ionicons name={focused ? 'home-sharp' : 'home-outline'} color={color} size={24} />
                    ),
                }}
            />
            <Tabs.Screen
                name="(search)"
                options={{
                    title: 'search',
                    tabBarIcon: ({ color, focused }) => (
                        <Ionicons name={focused ? 'search' : 'search-outline'} color={color} size={24} />
                    ),
                }}
            />
        </Tabs>
    );
}