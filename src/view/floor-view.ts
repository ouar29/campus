import { Group, MeshBasicMaterial, MeshPhongMaterial } from "three";
import { Floor, Room } from "../model/model";
import { MeshView } from "./view";
import { RoomView } from "./room-view";
import { DPolygon } from "./shapes/dpolygon";
import { RoomProcessData } from "./processdata/room-processdata";

export class FloorView extends MeshView {


    material = new MeshPhongMaterial({
        color: 0xff0000,
        opacity: 0.5,
        transparent: true,
    });

    private roomViews = Array<RoomView>();
    private roomPD = new RoomProcessData();
    private rooms = new Map<Room, RoomView>();

    constructor(floor: Floor) {
        super();

        this.group.add(new DPolygon(floor.geometry, floor.level, this.material).getMesh());

        for (let room of floor.rooms) {
            const roomView = new RoomView(room, floor.level);
            this.group.add(roomView.getMesh());
            this.roomViews.push(roomView);
        }
    }

    modelToView(): void {
        this.roomViews.forEach(rv => rv.modelToView());
    }
}