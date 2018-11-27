const orcName = document.getElementById("orc-name");
const goblinName = document.getElementById("goblin-name");
const orcHp = document.getElementById("orc-hp");
const goblinHp = document.getElementById("goblin-hp");
const orcAttack = document.getElementById("orc-attack");
const goblinAttack = document.getElementById("goblin-attack");
const winner = document.getElementById("winner");

class Personage {
  constructor(hp, damage, weapon, nodes) {
    this.maxHp = hp;
    this.hp = hp;
    this.damage = damage;
    this.weapon = weapon;
    this.winner = false;
    this.nodes = nodes;
  }

  attack(target) {
    const damage = this.getRandomDamage(this.damage + 2, this.damage - 2);
    target.getHit(damage);
    this.winner = target.isDead();
    this.render(this, target);
  }

  getHit(damage) {
    this.hp = damage > this.hp ? 0 : this.hp - damage;
  }

  isDead() {
    return !this.hp;
  }

  getRandomDamage(max, min) {
    const damage = Math.floor(Math.random() * (max - min)) + min;
    return damage < 0 ? 0 : damage;
  }

  render(personage, target) {
    const { targetHp, attack, winner } = this.nodes;
    targetHp.innerText = target.hp;
    const red = 1 - target.hp / target.maxHp;
    const green = target.hp / target.maxHp;
    targetHp.style.backgroundColor = `rgb(${255 * red}, ${255 * green}, 0)`;
    if (personage.winner) {
      winner.innerText = `${personage.name} win!`;
      attack.disabled = true;
      setTimeout(() => {
        location.reload();
      }, 4000);
    }
  }
}

class Orc extends Personage {
  constructor(hp, damage, weapon, nodes) {
    super(hp, damage, weapon, nodes);
    this.name = "Orc";
    nodes.name.innerText = this.name;
    nodes.hp.innerText = this.hp;
  }
}

class Goblin extends Personage {
  constructor(hp, damage, weapon, nodes) {
    super(hp, damage, weapon, nodes);
    this.name = "Goblin";
    nodes.name.innerText = this.name;
    nodes.hp.innerText = this.hp;
  }
}
const orcNodes = {
  hp: orcHp,
  targetHp: goblinHp,
  name: orcName,
  attack: goblinAttack,
  winner
};
const goblinNodes = {
  hp: goblinHp,
  targetHp: orcHp,
  name: goblinName,
  attack: orcAttack,
  winner
};
const orc = new Orc(100, 5, "spears", orcNodes);
const goblin = new Goblin(150, 3, "bow", goblinNodes);

orcAttack.addEventListener("click", () => {
  orc.attack(goblin);
});
goblinAttack.addEventListener("click", () => {
  goblin.attack(orc);
});
