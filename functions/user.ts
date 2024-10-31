import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { checkToken } from "./auth";


export type UserProps = {
    pseudo: string;
    email: string;
    description: string;
}
const endpoint = process.env.EXPO_PUBLIC_API;

export function findUserById(id: string): UseQueryResult<UserProps, Error> {
    return useQuery<UserProps, Error>({
        queryKey: ['user', id],
        queryFn: async () => {
            const response = await fetch(endpoint + '/users/' + id);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        }
    });
}