import {DShape} from "./dshape";

import { Mesh, Shape, MeshBasicMaterial, ShapeGeometry, Vector2, Material, CircleGeometry, Color } from 'three'

export class DCircle implements DShape {

    private mesh: Mesh;

    constructor(pos: Vector2, radius: number, material: Material, zPos: number, name: string){

        const geometry = new CircleGeometry(radius, 24);
        this.mesh = new Mesh( geometry, material ) ;
        this.mesh.position.x = pos.x;
        this.mesh.position.y = pos.y;
        this.mesh.position.z = zPos + 0.01;
        this.mesh.name = name;
    }
    
    getMesh(): Mesh {
        return this.mesh
    }
    
    setColor(color: Color){
        (<any>this.mesh.material).color = color;
    }
}