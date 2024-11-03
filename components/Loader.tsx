import React from 'react';
import { ActivityIndicator, StyleSheet, View, Text } from 'react-native';
import { RootView } from './RootView';
import { useThemeColors } from '@/hooks/useThemeColors';

export default function Loader() {
    const colors = useThemeColors();

    return (
        <RootView style={styles.container}>
            <ActivityIndicator size="large" color={colors.tint} />
            <Text style={[styles.loadingText, { color: colors.grayLight }]}>Loading...</Text>
        </RootView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#11131F',
    },
    loadingText: {
        marginTop: 10,
        fontSize: 18,
        fontWeight: 'bold',
    },
});