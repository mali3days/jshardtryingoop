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

  ultimateSpell(target) {
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

  ultimateSpell(target) {
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
  fighter(player, enemy) {
    let counter = 0;
    console.log(`Player one: 
    Name: ${player.name}
    Heath: ${player.hp}
    Damage: ${player.damage}`);

    console.log(`Player two: 
    Name: ${enemy.name}
    Heath: ${enemy.hp}
    Damage: ${enemy.damage}`);

    while (player.hp > 0 && enemy.hp > 0) {
      console.log(
        `=============================== Round ${++counter} ===============================`
      );
	  let chs = +prompt("Choose spell: 1 - default, 2 - ultimate");
	  let rand = Math.random() * (10 - 1) + 1;

      if (chs === 1) {
        player.attack(enemy);
      } else if (chs === 2) {
        player.ultimateSpell(enemy);
      } else {
        alert("Stop fighting");
        console.log("End");
        return;
      }
      if (rand > 5) {
        enemy.attack(player);
      } else {
        enemy.ultimateSpell(player);
      }
      console.log(player.result());
      console.log(enemy.result());
    }

    if (player.hp) {
      console.log(player.winner());
    }
    if (enemy.hp) {
      console.log(enemy.winner());
    }
  }

  chooser() {
    let catto = new Cat(cat);
	let doggo = new Dog(dog);
	let player;
	let enemy;
    let hero = +prompt(
      "Choose your hero: ",
      "1 - if you want cat, 2 - if you want dog"
    );
    if (hero === 1) {
	  catto.name = prompt("Name your cat");
	  player = catto;
	  enemy = doggo;
    } else if (hero === 2) {
	  doggo.name = prompt("Name your dog");
	  player = doggo;
	  enemy = catto;
    } else {
      alert("Exit the game");
      console.log("End");
      return;
    }
    this.fighter(player, enemy);
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
