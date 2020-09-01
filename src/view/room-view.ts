import { MeshView } from "./view";
import { Room } from "../model/model";
import { Group, MeshBasicMaterial } from "three";
import { DCircle } from "./shapes/dcircle";
import { RoomProcessData } from "./processdata/room-processdata";

export class RoomView extends MeshView{

    private roomRadius = 2;
    dCircle : DCircle;
    model: Room;
    pd: RoomProcessData = new RoomProcessData();

    constructor(room: Room, level: number){
        super();
        this.model = room;
        const material = new MeshBasicMaterial({ color: 0x00ffff });
        const selectedMaterial = new MeshBasicMaterial({ color: 0x00ff00 });
        this.dCircle = new DCircle(room.pos, this.roomRadius, room.selected ? selectedMaterial : material, level, room.name);
        this.group.add(this.dCircle.getMesh());
    }

    modelToView(): void {
        this.pd.processUpdatedData(this.model, this);
    }
}