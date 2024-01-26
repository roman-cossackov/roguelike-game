import { DIRECTIONS, TILES, getRandomInt } from "./utils.js";
import { Game } from "./game.js";
import { GameMap } from "./gameMap.js";
import { Hero } from "./hero.js";
import { Enemy } from "./enemy.js";

const game = new Game();
game.init();

const map = new GameMap();
map.createRooms(getRandomInt(5, 10));
map.createPassages(DIRECTIONS.horizontal, getRandomInt(3, 5));
map.createPassages(DIRECTIONS.vertical, getRandomInt(3, 5));
map.createGameObjects(TILES.sword, 2);
map.createGameObjects(TILES.flask, 10);

const hero = new Hero();
map.addCharacter(hero);
let enemies = [];
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

let isWon = false;
let isLost = false;
let isHeroMove = true;

game.render(map.mapArr, hero, isHeroMove);

const moveHero = (event) => {
	const [newX, newY] = [hero.position.x, hero.position.y];
	if (["w", "ц"].includes(event.key) && map.mapArr[newY - 1] !== undefined) {
		if (
			[TILES.ground, TILES.sword, TILES.flask].includes(
				map.mapArr[newY - 1][newX]
			)
		) {
			if (map.mapArr[newY - 1][newX] === TILES.flask) {
				hero.health += 5;
			}
			if (map.mapArr[newY - 1][newX] === TILES.sword) {
				hero.attack += 1;
			}
			hero.position = { x: newX, y: newY - 1 };
			map.mapArr[newY - 1][newX] = TILES.hero;
			map.mapArr[newY][newX] = TILES.ground;
			moveEnemies();
		}
	} else if (["a", "ф"].includes(event.key)) {
		if (
			[TILES.ground, TILES.sword, TILES.flask].includes(
				map.mapArr[newY][newX - 1]
			)
		) {
			if (map.mapArr[newY][newX - 1] === TILES.flask) {
				hero.health += 5;
				console.log("+healthj");
			}
			if (map.mapArr[newY][newX - 1] === TILES.sword) {
				hero.attack += 1;
			}
			hero.position = { x: newX - 1, y: newY };
			map.mapArr[newY][newX - 1] = TILES.hero;
			map.mapArr[newY][newX] = TILES.ground;
			moveEnemies();
		}
	} else if (
		["s", "ы"].includes(event.key) &&
		map.mapArr[newY + 1] !== undefined
	) {
		if (
			[TILES.ground, TILES.sword, TILES.flask].includes(
				map.mapArr[newY + 1][newX]
			)
		) {
			if (map.mapArr[newY + 1][newX] === TILES.flask) {
				hero.health += 5;
			}
			if (map.mapArr[newY + 1][newX] === TILES.sword) {
				hero.attack += 1;
			}
			hero.position = { x: newX, y: newY + 1 };
			map.mapArr[newY + 1][newX] = TILES.hero;
			map.mapArr[newY][newX] = TILES.ground;
			moveEnemies();
		}
	} else if (["d", "в"].includes(event.key)) {
		if (
			[TILES.ground, TILES.sword, TILES.flask].includes(
				map.mapArr[newY][newX + 1]
			)
		) {
			if (map.mapArr[newY][newX + 1] === TILES.flask) {
				hero.health += 5;
			}
			if (map.mapArr[newY][newX + 1] === TILES.sword) {
				hero.attack += 1;
			}
			hero.position = { x: newX + 1, y: newY };
			map.mapArr[newY][newX + 1] = TILES.hero;
			map.mapArr[newY][newX] = TILES.ground;
			moveEnemies();
		}
	} else if (event.key === " ") {
		if (
			newY - 1 > 0 &&
			newY - 1 < 24 &&
			newX >= 0 &&
			newX < 40 &&
			map.mapArr[newY - 1][newX] === TILES.enemy
		) {
			const enemy = enemies.find(
				(enemy) =>
					enemy.position.x === newX && enemy.position.y === newY - 1
			);
			enemy.health -= hero.attack;
			if (enemy.health <= 0) {
				map.mapArr[newY - 1][newX] = TILES.ground;
				enemies = enemies.filter(
					(enemy) =>
						enemy.position.x !== newX &&
						enemy.position.y !== newY - 1
				);
			}
		}
		if (newY > 0 &&
			newY < 24 &&
			newX - 1 >= 0 &&
			newX - 1< 40 &&
			map.mapArr[newY][newX - 1] === TILES.enemy) {
			const enemy = enemies.find(
				(enemy) =>
					enemy.position.x === newX - 1 && enemy.position.y === newY
			);
			enemy.health = enemy.health - hero.attack;
			if (enemy.health <= 0) {
				map.mapArr[newY][newX - 1] = TILES.ground;
				enemies = enemies.filter(
					(enemy) =>
						enemy.position.x !== newX - 1 &&
						enemy.position.y !== newY
				);
			}
		}
		if (newY + 1 > 0 &&
			newY + 1 < 24 &&
			newX >= 0 &&
			newX < 40 &&
			map.mapArr[newY + 1][newX] === TILES.enemy) {
			const enemy = enemies.find(
				(enemy) =>
					enemy.position.x === newX && enemy.position.y === newY + 1
			);
			enemy.health = enemy.health - hero.attack;
			if (enemy.health <= 0) {
				map.mapArr[newY + 1][newX] = TILES.ground;
				enemies = enemies.filter(
					(enemy) =>
						enemy.position.x !== newX &&
						enemy.position.y !== newY + 1
				);
			}
		}
		if (newY > 0 &&
			newY < 24 &&
			newX + 1 >= 0 &&
			newX + 1 < 40 &&map.mapArr[newY][newX + 1] === TILES.enemy) {
			const enemy = enemies.find(
				(enemy) =>
					enemy.position.x === newX + 1 && enemy.position.y === newY
			);
			enemy.health = enemy.health - hero.attack;
			if (enemy.health <= 0) {
				map.mapArr[newY][newX + 1] = TILES.ground;
				enemies = enemies.filter(
					(enemy) =>
						enemy.position.x !== newX + 1 &&
						enemy.position.y !== newY
				);
			}
		}
		moveEnemies();
	}

	if (!enemies.length) {
		isWon = true;
	}
	game.render(map.mapArr, hero, isHeroMove);
};

