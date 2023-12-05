import { Char } from "@/types/Char.type";
import { BaseTexture, Sprite, Texture } from "pixi.js";
import { SceneManager } from "./SceneManager";

export class CharSprite extends Sprite {
    public characterName: string

    constructor(char: Char) {
        super()

        this.characterName = char.characterName

        this.width = SceneManager.squareSize
        this.height = SceneManager.squareSize

        this.x = 0
        this.y = 0

        if(char.charImage){
            const base = new BaseTexture(char.charImage)
            const texture = new Texture(base)
            this.texture = texture
        }        
    }
}