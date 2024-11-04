import { View, StyleSheet } from 'react-native';
import { ThemedText } from './ThemedText';

export default function SuccessMessage({ message }: { message: string }) {
    return (
        <View style={styles.successContainer}>
            <ThemedText variant="body2" style={styles.successText}>{message}</ThemedText>
        </View>
    );
}

const styles = StyleSheet.create({
    successContainer: {
        backgroundColor: '#22543D', 
        padding: 10,
        borderRadius: 8,
        marginBottom: 8,
        marginTop: 16,
        alignItems: 'center',
    },
    successText: {
        color: '#38A169', 
        fontSize: 20,
        textAlign: 'center',
    },
});
