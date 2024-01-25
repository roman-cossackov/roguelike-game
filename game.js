import {
	getRandomInt,
	createRoom,
	createPassage,
	createGameObject,
} from "./utils.js";

export class Game {
	init() {
		// Map generation
		let field = document.getElementsByClassName("field")[0];
		field.innerHTML = "";
		for (let i = 0; i < 40 * 24; i++) {
			const wall = document.createElement("div");
			wall.className = "tile tileW";
			field.appendChild(wall);
		}

		// Filling the map with a wall
		const gameMap = new Array(24)
			.fill()
			.map(() => new Array(40).fill("wall"));

		// Generating rooms, passges and game objects
		const numRooms = getRandomInt(5, 10);
		const numPassagesH = getRandomInt(3, 5);
		const numPassagesV = getRandomInt(3, 5);
		const numFlasks = 10;
		const numSwords = 2;
		const numEnemies = 10;

		for (let i = 0; i < numRooms; i++) {
			createRoom(gameMap);
		}
		for (let i = 0; i < numPassagesH; i++) {
			createPassage(gameMap, "horizontal");
		}
		for (let i = 0; i < numPassagesV; i++) {
			createPassage(gameMap, "vertical");
		}
		for (let i = 0; i < numFlasks; i++) {
			createGameObject(gameMap, "flask");
		}
		for (let i = 0; i < numSwords; i++) {
			createGameObject(gameMap, "sword");
		}
		for (let i = 0; i < numEnemies; i++) {
			createGameObject(gameMap, "enemy");
		}
		const [charY, charX] = createGameObject(gameMap, "character");
		console.log(charY, charX);

		// Rendering of objects
		const renderMap = () => {
			let tiles = field.querySelectorAll("div");
			for (let r = 0; r < 24; r++) {
				for (let c = 0; c < 40; c++) {
					const index = 40 * r + c;
					if (gameMap[r][c] === "ground") {
						tiles[index].className = "tile";
					} else if (gameMap[r][c] === "flask") {
						tiles[index].className = "tile tileHP";
					} else if (gameMap[r][c] === "sword") {
						tiles[index].className = "tile tileSW";
					} else if (gameMap[r][c] === "character") {
						tiles[index].className = "tile tileP";
					} else if (gameMap[r][c] === "enemy") {
						tiles[index].className = "tile tileE";
					}
				}
			}
		};

        renderMap()
	}
}
