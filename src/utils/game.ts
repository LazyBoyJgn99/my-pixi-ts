

// @ts-nocheck
import { GameContainer } from "../game-object/create-unit";

export enum HitDirection {
    L = "LEFT",
    R = "RIGHT",
    T = "TOP",
    B = "BOTTOM",
    TL = "TOP_LEFT",
    TR = "TOP_RIGHT",
    BL = "BOTTOM_LEFT",
    BR = "BOTTOM_RIGHT",
}

export const hitTestRectangle = (r1: GameContainer, r2: GameContainer) => {

    //Define the variables we'll need to calculate
    let hit, combinedHalfWidths, combinedHalfHeights, vx, vy, direction;

    //hit will determine whether there's a collision
    hit = false;

    //Find the center points of each sprite
    r1.centerX = r1.x + r1.width / 2;
    r1.centerY = r1.y + r1.height / 2;
    r2.centerX = r2.x + r2.width / 2;
    r2.centerY = r2.y + r2.height / 2;

    //Find the half-widths and half-heights of each sprite
    r1.halfWidth = r1.width / 2;
    r1.halfHeight = r1.height / 2;
    r2.halfWidth = r2.width / 2;
    r2.halfHeight = r2.height / 2;

    //Calculate the distance vector between the sprites
    vx = r1.centerX - r2.centerX;
    vy = r1.centerY - r2.centerY;

    //Figure out the combined half-widths and half-heights
    combinedHalfWidths = r1.halfWidth + r2.halfWidth;
    combinedHalfHeights = r1.halfHeight + r2.halfHeight;

    //Check for a collision on the x axis
    if (Math.abs(vx) < combinedHalfWidths) {
        //A collision might be occurring. Check for a collision on the y axis
        if (Math.abs(vy) < combinedHalfHeights) {

            //There's definitely a collision happening
            hit = true;
        } else {

            //There's no collision on the y axis
            hit = false;
        }
    } else {

        //There's no collision on the x axis
        hit = false;
    }
    // if (hit) {
    // console.log('r1.centerX', r1.centerX)
    // console.log('r2.centerX', r2.centerX)
    // console.log('r1.centerY', r1.centerY)
    // console.log('r2.centerY', r2.centerY)
    // console.log('combinedHalfWidths', combinedHalfWidths)
    // console.log('combinedHalfHeights', combinedHalfHeights)

    // }

    if (!hit) {
        return hit;
    }

    if (Math.abs(r1.speedX - r2.speedX) > 0 && r1.speedX - r2.speedX > 0 && Math.abs(r1.speedY - r2.speedY) > 0 && r1.speedY - r2.speedY < 0) {
        return [HitDirection.TR, HitDirection.BL]
    }
    if (Math.abs(r1.speedX - r2.speedX) > 0 && r1.speedX - r2.speedX < 0 && Math.abs(r1.speedY - r2.speedY) > 0 && r1.speedY - r2.speedY < 0) {
        return [HitDirection.TL, HitDirection.BR]
    }
    if (Math.abs(r1.speedX - r2.speedX) > 0 && r1.speedX - r2.speedX > 0 && Math.abs(r1.speedY - r2.speedY) > 0 && r1.speedY - r2.speedY > 0) {
        return [HitDirection.BR, HitDirection.TL]
    }
    if (Math.abs(r1.speedX - r2.speedX) > 0 && r1.speedX - r2.speedX < 0 && Math.abs(r1.speedY - r2.speedY) > 0 && r1.speedY - r2.speedY > 0) {
        return [HitDirection.BL, HitDirection.TR]
    }
    // 有速度差，且1相对2在向右移动
    if (Math.abs(r1.speedX - r2.speedX) > 0 && r1.speedX - r2.speedX > 0) {
        return [HitDirection.R, HitDirection.L]
    }
    // 有速度差，且1相对2在向右移动
    if (Math.abs(r1.speedX - r2.speedX) > 0 && r1.speedX - r2.speedX < 0) {
        return [HitDirection.L, HitDirection.R]
    }
    // 有速度差，且1相对2在向下移动
    if (Math.abs(r1.speedY - r2.speedY) > 0 && r1.speedY - r2.speedY > 0) {
        return [HitDirection.B, HitDirection.T]
    }
    // 有速度差，且1相对2在向上移动
    if (Math.abs(r1.speedY - r2.speedY) > 0 && r1.speedY - r2.speedY < 0) {
        return [HitDirection.T, HitDirection.B]
    }
    //`hit` will be either `true` or `false`
    return [HitDirection.T, HitDirection.B];
};