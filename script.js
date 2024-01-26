import { DIRECTIONS, TILES, getRandomInt } from "./utils.js";
import { Game } from "./game.js";
import { GameMap } from "./gameMap.js";
import { Hero } from "./hero.js";
import { Enemy } from "./enemy.js";

const game = new Game();
// add difficulty
game.init();

const map = new GameMap();
map.createRooms(getRandomInt(5, 10));
map.createPassages(DIRECTIONS.horizontal, getRandomInt(3, 5));
map.createPassages(DIRECTIONS.vertical, getRandomInt(3, 5));
map.createGameObjects(TILES.sword, 2);
map.createGameObjects(TILES.flask, 10);

const hero = new Hero();
map.addCharacter(hero);
const enemies = [];
const enemy1 = new Enemy();
const enemy2 = new Enemy();
const enemy3 = new Enemy();
const enemy4 = new Enemy();
const enemy5 = new Enemy();
const enemy6 = new Enemy();
const enemy7 = new Enemy();
const enemy8 = new Enemy();
const enemy9 = new Enemy();
const enemy10 = new Enemy();
enemies.push(
	enemy1,
	enemy2,
	enemy3,
	enemy4,
	enemy5,
	enemy6,
	enemy7,
	enemy8,
	enemy9,
	enemy10
);
enemies.forEach((enemy) => map.addCharacter(enemy));

game.render(map.mapArr);

document.addEventListener("keypress", (event) => {
	const [newX, newY] = [hero.position.x, hero.position.y];
	if (event.key === ("w" || "ц")) {
		if (map.mapArr[newY - 1][newX] === TILES.ground) {
			hero.position = { x: newX, y: newY - 1 };
			map.mapArr[newY - 1][newX] = TILES.hero;
			map.mapArr[newY][newX] = "ground";
		}
	} else if (event.key === ("a" || "ф")) {
		if (map.mapArr[newY][newX - 1] === TILES.ground) {
			hero.position = { x: newX - 1, y: newY };
			map.mapArr[newY][newX - 1] = TILES.hero;
			map.mapArr[newY][newX] = "ground";
		}
	} else if (event.key === ("s" || "ы")) {
		if (map.mapArr[newY + 1][newX] === TILES.ground) {
			hero.position = { x: newX, y: newY + 1 };
			map.mapArr[newY + 1][newX] = TILES.hero;
			map.mapArr[newY][newX] = "ground";
		}
	} else if (event.key === ("d" || "в")) {
		if (map.mapArr[newY][newX + 1] === TILES.ground) {
			hero.position = { x: newX + 1, y: newY };
			map.mapArr[newY][newX + 1] = TILES.hero;
			map.mapArr[newY][newX] = "ground";
		}
	}
	game.render(map.mapArr);
});
