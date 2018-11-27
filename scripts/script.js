const dog = {
  name: 'Max',
  score: 300,
  attack: Math.floor(Math.random() * 100) + 50,
};

const cat = {
  name: 'Kitty',
  score: 300,
  attack: Math.floor(Math.random() * 200) + 100,
};

const players = {};
let id = 0;

class Players {
  constructor() {
    this.id = id;
    id += 1;
    players[this.id] = this;
  }
}

class Player extends Players {
  constructor({ name, score, attack }) {
    super();
    this.state = {
      name,
      score,
      attack,
    };
  }

  initializeEnemy() {
    const enemy = players[`${this.id === 0 ? 1 : 0}`];
    const enemyPlayer = document.getElementById(`${enemy.id}`);

    this.enemy = {
      obj: enemy,
      playerUi: enemyPlayer,
      pointUi: enemyPlayer.querySelector('.hp-point'),
      scoreUi: enemyPlayer.querySelector('.hp-score'),
    };
  }

  attack(e) {
    this.initializeEnemy();
    const appliedDamage = this.damage();

    if (appliedDamage === 0) {
      this.consoleLog('You are miss');
    } else {
      this.enemy.obj.consoleLog(`Applied damage: ${appliedDamage}`);
    }

    if (this.enemy.obj.state.score <= appliedDamage) {
      this.enemy.scoreUi.innerText = 0;
      this.enemy.obj.state.score = 0;
      e.target.disabled = true;
      this.obj.querySelector('.attack-btn').disabled = true;
      this.enemy.obj.consoleLog('You lose&#x1f61e;');
      this.consoleLog('You win&#128526;');
    } else {
      this.enemy.scoreUi.innerText -= appliedDamage;
      this.enemy.obj.state.score -= appliedDamage;
    }

    this.enemy.pointUi.style.width = `${this.enemy.obj.state.score}px`;
  }

  damage() {
    return Math.floor(Math.random() * this.state.attack);
  }

  consoleLog(msg) {
    const clg = document.getElementById(`${this.id}`).querySelector('.console');

    clg.innerHTML += `${msg}<br>`;
  }

  render() {
    const { name, score, attack } = this.state;
    return `
      <div id="${this.id}" class="player">
        <div class="player-info">
          <span class="name">Name player: ${name}</span>
          <span class="attack">Max attack: ${attack}</span>
        </div>
        <div class="hp">
          <p class="hp-point">
            <span class="hp-score">${score}</span>
          </p>
        </div>
        <button class="attack-btn" onclick="players[${this.id}].attack(event)">Attack</button>
        <span class="console"></span>
      </div>
    `;
  }
}

const dogPlayer = new Player(dog);
const catPlayer = new Player(cat);
document.querySelector('#root').innerHTML = dogPlayer.render() + catPlayer.render();
