let hitBow = Math.floor(Math.random() * 10);
let hitAxe = Math.floor(Math.random() * 10 + 2);
let bow = hitBow;
let axe = hitAxe;
let range = 3;
let charId = {

}
let id = 0;

class Game {
	constructor() {
		id += 1;
		this.id = id;
		charId[this.id] = this;
		this.raund = 0;

	}


	// updateData() {
	// 	document.querySelector("#root").innerHTML =


	// }


}


class Stats extends Game {
	constructor() {
		super()
		this.health = 50;

	}
	oneHit(hit, enemy, select) {
		this.health = this.health - hit;
		document.querySelector("#root").innerHTML = elf.render() + ork.render()
		// this.updateData()
		if (this.health <= 0) {
			this.health = 50;
			charId[enemy].health = 50;
			charId[enemy].raundEnd(enemy, select);
			document.querySelector("#root").innerHTML = elf.render() + ork.render()
			// this.updateData();
		}
	}

	attack(hit, enemy, select) {
		// this.stopAtkBtn(enemy, select)
		charId[select].oneHit(hit, enemy, select)

	}
	changeEnemy() {
		if (this.id === 2) {
			this.attack(this.weapon, this.id, 1);
		} else {
			charId[1].attack(charId[1].weapon, this.id, 2);
		}
	}

	raundEnd(enemy, select) {
		enemy[select].raund += 1;
		this.updateData();
	}


}

class Elf extends Stats {
	constructor(bow) {
		super()
		this.name = "Arche"
		this.weapon = bow;
	}

	render() {
		return `
		<div class="raund">Your victories is ${this.raund}</div>/n
		<div class="userName">Your class is ${this.name}</div>/n
		<div class="health">Your health is ${this.health}</div>/n
		<input type="button" class="attackButton" id="button${this.id}" onclick="charId[${this.id}].changeEnemy()" value="Attack"/>

	`;
	}
}
class Ork extends Stats {
	constructor(axe) {
		super()
		this.name = "HeadBreaker"
		this.weapon = axe;
		this.orkRange = range;
	}
	render() {
		return `
		<div class="raund">Your victories is ${this.raund}</div>/n
		<div class="userName">Your class is ${this.name}</div>/n
		<div class="health">Your health is ${this.health}</div>/n
		<input type="button" class="attackButton" id="button${this.id}" onclick="charId[${this.id}].changeEnemy()" value="Attack"/>

	`;
	}
}


const elf = new Elf(bow)
const ork = new Ork(axe)
const game = new Game();
const stats = new Stats();
document.querySelector("#root").innerHTML = elf.render() + ork.render()
// elf.updateData();
// ork.updateData();


//under development

	// stopAtkBtn(enemy, select) {
	// 	document.querySelector(`.attackButton${enemy}`).disabled = true;
	// 	const orkRange = document.querySelector(`.attackButton${enemy[range]}`).disabled = true;
	// 	if (orkRange == 3) {
	// 		true;
	// 		orkRange--
	// 	} else if (orkRange == 0){
	// 		OrkRange = 0;
	// 	}
	// }

// if (this.name == "Archer") {
// 			this.hp - this.heltheFeatureRace
// 		} else if (this.name == "HeadBreaker") {
// 			this.hp + this.heltheFeatureRace
// 		}
//