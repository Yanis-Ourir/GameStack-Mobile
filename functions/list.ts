import { GameReviewProps } from "@/components/game/GameReview";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { UserProps } from "./user";

export type ListProps = {
    id: string;
    name: string;
    description: string;
    image: string;
    updated_at: string;
    likes: number;
    dislikes: number;
    games: number;
}

export type ListDetailsProps = {
    id: string;
    name: string;
    description: string;
    is_private: boolean;
    user_id: number;
    image: string;
    updated_at: string;
    user: UserProps;
    likes: number;
    dislikes: number;
    games: GameReviewProps[];
    is_game_in_list?: boolean;
}


const endpoint = process.env.EXPO_PUBLIC_API;

export function findGameListOfUser(id: string): UseQueryResult<ListProps[], Error> {
    return useQuery<ListProps[], Error>({
        queryKey: ['gameLists', id],
        queryFn: async () => {
            const response = await fetch(`${endpoint}/game-lists/user/${id}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        }
    })
}

export function findListById(id: string[] | string): UseQueryResult<ListDetailsProps, Error> {
    return useQuery<ListDetailsProps, Error>({
        queryKey: ['gameList', id],
        queryFn: async () => {
            const response = await fetch(`${endpoint}/game-list/${id}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        }
    })
}


