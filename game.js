
const players = {};
let ID = 0;

class Game {
  constructor() {
    this.score = 0;
    ID += 1;
    this.id = ID;
    players[this.id] = this;
  }

  startGame() {
    this.character = document.createElement('div');
    this.character.setAttribute('class', 'player');
    document.getElementById('main').appendChild(this.character);
    if (this.id > 2) {
      document.getElementById('main').removeChild(document.getElementById('main').lastChild);
      console.log('Please create just two users');
      return;
    }
    this.renderCharacter();
  }

  renderCharacter() {
    this.character.innerHTML = `<span class="score">Your score is ${this.score}</span></br> 
        <span class="name">Your class is ${this.className}</span><br>
        <span class="health">Your health is ${this.health}</span><br>
        <span class="weapon">You using ${this.weaponName} with power ${this.weaponPower}</span><br>
        <input type="button" class="attackButton" id="button${this.id}" onclick="players[${this.id}].attack()" value="Attack"/>`;
  }
}

class Character extends Game {
  constructor() {
    super();
    this.health = 50;
  }

  reduceHealth(power, attacker, target) {
    this.health = this.health - power;
    this.renderCharacter();
    if (this.health <= 0) {
      this.health = 50;
      players[attacker].health = 50;
      players[attacker].addScore(attacker, target);
      this.renderCharacter();
    }
  }

  addScore(attacker, target) {
    players[attacker].score += 1;
    this.renderCharacter();
    // eslint-disable-next-line
    alert(`Player number ${attacker} get one point!`);
    this.onOffButtons(attacker, target);
  }

  onOffButtons(attacker, target) {
    document.getElementById(`button${attacker}`).disabled = true;
    document.getElementById(`button${target}`).disabled = false;
  }

  damage(power, attacker, target) {
    if (Math.random() * this.attackChance * 10 > 2.5) {
      // eslint-disable-next-line
      alert(`Player number ${target} get ${this.weaponPower} damage`);
      this.onOffButtons(attacker, target);
      players[target].reduceHealth(power, attacker, target);
    } else {
      // eslint-disable-next-line
      alert('You missed!');
      this.onOffButtons(attacker, target);
    }
  }

  attack() {
    if (this.id === 2) {
      this.damage(this.weaponPower, this.id, 1);
    } else {
      players[1].damage(players[1].weaponPower, this.id, 2);
    }
  }
}

class Gnome extends Character {
  constructor() {
    super();
    this.weaponName = 'bow';
    this.className = 'Gnome';
    this.weaponPower = 20;
    this.attackChance = 0.55;
  }
}

class Human extends Character {
  constructor() {
    super();
    this.weaponName = 'topolM';
    this.className = 'Human';
    this.weaponPower = 15;
    this.attackChance = 0.8;
  }
}

class Ghoul extends Character {
  constructor() {
    super();
    this.weaponName = 'claws';
    this.className = 'Ghoul';
    this.weaponPower = 10;
    this.attackChance = 1;
  }
}
const Kolya = new Gnome();
const Oleg = new Ghoul();
const Misha = new Human();
const Kostya = new Ghoul();

Kolya.startGame();
Oleg.startGame();
Misha.startGame();
Kostya.startGame();
