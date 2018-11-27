let ork = {
  title: "Ork",
  name: "Zarzul",
  health: 120,
  damage : function() {
    let arrDamage = [0, 10, 20, 30];
    let chooseRandom = Math.round(Math.random() * 3);
    let damageOrkRandom = arrDamage[chooseRandom];
    return damageOrkRandom;
  }
};

let vampire = {
  title: "Vampire",
  name: "Polym",
  health: 100,
  damage : function() {
    let arrDamage = [0, 15, 20, 40];
    let chooseRandom = Math.round(Math.random() * 3);
    let damageVampireRandom = arrDamage[chooseRandom];
    return damageVampireRandom;
  }
};

class Enemy {
  constructor(obj) {
    this.state = obj;
  };

  start() {
    return `<div class="start">My name is ${this.state.name}, and my health is ${this.state.health} points.</div>`;
  };

  strikeFinish() {
    document.getElementById("strikeFirstEnemy").onclick = "";
    document.getElementById("strikeSecondEnemy").onclick = "";
    let createFinishElem = document.createElement("div");
    createFinishElem.innerHTML = `<div class="finish-bar">Finish! ${this.state.name} wins!</div>`;
    finishBar.appendChild(createFinishElem);
    return "";
  };
}

class Ork extends Enemy {
  constructor(obj) {
    super();
    this.state = obj;
  };

  strike() {
    if ( `${secondEnemy.state.health}` > 0 && !(`${this.vampireLeftLife}` == 0)) {
      return this.strikeSucces();
    } else {
      return this.strikeFinish();
    }
  };

  strikeSucces() {
    let orkDamageDone = `${this.state.damage()}`;
    let vampireLeftLife = `${secondEnemy.state.health -= orkDamageDone}`;
    if (vampireLeftLife < 0) {
      vampireLeftLife = 0;
    };
    return `<div class="leftContent">
      ${this.state.title} ${this.state.name} strikes ${secondEnemy.state.title} ${secondEnemy.state.name} in ${orkDamageDone} points</div>
      <div class="leftContent">Health of ${secondEnemy.state.name} is ${vampireLeftLife}</div>`;
  };
};

class Vampire extends Enemy {
  constructor(obj) {
    super();
    this.state = obj;
  };

  strike() {
    if (`${firstEnemy.state.health}` > 0 && !(`${this.orkLeftLife}` == 0)) {
      return this.strikeSucces();
    } else {
      return this.strikeFinish();
    }
  };

  strikeSucces() {
    let vampireDamageDone = `${this.state.damage()}`;
    let orkLeftLife = `${firstEnemy.state.health -= vampireDamageDone}`;
    if (orkLeftLife < 0) {
      orkLeftLife = 0;
    };
    return `<div class="rightContent">
      ${this.state.title} ${this.state.name} strikes ${firstEnemy.state.title} ${firstEnemy.state.name} in ${vampireDamageDone} points</div>
      <div class="rightContent">Health of ${firstEnemy.state.name} is ${orkLeftLife}</div>`;
  };
};


let firstEnemy = new Ork(ork);
let secondEnemy = new Vampire(vampire);

function buttStart() {
  let createStartFirstElem = document.createElement("div");
  let createStartSecondElem = document.createElement("div");
  createStartFirstElem.innerHTML = firstEnemy.start();
  createStartSecondElem.innerHTML = secondEnemy.start();
  startBar.appendChild(createStartFirstElem);
  startBar.appendChild(createStartSecondElem);
  document.getElementById("buttStart").onclick = "";
};

function strikeFirstEnemy() {
  let createFirstElem = document.createElement("div");
  createFirstElem.innerHTML = firstEnemy.strike();
  leftContent.appendChild(createFirstElem);
  document.getElementById("buttStart").onclick = "";
};

function strikeSecondEnemy() {
  let createSecondElem = document.createElement("div");
  createSecondElem.innerHTML = secondEnemy.strike();
  rightContent.appendChild(createSecondElem);
  document.getElementById("buttStart").onclick = "";
};