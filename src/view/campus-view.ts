import { BuildingView } from "./building-view";
import { Building, Campus } from "../model/model";
import { Scene } from "three";
import { MeshView } from "./view";

export class CampusView extends MeshView {

    buildings: BuildingView[] = [];

    constructor(campus: Campus){
        super();

        for (let building of campus.buildings) {
            const buildingView = new BuildingView(building);
            this.group.add(buildingView.getMesh());
            // scene.add(buildingView.getMesh());
            this.buildings.push(buildingView);
          }
    }

    modelToView(campus: Campus){
        this.buildings.forEach(bv => bv.modelToView());
    }
}