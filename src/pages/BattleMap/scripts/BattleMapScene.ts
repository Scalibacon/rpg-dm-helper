import { Viewport } from "pixi-viewport";
import { Scene } from "./Scene";
import { SceneManager } from "./SceneManager";
import { BaseTexture, Sprite, Texture } from "pixi.js";
import { Square } from "./Square";

export class BattleMapScene extends Scene {
    public viewport: Viewport
    public background?: Sprite
    public squares: Square[] = []

    constructor() {
        super()
        this.sortableChildren = true

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
        this.viewport.sortableChildren = true
        this.viewport.zIndex = 7

        this.addChild(this.viewport)
        this.squares = Square.generateSquares()
        this.squares.forEach(square => {
            this.viewport.addChild(square)
        })
        // this.setBackgroundImage('')
    }

    public setBackgroundImage(image: string) {
        // if (this.background) this.viewport.removeChild(this.background)
        if (this.background) this.removeChild(this.background)


        const base = new BaseTexture(image)
        const texture = new Texture(base)
        this.background = new Sprite(texture)
        this.background.zIndex = 1
        // this.viewport.addChild(this.background)
        this.addChild(this.background)
    }
}