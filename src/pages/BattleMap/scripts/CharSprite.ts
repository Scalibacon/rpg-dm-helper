import { Char } from "@/types/Char.type";
import { BaseTexture, Container, Sprite, Texture } from "pixi.js";
import { SceneManager } from "./SceneManager";

export class CharSprite extends Container {
    public characterName: string

    public image?: Sprite

    constructor(char: Char) {
        super()

        this.characterName = char.characterName
        // this.texture = Texture.WHITE

        this.width = SceneManager.battleMapScene.config.squareSize ?? 50
        this.height = SceneManager.battleMapScene.config.squareSize ?? 50

        this.x = 0
        this.y = 0
        this.zIndex = 15

        this.eventMode = 'static'
        this.cursor = 'pointer'

        this.on('pointerdown', () => {
            SceneManager.onDragStart(this)
        }, this)

        if (char.charImage) {
            const base = new BaseTexture(char.charImage)
            const texture = new Texture(base)

            this.image = new Sprite()
            this.image.width = SceneManager.battleMapScene.config.squareSize ?? 50
            this.image.height = SceneManager.battleMapScene.config.squareSize ?? 50
            this.image.texture = texture

            this.addChild(this.image)
        }

        this.pivot.x = (this.width / 2) / this.scale.x
        this.pivot.y = (this.height / 2) / this.scale.y
    }
}