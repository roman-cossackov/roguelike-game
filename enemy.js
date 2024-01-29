import { TILES, getRandomInt } from "./utils.js";

export class Enemy {
	constructor() {
		this.role = TILES.enemy;
		this.position = { x: 0, y: 0 };
		this.health = getRandomInt(3, 10);
		this.attack = getRandomInt(1, 3);
	}
	showDamage(damage) {
		const [r, c] = [this.position.y, this.position.x];
		const index = 40 * r + c;
		const field = document.getElementsByClassName("field")[0];
		const tile = field.querySelectorAll("div")[index];
		const number = document.createElement("p");
		number.className = "damage";
		number.textContent = `-${damage}`;
		tile.appendChild(number);

		const animate = () => {
			let position = 0;
			const speed = 0.3;

			const move = () => {
				position += speed;
				number.style.transform = `translateY(-${position}px)`;
				if (position <= 20) {
					requestAnimationFrame(move);
				} else {
					tile.removeChild(number);
				}
			};

			move();
		};
		requestAnimationFrame(animate);
	}
}
