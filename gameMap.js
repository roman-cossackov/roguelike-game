import { createRoom, createPassage, createGameObject } from "./utils.js";

export class GameMap {
	constructor() {
		this.mapArr = new Array(24)
			.fill()
			.map(() => new Array(40).fill("wall"));
	}
	createRooms(numRooms) {
		for (let i = 0; i < numRooms; i++) {
			createRoom(this.mapArr);
		}
	}
	createPassages(direction, numPassages) {
		for (let i = 0; i < numPassages; i++) {
			createPassage(this.mapArr, direction);
		}
	}
	createGameObjects(typeOfObject, numOfObjects) {
		for (let i = 0; i < numOfObjects; i++) {
			createGameObject(this.mapArr, typeOfObject);
		}
	}
	addCharacter(character) {
		const [x, y] = createGameObject(this.mapArr, character.role);
		character.position = { x: x, y: y };
	}
}
