import { Viewport } from "pixi-viewport";
import { Scene } from "./Scene";
import { SceneManager } from "./SceneManager";
import { BaseTexture, Container, Sprite, Texture } from "pixi.js";
import { Square } from "./Square";
import { Char } from "@/types/Char.type";
import { CharSprite } from "./CharSprite";
import { MapConfig } from "@/types/MapConfig.type";

export const initialConfig: MapConfig = {
    mapBackground: '',
    squareSize: 50,
    paddingLeft: 0,
    paddingTop: 0,
}

export class BattleMapScene extends Scene {
    public viewport: Viewport
    public background?: Sprite


    /* config */
    private _config: MapConfig = initialConfig

    public get config(): MapConfig{
        return this._config;
    }

    public set config(newConfig) {
        this._config = {
            ...this.config,
            ...newConfig,
        }

        if(newConfig.squareSize){
            this.drawSquares()
        }

        if(newConfig.mapBackground){
            this.setBackgroundImage(newConfig.mapBackground)
        }

        if(newConfig.paddingLeft && this.background){
            this.background.x = newConfig.paddingLeft
        }

        if(newConfig.paddingTop && this.background){
            this.background.y = newConfig.paddingTop
        }
    }
    /**********/

    public squareContainer: Container
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

        this.squareContainer = new Container()
        this.squareContainer.zIndex = 10

        this.viewport.addChild(this.squareContainer)

        this.drawSquares()
        // this.setBackgroundImage('')
    }

    public drawSquares() {
        this.squareContainer.removeChildren()

        this.squares = Square.generateSquares()
        this.squares.forEach(square => {
            this.squareContainer.addChild(square)
        })
    }

    public updateCharSprites() {
        this.charSprites.forEach(_charSprite => {
            //
        })
    }

    public setBackgroundImage(image: string) {
        // if (this.background) this.viewport.removeChild(this.background)
        if (this.background) this.viewport.removeChild(this.background)

        const base = new BaseTexture(image)
        const texture = new Texture(base)
        this.background = new Sprite(texture)
        this.background.zIndex = 1
        this.background.x = this.config.paddingLeft ?? 0
        this.background.y = this.config.paddingTop ?? 0
        this.viewport.addChild(this.background)
    }

    public addCharToMap(char: Char) {
        const charSprite = new CharSprite(char)

        this.charSprites.push(charSprite)
        this.viewport.addChild(charSprite)
    }
}