const armorCap = 1000; // 100%
const baseAttack = 100;
const baseHP = 1000;
const combatDateFormatter = new Intl.DateTimeFormat("en", {
  hour: "numeric",
  minute: "numeric",
  second: "numeric"
});

class Arena {
  constructor([player1, player2], logger = null) {
    if (!logger) {
      this.logger = {};
      this.logger.add = text => console.log(text);
    } else {
      this.logger = logger;
    }
    this.players = {
      player1: player1,
      player2: player2
    };
  }

  get p1() {
    return this.players.player1;
  }

  get p2() {
    return this.players.player2;
  }

  combat(p1, p2) {
    if (p1.hp > 0) {
      let damage = p1.attack(p2).toFixed(0);
      this.logger.add(
        `[${combatDateFormatter.format(Date.now())}] ${p1.name} attacks a ${
          p2.name
        } with the damage: ${damage <= 0.001 ? "MISS" : damage} \t ${
          p2.name
        } hp left: ${p2.hp}`
      );
      if (p2.hp < 0.001) {
        this.logger.add(
          `${p2.name} is DEAD. ${p1.name} is the winner! his hp left ${p1.hp}`
        );
        clearInterval(this.ids.id1);
        clearInterval(this.ids.id2);
      }
    }
  }

  fight() {
    this.logger.clear();
    this.ids = {};
    this.logger.add(`Now will be a fight between 2 players:
    ${this.p1.name}:
      hp = ${this.p1.hp}
      armor = ${this.p1.armor}
    ${this.p2.name}
      hp = ${this.p2.hp}
      armor = ${this.p2.armor}
      
    LETS START!!!\n`);

    this.ids.id1 = setInterval(
      () => this.combat(this.p1, this.p2),
      this.p1.stats.speed
    );

    this.ids.id2 = setInterval(
      () => this.combat(this.p2, this.p1),
      this.p2.stats.speed
    );
  }
}

class DefaultCharacter {
  constructor({ name, age, speed, weight, hp, armor }) {
    this.stats = {
      name: name,
      age: age,
      speed: speed,
      weight: weight,
      hp: hp,
      armor: armor
    };
  }

  set hp(value) {
    if (value <= 0) {
      this.stats.hp = 0;
    } else {
      this.stats.hp = value;
    }
  }

  get hp() {
    return this.stats.hp.toFixed(0);
  }

  get armor() {
    return this.stats.armor;
  }
}

class Player extends DefaultCharacter {
  constructor({ name, age, speed, weight, armor, hp, weapon }) {
    super({ name, age, speed, weight, hp, armor });
    this.weapon = weapon;
  }

  get name() {
    return `[${this.stats.name}]`;
  }

  weaponStrike() {
    const coreanRandomGod = (Math.random() * 10).toFixed(3);
    let defaultDamage =
      (baseAttack - this.stats.age * 0.5 + this.stats.weight * 0.5) *
      coreanRandomGod;
    if (Math.random() <= this.weapon.stats.missChance) {
      logger.add(`${this.name} MISS!:`);
      return 0;
    }
    if (Math.random() >= 1 - this.weapon.stats.critChance) {
      logger.add(`${this.name} CRIT!:`);
      return defaultDamage + this.weapon.stats.damage * 2;
    }
    return defaultDamage + this.weapon.stats.damage;
  }

  attack(target) {
    let damage = this.weaponStrike() * (1 - target.stats.armor / armorCap);
    target.hp = target.hp - damage;
    return damage;
  }
}

class Weapon {
  constructor({ name, damage, critChance, missChance }) {
    this.name = name;
    this.stats = {
      damage: damage,
      critChance: critChance,
      missChance: missChance
    };
  }
}
