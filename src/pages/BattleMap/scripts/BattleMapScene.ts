import { Viewport } from "pixi-viewport";
import { Scene } from "./Scene";
import { SceneManager } from "./SceneManager";
import { BaseTexture, Sprite, Texture } from "pixi.js";
import { Square } from "./Square";
import { Char } from "@/types/Char.type";
import { CharSprite } from "./CharSprite";

export class BattleMapScene extends Scene {
    public viewport: Viewport
    public background?: Sprite

    // [to-do] move all squares to container so we can change them all without loop
    public squares: Square[] = []

    public charSprites: CharSprite[] = []

    constructor() {
        super()

        this.sortableChildren = true

        this.viewport = new Viewport({
            screenWidth: 3000 || SceneManager.app.view.width,
            screenHeight: 3000 || SceneManager.app.view.height,
            worldWidth: 3000,
            worldHeight: 3000,
            events: SceneManager.app.renderer.events
        })
            .drag()
            .pinch()
            .wheel()
        // .bounce()
        this.viewport.sortableChildren = true
        this.viewport.zIndex = 7

        this.addChild(this.viewport)
        this.squares = Square.generateSquares()
        console.log('heree1', this.squares)
        this.squares.forEach(square => {
            this.viewport.addChild(square)
        })
        // this.setBackgroundImage('')
    }

    public setBackgroundImage(image: string) {
        // if (this.background) this.viewport.removeChild(this.background)
        if (this.background) this.viewport.removeChild(this.background)


        const base = new BaseTexture(image)
        const texture = new Texture(base)
        this.background = new Sprite(texture)
        this.background.zIndex = 1
        // this.viewport.addChild(this.background)
        this.viewport.addChild(this.background)
    }

    public addCharToMap(char: Char) {
        console.log('addchar', char)
        const charSprite = new CharSprite(char)

        this.charSprites.push(charSprite)
        this.viewport.addChild(charSprite)
    }
}