import { Application, settings, Sprite, FederatedPointerEvent, DisplayObject } from "pixi.js";
import { BattleMapScene } from "./BattleMapScene";
// import { Scene } from "../types/Scene";

export class SceneManager {
    public static app: Application
    // public static currentScene: Scene
    public static battleMapScene: BattleMapScene

    public static dragTarget?: DisplayObject   

    private static _width: number
    private static _height: number

    public static get width(): number {
        return SceneManager._width
    }

    public static get height(): number {
        return SceneManager._height
    }

    public static removeAll() {
        for (let i = SceneManager.app.stage.children.length - 1; i >= 0; i--) {
            SceneManager.app.stage.removeChild(
                SceneManager.app.stage.children[i]
            )
        }
    }

    public static initialize(width: number, height: number) {
        SceneManager._width = width
        SceneManager._height = height

        // create pixi app
        SceneManager.app = new Application({
            view: document.getElementById('battle-map-canvas') as HTMLCanvasElement,
            resolution: window.devicePixelRatio || 1,
            autoDensity: true,
            backgroundColor: 0x6495ed,
            width: width,
            height: height,
        })

        /* event */
        SceneManager.app.stage.eventMode = 'static'
        SceneManager.app.stage.hitArea = SceneManager.app.screen
        SceneManager.app.stage.on('pointerup', SceneManager.onDragEnd);
        SceneManager.app.stage.on('pointerupoutside', SceneManager.onDragEnd);
        /*********/

        // should help with pixels being bluerred when scaling up/down
        settings.ROUND_PIXELS = false
        settings.RESOLUTION = 1
        SceneManager.app.stage.sortableChildren = true

        // configure custom cursor
        // const defaultIcon = "url('cursor/cursor-default.png'),auto"
        // const hoverIcon = "url('cursor/cursor-pointer.png') 25 0,auto"
        // SceneManager.app.renderer.events.cursorStyles.default = defaultIcon;
        // SceneManager.app.renderer.events.cursorStyles.hover = hoverIcon;

        // SceneManager.app.ticker.add(SceneManager.update)

        SceneManager.battleMapScene = new BattleMapScene()
        SceneManager.app.stage.addChild(SceneManager.battleMapScene)
    }

    public static onDragEnd() {
        if (SceneManager.dragTarget) {
            SceneManager.app.stage.off('pointermove', SceneManager.onDragMove)
            SceneManager.dragTarget.alpha = 1
            SceneManager.dragTarget = undefined
        }

        SceneManager.battleMapScene.viewport.pause = false
    }

    public static onDragMove(event: FederatedPointerEvent) {
        if (SceneManager.dragTarget) {
            SceneManager.dragTarget.parent.toLocal(
                event.global,
                undefined,
                SceneManager.dragTarget.position
            )
        }
    }

    public static onDragStart(sprite: DisplayObject) {
        sprite.alpha = 0.5
        SceneManager.dragTarget = sprite
        SceneManager.app.stage.on('pointermove', SceneManager.onDragMove)
        SceneManager.battleMapScene.viewport.pause = true
    }

    // public static changeScene(newScene: Scene) {
    //     if (SceneManager.currentScene) {
    //         SceneManager.currentScene.onRemove()
    //         SceneManager.app.stage.removeChild(SceneManager.currentScene)
    //         SceneManager.currentScene.destroy()
    //     }

    //     SceneManager.currentScene = newScene
    //     SceneManager.app.stage.addChild(SceneManager.currentScene)
    // }

    // private static update(framesPassed: number) {
    //     if (SceneManager.currentScene) {
    //         SceneManager.currentScene.update(framesPassed)
    //     }
    // }
}