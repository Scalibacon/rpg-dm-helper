import { Container } from "pixi.js";

export abstract class Scene extends Container {
    constructor(){
        super()
    }

    update(framePassed: number) {
        return framePassed
    }

    onRemove() {
        return
    }
}