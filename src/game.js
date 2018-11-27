let register = {};
let id = 0;

let playerOne = {
  name: "Player 1",
  rase: "Human"
};
let playerTwo = {
  name: "Player 2",
  rase: "Gnome"
};

class Game {
  constructor() {
    this.score = "0:0";
  }

  createCharacter({ name, rase }) {
    if (rase === "Gnome") {
      return new Gnome(name);
    } else if (rase === "Human") {
      return new Human(name);
    }
  }

  initGame(player1, player2) {
    this.playerOne = this.createCharacter(player1);
    this.playerTwo = this.createCharacter(player2);
  }

  startFight() {
    const { playerTwo, playerOne } = this;

    do {
      playerOne.attack(playerOne.damage, playerTwo);
      if (playerTwo.health <= 0) {
        console.log(`${playerOne.name} win`);
        break;
      }
      playerTwo.attack(playerTwo.damage, playerOne);
      if (playerOne.health <= 0) {
        console.log(`${playerTwo.name} win`);
        break;
      }
      
    } while (playerOne.health >= 0 || playerTwo.health >= 0);
  }
}

class Character {
  constructor(name) {
    this.id = id++;
    register[this.id] = this;
    this.name = name;
    this.health = 100;
    this.weapons = {
      bow: {
        min: 1,
        max: 4,
        attacks: 3
      },
      sword: {
        min: 3,
        max: 10,
        attacks: 1
      }
    };
  }

  attack({ min, max, attacks }, target) {
    let damage = 0;
    for (let i = 0; i < attacks; i++) {
      let hit = Math.floor(Math.random() * (max + 1 - min)) + min;
      console.log(hit);
      damage += hit;
    }
    target.health -= damage;
    console.log(`${this.name} нанес ${damage} урона ${target.name}`);
    return `${this.name} нанес ${damage} урона ${target.name}`;
  }
}

class Gnome extends Character {
  constructor(name) {
    super(name);
    this.damage = this.weapons["bow"];
  }
}

class Human extends Character {
  constructor(name) {
    super(name);
    this.damage = this.weapons["sword"];
  }
}

const game = new Game();

game.initGame(playerOne, playerTwo);
game.startFight();
