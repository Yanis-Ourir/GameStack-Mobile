import AsyncStorage from "@react-native-async-storage/async-storage";

type ReviewProps = {
    description: string;
    gameId: number;
    gameListId: string;
    statusId: number;
}

const endpoint = process.env.EXPO_PUBLIC_API;

export default async function addReview({ description, gameId, gameListId, statusId }: ReviewProps) {
    const token = await AsyncStorage.getItem('token');
    try {
        const response = await fetch(endpoint + "/reviews", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                description: description,
                game_id: gameId,
                game_list_id: gameListId,
                status_id: statusId,
            }),
        })
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return 'Review added successfully';
    } catch (error) {
        return error + 'An error occurred while adding the review';
    }
    
};
