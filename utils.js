export const DIRECTIONS = { vertical: "vertical", horizontal: "horizontal" };
export const TILES = {
	ground: "ground",
	wall: "wall",
	sword: "sword",
	flask: "flask",
	hero: "hero",
	enemy: "enemy",
};
// export const CLASS = {
// 	warrior: "warior",
// 	archer: "archer",
// 	wizzard: "wizzard",
// };

export const getRandomInt = (min, max) => {
	return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const createRoom = (gameMap) => {
	const roomWidth = getRandomInt(3, 8);
	const roomHeight = getRandomInt(3, 8);
	const startX = getRandomInt(0, 40 - roomWidth - 1);
	const startY = getRandomInt(0, 24 - roomHeight - 1);

	for (let y = startY; y < startY + roomHeight; y++) {
		for (let x = startX; x < startX + roomWidth; x++) {
			gameMap[y][x] = TILES.ground;
		}
	}
};

export const createPassage = (gameMap, direction) => {
	if (direction === DIRECTIONS.horizontal) {
		const start = getRandomInt(0, 23);
		for (let i = 0; i < 40; i++) {
			gameMap[start][i] = TILES.ground;
		}
	} else if (direction === DIRECTIONS.vertical) {
		const start = getRandomInt(0, 39);
		for (let i = 0; i < 24; i++) {
			gameMap[i][start] = TILES.ground;
		}
	}
};

export const createGameObject = (gameMap, typeOfObject) => {
	let [x, y] = [getRandomInt(0, 39), getRandomInt(0, 23)];
	while (gameMap[y][x] !== TILES.ground) {
		x = getRandomInt(0, 39);
		y = getRandomInt(0, 23);
	}

	if (typeOfObject === TILES.flask) {
		gameMap[y][x] = TILES.flask;
	} else if (typeOfObject === TILES.sword) {
		gameMap[y][x] = TILES.sword;
	} else if (typeOfObject === TILES.hero) {
		gameMap[y][x] = TILES.hero;
	} else if (typeOfObject === TILES.enemy) {
		gameMap[y][x] = TILES.enemy;
	}

	return [x, y];
};

export const enemyComparing = (enemy1, enemy2) => {
	if (
		enemy1.position.x === enemy2.position.x &&
		enemy1.position.y === enemy2.position.y
	)
		return true;
	return false;
};
