import { GameDetails } from "@/components/game/GameDetails";
import SearchGameDetails from "@/components/game/SearchGameDetails";
import Loader from "@/components/Loader";
import { RootView } from "@/components/RootView";
import { SearchNavigation } from "@/components/search/SearchNavigation";
import { ThemedText } from "@/components/ThemedText";
import { findTopTenGames, GameProps } from "@/functions/game";
import { useThemeColors } from "@/hooks/useThemeColors";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, TextInput, View } from "react-native";

export default function Search() {
    const colors = useThemeColors();
    const [search, setSearch] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState(search);
    const { isPending, isError, data, error } = findTopTenGames();

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearch(search);
        }, 2000); 

        return () => clearTimeout(handler); 
    }, [search]);

    

    if (isPending) {
        return (
            <Loader />
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
            
            <View style={{borderBottomWidth: 1, borderColor: colors.gray}}>
                <TextInput 
                    placeholder="Search for games, lists, or users"
                    placeholderTextColor={colors.gray}
                    style={[styles.searchInput]}
                    value={search} 
                    onChangeText={setSearch}
                />
            </View>

            {!search ? (
                <FlatList
                    data={games}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <GameDetails
                            id={item.id}
                            name={item.name}
                            platforms={item.platforms}
                            tags={item.tags}
                            releaseDate={item.release_date}
                            rating={item.rating}
                            image={item.image}
                            slug={item.slug}
                        />
                    )}
                />
            ) : (
                <SearchGameDetails gameName={debouncedSearch} />
            )}
            
        </RootView>
    );
}

const styles = StyleSheet.create({
    searchInput: {
        padding: 10,
        margin: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#444',
        backgroundColor: '#171923',
        color: '#F5F5F5',
    },
});