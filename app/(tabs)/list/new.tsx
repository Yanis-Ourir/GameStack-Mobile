import { RootView } from "@/components/RootView";
import { ThemedText } from "@/components/ThemedText";
import { useEffect, useState } from "react";
import { Button, Image, StyleSheet, Switch, TextInput, Touchable, TouchableOpacity } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import { createList } from "@/functions/list";
import { Row } from "@/components/Row";
import { useThemeColors } from "@/hooks/useThemeColors";
import { router } from "expo-router";
import { checkToken } from "@/functions/auth";

export default function ListNew() {
    const colors = useThemeColors();
    const [listName, setListName] = useState<string>('');
    const [listDescription, setListDescription] = useState<string>('');
    const [isListPrivate, setIsListPrivate] = useState<boolean>(false);
    const [listImage, setListImage] = useState<string | null>(null);
    const [userId, setUserId] = useState<string | null>(null);
    const [message, setMessage] = useState<string>('');

    useEffect(() => {
        async function fetchData() {
            const token = await checkToken();
            if (!token) {
                router.push('/login');
                return;
            }
            setUserId(token.id);
        }
        fetchData();

    }, []);
    

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.canceled) {
            setListImage(result.assets[0].uri);
        }
    };

    const handleSubmit = async () => {
        console.log('submit');
        if(listName === '' || listDescription === '' || userId === null) {
            return;
        }

        try {
            const newList = await createList(listName, listDescription, isListPrivate, listImage, userId);
            setMessage(newList);
        } catch (error) {
            setMessage(error + 'An error occurred while creating the list');
        }
    }

    return (
        <RootView>
            <ThemedText variant="headline" style={styles.header}>Create a New List</ThemedText>

            {message && <ThemedText style={{color: colors.green}}>{message}</ThemedText>}

            <TextInput
                placeholder="List name"
                placeholderTextColor="#888"
                onChangeText={setListName}
                value={listName}
                style={[styles.input, listName === '' ? styles.inputError : null]}
            />

            <TextInput
                placeholder="List description"
                placeholderTextColor="#888"
                onChangeText={setListDescription}
                value={listDescription}
                style={[styles.input, styles.descriptionInput, listDescription === '' ? styles.inputError : null]}
                multiline
            />

            <Row style={styles.switchRow}>
                <ThemedText>Private List:</ThemedText>
                <Switch
                    trackColor={{ false: '#767577', true: colors.tint }}
                    thumbColor={isListPrivate ? '#81b0ff' : '#f4f3f4'}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={setIsListPrivate}
                    value={isListPrivate}
                    style={styles.switch}
                />
            </Row>

            <TouchableOpacity style={styles.imageButton} onPress={pickImage}>
                <ThemedText style={styles.imageButtonText}>Choose an Image</ThemedText>
            </TouchableOpacity>

            {listImage && <Image source={{ uri: listImage }} style={styles.image} />}

            <TouchableOpacity style={styles.newListButton} onPress={handleSubmit}>
                <ThemedText style={styles.newListText}>Create List</ThemedText>
            </TouchableOpacity>
        </RootView>
    );
}

const styles = StyleSheet.create({
    header: {
        color: '#F5F5F5',
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 20,
    },
    input: {
        backgroundColor: '#171923',
        color: '#F5F5F5',
        padding: 12,
        borderRadius: 12,
        marginVertical: 12,
        borderWidth: 1,
        borderColor: '#444',
        fontSize: 16,
    },
    descriptionInput: {
        height: 80,
        textAlignVertical: 'top', // Align text to the top for multi-line input
    },
    inputError: {
        borderColor: '#C31432', // Rouge pour indiquer une erreur
    },
    switchRow: {
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 20,
    },
    switch: {
        transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }],
    },
    imageButton: {
        backgroundColor: '#444',
        padding: 10,
        borderRadius: 8,
        alignItems: 'center',
        marginVertical: 20,
    },
    imageButtonText: {
        color: '#81b0ff',
        fontSize: 16,
        fontWeight: '600',
    },
    image: {
        width: 200,
        height: 200,
        borderRadius: 8,
        alignSelf: 'center',
        marginVertical: 24,
    },
    newListButton: {
        backgroundColor: '#C31432',
        borderRadius: 50,
        paddingVertical: 15,
        paddingHorizontal: 30,
        alignItems: 'center',
        marginVertical: 32,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.25,
        shadowRadius: 10,
        elevation: 5,
    },
    newListText: {
        color: '#F5F5F5',
        fontSize: 18,
        fontWeight: 'bold',
    },
});