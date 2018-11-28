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

// класс выполнения всех дейтсвий
class Game {
  constructor() {
    this.score = { playerOne: 0, playerTwo: 0 };
  }

  createCharacter({ name, rase }) {
    if (rase === "Gnome") {
      return new Gnome(name);
    } else if (rase === "Human") {
      return new Human(name);
    }
  }

  initGame(player1, player2) {
    // Создание 2 играков
    this.playerOne = this.createCharacter(player1);
    this.playerTwo = this.createCharacter(player2);
    // Создания счета
    document.body.innerHTML = "";
    document.body.appendChild(this.render());
  }

  startFight() {
    const { playerTwo, playerOne } = this;
    let round = 1;
    let list = document.createElement("ul");
    list.innerHTML = ""

    do {

      let item = document.createElement("li");
      item.innerHTML = `<h2>Round ${round}</h2>`

      // Запись атак 1го игрока
      item.innerHTML += playerOne.attack(playerOne.damage, playerTwo);
      if (playerTwo.health <= 0) {
        item.innerHTML += `<h2>${playerOne.name} Win</h2>`;
        list.appendChild(item);
        playerOne.health = 100;
        playerTwo.health = 100;
        break;
      }

      // Запись атак 2го игрока
      item.innerHTML += playerTwo.attack(playerTwo.damage, playerOne);
      if (playerOne.health <= 0) {
        item.innerHTML += `<h2>${playerTwo.name} win</h2>`;
        list.appendChild(item);
        playerOne.health = 100;
        playerTwo.health = 100;
        break;
      }
      //возвращаем итог раунда
      list.appendChild(item)
      round++
    } while (playerOne.health >= 0 || playerTwo.health >= 0);

    document.getElementById("log").appendChild(list)
    return 
  }

  render() {
    let div = document.createElement("div");
    div.innerHTML = `
      <h1>win:${this.score.playerOne} ${this.playerOne.name} VS  ${
      this.playerTwo.name
    } ${this.score.playerTwo}:win</h1>
      <div id="log">
        <button onclick=game.startFight()>Start Fight</button>
      </div>`;
    return div;
  }
}

// Классы персонажей
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
    let resultAttack = ""
    let damage = 0;

    for (let i = 0; i < attacks; i++) {
      let hit = Math.floor(Math.random() * (max + 1 - min)) + min;
      damage += hit;
      resultAttack +=`${this.name} нанес ${hit} урона играку ${target.name}<br>` ;
    }
    target.health -= damage;
    resultAttack += `здоровья ${target.name} = ${target.health}<br>`
    return resultAttack
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


