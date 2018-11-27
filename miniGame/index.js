const logger = new Logger(document.getElementById("log"));

function start() {
  const player1 = new Player({
    name: document.getElementById("p1Name").value,
    age: Number(document.getElementById("p1Age").value),
    weight: Number(document.getElementById("p1Weight").value),
    speed: Number(document.getElementById("p1Speed").value),
    armor: Number(document.getElementById("p1Armor").value),
    hp: Number(document.getElementById("p1HP").value),
    weapon: new Weapon({
      name: document.getElementById("weapon1Select").value,
      damage: Number(document.getElementById("p1WeaponDamage").value),
      critChance: Number(document.getElementById("p1WeaponCrit").value),
      missChance: Number(document.getElementById("p1WeaponMiss").value)
    })
  });

  const player2 = new Player({
    name: document.getElementById("p2Name").value,
    age: Number(document.getElementById("p2Age").value),
    weight: Number(document.getElementById("p2Weight").value),
    speed: Number(document.getElementById("p2Speed").value),
    armor: Number(document.getElementById("p2Armor").value),
    hp: Number(document.getElementById("p2HP").value),
    weapon: new Weapon({
      name: document.getElementById("weapon2Select").value,
      damage: Number(document.getElementById("p2WeaponDamage").value),
      critChance: Number(document.getElementById("p2WeaponCrit").value),
      missChance: Number(document.getElementById("p2WeaponMiss").value)
    })
  });

  const arena = new Arena([player1, player2], logger);

  arena.fight();
}

const arsenal = [
  new Weapon({ name: "Axe", damage: 250, critChance: 0.25, missChance: 0.1 }),
  new Weapon({ name: "Staff", damage: 300, critChance: 0.4, missChance: 0.2 }),
  new Weapon({ name: "Pike", damage: 450, critChance: 0.5, missChance: 0.3 }),
  new Weapon({ name: "Knife", damage: 150, critChance: 0.7, missChance: 0.1 }),
  new Weapon({ name: "Sword", damage: 200, critChance: 0.4, missChance: 0.2 })
];

const selectBox1 = document.getElementById("weapon1Select");
const selectBox2 = document.getElementById("weapon2Select");

for (let i = 0; i < arsenal.length; i++) {
  let option = arsenal[i];
  selectBox1.options.add(new Option(option.name, option.name, option.selected));
  selectBox2.options.add(new Option(option.name, option.name, option.selected));
}

function selectweapon1(name) {
  console.log(name);

  let weapon = arsenal.filter(weapon => weapon.name === name)[0];
  console.log(weapon);

  document.getElementById("p1WeaponDamage").value = weapon.stats.damage;
  document.getElementById("p1WeaponCrit").value = weapon.stats.critChance;
  document.getElementById("p1WeaponMiss").value = weapon.stats.missChance;
}

function selectweapon2(name) {
  console.log(name);

  let weapon = arsenal.filter(weapon => weapon.name === name)[0];
  console.log(weapon);

  document.getElementById("p2WeaponDamage").value = weapon.stats.damage;
  document.getElementById("p2WeaponCrit").value = weapon.stats.critChance;
  document.getElementById("p2WeaponMiss").value = weapon.stats.missChance;
}
