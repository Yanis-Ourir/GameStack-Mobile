export type UserProps = {
    pseudo: string;
    email: string;
    description: string;
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