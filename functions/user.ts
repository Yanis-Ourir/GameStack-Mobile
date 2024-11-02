export type UserProps = {
    pseudo: string;
    email: string;
    image?: ImageProps;
    description: string;
}

type ImageProps = {
    id: number;
    url: string;
    created_at: string;
    updated_at: string;
}


const endpoint = process.env.EXPO_PUBLIC_API;

export async function findUserById(id: string): Promise<UserProps | undefined> {
    try {
        const response = await fetch(endpoint + '/users/' + id, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('User not found');
        }

        const data = await response.json();
        return data as UserProps;
    } catch (error) {
        console.error('Error:', error);
        return undefined;
    }
}