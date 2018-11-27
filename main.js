let ork = {
  title: "ork",
  name: "Zarzul",
  health: 120,
  damageLow: 10,
  damageMedium: 20,
  damageHeavy: 30
};

let vampire = {
  title: "vampire",
  name: "Polym",
  health: 85,
  damageLow: 5,
  damageMedium: 15,
  damageHeavy: 40
};

let human = {
  title: "human",
  name: "Igor",
  health: 100,
  damageLow: 10,
  damageMedium: 20,
  damageHeavy: 30
};

class Damage {
  constructor(obj) {
    this.state = obj;
  }
}

class FirstEnemy extends Damage {
  constructor(obj) {
    super();
    this.state = obj;
  }
  start() {
    return `<div>
        My name is ${this.state.name}, and my health is ${this.state.health}
      </div>`;
  }
  strike() {
    `${(secondEnemy.state.health -= this.state.damageLow)}`;
    if (
      `${secondEnemy.state.health}` > 0 &&
      !(`${secondEnemy.state.health - this.state.damageLow}` < 0)
    ) {
      return this.strikeSucces();
    } else {
      return this.strikeFalse();
    }
  }
  strikeSucces() {
    return `<div>
      ${this.state.title} ${this.state.name} strikes ${
      secondEnemy.state.title
    } ${secondEnemy.state.name} in ${this.state.damageLow} points
    </div>
     <div>Health of ${secondEnemy.state.name} is ${
      secondEnemy.state.health
    }</div>`;
  }
  strikeFalse() {
    return `<div>Finish! ${firstEnemy.state.name} wins!</div>`;
  }
}

class SecondEnemy extends Damage {
  constructor(obj) {
    super();
    this.state = obj;
  }
  start() {
    return `My name is ${this.state.name}, and my health is ${
      this.state.health
    }`;
  }
  strike() {
    `${(firstEnemy.state.health -= this.state.damageLow)}`;
    if (
      `${firstEnemy.state.health}` > 0 &&
      !(`${firstEnemy.state.health - this.state.damageLow}` < 0)
    ) {
      return this.strikeSucces();
    } else {
      return this.strikeFalse();
    }
  }
  strikeSucces() {
    return `<div>
        ${this.state.title} ${this.state.name} strikes ${
      firstEnemy.state.title
    } ${firstEnemy.state.name} in ${this.state.damageLow} points
      </div>
       <div>Health of ${firstEnemy.state.name} is ${
      firstEnemy.state.health
    }</div>`;
  }
  strikeFalse() {
    return `<div>Finish! ${secondEnemy.state.name} wins!</div>`;
  }
}

// let chooseOne;

// let chooseTwo;

// chooseFirstEnemy.onclick = function() {
//   let arr = [ork, vampire, human];
//   let chooseRandom = Math.round(Math.random() * 2);
//   chooseOne = `${arr[chooseRandom].title}`;
//   console.log(
//     `You choose first enemy: ${arr[chooseRandom].title} - ${
//       arr[chooseRandom].name
//     }`
//   );
// };

// chooseSecondEnemy.onclick = function() {
//   let arr = [ork, vampire, human];
//   let chooseRandom = Math.round(Math.random() * 2);
//   chooseTwo = arr[chooseRandom].title;
//   console.log(
//     `You choose second enemy: ${arr[chooseRandom].title} - ${
//       arr[chooseRandom].name
//     }`
//   );
//   return chooseTwo;
// };

let firstEnemy = new FirstEnemy(ork);
let secondEnemy = new SecondEnemy(vampire);

// buttstart.onclick = () => {
//   firstEnemy.start();
//   secondEnemy.start();
// };

buttStart.onclick = function() {
  let createStartFirstElem = document.createElement("div");
  let createStartSecondElem = document.createElement("div");
  createStartFirstElem.innerHTML = firstEnemy.start();
  createStartSecondElem.innerHTML = secondEnemy.start();
  startBar.appendChild(createStartFirstElem);
  startBar.appendChild(createStartSecondElem);
};

strikeFirstEnemy.onclick = function() {
  let createFirstElem = document.createElement("div");
  createFirstElem.innerHTML = firstEnemy.strike();
  leftContent.appendChild(createFirstElem);
};

strikeSecondEnemy.onclick = function() {
  let createSecondElem = document.createElement("div");
  createSecondElem.innerHTML = secondEnemy.strike();
  rightContent.appendChild(createSecondElem);
};
