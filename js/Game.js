class Creature {
  constructor() {
    this.state = {
      healthPoints: 100,
      manaPoints: 100,
    };
  }
}

class Hero extends Creature {
  constructor(name = 'Nameless godslayer') {
    super();
    this.state = {
      name,
      race: 'human',
      weapon: 'Fists',
      level: 1,
      isDead: false,
    };
  }

  isAlive() {
    if (this.state.healthPoints <= 0) {
      this.state.isDead = true;
      console.log('Ты погиб !');
    }
  }

  render() {
    return `<div class="hero-info><h4>Name: ${this.state.name}</h4><h4>Level: ${this.state.level}</h4><h4>Weapon: ${this.state.weapon}</h4></div>`;
  }
}

class Enemy extends Creature {
  constructor(name) {
    super();
    this.state = {
      name,
      isDead: false,
    };
  }

  battle() {
    const tempRandom = Math.floor(Math.random() * 10);
    if (tempRandom < 2) {
      console.log(`${this.state.name} смог атаковать тебя`);
      hero.state.healthPoints -= 10;
      console.log(`Твое здоровье опустилось до ${hero.state.healthPoints}`);
    } else {
      console.log(`${this.state.name} промахнулся ! Самое время атаковать его в ответ.`);
      console.log('Ты успешно контратаковал противника !');
      enemy.state.healthPoints -= 50;
      console.log(`Его здоровье опустилось до ${enemy.state.healthPoints}`);
      this.isAlive();
    }
  }

  isAlive() {
    if (this.state.healthPoints <= 0) {
      this.state.isDead = true;
      console.log('Противник уничтожен !');
    }
  }
}


class Game {
  constructor() {
    this.state = {
      currentStep: 0,
      isInBattle: false,
    };
  }

  getName() {
    const name = prompt('Tell me your name');
    hero.state.name = name;
  }

  start() {
    this.getName();
    console.log(`Добро пожаловать в подземелье, ${hero.state.name}`);
    console.log(`Твой текущий уровень равен ${hero.state.level}`);
    this.gameOn();
  }

  gameOn() {
    this.timerId = setInterval(() => {
      console.log('Ты двигаешься по подземелью');
      const tempRandom = Math.floor(Math.random() * 10);
      if (tempRandom <= 5) {
        this.state.isInBattle = true;
      }
      if (this.state.isInBattle) this.battleMode();
    }, 3000);
    console.log('Твой герой погиб, игра закончена !');
  }

  battleMode() {
    clearInterval(this.timerId);
    console.log(`Ты встретил противника ${enemy.state.name = 'Демонический прислужник'}`);
  }
}

const hero = new Hero();
const enemy = new Enemy();
const game = new Game();

game.start();
