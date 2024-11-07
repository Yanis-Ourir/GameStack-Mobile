import { PlatformsProps, StatusProps } from "@/components/game/GameReview";
import { UserProps } from "./user";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type EvaluationProps = {
    id: number;
    rating: number;
    description: string;
    game_time: string;
    status: StatusProps;
    platforms: PlatformsProps[];
    user: UserProps;
}

export type Evaluation = {
    rating: number;
    description: string;
    gameTime: string;
    gameId: number;
    platforms: string[];
    statusId: number;
    userId: string;
}

const endpoint = process.env.EXPO_PUBLIC_API;

export async function createEvaluation({ rating, description, gameTime, gameId, platforms, statusId, userId }: Evaluation) {
    const token = await AsyncStorage.getItem('token');
    try {
        const response = await fetch(endpoint + '/evaluations', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                rating: rating,
                description: description,
                game_time: gameTime,
                game_id: gameId,
                platforms: platforms,
                status_id: statusId,
                user_id: userId,
            }),
        });

        if(!response.ok) {
            throw new Error('Network response was not ok');
        }

        return 'Evaluation created successfully';
    } catch (error) {
        console.error(error);
        return 'An error occurred';
    }
}