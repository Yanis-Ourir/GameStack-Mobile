import { View, Text, StyleSheet } from 'react-native';
import { ThemedText } from './ThemedText';

export default function ErrorMessage({ message }: { message: string }) {
    return (
        <View style={styles.errorContainer}>
            <ThemedText variant="body2" style={styles.errorText}>{message}</ThemedText>
        </View>
    );
}

const styles = StyleSheet.create({
    errorContainer: {
        backgroundColor: '#742A2A',
        padding: 10,
        borderRadius: 8,
        marginBottom: 8,
        alignItems: 'center',
    },
    errorText: {
        color: '#F56565',
        fontSize: 20,
        textAlign: 'center',
    },
});
