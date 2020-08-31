import { MeshView } from "./view";
import { Room } from "../model/model";
import { Group, MeshBasicMaterial } from "three";
import { DCircle } from "./shapes/dcircle";

export class RoomView extends MeshView{

    private roomRadius = 2;

    constructor(room: Room, level: number){
        super();

        const material = new MeshBasicMaterial({ color: 0x00ffff });
        const selectedMaterial = new MeshBasicMaterial({ color: 0x00ff00 });

        this.group.add(new DCircle(room.pos, this.roomRadius, room.selected ? selectedMaterial : material, level, room.name).getMesh());
    }
}