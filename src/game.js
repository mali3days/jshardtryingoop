let register = {};
let id = 0;

let playerOne = {
  name: "P1",
  rase: "Human",
};
let playerTwo = {
  name: "P2",
  rase: "Gnome",
}

class Game {
  constructor() {
    this.score = "0:0"
  }

  createCharacter({name, rase}) {
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
    const {
      playerTwo,
      playerOne,
    } = this;
    
    do {
      console.log(playerOne.attack(playerOne.damage, playerTwo))
      console.log(playerTwo.attack(playerTwo.damage, playerOne))

    } while (playerOne.health >= 0)
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
  
  attack({min, max, attacks}, target) {
    let damage = attacks * Math.floor(Math.random() * (max + 1 - min)) + min;
    target.health -= damage
    if (this.helth >= 0 ) {
      console.log(`${target.name} win`)
      return `${target.name} win`
    }
    return `${this.name} нанес ${damage} урона ${target.name}`
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
game.startFight()