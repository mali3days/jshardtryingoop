const matchPlayers = {};
let matchID = 0,
  playerID = 0;
let stopFlag = false;
let bodyElem = document.querySelector('body');
let finishLine = document.createElement('div');
finishLine.className = "finishLine";
bodyElem.appendChild(finishLine);

class Game {
  constructor(plaqersQuontity) {
    for (let i = 0; i < plaqersQuontity; i++) {
      new Player(`Player ${i}`);
    }
    this.playersToStart();
    this.timerId;
  }
  playersToStart() {
    this.pauseFlag = false;
    this.raceFlag = true;
    for (let key in matchPlayers) {
      document.querySelector(`.${matchPlayers[key].playerID}`).style.backgroundColor = 'white';
      matchPlayers[key].position = 0;
    }
  }
  start() {
    if (!this.pauseFlag && this.raceFlag) {
      for (let key in matchPlayers) {
        let winner = matchPlayers[key].move();
        if (winner) {
          console.log("Winner is " + winner.name);

          return;
        }
      };
      this.raceFlag = false;
      this.timerId = setTimeout(() => {
        this.raceFlag = true;
        this.start();
      }, 500);
    }
  }
  pause() {
    this.pauseFlag = !this.pauseFlag;
    if (this.pauseFlag && this.timerId) {
      console.log("pause");
      clearTimeout(this.timerId);
    } else {
      console.log("continue");
      this.raceFlag = true;
      this.start();
    }
  }
  allPlayersMakeOneStep() {
    for (let key in matchPlayers) {
      matchPlayers[key].move();
    };
  }
}
class Player {
  constructor(name) {
    this.name = name;
    this.totalScore = 0;
    this.position = 0;
    playerID++;
    this.playerID = `Player${playerID}`;
    matchPlayers[playerID] = this;
    let div = document.createElement('div');
    div.className = `players ${this.playerID}`;
    div.innerHTML = this.getNewPlayerTags();
    bodyElem.appendChild(div);
  }
  getNewPlayerTags() {
    return `<b>${this.name}</b>
            <i>total score </i><span>${this.totalScore}</span>
            <br>
            <img id=${this.playerID}-img onclick="matchPlayers[${playerID}].move()" src="https://via.placeholder.com/120x30">`
  }
  move(step = 20) {
    this.position += Math.round(Math.random() * step);
    var elem = document.getElementById(`${this.playerID}-img`);
    elem.style.marginLeft = this.position + '%';
    if (this.isWinner()) {
      this.totalScore++;
      document.querySelector(`.${this.playerID}>span`).innerHTML = this.totalScore;
      document.querySelector(`.${this.playerID}`).style.backgroundColor = 'green';
      return this;
    } else return false;
  }
  isWinner() {
    return this.position > 85;
  }
}

let game1 = new Game(+prompt("Enter number of players", 2));