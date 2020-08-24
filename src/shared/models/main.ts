import {Observable} from "rxjs";

export interface Coords {
    x: number
    y: number
}

export type Direction = -1 | 0 | 1;
export type Vector = [Direction, Direction];

export enum WeaponEnum {
    knife,
    bow,
}

export enum CharacterEnum {
    archer
}
/**
 * Integer from 0 to 359
 */
export type Degree = number

export interface Player {
    id: string
    name: string
    position: Coords
    health: number
    maxHealth: number
    speed: number
    character: CharacterEnum
}

export interface Arrow {
    id: string
    position: Coords
    angle: Degree
}

export interface IPlayer extends Player {
    move(token: string, dir: Vector): void
    attack(token: string, weapon: WeaponEnum, deg: Degree): void
    jump(token: string, deg: Degree): void
}

export interface GameState {
    me: Player
    players: Player[]
    arrows: Arrow[]
}

export enum BlockEnum {
    grass,
    dirt,
    stone,
}

export interface Block {
    coords: Coords
    type: BlockEnum
    hasCollision: boolean
}

export interface Chunk {
    coords: Coords
    blocks: [Block]
}

export interface IMap {
    getState(): GameState
    getChunk(coords: Coords): Chunk
}


export interface Action {

}

export interface IServer {
    state: Observable<GameState>

    emit(action: Action): void
}

export enum Actions {
    LOGIN="LOGIN",
    SPAWN="SPAWN",
    JUMP="JUMP",
    MOVE="MOVE",
    UPDATE="UPDATE",
    NEW_PLAYER="NEW_PLAYER",
    SWORD_ATTACK="SWORD_ATTACK",
    BOW_ATTACK="BOW_ATTACK"
}
