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
		let [charY, charX] = createGameObject(gameMap, "character");
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

		renderMap();

		// Game process
		let isRunning = true;
		let isWin = false;

		document.addEventListener("keydown", function (event) {
			const key = event.key;
            
			if ((key === "w")) {    
				if (gameMap[charY - 1][charX] === "ground") {
					gameMap[charY - 1][charX] = "character";
                    gameMap[charY][charX] = "ground";
                    [charY, charX] = [charY - 1, charX]
					renderMap();
				}
			}
            if ((key === "a")) {    
				if (gameMap[charY][charX - 1] === "ground") {
					gameMap[charY][charX - 1] = "character";
                    gameMap[charY][charX] = "ground";
                    [charY, charX] = [charY, charX - 1]
					renderMap();
				}
			}
            if ((key === "s")) {    
				if (gameMap[charY + 1][charX] === "ground") {
					gameMap[charY + 1][charX] = "character";
                    gameMap[charY][charX] = "ground";
                    [charY, charX] = [charY + 1, charX]
					renderMap();
				}
			}
            if ((key === "d")) {    
				if (gameMap[charY][charX + 1] === "ground") {
					gameMap[charY][charX + 1] = "character";
                    gameMap[charY][charX] = "ground";
                    [charY, charX] = [charY, charX + 1]
					renderMap();
				}
			}
		});
	}
}
