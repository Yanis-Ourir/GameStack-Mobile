export type GameReviewProps = {
    idList: string;
    id: number;
    name: string;
    image?: string;
    description?: string;
    platforms: PlatformsProps[];
    tags: string[];
    slug: string;
    status?: StatusProps;
    release_date: string;
    handleEdit: () => void;
    handleDelete: (idGame: string, idList: string) => void;
}

export type PlatformsProps = {
    id: number;
    name: string;
    icon: string;
}

export type StatusProps = {
    id: number;
    name: string;
    icon: string;
    color: string;
}
