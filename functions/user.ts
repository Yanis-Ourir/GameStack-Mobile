export type UserProps = {
    id: string;
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

type UpdateProfil = {
    profilPseudo: string;
    profilDescription: string;
    profilImage: string | null;
    userId: string;
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

export async function editUser({ profilPseudo, profilDescription, profilImage, userId} : UpdateProfil): Promise<string> {

    const formData = new FormData();
    formData.append('pseudo', profilPseudo);
    formData.append('description', profilDescription);

    if (profilImage) {
        const fileExtension = profilImage.split('.').pop()?.toLowerCase();

        let mimeType = '';
        if (fileExtension === 'jpg' || fileExtension === 'jpeg') {
            mimeType = 'image/jpeg';
        } else if (fileExtension === 'png') {
            mimeType = 'image/png';
        } else {
            throw new Error('Unsupported file format. Only JPG, JPEG, and PNG are allowed.');
        }


        formData.append('image', {
            uri: profilImage,
            name: `${profilPseudo}-image.${fileExtension}`,
            type: mimeType,
        } as any);
    }

    try {
        const response = await fetch(`${endpoint}/users/${userId}`, {
            method: 'POST',
            body: formData,
        });

        return 'Profil updated successfully !';
    } catch (error) {
        console.error(error);
        return 'Error while updating profil';
    }
}