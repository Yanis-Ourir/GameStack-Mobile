import { GameDetails } from "@/components/game/GameDetails";
import { RootView } from "@/components/RootView";
import { Row } from "@/components/Row";
import { SearchNavigation } from "@/components/search/SearchNavigation";
import { ThemedText } from "@/components/ThemedText";
import { games } from "@/constants/Games";
import { useThemeColors } from "@/hooks/useThemeColors";
import { Link } from "expo-router";
import { useState } from "react";
import { FlatList, StyleSheet, TextInput, View } from "react-native";

export default function Search() {
    const colors = useThemeColors();
    const [search, setSearch] = useState("");
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
                        title={item.title}
                        platforms={item.platforms}
                        tags={item.tags}
                        releaseDate={item.releaseDate}
                        rating={item.rating}
                        image={item.image}
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