const { Mage, Warrior } = require('../src/characters');

class Game {
  constructor(player1, player2) {
    this.playerOne = player1;
    this.playerTwo = player2;
  }

  async startGame() {
    console.log('\nPlayer stats: \n');
    console.log('First player:');
    this.playerOne.stats();
    console.log('Second player:');
    this.playerTwo.stats();
    console.log('\n=================Start game!=================\n');
    while (this.playerOne.getHealth() > 0 && this.playerTwo.getHealth() > 0) {
      this.playerOne.attack(this.playerTwo);
      this.playerTwo.attack(this.playerOne);
    }
    this.end();
  }

  end() {
    console.log('======================================================\n');
    return this.playerOne.getHealth() < 0
      ? console.log(`Congrats, ${this.playerOne.state.name}. You're winner!`)
      : console.log(`Congrats, ${this.playerOne.state.name}. You're winner`);
  }
}

const mage = new Mage('Mage');
const warrior = new Warrior('Warrior');

const game = new Game(mage, warrior);

game.startGame(mage, warrior);
