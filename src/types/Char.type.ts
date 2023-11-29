export type Char = {
    id: number,
    charImage?: string,

    // lore
    characterName: string,
    playerName: string,

    coordinates: {
        x: number,
        y: number
    }
}