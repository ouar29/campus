import { Mesh, Shape, MeshBasicMaterial, ShapeGeometry, Vector2 } from 'three'
import {DShape } from './dshape'

export class DPolygon implements DShape {

    private pts : Array<number>;
    private mesh: Mesh;

    constructor(pts: Vector2[], z: number, material: MeshBasicMaterial){

        const shape = new Shape();
        shape.setFromPoints(pts);
        const geometry = new ShapeGeometry( shape );
        geometry.translate(0,0, z);
        this.mesh = new Mesh( geometry, material ) ;
    }

    getMesh(): Mesh {
        return this.mesh;
    }
}