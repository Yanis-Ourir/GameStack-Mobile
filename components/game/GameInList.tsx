import { Image, Modal, StyleSheet, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { Row } from "../Row";
import { ThemedText } from "../ThemedText";
import { useThemeColors } from "@/hooks/useThemeColors";
import { StatusProps } from "./GameReview";
import { Ionicons } from "@expo/vector-icons";
import { useAuthToken } from "@/hooks/useAuthToken";
import { useEffect, useState } from "react";
import { checkToken } from "@/functions/auth";
import { CustomModal } from "../CustomModal";
import { statuses } from "@/constants/Games";
import { CustomCheckBox } from "../CustomCheckBox";
import addReview from "@/functions/review";
import SuccessMessage from "../SuccessMessage";
import ErrorMessage from "../ErrorMessage";
import DynamicIcon from "../DynamicIcon";

type Props = {
    id: number;
    listId: string;
    name: string;
    description?: string;
    image?: string;
    status?: StatusProps;
    userId?: string;
    onPressDelete: () => void;
}

export function GameInList({ id, listId, name, description, image, status, userId, onPressDelete }: Props) {
    console.log(status);
    console.log(description);
    const [isUser, setIsUser] = useState(false);
    const colors = useThemeColors();
    const [modalVisible, setModalVisible] = useState(false);
    const [updateModalVisible, setUpdateModalVisible] = useState(false);
    const [statusId, setStatusId] = useState<number | undefined>(status ? status.id : undefined);
    const [newDescription, setNewDescription] = useState<string | undefined>(description ? description : "");
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const tailwindColorsToHex: { [key: string]: string } = {
        'text-red-400': colors.tint,
        'text-gray-400': colors.gray,
        'text-green-500': colors.green,
    }


    useEffect(() => {
        async function checkUser() {
        const token = await checkToken(); 
            if (token && token.id === userId) {
                setIsUser(true);
            }
        }
        checkUser();   
    }, []);

    function onPressEdit() {
        setModalVisible(!modalVisible);
        setUpdateModalVisible(!updateModalVisible);
    }

    const handleStatus = (newStatusId: number) => {
        if (statusId === newStatusId) {
            setStatusId(undefined);
        } else {
            setStatusId(newStatusId);

        }
    }

    const handleSubmit = async () => {
        if(!statusId) {
            setErrorMessage('Please select a status');
            return;
        }
    
        try {
            const response = await addReview({ 
                description: newDescription ? newDescription : "",
                gameId: id, 
                gameListId:  listId, 
                statusId: statusId
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            setSuccessMessage('Review successfully added');
            setErrorMessage('');

        } catch (error) {
            console.error('Error:', error);
            setErrorMessage('Error while adding the review');
            setSuccessMessage('');
        }
    }
    
    return (
        <TouchableOpacity style={{paddingTop: 12}}>
            <Row>
                <Image
                    source={image ? { uri: image } : require('@/assets/static_images/No-Image-Placeholder.png')}
                    style={styles.image}
                />
                <View style={styles.content}>
                    <ThemedText variant="body">{name}</ThemedText>
                    <ThemedText variant="body2" style={{ color: colors.gray }}>{description ? description : ""}</ThemedText>
                    <Row style={{paddingTop: 24}}>
                        <DynamicIcon icon={status ? status.icon : ""} color={status ? status.color : colors.gray} />
                        <ThemedText variant="body2" style={{ color: status ? tailwindColorsToHex[status.color] : colors.gray }}>{status ? status.name : ""}</ThemedText>
                    </Row>
                </View>
                {isUser && (
                    <>
                        <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
                            <Ionicons name="ellipsis-vertical" size={24} color={colors.gray} />
                        </TouchableOpacity>

                        <CustomModal 
                            modalName={name} 
                            modalVisible={modalVisible} 
                            setModalVisible={() => setModalVisible(!modalVisible)}  
                            onPressEdit={() => onPressEdit()}
                            onPressDelete={() => onPressDelete()}
                        />

                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={updateModalVisible}
                            onRequestClose={() => {
                                setModalVisible(!updateModalVisible);
                            }}
                        >
                            <TouchableWithoutFeedback onPress={() => setUpdateModalVisible(!updateModalVisible)}>
                                <View style={styles.centeredView}>
                                    <View style={[styles.modalView, {backgroundColor: colors.backgroundColor}]}>
                                    <ThemedText variant="subtitle">Edit {name}</ThemedText>

                                        <View style={{ height: 70, paddingTop: 12 }}>
                                            {errorMessage && (
                                                <ErrorMessage message={errorMessage} />
                                            )}
                                            {successMessage && (
                                                <SuccessMessage message={successMessage} />
                                            )}
                                        </View>

                                        <View style={styles.statusGrid}>
                                            {statuses.map(status => (
                                                <CustomCheckBox
                                                    key={status.name}
                                                    label={status.name}
                                                    icon={status.icon}
                                                    value={statusId === status.id}
                                                    color={status.color}
                                                    onPress={() => handleStatus(status.id)}
                                                />
                                            ))}
                                        </View>

                                        <TextInput
                                            placeholder="Write your review here..."
                                            placeholderTextColor={colors.gray}
                                            multiline
                                            style={styles.textArea}
                                            value={newDescription ? newDescription : description}
                                            onChangeText={setNewDescription}
                                        />
                                        
                                        <TouchableOpacity style={styles.addReview} onPress={() => handleSubmit()}>
                                            <ThemedText variant="body" style={styles.addReviewText}>Update</ThemedText>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </TouchableWithoutFeedback>
                        </Modal>
                    </>
                )}
            </Row>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    image: {
        width: 100,
        height: 100,
        borderRadius: 10,
    },
    content: {
        flex: 1,
        marginLeft: 10,
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalView: {
        margin: 20,
        borderRadius: 20,
        padding: 35,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    statusGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
        paddingVertical: 12,
        justifyContent: 'center'
    },
    textArea: {
        backgroundColor: '#171923',
        color: '#f5f5f5',
        padding: 10,
        borderRadius: 8,
        marginVertical: 10,
        borderWidth: 1,
        borderColor: '#333',
        height: 100,

    },
    addReview: {
        backgroundColor: '#C31432',
        borderRadius: 50,
        padding: 15,
        alignItems: 'center',
        marginTop: 10,
    },
    addReviewText: {
        color: '#F5F5F5',
        fontSize: 16,
        fontWeight: 'bold',
    },


})