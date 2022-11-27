import { hitTestRectangle } from "../utils/game";
import { GameContainer } from "./create-unit";

export class BumpSpace {
    objList: GameContainer[];
    hitMap: Record<string, number>;
    hitNum: Record<string, number>;
    constructor() {
        this.objList = [];
        this.hitMap = {};
        this.hitNum = {};
    };
    add(obj: GameContainer) {
        this.objList.push(obj)
        this.objList.map((item, i) => {
            this.hitMap[i] = 0;
            this.objList.map((item, j) => {
                this.hitNum[`${i}-${j}`] = 0;
            })
        })
    }
    run() {
        const containerList = this.objList
        containerList.map((item1, i) => {
            containerList.map((item2, j) => {
                if (i <= j) {
                    return null;
                }
                const hitDir = hitTestRectangle(item1, item2)
                if (hitDir) {
                    if (this.hitMap[i] === 0) {
                        item1.onHit(item1, hitDir[0])
                    }
                    if (this.hitMap[j] === 0) {
                        item2.onHit(item2, hitDir[1])
                    }
                    this.hitMap[i] = this.hitMap[i] + 1;
                    this.hitMap[j] = this.hitMap[j] + 1;
                    this.hitNum[`${i}-${j}`] = this.hitNum[`${i}-${j}`] + 1;

                } else {
                    const hitNum = this.hitNum[`${i}-${j}`]
                    this.hitMap[i] = this.hitMap[i] - hitNum;
                    this.hitMap[j] = this.hitMap[j] - hitNum;
                    this.hitNum[`${i}-${j}`] = 0;
                }
            })
        })
    }
}