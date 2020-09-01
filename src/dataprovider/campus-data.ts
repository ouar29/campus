import { Campus } from "../model/model";
import { Vector2 } from "three";

export class CampusDataProvider {

    constructor() {

    }

    getCampus(): Campus {
        const campus: Campus = {
            name: 'Test',
            date: new Date(),
            buildings: [
                {
                    name: "Bat",
                    floors: [
                        {
                            geometry: [new Vector2(0,0), new Vector2(10,0), new Vector2(10,10), new Vector2(0,10)],
                            level: 0,
                            rooms: [
                                { name: 'Room0', pos: new Vector2(2.5, 2.5), selected: false},
                                { name: 'Room1', pos: new Vector2(8.0, 7.5)},
                            ]
                        },
                        {
                            geometry: [new Vector2(0,0), new Vector2(10,0), new Vector2(10,10), new Vector2(0,10)],
                            level: 10,
                            rooms: [
                                { name: 'Room2', pos: new Vector2(4.5, 2.5)},
                                { name: 'Room3', pos: new Vector2(6.0, 1.5)},
                            ]
                        }
                    ]
                }
            ]
        };

        return campus;
    }
}