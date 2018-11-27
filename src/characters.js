const readline = require('readline');
const treeify = require('treeify');

const interfaceConsole = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

class Character {
  constructor(name) {
    this.state = {
      name,
      health: 100,
      damage: 2,
      criticalChance: 6,
    };
  }

  getHealth() {
    return this.state.health;
  }

  reduceHp(value) {
    this.state.health -= value;
    console.log(
      `Player ${this.state.name} was attacked by opponent\t|| ${
        this.state.name
      } gain damage : -${value} HP ||  Health: ${this.state.health}\n`,
    );
    return this;
  }

  stats() {
    return interfaceConsole.write(`${treeify.asTree(this.state, true)} \n`);
  }

  attack(enemy) {
    const criticalMultiplier = Math.floor(Math.random() * 10) >= this.state.criticalChance ? 1.5 : 1;
    enemy.reduceHp(this.state.damage * criticalMultiplier);
  }

  select(target) {
    return interfaceConsole.question(
      'What would yours action will be? \n 1 - Attack,2 - Your stats: \n ',
      (choice) => {
        switch (choice) {
          case 1:
            return this.attack(target);
          case 2:
            return this.stats();
          case 3:
            return this.heal();
          default: {
            console.log('there is no action for this input,choose another');
            return this.select(target);
          }
        }
      },
    );
  }
}
class Human extends Character {
  constructor(props) {
    super(props);
    this.state.criticalChance = 3;
  }
}

class Warrior extends Character {
  constructor(props) {
    super(props);
    this.state.health = 100;
    this.state.damage = 5;
    this.state.criticalChance = 3;
  }
}

class Mage extends Character {
  constructor(props) {
    super(props);
    this.state.health = 80;
    this.state.damage = 9;
    this.state.criticalChance = 4;
  }
}

module.exports = { Mage, Warrior, Human };
