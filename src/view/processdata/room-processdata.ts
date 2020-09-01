import { Room } from "../../model/model";
import { RoomView } from "../room-view";
import { MeshBasicMaterial, Mesh, Color } from "three";

export class RoomProcessData {

    private selectedColor = new Color("red");
    private color = new Color("green");
    constructor(){

    }

    processUpdatedData(room: Room, roomView: RoomView){
        const mesh = roomView.getMesh().getObjectById(0);
    
        if(room.selected){
            roomView.dCircle.setColor(this.selectedColor);
        } else {
            roomView.dCircle.setColor(this.color);
        }
    }

}