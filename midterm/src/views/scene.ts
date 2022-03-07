import { Container, Graphics } from "pixi.js";
import { Model } from "../model/model";

export class Scene {
    model: Model;
    container: Container;

    constructor(model: Model) {
        this.model = model;

        this.container = new Container();
        this.container.sortableChildren = true;
        this.container.width = window.innerWidth
        this.container.height = window.innerHeight
    }

    update() { }
}