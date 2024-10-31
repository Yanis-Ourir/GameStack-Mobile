import AsyncStorage from "@react-native-async-storage/async-storage";
import { useMutation } from "@tanstack/react-query";
import { Redirect } from "expo-router";

const endpoint = process.env.EXPO_PUBLIC_API;

type TokenProps = {
    id: string,
    pseudo: string,
    exp: number,
}

export async function login(email: string, password: string) {
    try {
        const response = await fetch(endpoint + '/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
            throw new Error('Login failed');
        }

        const data = await response.json();
        console.log('Data:', data);
        AsyncStorage.setItem('token', data.access_token);
        console.log('Login success');
    } catch (error) {
        console.error('Error:', error);
        alert('Login failed. Please check your email and password.');
    }   
}



export async function checkToken(): Promise<TokenProps> {
    const token = await AsyncStorage.getItem('token');
    if (!token) {
        throw new Error('No token found');
    }
    console.log("token: ",  parseJWT(token));
    return parseJWT(token);
}

function parseJWT(token: string) {
    console.log("token: ", token);
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    console.log("jsonPayload: ", JSON.parse(jsonPayload));
    return JSON.parse(jsonPayload);
}

export async function logout() {
    AsyncStorage.removeItem('token');
}