import { Point } from "pixi.js";

export class Model {
    private static instance: Model

    mousePos: Point = new Point(window.innerWidth, 0);

    elapsedTime: number = 0;
    // sceneState: SceneState = SceneState.first;

    constructor() {
        if (Model.instance) {
            return Model.instance;
        }
        Model.instance = this;
    }

    getInstance(): Model{
        return Model.instance
    }
}

// export enum SceneState{
//     first = 'scene one',
//     second = 'scene two'
// }