/* eslint-disable class-methods-use-this */
/* eslint-disable no-console */
class Creature {
  constructor() {
    this.healthPoints = 100;
    this.manaPoints = 100;
    this.level = 1;
    this.isAlive = true;
  }

  checkAlive() {
    if (this.healthPoints <= 0) this.isAlive = false;
  }
}

class Hero extends Creature {
  constructor() {
    super();
    this.information = {
      name: 'Nameless',
      profession: 'Noob',
    };
    this.ammunition = {
      firstWeapon: 'Fists',
      secondWeapon: 'Fists',
      arrows: 0,
      healingPotion: 3,
      manaPotion: 3,
    };
  }

  attack() {
    this.levelUp();

    switch (this.information.profession) {
      case 'Mage' && this.manaPoints >= 10:
        this.manaPoints -= 10;
        return 50;

      case 'Mage' && this.ammunition.manaPotion > 0:
        const isWannaDrink = confirm('Looks like you have no mp for attack with magic\nWould you like to drink mana potion?');
        if (isWannaDrink) {
          this.drinkManaPot();
          this.manaPoints -= 10;
        }
        return 50;

      case 'Archer' && this.ammunition.arrows >= 1:
        this.ammunition.arrows -= 1;
        return 50;

      case 'Archer':
        return 20;

      case 'Noob':
        return 20;

      default:
        return 50;
    }
  }

  levelUp() {
    this.level = game.state.killCount + 1;
  }

  drinkHealingPot() {
    if (this.ammunition.healingPotion >= 1) {
      this.ammunition.healingPotion -= 1;
      this.healthPoints = 100;
      console.log('_____________________________________');
      console.log('You drank a potion. Your HP - 100 now !');
      console.log('_____________________________________');
    } else {
      console.log('_____________________________________');
      console.log('WARNING');
      console.log('Looks like you have no healing potion');
      console.log('_____________________________________');
    }
  }

  drinkManaPot() {
    if (this.ammunition.manaPotion >= 1) {
      this.ammunition.manaPotion -= 1;
      this.manaPoints = 100;
      console.log('_____________________________________');
      console.log('You drank a potion. Your MP - 100 now !');
      console.log('_____________________________________');
    } else {
      console.log('_____________________________________');
      console.log('WARNING');
      console.log('Looks like you have no mana potion');
      console.log('_____________________________________');
    }
  }

  setupHero() {
    this.getFirstWeapon();
    this.getSecondWeapon();
    this.getArrows();
  }

  getFirstWeapon() {
    switch (this.information.profession) {
      case 'Warrior':
        this.ammunition.firstWeapon = 'Broken sword';
        break;
      case 'Scout':
        this.ammunition.firstWeapon = 'Blunt knife';
        break;
      case 'Archer':
        this.ammunition.firstWeapon = 'Toy bow';
        break;
      case 'Mage':
        this.ammunition.firstWeapon = 'Broken staff';
        break;
      default:
        this.ammunition.firstWeapon = 'Fists';
        break;
    }
  }

  getSecondWeapon(profession) {
    switch (profession) {
      case 'Archer':
        this.ammunition.secondWeapon = 'Giat toothpick';
        break;
      default:
        this.ammunition.secondWeapon = 'Fists';
        break;
    }
  }

  getArrows() {
    switch (this.information.profession) {
      case 'Archer':
        this.ammunition.arrows = 30;
        break;
      default:
        this.ammunition.arrows = 0;
        break;
    }
  }
}

class Enemy extends Creature {
  constructor() {
    super();
    this.information = {
      name: 'Silly monkey',
    };
  }

  attack() {
    return 5;
  }
}

// Creating instances
const hero = new Hero();
const enemy = new Enemy();

class Game {
  constructor() {
    this.state = {
      currentStep: 0,
      killCount: 0,
    };
  }

  getName() {
    hero.information.name = prompt('Please enter your hero\'s name ', 'Nameless');
    this.getProf();
  }

  getProf() {
    hero.information.profession = prompt('Please choose your profession from this 4:\nWarrior\nScout\nArcher\nMage', 'Noob');
  }

  welcomeMessage() {
    this.getName();
    hero.setupHero();
    console.log(`Welcome to our dungeon |${hero.information.name}|`);
    console.log('Just chill and watch your hero');
    this.statMessage();
    this.moveForward();
  }

  statMessage() {
    console.log('_____________________________________');
    console.log('Your current stats:');
    console.log(`Your Level - ${hero.level}`);
    console.log(`Your HP - ${hero.healthPoints}, MP = ${hero.manaPoints}`);
    console.log(`Your Profession - ${hero.information.profession}`);
    console.log('Your Ammunition:');
    console.log(`First weapon: ${hero.ammunition.firstWeapon}`);
    console.log(`Second weapon: ${hero.ammunition.secondWeapon}`);
    console.log(`Arrows: ${hero.ammunition.arrows}`);
    console.log(`Healing potion: ${hero.ammunition.healingPotion} and Mana potion: ${hero.ammunition.manaPotion}`);
    console.log('_____________________________________');
  }

  moveForward() {
    setTimeout(() => {
      this.state.currentStep += 1;
      console.log('_____________________________________');
      console.log('You are going forward !');
      console.log('_____________________________________');
      if (this.state.currentStep >= 50) {
        console.log('_____________________________________');
        console.log('_____________________________________');
        console.log('_____________________________________');
        console.log('| You went through the dungeon ! |');
        console.log('_____________________________________');
        console.log('_____________________________________');
        console.log('_____________________________________');
      } else if
      (this.isEnemyNear()) {
        this.battle();
      } else {
        this.moveForward();
      }
    }, 1500);
  }

  isEnemyNear() {
    const random = Math.floor(Math.random() * 10);
    if (random >= 4) return true;
  }

  battle() {
    setTimeout(() => {
      hero.checkAlive();
      if (hero.healthPoints <= 10 && !hero.isAlive) {
        const isWannaDrink = confirm('Looks like you have no HP\nWould you like to drink healing potion?');
        if (isWannaDrink) hero.drinkHealingPot();
        if (hero.isAlive) hero.healthPoints -= enemy.attack();
        console.log('//////');
        console.log(`${enemy.information.name} attacked you in 5 health points`);
      } else if (!hero.isAlive) {
        console.log('//////////////////');
        console.log('You are dead. Game is over for you !');
        console.log('//////////////////');
      } else {
        if (hero.isAlive) hero.healthPoints -= enemy.attack();
        console.log('//////');
        console.log(`${enemy.information.name} attacked you in 5 health points`);
      }

      if (enemy.isAlive && hero.isAlive) enemy.healthPoints -= hero.attack();
      console.log('//////');
      console.log(`You attacked ${enemy.information.name} with your ${hero.ammunition.firstWeapon}`);
      console.log(`His HP - ${enemy.healthPoints} !`);

      enemy.checkAlive();
      if (enemy.isAlive === true && hero.isAlive) {
        this.battle();
      } else if (hero.isAlive) {
        console.log(`${enemy.information.name} is dead!`);
        this.state.killCount += 1;
        enemy.healthPoints = 100;
        enemy.isAlive = true;
        console.log(`LvlUP ! Your level is ${hero.level}`);
        this.statMessage();
        this.moveForward();
      }
    }, 1500);
  }

  start() {
    this.state.currentStep += 1;
    this.welcomeMessage();
  }
}

const game = new Game();

game.welcomeMessage();
