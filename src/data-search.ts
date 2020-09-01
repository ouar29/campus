import { Campus, Building, Floor, Room } from "./model/model";

export class DataSearch {

    static findRoom(roomName: string, campus: Campus, exactMatch?: boolean) {
        for (let f of campus.buildings) {
            return this.findRoomInBuilding(roomName, f, exactMatch);
        }
    }

    private static findRoomInBuilding(roomName, building: Building, exactMatch?: boolean) {
        let r;
        for (let f of building.floors) {
            r = this.findRoomInFloor(roomName, f, exactMatch);
            if (undefined !== r) {
                r.building = building.name;
                break;
            }
        }
        return r;
    }

    private static findRoomInFloor(roomName: string, floor: Floor, exactMatch?: boolean): RoomSearchResult | undefined {
        let ret: undefined | RoomSearchResult;
        const room = floor.rooms.find(room => room.name === roomName);
        if (undefined !== room) {
            ret = {
                room: room,
                floor: floor.level
            };
        }
        return ret;
    }
}

export interface RoomSearchResult {
    room: Room;
    floor: number;
    building?: string;
}