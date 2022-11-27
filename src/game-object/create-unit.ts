import { Container, DisplayObject } from "pixi.js";
import { HitDirection } from "../utils/game";


export interface IBaseGameOptions {
    name?: string;
    v?: number;
    width?: number;
    height?: number;
    speedX?: number;
    speedY?: number;
    onHit?: (obj: GameContainer, hitDir?: boolean | HitDirection) => void
}
export interface IGameContainerOptions extends DisplayObject {
    v?: number;
    speedX?: number;
    speedY?: number;
}

export class GameContainer extends Container<DisplayObject> {
    name: string;
    v: number;
    speedX: number;
    speedY: number;
    constructor(unit?: IBaseGameOptions) {
        if (unit) {
            // @ts-ignore
            super(unit);
        } else {
            super();
        }
        this.name = unit?.name || '';
        this.width = unit?.width || this.width;
        this.height = unit?.height || this.height;
        this.v = unit?.v || 1;//移动速度
        this.speedX = unit?.speedX || this.v;//移动速度
        this.speedY = unit?.speedY || this.v;//移动速度
        this.onHit = unit?.onHit || this.onHit;
    };
    moveTo(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
    run() {
        this.x = this.x + this.speedX;
        this.y = this.y + this.speedY;
    }
    onHit(obj: GameContainer, hitDir?: boolean | HitDirection) {
        obj.speedX = -obj.speedX;
        obj.speedY = -obj.speedY;
    }
}