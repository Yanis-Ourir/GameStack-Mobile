import { GameInList } from "@/components/game/GameInList";
import { GoBack } from "@/components/GoBack";
import Loader from "@/components/Loader";
import { RootView } from "@/components/RootView";
import { Row } from "@/components/Row";
import { ThemedText } from "@/components/ThemedText";
import { findListById } from "@/functions/list";
import { useThemeColors } from "@/hooks/useThemeColors";
import { useLocalSearchParams } from "expo-router";
import { Image, View, FlatList, StyleSheet } from "react-native";

export default function List() {
    const colors = useThemeColors();
    const params = useLocalSearchParams();
    const {isPending, isError, data, error} = findListById(params.id);

    if(isPending) {
        return (
            <Loader />
        );
    }

    if(isError) {
        return (
            <RootView>
                <ThemedText>Error: {error.message}</ThemedText>
            </RootView>
        );
    }

    return (
        <RootView>
            <GoBack currentData="List" />
            <Row gap={8} style={{paddingTop: 24}}>
                <Image source={{ uri: process.env.EXPO_PUBLIC_IMAGE + data.image }} style={{ width: 100, height: 100, borderRadius: 8 }} />
                <View>
                    <ThemedText variant="headline">{data.name}</ThemedText>
                    <Row gap={8}>
                        {data.user?.image && process.env.EXPO_PUBLIC_IMAGE ? (
                            <Image source={{ uri: process.env.EXPO_PUBLIC_IMAGE + data.user.image }} style={styles.profileImage} />
                        ) : (
                            <Image source={require('@/assets/static_images/icon-default.jpg')} style={styles.profileImage} />
                        )}
                        <ThemedText variant="body2" style={{color: colors.grayLight}}>- {data.user.pseudo}</ThemedText>
                    </Row>
                    <ThemedText variant="body" style={{width: 300, color: colors.gray}}>{data.description}</ThemedText>
                    <ThemedText variant="body" style={{ color: colors.gray }}>Last update {new Date(data.updated_at).toLocaleDateString()}</ThemedText>
                </View>
            </Row>

            <Row style={{justifyContent: "space-between", paddingTop: 20, paddingBottom: 20}}>
                <ThemedText variant="subtitle">Games in this list</ThemedText>
                <ThemedText variant="subtitle" style={{color: colors.tint}}>{data.games.length}</ThemedText>
            </Row>

            <FlatList
                data={data.games}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => (
                   <GameInList
                        id={item.id}
                        name={item.name}
                        description={item.description}
                        image={item.image}
                        status={item.status}
                    />
                )}
            />
        </RootView>
    );
}

const styles = StyleSheet.create({
    profileImage: {
        width: 32,
        height: 32,
        borderRadius: 50,
    }
});

