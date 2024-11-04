import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { EvaluationProps } from "./evaluation";

export type GameProps = {
    id: number;
    name: string;
    description: string;
    image?: string;
    slug: string;
    release_date: string;
    platforms: Platform[];
    tags: string[];
    rating: number;
    evaluations?: EvaluationProps[];
}

type Platform = {
    id: number;
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

export function findBySearch(search: string): UseQueryResult<GameProps[], Error> {
    return useQuery<GameProps[], Error>({
        queryKey: ['game', search],
        queryFn: async () => {
            const response = await fetch(`${endpoint}/games/search/${search}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        }
    });
}

export async function findGamesRecommendation(): Promise<GameProps[]> {
    const response = await fetch(endpoint + '/games/recommendation');
    const data = await response.json();
    return data.results;
}