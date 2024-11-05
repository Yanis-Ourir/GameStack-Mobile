import { Stack, Tabs } from 'expo-router';
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
                    title: 'Search',
                    tabBarIcon: ({ color, focused }) => (
                        <Ionicons name={focused ? 'search' : 'search-outline'} color={color} size={24} />
                    ),
                }}
            />

            <Tabs.Screen
                name="(profil)"
                options={{
                    title: 'Profile',
                    tabBarIcon: ({ color, focused }) => (
                        <Ionicons name={focused ? 'person' : 'person-outline'} color={color} size={24} />
                    ),
                }}
            />

            <Tabs.Screen
                name="register"
                options={{
                    href: null
                }}
            />

            <Tabs.Screen
                name="login"
                options={{
                    href: null
                }}
            /> 

            <Tabs.Screen
                name="list/[id]"
                options={{
                    href: null
                }}
            />
 
            <Tabs.Screen
                name="game/[slug]"
                options={{
                    href: null
                }}
            /> 

            <Tabs.Screen
                name="evaluation/[slug]"
                options={{
                    href: null
                }}
            />

            <Tabs.Screen
                name="list/new"
                options={{
                    href: null
                }}
            />
        </Tabs>
    );
}