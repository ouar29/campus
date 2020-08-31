import { Group } from "three";
import { Building } from "../model/model";
import { MeshView } from "./view";
import { FloorView } from "./floor-view";

export class BuildingView extends MeshView {

    constructor(building: Building){
        super();

        for(let floor of building.floors){
            this.group.add(new FloorView(floor).getMesh());
        }
    }

}