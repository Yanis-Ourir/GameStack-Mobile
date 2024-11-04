export function platformMapping(name: string): string {
    const platformMapping: { [key: string]: string } = {
        "PlayStation 2": "PS2",
        "PlayStation 3": "PS3",
        "PlayStation 4": "PS4",
        "PlayStation 5": "PS5",
        "Xbox Series S/X": "XSS/XSX",
        "Xbox One": "XOne",
        "Nintendo Switch": "Switch",
    };
    return platformMapping[name] || name;
}