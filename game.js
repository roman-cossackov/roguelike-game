import { getRandomInt, createRoom } from "./utils.js";

export class Game {
	init() {
		let field = document.getElementsByClassName("field")[0];
		field.innerHTML = "";
		for (let i = 0; i < 40 * 24; i++) {
			const wall = document.createElement("div");
			wall.className = "tile tileW";
			field.appendChild(wall);
		}
	}
	generateGameMap() {
		const gameMap = new Array(24)
			.fill()
			.map(() => new Array(40).fill("wall"));
        
        const numRooms = getRandomInt(5, 10)
        for (let i = 0; i < numRooms; i++) {
            createRoom(gameMap)
        }

        let field = document.getElementsByClassName("field")[0];
        let tiles = field.querySelectorAll('div');
        for (let r = 0; r < 24; r++) {
            for (let c = 0; c < 40; c++) {
                if (gameMap[r][c] === 'ground') {
                    const index = 40 * r + c
                    tiles[index].className = "tile"
                }
            }
        }

	}
}
