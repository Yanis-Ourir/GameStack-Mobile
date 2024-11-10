import { useEffect, useState } from "react";
import { RootView } from "@/components/RootView";
import { ThemedText } from "@/components/ThemedText";
import { findGamesRecommendation, GameProps } from "@/functions/game";
import { GameDetails } from "@/components/game/GameDetails";
import { checkToken } from "@/functions/auth";
import { router } from "expo-router";
import Loader from "@/components/Loader";
import { SearchNavigation } from "@/components/search/SearchNavigation";
import { StyleSheet, TextInput, View } from "react-native";
import { useThemeColors } from "@/hooks/useThemeColors";

export default function Recommendation() {
    const colors = useThemeColors();
    const [games, setGames] = useState<GameProps[] | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
    const [search, setSearch] = useState("");

    useEffect(() => {
        async function fetchData() {
            const token = await checkToken();
            if (!token) {
                router.push('/login');
                return;
            }

            try {
                const response = await findGamesRecommendation(token.id);
                if (typeof response === 'string') {
                    setError(new Error(response));
                } else {
                    setGames(response);
                }
            } catch (error: any) {
                setError(error);
            } finally {
                setIsLoading(false);
            }
        }
        fetchData();
    }, []);

    if(isLoading) {
        return (
            <Loader />
        );
    }

    return (
        <RootView>
            <SearchNavigation/>
            <View style={{ borderBottomWidth: 1, borderColor: colors.gray }}>
                <TextInput
                    placeholder="Search for games, lists, or users"
                    placeholderTextColor={colors.gray}
                    style={[styles.searchInput]}
                    value={search}
                    onChangeText={setSearch}
                />
            </View>

            {error && (
                <ThemedText>Error: {error.message}</ThemedText>
            )}

            {games && games.length > 0 ? games.map((game) => (
                <GameDetails
                    key={game.id}
                    id={game.id}
                    name={game.name}
                    platforms={game.platforms}
                    tags={game.tags}
                    releaseDate={game.release_date}
                    rating={game.rating}
                    image={game.image}
                    slug={game.slug}
                />
            )) : (
                <ThemedText style={{alignSelf: "center", paddingTop: 12}}>No recommendations yet! Rate some games to get started.</ThemedText>
            )}
        </RootView>
    )
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