import { findBySearch, GameProps } from "@/functions/game";
import { useEffect, useState } from "react";
import Loader from "../Loader";
import { GameDetails } from "./GameDetails";
import { isLoading } from "expo-font";
import { FlatList, View } from "react-native";
import { ThemedText } from "../ThemedText";
import { RootView } from "../RootView";

interface SearchGameDetailsProps {
    gameName: string;
}

export default function SearchGameDetails({ gameName }: SearchGameDetailsProps) {
    const [games, setGames] = useState<GameProps[]>([]);
    const {isPending, isError, data, error} = findBySearch(gameName);

    useEffect(() => {
        if (data) {
            setGames(data);
        }
    }, [data]);

    if (isPending) {
        return <Loader />;
    }

    if(isError) {
        return (
            <RootView style={{ justifyContent: "center", alignItems: "center" }}>
                <ThemedText>Error: {error.message}</ThemedText>
            </RootView>
        );
    }

   



    return (
        <View>
            {games.length > 0 ? (
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
                <ThemedText variant="body" style={{marginTop: 24}}>No game found for {gameName} try another name</ThemedText>
            )}
        </View>
    );
}