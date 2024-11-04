import { RootView } from "@/components/RootView";
import { ThemedText } from "@/components/ThemedText";
import { checkToken } from "@/functions/auth";
import { editUser, findUserById, UserProps } from "@/functions/user";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import * as ImagePicker from 'expo-image-picker';
import { Image, StyleSheet, TouchableOpacity, TextInput, View } from "react-native";
import ErrorMessage from "@/components/ErrorMessage";
import SuccessMessage from "@/components/SuccessMessage";
import { GoBack } from "@/components/GoBack";

export default function Edit() {
    const [user, setUser] = useState<UserProps>();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
    const [userImage, setUserImage] = useState<string | null>(null);
    const [pseudo, setPseudo] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [successMessage, setSuccessMessage] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string>('');

    useEffect(() => {
        async function fetchData() {
            const token = await checkToken();
            if (!token) {
                router.push('/login');
                return;
            }
            try {
                const user = await findUserById(token.id);
                setUser(user);
            } catch (error: any) {
                setError(error);
            } finally {
                setIsLoading(false);
            }
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

        if (!result.canceled) {
            setUserImage(result.assets[0].uri);
        }
    };

    const handleSubmit = async () => {
        console.log(pseudo, description, user);
        if(pseudo === '' || description === '' || user === undefined) {
            setErrorMessage('Some fields are missing');
            return;
        }

        try {
            const response = await editUser({
                profilPseudo: pseudo,
                profilDescription: description,
                profilImage: userImage,
                userId: user.id,
            });

            setSuccessMessage(response);
            setErrorMessage('');
        } catch (error: any) {
            setErrorMessage(error.message);
            setSuccessMessage('');
        }
    };



    return (
        <RootView>
            <GoBack currentData="profil" />
            <ThemedText variant="headline" style={{alignSelf: "center", marginBottom: 24}}>Update Profil</ThemedText>

            <View style={{ height: 70 }}>
                {errorMessage && (
                    <ErrorMessage message={errorMessage} />
                )}
                {successMessage && (
                    <SuccessMessage message={successMessage} />
                )}
            </View>

            <TextInput 
                placeholder="Pseudo" 
                value={pseudo ? pseudo : user?.pseudo} 
                onChangeText={setPseudo}
                style={styles.input}
            />

            <TextInput 
                placeholder="Description"
                placeholderTextColor={'#444'} 
                value={user?.description} 
                onChangeText={setDescription}
                style={styles.input}
                multiline={true}
            />

            <TouchableOpacity style={styles.imageButton} onPress={pickImage}>
                <ThemedText style={styles.imageButtonText}>Choose an profil picture</ThemedText>
            </TouchableOpacity>

            {userImage ? (<Image source={{ uri: userImage }} style={styles.image} />) : (user?.image ? (
                <Image source={{ uri: process.env.EXPO_PUBLIC_IMAGE + user.image.url }} style={styles.image} />
            ) : (
                <Image source={require('@/assets/static_images/icon-default.jpg')} style={styles.image} />
            )
            )}

            <TouchableOpacity style={styles.editButton} onPress={handleSubmit}>
                <ThemedText style={styles.editButtonText}>Edit profil</ThemedText>
            </TouchableOpacity>
        </RootView>
    );
}

const styles = StyleSheet.create({
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
    editButton: {
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
    editButtonText: {
        color: '#F5F5F5',
        fontSize: 18,
        fontWeight: 'bold',
    },
});