export const games = [
    {
        id: 1,
        title: 'Granblue Fantasy Relink',
        platforms: 'PS5, PC, Xbox',
        tags: 'JRPG, Action, Fantasy',
        releaseDate: 'Février 2024',
        rating: 9.8,
        image: 'https://media.rawg.io/media/screenshots/47b/47b915b28e72ead7a1775f057af421f6.jpeg',
    },
    {
        id: 2,
        title: 'NieR:Automata',
        platforms: 'PS4, PC, Xbox',
        tags: 'JRPG, Aventure, Sci-fi',
        releaseDate: 'Février 2018',
        rating: 9.5,
        image: 'https://media.rawg.io/media/games/5a4/5a44112251d70a25291cc33757220fce.jpg',
    },
    {
        id: 3,
        title: 'Elden Ring',
        platforms: 'PS4, PC, Xbox',
        tags: 'RPG, Aventure, Fantasy',
        releaseDate: 'Février 2022',
        rating: 9.1,
        image: 'https://media.rawg.io/media/games/b29/b294fdd866dcdb643e7bab370a552855.jpg',
    },
    {
        id: 4,
        title: 'Minecraft',
        platforms: 'PS4, PC, Xbox, Switch',
        tags: 'RPG, Aventure, Survie',
        releaseDate: '2012',
        rating: 9.0,
        image: 'https://media.rawg.io/media/games/b4e/b4e4c73d5aa4ec66bbf75375c4847a2b.jpg',
    },
    {
        id: 5,
        title: 'Persona 3 Reload',
        platforms: 'PS5, PC, Xbox',
        tags: 'JRPG, Tour par tour, Fantasy',
        releaseDate: 'Février 2022',
        rating: 8.8,
        image: 'https://media.rawg.io/media/games/29a/29a78d7b6be61673c910d588bf188e2c.jpg',
    },
];

export const gameLists = [
    {
        id: 1,
        title: 'Classiques Incontournables',
        description: 'Une collection des meilleurs jeux qui ont marqué l’histoire du jeu vidéo.',
        gameCount: 15,
        image: 'https://media.rawg.io/media/games/5a4/5a44112251d70a25291cc33757220fce.jpg',
    },
    {
        id: 2,
        title: 'Explorations Fantastiques',
        description: 'Pars à la découverte de mondes incroyables et de paysages à couper le souffle.',
        gameCount: 26,
        image: 'https://media.rawg.io/media/games/5a4/5a44112251d70a25291cc33757220fce.jpg',
    },
    {
        id: 3,
        title: 'Adrénaline et Action',
        description: 'Pour les amateurs de sensations fortes et d’action intense !',
        gameCount: 12,
        image: 'https://media.rawg.io/media/games/5a4/5a44112251d70a25291cc33757220fce.jpg',
    },
    {
        id: 4,
        title: 'Jeux de Stratégie et de Réflexion',
        description: 'Mets à l’épreuve tes compétences stratégiques et ton esprit de réflexion.',
        gameCount: 9,
        image: 'https://media.rawg.io/media/games/5a4/5a44112251d70a25291cc33757220fce.jpg',
    },
    {
        id: 5,
        title: 'Aventures Épiques',
        description: 'Rejoins des quêtes inoubliables et plonge dans des histoires épiques.',
        gameCount: 4,
        image: 'https://media.rawg.io/media/games/5a4/5a44112251d70a25291cc33757220fce.jpg',
    },
];

export const gameInList = [
    {
        id: 1,
        title: 'Pokemon Platinum',
        description: 'Un jeu de rôle incontournable pour les fans de la série Pokemon.',
        image: 'https://media.rawg.io/media/screenshots/47b/47b915b28e72ead7a1775f057af421f6.jpeg',
        status: 'Completed',
    },
    {
        id: 2,
        title: 'Pokemon Platinum',
        description: 'Un jeu de rôle incontournable pour les fans de la série Pokemon.',
        image: 'https://media.rawg.io/media/screenshots/47b/47b915b28e72ead7a1775f057af421f6.jpeg',
        status: 'Completed',
    },
    {
        id: 3,
        title: 'Pokemon Platinum',
        description: 'Un jeu de rôle incontournable pour les fans de la série Pokemon.',
        image: 'https://media.rawg.io/media/screenshots/47b/47b915b28e72ead7a1775f057af421f6.jpeg',
        status: 'Completed',
    },
    {
        id: 4,
        title: 'Pokemon Platinum',
        description: 'Un jeu de rôle incontournable pour les fans de la série Pokemon.',
        image: 'https://media.rawg.io/media/screenshots/47b/47b915b28e72ead7a1775f057af421f6.jpeg',
        status: 'Completed',
    },
    {
        id: 5,
        title: 'Pokemon Platinum',
        description: 'Un jeu de rôle incontournable pour les fans de la série Pokemon.',
        image: 'https://media.rawg.io/media/screenshots/47b/47b915b28e72ead7a1775f057af421f6.jpeg',
        status: 'Completed',
    },
    {
        id: 6,
        title: 'Pokemon Platinum',
        description: 'Un jeu de rôle incontournable pour les fans de la série Pokemon.',
        image: 'https://media.rawg.io/media/screenshots/47b/47b915b28e72ead7a1775f057af421f6.jpeg',
        status: 'Completed',
    }
]

export const comments = [
    {
        id: 1,
        user: {
            avatar: {
                url: "https://example.com/avatar-johndoe.jpg",  // URL de l'avatar de l'utilisateur
            },
            pseudo: 'JohnDoe',
        },
        rating: 5,
        status: {
            color: "text-red-400",  
            icon: "IoTrashOutline",      // Icône associée (exemple)
            name: "Dropped",
        },
        game_time: 120, // Exemple d'heures de jeu
        platforms: [
            { name: "NES", icon: "IoGameControllerOutline" }
        ],
        description: 'An iconic game that defined my childhood!',
    },
    {
        id: 2,
        user: {
            avatar: {
                url: "https://example.com/avatar-janegamer.jpg",
            },
            pseudo: 'JaneGamer',
        },
        rating: 4,
        status: {
            color: "text-green-500",
            icon: "IoCheckmarkCircleOutline",
            name: "Completed",
        },
        game_time: 85,
        platforms: [
            { name: "SNES", icon: "IoGameControllerOutline" }
        ],
        description: 'Timeless classic, still fun to play.',
    },
    {
        id: 3,
        user: {
            pseudo: 'PlayerOne',
        },
        rating: 4,
        status: {
            color: "text-gray-400",
            icon: "IoPlay",
            name: "Nostalgique",
        },
        game_time: 60,
        platforms: [
            { name: "NES", icon: "IoGameControllerOutline" },
            { name: "NES", icon: "IoGameControllerOutline" },
            { name: "NES", icon: "IoGameControllerOutline" },
            { name: "NES", icon: "IoGameControllerOutline" },
        ],
        description: 'A bit outdated, but still a legend in gaming. A must-play for any gamer.',
    },
];

export const statuses = [
    {
        id: 1,
        name: 'Completed',
        color: 'text-green-500',
        icon: 'IoCheckmarkCircleOutline',
    },
    {
        id: 2,
        name: 'In Progress',
        color: 'text-white',
        icon: 'IoPlay',
    },
    {
        id: 3,
        name: 'Dropped',
        color: 'text-red-400',
        icon: 'IoTrashOutline',
    },
    {
        id: 4,
        name: 'Want to Play',
        color: 'text-gray-400',
        icon: 'IoAddCircleOutline',
    }
]



