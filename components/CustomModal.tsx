import { Modal, StyleSheet, View, TouchableOpacity, TouchableWithoutFeedback } from "react-native";
import { ThemedText } from "./ThemedText";
import { useThemeColors } from "@/hooks/useThemeColors";
import { Row } from "./Row";
import { Ionicons } from "@expo/vector-icons";


type Props = {
    modalName: string;
    modalVisible: boolean;
    setModalVisible: (visible: boolean) => void;
    onPressEdit: () => void;
    onPressDelete: () => void;
}

export function CustomModal({ modalName, modalVisible, setModalVisible, onPressEdit, onPressDelete }: Props) {
    const colors = useThemeColors();
    return (
        <View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <TouchableWithoutFeedback onPress={() => setModalVisible(!modalVisible)}>
                    <View style={styles.centeredView}>
                        <View style={[styles.modalView, {backgroundColor: colors.backgroundColor}]}>
                        <TouchableOpacity onPress={onPressEdit}>
                            <Row>
                                <Ionicons name="create-outline" size={24} color={colors.grayLight} />
                                <ThemedText variant="body2" style={{color: colors.grayLight}}>
                                    Edit {modalName}
                                </ThemedText>
                            </Row>
                        </TouchableOpacity>

                            <TouchableOpacity onPress={onPressDelete}>
                                <Row>
                                    <Ionicons name="trash-outline" size={24} color={colors.tint} />
                                    <ThemedText variant="body2" style={{color: colors.tint}}>
                                        Delete {modalName}
                                    </ThemedText>
                                </Row>
                            </TouchableOpacity>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
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
        elevation: 5,
        gap: 24
    },
    openButton: {
        backgroundColor: "#F194FF",
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    }
});