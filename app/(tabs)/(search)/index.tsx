import { GameDetails } from "@/components/game/GameDetails";
import { RootView } from "@/components/RootView";
import { Row } from "@/components/Row";
import { SearchNavigation } from "@/components/search/SearchNavigation";
import { ThemedText } from "@/components/ThemedText";
import { findTopTenGames, GameProps } from "@/functions/game";
import { useThemeColors } from "@/hooks/useThemeColors";
import { Link } from "expo-router";
import { useState } from "react";
import { FlatList, StyleSheet, TextInput, View } from "react-native";

export default function Search() {
    const colors = useThemeColors();
    const [search, setSearch] = useState("");
    const { isPending, isError, data, error } = findTopTenGames();
    if (isPending) {
        return (
            <RootView style={{ justifyContent: "center", alignItems: "center" }}>
                <ThemedText>Loading...</ThemedText>
            </RootView>
        );
    }

    if(isError) {
        return (
            <RootView style={{ justifyContent: "center", alignItems: "center" }}>
                <ThemedText>Error: {error.message}</ThemedText>
            </RootView>
        );
    }
    const games: GameProps[] = data;
    return (
        <RootView>
            <SearchNavigation/>
            <View>
                <TextInput 
                    placeholder="Search for games, lists, or users" 
                    style={styles.searchInput}
                    value={search} 
                    onChangeText={setSearch}
                />
            </View>

            <FlatList
                data={games}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <GameDetails
                        id={item.id}
                        title={item.name}
                        platforms={item.platforms}
                        tags={item.tags}
                        releaseDate={item.releaseDate}
                        rating={item.rating}
                        image={item.image}
                        slug={item.slug}
                    />
                )}
            />
        </RootView>
    );
}

const styles = StyleSheet.create({
    searchInput: {
        padding: 10,
        margin: 10,
        backgroundColor: "white",
        borderRadius: 10,
    },
});