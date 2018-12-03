const gamer = {};
let id = 0;

class Game {
  constructor() {
    this.id = id++;
    gamer[this.id] = this;
    this.score = 0;
    this.score2 = 0;

  }
  render() {
    document.querySelector(".score-player1").innerHTML = this.score;
    document.querySelector(".score-player2").innerHTML = this.score2;
    player1.renderGnome();
    player2.renderHuman();
  }
}

class Hero extends Game {
  constructor(name) {
    super();
    this.hp = 50;
    this.name = name;
  }

  reduceHp(attackUser, damage) {
    this.hp = this.hp - (Math.floor(Math.random() * damage - 2) + 2);
    this.render();
    if (this.hp <= 0) {
      gamer[this.id].hp = 50;
      this.addScore(attackUser);
      this.render();
    }
  }

  attack() {
      gamer[this.id].reduceHp(this.id, this.damage);
      gamer[this.id].reduceHp(this.id, this.damage);
  }

  addScore(attackUser) {
    if (attackUser === 0) {
      gamer[attackUser].score2 += 1;
    } else {
      gamer[attackUser].score += 1;
    }
  }
}

class Gnome extends Hero {
  constructor(name) {
    super(name);
    this.weapon = "Sward";
    this.damage = 8;
  }
  renderGnome() {
    document.querySelector(".hp-player1").innerHTML = this.hp;
    document.querySelector(".weapon-player1").innerHTML = this.weapon;
    document.querySelector(".name-player1").innerHTML = this.name;
  }
}

class Human extends Hero {
  constructor(name) {
    super(name);
    this.weapon = "Bow";
    this.damage = 10;
  }
  renderHuman() {
    document.querySelector(".hp-player2").innerHTML = this.hp;
    document.querySelector(".weapon-player2").innerHTML = this.weapon;
    document.querySelector(".name-player2").innerHTML = this.name;
  }
}

let button1 = document.querySelector(".player1-attack");
let button2 = document.querySelector(".player2-attack");

let player1 = new Gnome("Perky");
button1.addEventListener("click", function(){player1.attack()});
let player2 = new Human("Oleja");
button2.addEventListener("click",  function(){player2.attack()});

console.log(player1);
console.log(player2);
