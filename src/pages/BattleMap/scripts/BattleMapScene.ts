import { Viewport } from "pixi-viewport";
import { Scene } from "./Scene";
import { SceneManager } from "./SceneManager";
import { BaseTexture, Sprite, Texture } from "pixi.js";

export class BattleMapScene extends Scene {
    public viewport: Viewport
    public background?: Sprite

    constructor() {
        super()

        this.viewport = new Viewport({
            screenWidth: SceneManager.app.view.width,
            screenHeight: SceneManager.app.view.height,
            worldWidth: 2000,
            worldHeight: 1070,
            events: SceneManager.app.renderer.events
        })
            .drag()
            .pinch()
            .wheel()
            .bounce()

        this.addChild(this.viewport)

        // this.setBackgroundImage('')
    }

    public setBackgroundImage(image: string) {
        if(this.background) this.viewport.removeChild(this.background)

        const base = new BaseTexture(image)
        const texture = new Texture(base)
        this.background = new Sprite(texture)
        this.viewport.addChild(this.background)
    }
}