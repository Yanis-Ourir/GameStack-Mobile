import { useQuery, UseQueryResult } from "@tanstack/react-query";

export type GameProps = {
    id: number;
    name: string;
    description: string;
    image?: string;
    slug: string;
    releaseDate: string;
    platforms: Platform[];
    tags: string[];
    rating: number;
}

type Platform = {
    name: string;
    icon: string;
}

const endpoint = process.env.EXPO_PUBLIC_API;

export function findGameBySlug(slug: string | string[]): UseQueryResult<GameProps, Error> {
    return useQuery<GameProps, Error>({
        queryKey: ['game', slug],
        queryFn: async () => {
            const response = await fetch(`${endpoint}/game/slug/${slug}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        }
    });
}

export async function findGameById(id: number): Promise<GameProps> {
    const response = await fetch(endpoint + '/game/' + id);
    const data = await response.json();
    return data.results;
}

export async function findGames(): Promise<GameProps[]> {
    const response = await fetch(endpoint + '/games');
    const data = await response.json();
    return data.results;
}

export function findTopTenGames(): UseQueryResult<GameProps[], Error> {
    return useQuery<GameProps[], Error>({
        queryKey: ['topTenGames'],
        queryFn: async () => {
            const response = await fetch(endpoint + '/games/rating');
            if(!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        }
    });
}

export async function findGameBySearch(search: string): Promise<GameProps[]> {
    const response = await fetch(endpoint + '/games/search/' + search);
    const data = await response.json();
    return data.results;
}

export async function findGamesRecommendation(): Promise<GameProps[]> {
    const response = await fetch(endpoint + '/games/recommendation');
    const data = await response.json();
    return data.results;
}