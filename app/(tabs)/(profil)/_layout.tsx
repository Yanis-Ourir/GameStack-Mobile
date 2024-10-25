import { Row } from '@/components/Row';
import { ThemedText } from '@/components/ThemedText';
import { Link, Stack } from 'expo-router';
import { TextInput, View } from 'react-native';

export default function ProfilLayout() {
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" />
        </Stack>
    );
}