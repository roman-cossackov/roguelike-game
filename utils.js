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
            gameMap[y][x] = "ground";
        }
    }
};

export const createPassageH = (gameMap) => {
    const start = getRandomInt(0, 23);
    for (let i = 0; i < 40; i++) {
        gameMap[start][i] = "ground";
    }
}

export const createPassageV = (gameMap) => {
    const start = getRandomInt(0, 39);
    for (let i = 0; i < 24; i++) {
        gameMap[i][start] = "ground";
    }
}


