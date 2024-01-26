import { TILES } from "./utils.js";

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

	render(gameMap, hero, isHeroMove) {
		let field = document.getElementsByClassName("field")[0];
		let tiles = field.querySelectorAll("div");
		for (let r = 0; r < 24; r++) {
			for (let c = 0; c < 40; c++) {
				const index = 40 * r + c;
				if (gameMap[r][c] === TILES.ground) {
					tiles[index].className = "tile";
				} else if (gameMap[r][c] === TILES.flask) {
					tiles[index].className = "tile tileHP";
				} else if (gameMap[r][c] === TILES.sword) {
					tiles[index].className = "tile tileSW";
				} else if (gameMap[r][c] === TILES.hero) {
					tiles[index].className = "tile tileP";
				} else if (gameMap[r][c] === TILES.enemy) {
					tiles[index].className = "tile tileE";
				}
			}
		}

		let health = document.getElementsByClassName("health")[0];
		health.innerHTML = `Health: ${hero.health}`;

		let attack = document.getElementsByClassName("attack")[0];
		attack.innerHTML = `Attack: ${hero.attack}`;

		// let move = document.getElementsByClassName("move")[0];
		// if (isHeroMove) {
		// 	move.innerHTML = "YOUR MOVE"
		// } else {
		// 	move.innerHTML = "ENEMY'S MOVE"
		// }
	}
}
