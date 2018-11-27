class Warrior {
  constructor({ hp, damage }, name = "Enemy") {
    this.nick = name;
    this.health = hp;
    this.damage = damage;
  }

  set name(value) {
    this.nick = value;
  }

  get name() {
    return this.nick;
  }

  set hp(value) {
    if (value > 0) this.health = value;
    else this.health = 0;
  }

  get hp() {
    return this.health;
  }

  attack(target) {
    target.hp -= this.damage;
    console.log(`${this.name} used default attack`);
  }

  result() {
    return `State after round: 
    Name: ${this.name}
    Health: ${this.hp} 
    `;
  }

  winner() {
    return `============================= Winner =============================
                            Name: ${this.name}                  
                            Health: ${this.hp} 
==================================================================
      `;
  }
}

class Cat extends Warrior {
  constructor({ heal }) {
    super(cat);
    this.heal = heal;
  }

  healing(target) {
    let rand = Math.random() * (10 - 1) + 1;
    let str = "";
    if (rand >= 5) {
      this.hp += this.heal;
      str = "and healed himself";
    } else {
      target.hp += this.heal;
      str = "and healed his enemy";
    }
    console.log(`${this.name} used heal ${str}`);
  }
}

class Dog extends Warrior {
  constructor({ ultimate }) {
    super(dog);
    this.ultimate = ultimate;
  }

  ultimateAttack(target) {
    let rand = Math.random() * (10 - 1) + 1;
    let str = "";
    let temp;
    if (rand >= 5) {
      target.hp += this.ultimate;
      str = "and healed his enemy";
    } else {
      target.hp -= this.damage - this.ultimate;
      str = "and damaged his enemy whith additional damage";
    }

    console.log(`${this.name} used ultimate attack ${str}`);
    // document.getElementById("stat").innerHTML = `${
    //   this.name
    // } used ultimate attack ${str}`;
  }
}

//====================================================================================================

class Fighter {
  fighter(player1, player2) {
    let counter = 0;
    console.log(`Player one: 
    Name: ${player1.name}
    Heath: ${player1.hp}
    Damage: ${player1.damage}`);

    console.log(`Player two: 
    Name: ${player2.name}
    Heath: ${player2.hp}
    Damage: ${player2.damage}`);

    while (player1.hp > 0 && player2.hp > 0) {
      console.log(
        `=============================== Round ${++counter} ===============================`
      );
      let rand = Math.random() * (10 - 1) + 1;
      let chs = +prompt("Choose spell: 1 - default, 2 - ultimate");

      if (chs === 1) {
        player1.attack(player2);
      } else if (chs === 2) {
        player1.healing(player2);
      } else {
        alert("Stop fighting");
        console.log("End");
        return;
      }
      if (rand > 5) {
        player2.attack(player1);
      } else {
        player2.ultimateAttack(player1);
      }
      console.log(player1.result());
      console.log(player2.result());
    }

    if (player1.hp) {
      console.log(player1.winner());
    }
    if (player2.hp) {
      console.log(player2.winner());
    }
  }

  chooser() {
    let catto = new Cat(cat);
    let doggo = new Dog(dog);
    let hero = +prompt(
      "Choose your hero: ",
      "1 - if you want cat, 2 - if you want dog"
    );
    if (hero === 1) {
      catto.name = prompt("Name your cat");
    } else if (hero === 2) {
      doggo.name = prompt("Name your dog");
    } else {
      alert("Exit the game");
      console.log("End");
      return;
    }
    this.fighter(catto, doggo);
  }
}

const cat = {
  hp: 300,
  damage: 15,
  heal: 15
};

const dog = {
  hp: 350,
  damage: 15,
  ultimate: 5
};

let fight = new Fighter();
