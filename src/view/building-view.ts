import { Group, Scene } from "three";
import { Building } from "../model/model";
import { MeshView } from "./view";
import { FloorView } from "./floor-view";

export class BuildingView extends MeshView {

    private floorViews = Array<FloorView>();
    constructor(building: Building){
        super();

        for(let floor of building.floors){
            const floorView = new FloorView(floor);
            this.group.add(floorView.getMesh());
            this.floorViews.push(floorView);
        }
    }

    modelToView(): void {
        this.floorViews.forEach(fv => fv.modelToView());
    }

}