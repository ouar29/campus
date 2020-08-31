import { Group } from "three";

export abstract class MeshView {

    protected group: Group;

    constructor(){
        this.group = new Group();
    }

    getMesh(){
        return this.group;
    }

}