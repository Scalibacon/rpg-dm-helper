import { Char } from "@/types/Char.type";
import { BaseTexture, Sprite, Texture } from "pixi.js";
import { SceneManager } from "./SceneManager";

export class CharSprite extends Sprite {
    public characterName: string

    constructor(char: Char) {
        super()

        this.characterName = char.characterName

        this.width = SceneManager.battleMapScene.config.squareSize ?? 50
        this.height = SceneManager.battleMapScene.config.squareSize ?? 50

        this.x = 0
        this.y = 0
        this.zIndex = 10

        this.eventMode = 'static'
        this.cursor = 'pointer'
        this.anchor.set(0.5)

        this.on('pointerdown', () => {
            SceneManager.onDragStart(this)
        }, this)

        if(char.charImage){
            const base = new BaseTexture(char.charImage)
            const texture = new Texture(base)
            this.texture = texture
        }        
    }
}