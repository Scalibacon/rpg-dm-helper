import { Graphics, Sprite, Texture } from "pixi.js";
import { SceneManager } from "./SceneManager";

export class Square extends Sprite {
    constructor() {
        super()

        this.texture = Texture.WHITE

        const loaderBarBorder = new Graphics()
        loaderBarBorder.lineStyle(1, 'cyan')

        loaderBarBorder.drawRect(0, 0, this.width, this.height)
        this.addChild(loaderBarBorder)

        this.alpha = 0.2
    }

    public static generateSquares() {
        const squareSize = SceneManager.battleMapScene?.config.squareSize ?? 50
        console.log('generate')
        const squares: Square[] = []

        const lengthX = Math.ceil(2500 / squareSize)
        const lengthY = Math.ceil(2500 / squareSize)

        for (let i = 0; i < lengthX; i++) {
            for (let j = 0; j < lengthY; j++) {
                const square = new Square()
                square.width = squareSize
                square.height = squareSize
                square.x = i * squareSize
                square.y = j * squareSize
                squares.push(square)
            }
        }

        return squares
    }
}