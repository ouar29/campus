import { Group, MeshBasicMaterial, MeshPhongMaterial } from "three";
import { Floor } from "../model/model";
import { MeshView } from "./view";
import { RoomView } from "./room-view";
import { DPolygon } from "./shapes/dpolygon";

export class FloorView extends MeshView {

    material = new MeshPhongMaterial({
        color: 0xff0000,
        opacity: 0.5,
        transparent: true,
    });

    constructor(floor: Floor) {
        super();

        this.group.add(new DPolygon(floor.geometry, floor.level, this.material).getMesh());

        for (let room of floor.rooms) {
            this.group.add(new RoomView(room, floor.level).getMesh());
        }
    }

    
}