const register = {};
let id = 0;

const playerOne = {
  name: 'Player 1',
  rase: 'Human',
};
const playerTwo = {
  name: 'Player 2',
  rase: 'Gnome',
};

class Game {
  constructor() {
    this.score = { playerOne: 0, playerTwo: 0 };
  }

  createCharacter({ name, rase }) {
    if (rase === 'Gnome') {
      return new Gnome(name);
    }
    if (rase === 'Human') {
      return new Human(name);
    }
  }

  initGame(player1, player2) {
    this.playerOne = this.createCharacter(player1);
    this.playerTwo = this.createCharacter(player2);
    document.body.innerHTML = '';
    document.body.appendChild(this.render());
  }

  startFight() {
    const { playerTwo, playerOne } = this;
    let round = 1;
    const list = document.createElement('ul');
    playerOne.health = 100;
    playerTwo.health = 100;

    do {
      const item = document.createElement('li');
      item.innerHTML = `<h2>Round ${round}</h2>`;

      item.innerHTML += playerOne.attack(playerOne.damage, playerTwo);
      if (playerTwo.health <= 0) {
        item.innerHTML += `<h2>${playerOne.name} Win</h2>`;
        list.appendChild(item);
        break;
      }

      item.innerHTML += playerTwo.attack(playerTwo.damage, playerOne);
      if (playerOne.health <= 0) {
        item.innerHTML += `<h2>${playerTwo.name} win</h2>`;
        list.appendChild(item);
        break;
      }
      item.innerHTML += `${playerOne.name} ${playerOne.health}/100<br>
                        ${playerTwo.name} ${playerTwo.health}/100<br>`;
      list.appendChild(item);
      round++;
    } while (playerOne.health >= 0 || playerTwo.health >= 0);

    document.getElementById('log').innerHTML = '';
    document.getElementById('log').appendChild(list);
  }

  render() {
    const div = document.createElement('div');

    div.innerHTML = `<div>
        <h1>win:${this.score.playerOne} ${this.playerOne.name} VS  ${this.playerTwo.name} ${
  this.score.playerTwo
}:win</h1>
      <button onclick=game.startFight()>Start Fight</button>
        <div id="log">
        </div>
      </div>`;

    return div;
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
        attacks: 3,
      },
      sword: {
        min: 4,
        max: 12,
        attacks: 1,
      },
    };
  }

  attack({ min, max, attacks }, target) {
    let resultAttack = '';
    let damage = 0;

    for (let i = 0; i < attacks; i++) {
      const hit = Math.floor(Math.random() * (max + 1 - min)) + min;
      damage += hit;
      resultAttack += `${this.name} ataks ${target.name}. ${target.name} takes ${hit} damage <br>`;
    }
    target.health -= damage;
    return resultAttack;
  }
}

class Gnome extends Character {
  constructor(name) {
    super(name);
    this.damage = this.weapons.bow;
  }
}

class Human extends Character {
  constructor(name) {
    super(name);
    this.damage = this.weapons.sword;
  }
}

const game = new Game();
