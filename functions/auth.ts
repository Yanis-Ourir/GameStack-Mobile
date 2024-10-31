import AsyncStorage from "@react-native-async-storage/async-storage";

const endpoint = process.env.EXPO_PUBLIC_API;
const key = process.env.EXPO_PUBLIC_JWT_KEY;
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
    console.log('Token :', token);
    if (!token) {
        throw new Error('No token found');
    }
    const payloadToken = parseJWT(token);
    return payloadToken as TokenProps;
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


