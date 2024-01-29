import { DIRECTIONS, TILES, getRandomInt, enemyComparing } from "./utils.js";
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
for (let i = 0; i < 10; i++) {
	const enemy = new Enemy();
	enemies.push(enemy);
	map.addCharacter(enemy);
}

let isWon = false;
let isLost = false;
let isHeroMove = true;
const collectSound = new Audio("./assets/sounds/collecting.mp3");
const swordSound = new Audio("./assets/sounds/sword.mp3");
const footstepSound = new Audio("./assets/sounds/footsteps.mp3");
const enemyFootstepSound = new Audio("./assets/sounds/enemy_footsteps.mp3");
const enemyHitSound = new Audio("./assets/sounds/enemy_hit.mp3");

collectSound.volume = 0.2;
swordSound.volume = 0.2;
footstepSound.volume = 0.3;
enemyFootstepSound.volume = 0.3;
enemyHitSound.volume = 0.3;

game.render(map.mapArr, hero, isHeroMove);

const moveHero = (event) => {
	const [newX, newY] = [hero.position.x, hero.position.y];
	if (
		["w", "ц", "W", "Ц"].includes(event.key) &&
		map.mapArr[newY - 1] !== undefined
	) {
		if (
			[TILES.ground, TILES.sword, TILES.flask].includes(
				map.mapArr[newY - 1][newX]
			)
		) {
			if (map.mapArr[newY - 1][newX] === TILES.flask) {
				hero.health += 5;
				collectSound.play();
			} else if (map.mapArr[newY - 1][newX] === TILES.sword) {
				hero.attack += 1;
				collectSound.play();
			} else {
				footstepSound.play();
			}
			hero.position = { x: newX, y: newY - 1 };
			map.mapArr[newY - 1][newX] = TILES.hero;
			map.mapArr[newY][newX] = TILES.ground;
			isHeroMove = false;
			setTimeout(() => moveEnemies(), 1000);
		}
	} else if (["a", "ф", "A", "Ф"].includes(event.key)) {
		if (
			[TILES.ground, TILES.sword, TILES.flask].includes(
				map.mapArr[newY][newX - 1]
			)
		) {
			if (map.mapArr[newY][newX - 1] === TILES.flask) {
				hero.health += 5;
				collectSound.play();
			} else if (map.mapArr[newY][newX - 1] === TILES.sword) {
				hero.attack += 1;
				collectSound.play();
			} else {
				footstepSound.play();
			}
			hero.position = { x: newX - 1, y: newY };
			map.mapArr[newY][newX - 1] = TILES.hero;
			map.mapArr[newY][newX] = TILES.ground;
			isHeroMove = false;
			setTimeout(() => moveEnemies(), 1000);
		}
	} else if (
		["s", "ы", "S", "Ы"].includes(event.key) &&
		map.mapArr[newY + 1] !== undefined
	) {
		if (
			[TILES.ground, TILES.sword, TILES.flask].includes(
				map.mapArr[newY + 1][newX]
			)
		) {
			if (map.mapArr[newY + 1][newX] === TILES.flask) {
				hero.health += 5;
				collectSound.play();
			} else if (map.mapArr[newY + 1][newX] === TILES.sword) {
				hero.attack += 1;
				collectSound.play();
			} else {
				footstepSound.play();
			}
			hero.position = { x: newX, y: newY + 1 };
			map.mapArr[newY + 1][newX] = TILES.hero;
			map.mapArr[newY][newX] = TILES.ground;
			isHeroMove = false;
			setTimeout(() => moveEnemies(), 1000);
		}
	} else if (["d", "в", "D", "В"].includes(event.key)) {
		if (
			[TILES.ground, TILES.sword, TILES.flask].includes(
				map.mapArr[newY][newX + 1]
			)
		) {
			if (map.mapArr[newY][newX + 1] === TILES.flask) {
				hero.health += 5;
				collectSound.play();
			} else if (map.mapArr[newY][newX + 1] === TILES.sword) {
				hero.attack += 1;
				collectSound.play();
			} else {
				footstepSound.play();
			}
			hero.position = { x: newX + 1, y: newY };
			map.mapArr[newY][newX + 1] = TILES.hero;
			map.mapArr[newY][newX] = TILES.ground;
			isHeroMove = false;
			setTimeout(() => moveEnemies(), 1000);
		}
	} else if (event.key === " ") {
		if (
			newY - 1 >= 0 &&
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
			enemy.showDamage(hero.attack)
			swordSound.play();
			if (enemy.health <= 0) {
				map.mapArr[newY - 1][newX] = TILES.ground;
				enemies = enemies.filter(
					(enemy1) => !enemyComparing(enemy1, enemy)
				);
			}
		}
		if (
			newY >= 0 &&
			newY < 24 &&
			newX - 1 >= 0 &&
			newX - 1 < 40 &&
			map.mapArr[newY][newX - 1] === TILES.enemy
		) {
			const enemy = enemies.find(
				(enemy) =>
					enemy.position.x === newX - 1 && enemy.position.y === newY
			);
			enemy.health = enemy.health - hero.attack;
			enemy.showDamage(hero.attack)
			swordSound.play();
			if (enemy.health <= 0) {
				map.mapArr[newY][newX - 1] = TILES.ground;
				enemies = enemies.filter(
					(enemy1) => !enemyComparing(enemy1, enemy)
				);
			}
		}
		if (
			newY + 1 >= 0 &&
			newY + 1 < 24 &&
			newX >= 0 &&
			newX < 40 &&
			map.mapArr[newY + 1][newX] === TILES.enemy
		) {
			const enemy = enemies.find(
				(enemy) =>
					enemy.position.x === newX && enemy.position.y === newY + 1
			);
			enemy.health = enemy.health - hero.attack;
			enemy.showDamage(hero.attack)
			swordSound.play();
			if (enemy.health <= 0) {
				map.mapArr[newY + 1][newX] = TILES.ground;
				enemies = enemies.filter(
					(enemy1) => !enemyComparing(enemy1, enemy)
				);
			}
		}
		if (
			newY >= 0 &&
			newY < 24 &&
			newX + 1 >= 0 &&
			newX + 1 < 40 &&
			map.mapArr[newY][newX + 1] === TILES.enemy
		) {
			const enemy = enemies.find(
				(enemy) =>
					enemy.position.x === newX + 1 && enemy.position.y === newY
			);
			enemy.health = enemy.health - hero.attack;
			enemy.showDamage(hero.attack)
			swordSound.play();
			if (enemy.health <= 0) {
				map.mapArr[newY][newX + 1] = TILES.ground;
				enemies = enemies.filter(
					(enemy1) => !enemyComparing(enemy1, enemy)
				);
			}
		}
		isHeroMove = false;
		setTimeout(() => moveEnemies(), 1000);
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
		hero.showDamage(enemy.attack)
		enemyHitSound.play();
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
			enemy.playFootstepSound()
		}
		game.render(map.mapArr, hero, isHeroMove);
	}
};

const moveEnemies = () => {
	enemies.forEach((enemy, index) => {
		setTimeout(() => {
			if (index === enemies.length - 1) {
				isHeroMove = true;
			}
			moveEnemy(enemy);
		}, index * 100);
	});
};

document.addEventListener("keypress", (event) => {
	if (isHeroMove) {
		moveHero(event);
	}
});
