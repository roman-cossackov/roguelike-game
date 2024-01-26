import { TILES, getRandomInt } from "./utils.js";

export class Enemy {
    constructor() {
        this.role = TILES.enemy;
        this.position = {x: 0, y: 0};
        this.health = getRandomInt(3, 10);
        this.attack = getRandomInt(1, 3);
    }
}