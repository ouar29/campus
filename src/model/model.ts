import { Vector2 } from "three";

export interface Campus {
    name: string;
    date: Date;
    buildings: Array<Building>;
}

export interface Building {
    name: string,
    floors: Array<Floor>;
}

export interface Floor {
    rooms: Array<Room>;
    level: number;
    geometry: Array<Vector2>;
}

export interface Room {
    name: string;
    pos: Vector2;
    selected?: boolean;
    restrictedAccess? : boolean;
    externalCode?: string;
}