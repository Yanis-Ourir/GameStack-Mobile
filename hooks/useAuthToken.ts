import { checkToken, TokenProps } from "@/functions/auth";
import { router } from "expo-router";
import { useEffect, useState } from "react";

export function useAuthToken() {
    const [token, setToken] = useState<TokenProps | null>(null);

    useEffect(() => {
        const fetchToken = async () => {
            const token = await checkToken();
            if (!token) router.push('/login');
            setToken(token);
        };
        fetchToken();
    }, []);

    return token;
}