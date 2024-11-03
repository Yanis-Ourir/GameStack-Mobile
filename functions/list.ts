import { GameReviewProps } from "@/components/game/GameReview";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { UserProps } from "./user";

export type ListProps = {
    id: string;
    name: string;
    description: string;
    image?: string;
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

export async function findGameListOfUser(id: string): Promise<ListProps[] | string> {
    try {
        const response = await fetch(`${endpoint}/game-lists/user/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    } catch (error) {
        return error + 'An error occurred while fetching the list';
    }
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

export async function createList(name: string, description: string, isPrivate: boolean, image: string | null, userId: string): Promise<string> {

    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('is_private', isPrivate ? '1' : '0');
    formData.append('user_id', userId);

    if (image) {
        const fileExtension = image.split('.').pop()?.toLowerCase();

        let mimeType = '';
        if (fileExtension === 'jpg' || fileExtension === 'jpeg') {
            mimeType = 'image/jpeg';
        } else if (fileExtension === 'png') {
            mimeType = 'image/png';
        } else {
            throw new Error('Unsupported file format. Only JPG, JPEG, and PNG are allowed.');
        }

       
        formData.append('image', {
            uri: image,
            name: `${name}-image.${fileExtension}`, 
            type: mimeType,
        } as any); 
    }
    
    try {
        const response = await fetch(`${endpoint}/game-lists`, {
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            body: formData,
        });

        if(!response.ok) {
            throw new Error('Network response was not ok');
        }

        return 'List successfully created';
    } catch (error) {
        console.error(error);
        return 'An error occurred';
    }
}


