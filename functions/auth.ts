import AsyncStorage from "@react-native-async-storage/async-storage";

const endpoint = process.env.EXPO_PUBLIC_API;
const Buffer = require('buffer/').Buffer;

export type TokenProps = {
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
        AsyncStorage.setItem('token', data.access_token);
    } catch (error) {
        console.error('Error:', error);
        alert('Login failed. Please check your email and password.');
    }   
}



export async function checkToken(): Promise<TokenProps | null> {
    try {
        const token = await AsyncStorage.getItem('token');
        if (!token) {
            console.error('No token found');
            return null;
        }

        const payloadToken = parseJWT(token);
        return payloadToken as TokenProps;
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
    
}

export default function parseJWT(token: string): any {
    try {
        const base64Payload = token.split('.')[1];
        const payload = Buffer.from(base64Payload, 'base64');
        return JSON.parse(payload.toString());
    } catch (e) {
        console.log(e);
        return null;
    }
}


export async function logout() {
    AsyncStorage.removeItem('token');
}


