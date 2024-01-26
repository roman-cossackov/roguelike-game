import { TILES } from "./utils.js";

export class Hero {
    constructor() {
        this.role = TILES.hero;
        this.position = {x: 0, y: 0};
        this.health = 20;
        this.attack = 3;
    }
}