const moveEnemy = (enemy) => {
	let [xPos, yPos] = [enemy.position.x, enemy.position.y];
	const directions = [
		[yPos - 1, xPos],
		[yPos + 1, xPos],
		[yPos, xPos - 1],
		[yPos, xPos + 1],
	];
	if (
		directions.some(
			(dir) =>
				dir[0] >= 0 &&
				dir[0] < 24 &&
				dir[1] >= 0 &&
				dir[1] < 40 &&
				map.mapArr[dir[0]][dir[1]] === TILES.hero
		)
	) {
		hero.health -= enemy.attack;
		if (hero.health <= 0) {
			isLost = true;
		}
	} else {
		const direction = directions[getRandomInt(0, 3)];
		const [newX, newY] = [direction[1], direction[0]];
		if (
			newY >= 0 &&
			newY < 24 &&
			newX >= 0 &&
			newX < 40 &&
			map.mapArr[newY][newX] === TILES.ground
		) {
			map.mapArr[yPos][xPos] = TILES.ground;
			map.mapArr[newY][newX] = TILES.enemy;
			[enemy.position.x, enemy.position.y] = [newX, newY];
		}
		game.render(map.mapArr, hero, isHeroMove);
	}
};

const moveEnemies = () => {
	isHeroMove = false;
	enemies.forEach((enemy, index) => {
		setTimeout(() => {
			moveEnemy(enemy);
			if (index === enemies.length - 1) {
				isHeroMove = true;
			}
		}, index * 100);
	});
};

document.addEventListener("keypress", (event) => {
	if (isHeroMove) {
		moveHero(event);
	}
});
