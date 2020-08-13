interface Coords {
    x: number
    y: number
}

type Direction = -1 | 0 | 1;
type Vector = [Direction, Direction];

enum WeaponEnum {
    knife,
    bow,
}

enum CharacterEnum {
    archer
}

type Degree = number // 0-360

interface Player {
    id: number
    name: string
    position: Coords
    health: number
    speed: number
    character: CharacterEnum
}

interface IPlayer extends Player {
    move(token: string, dir: Vector): void
    attack(token: string, weapon: WeaponEnum, deg: Degree): void
    jump(token: string, deg: Degree): void
}

interface GameState {
    me: Player
    players: [Player]
}

enum BlockEnum {
    grass,
    dirt,
    stone,
}

interface Block {
    coords: Coords
    type: BlockEnum
    hasCollision: boolean
}

interface Chunk {
    coords: Coords
    blocks: [Block]
}

interface IMap {
    getState(): GameState
    getChunk(coords: Coords): Chunk
}