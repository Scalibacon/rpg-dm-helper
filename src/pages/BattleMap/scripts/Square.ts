import { Graphics, Sprite, Texture } from "pixi.js";

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

    public static generateSquares(width = 50) {
        console.log('generate')
        const squares: Square[] = []

        for (let i = 0; i < 20; i++) {
            for (let j = 0; j < 20; j++) {
                const square = new Square()
                square.width = width
                square.height = width
                square.x = i * width
                square.y = j * width
                square.zIndex = 10
                squares.push(square)
            }
        }

        return squares
    }
}