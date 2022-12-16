class Ship {
    constructor(hull, firepower, accuracy){
        this.hull = hull;
        this.firepower = firepower;
        this.accuracy = accuracy;
    }
    shootShip(target){
        if(Math.random() < this.accuracy){
            target.hull -= this.firepower;
            console.log(`a strike for ${this.firepower}`)
            return this.firepower
        } else {
            console.log("a miss.")
            return "no"
        }
        //the returns allow us to call the method in a string, allowing us to dynamically access the firepower of enemy ships for the status screens
        
    }
    missileShip(target){
        if (gamePoints>5){
            if(Math.random() < (this.accuracy)*1.3){
                target.hull -= (this.firepower)*2;
                console.log(`a missile strike for ${this.firepower*2}`)
                return this.firepower
            } else {
                console.log("a miss.")
                return "no"
            }
        }
    }
};
class EnemyFleet{
    constructor(){
    this.fleet = [];
    }
    newEnemy(){
        let enemyShip = new Ship(Math.floor((Math.random()*4)+3),
        Math.floor((Math.random()*3+2)),
        Math.floor(((Math.random()*3)+6))/10);
        this.fleet.push(enemyShip);
    }
}
let ussShip = new Ship(20, 5, .7);
let enemyFleet = new EnemyFleet
enemyFleet.newEnemy()
enemyFleet.newEnemy()
enemyFleet.newEnemy()
enemyFleet.newEnemy()
enemyFleet.newEnemy()
enemyFleet.newEnemy()
//USS ship and 6 enemies made
let ussShipHull = document.querySelector("#USS_Ship #USS_Hull")
ussShipHull.innerText = ussShip.hull
let ussPoints = document.querySelector("#gamePoints")

let enemyFleetHulls = document.querySelectorAll(".enemy .enemy_hull")
let enemyFleetImgSrcArray = document.querySelectorAll(".enemy img")
for (let i = 0;i < enemyFleetHulls.length; i++){
    enemyFleetHulls[i].innerText = enemyFleet.fleet[i].hull
}
//This displays the USS hull and each enemy's hull

let gamePoints = 0;
const startBattle = () => {
    if (gameWon == true||gameWon == false){
        //this checks if a game  has been played and resets all values
        gameWon = undefined
        winScreen.className="hidden"
        loseScreen.className="hidden"
        theyShooterScreen.className = "hidden";
        theyStatScreen.className = "hidden";
        youShooterScreen.className = "hidden";
        youStatScreen.className = "hidden";
        ussShip.hull = 20;
        ussShipHull.innerText = ussShip.hull;
        enemyFleet.fleet=[];
        enemyFleet.newEnemy();
        enemyFleet.newEnemy();
        enemyFleet.newEnemy();
        enemyFleet.newEnemy();
        enemyFleet.newEnemy();
        enemyFleet.newEnemy();
        for (let i = 0;i < enemyFleetHulls.length; i++){
            enemyFleetHulls[i].innerText = enemyFleet.fleet[i].hull
            enemyFleetImgSrcArray[i].src = "./images/enemy_ship.png"
        };
    }
    gameButton.className = "hidden";
    shootButton.className = "";
    runButton.className = "";
    if(gamePoints > 5 ){
     missileButton.className = "";
    }
    if(gamePoints == 0){
        ussPoints.innerText = gamePoints
    }
    console.clear()
    console.log(gamePoints)
}
let i = 0;
const shootBattle = () => {
    runButton.className = "hidden";
    theyShooterScreen.className = "hidden";
    theyStatScreen.className = "hidden";
    let enemy = enemyFleet.fleet;
    if(ussShip.hull < 1){
        gameWon = false
        i = 0
        //this fixes bugs in edges cases such as ensuring if we lost we start at ship one next game and we can't continue the game if we lost our health
    }
    console.log("shooting enemy ship")
    youShooterScreen.className=""
    youShooterScreen.innerText="shooting enemy ship"
    if (i >= enemy.length){
        i = 0
        //in the case of a game restart after a win, this ensures that you aren't targeting the first ship
    }
    youStatScreen.className=""
    youStatScreen.innerText = ussShip.shootShip(enemy[i]) + " damage dealt";
    for (let i = 0;i < enemyFleetHulls.length; i++){
        enemyFleetHulls[i].innerText = enemyFleet.fleet[i].hull
     if (+enemyFleetHulls[i].innerText < 0){
        enemyFleetHulls[i].innerText = 0
        //if the hull is less than 0, it displays as 0
        }
    }
    //this updates the health of the enemy ships
    if (enemy[i].hull < 1){
        enemyFleetImgSrcArray[i].src = "./images/enemy_ship_dead.png"
        i++;
        gamePoints++;
        ussPoints.innerText = gamePoints;
        runButton.className = "";
        if (i >= enemy.length){
            gameWon = true;
        }
        } else {
            console.log("enemy is shooting")
            theyShooterScreen.className = "";
            theyStatScreen.className = "";
            theyShooterScreen.innerText="enemy is shooting";
            theyStatScreen.innerText = enemy[i].shootShip(ussShip) + " damage taken";
            ussShipHull.innerText = ussShip.hull;
                //this updates the health of the USS Ship
            if (ussShip.hull < 1){
                gameWon = false;
                i = 0
            }
        }
     if(gamePoints > 5 ){
            missileButton.className = "";
    }
    if (gameWon == true){
        winScreen.className="";
        gameButton.className = "";
        shootButton.className = "hidden";
        runButton.className = "hidden";
        missileButton.className = "hidden";
        gamePoints++;
        ussPoints.innerText = gamePoints;
    } else if (gameWon == false){
        loseScreen.className="";
        gameButton.className = "";
        shootButton.className = "hidden";
        runButton.className = "hidden";
        missileButton.className = "hidden";
        gamePoints = 0;
    }

}
//this is the same function but it shoots missiles instead
const missileBattle = () => {
    runButton.className = "hidden";
    theyShooterScreen.className = "hidden";
    theyStatScreen.className = "hidden";
    let enemy = enemyFleet.fleet;
    if(ussShip.hull < 1){
        gameWon = false
        i = 0
        //this fixes bugs in edges cases such as ensuring if we lost we start at ship one next game and we can't continue the game if we lost our health
    }
    console.log("shooting missile at enemy ship")
    youShooterScreen.className=""
    youShooterScreen.innerText="shooting enemy ship"
    if (i >= enemy.length){
        i = 0
        //in the case of a game restart after a win, this ensures that you aren't targeting the first ship
    }
    youStatScreen.className=""
    youStatScreen.innerText = ussShip.missileShip(enemy[i]) + " damage dealt";
    gamePoints -= 5
    ussPoints.innerText = gamePoints
    for (let i = 0;i < enemyFleetHulls.length; i++){
        enemyFleetHulls[i].innerText = enemyFleet.fleet[i].hull
     if (+enemyFleetHulls[i].innerText < 0){
        enemyFleetHulls[i].innerText = 0
        //if the hull is less than 0, it displays as 0
        }
    }
    //this updates the health of the enemy ships
    if (enemy[i].hull < 1){
        enemyFleetImgSrcArray[i].src = "./images/enemy_ship_dead.png"
        i++;
        gamePoints++;
        ussPoints.innerText = gamePoints;
        runButton.className = "";
        if (i >= enemy.length){
            gameWon = true;
        }
        } else {
            console.log("enemy is shooting")
            theyShooterScreen.className = "";
            theyStatScreen.className = "";
            theyShooterScreen.innerText="enemy is shooting";
            theyStatScreen.innerText = enemy[i].shootShip(ussShip) + " damage taken";
            ussShipHull.innerText = ussShip.hull;
                //this updates the health of the USS Ship
            if (ussShip.hull < 1){
                gameWon = false;
                i = 0
            }
        }
     if(gamePoints > 5 ){
            missileButton.className = "";
    }
    if(gamePoints < 5 ){
        missileButton.className = "hidden";
    }
    if (gameWon == true){
        winScreen.className="";
        gameButton.className = "";
        shootButton.className = "hidden";
        runButton.className = "hidden";
        missileButton.className = "hidden";
        gamePoints++;
        ussPoints.innerText = gamePoints;
    } else if (gameWon == false){
        loseScreen.className="";
        gameButton.className = "";
        shootButton.className = "hidden";
        runButton.className = "hidden";
        missileButton.className = "hidden";
        gamePoints = 0;
    }

}

const runFromBattle = () => {
    gameWon = false
    loseScreen.className="";
    gameButton.className = "";
    shootButton.className = "hidden";
    runButton.className = "hidden";
    missileButton.className = "hidden";
    gamePoints = 0;
}
//With all the toggling of the class "hidden" I thought I'd make some kind of command to cover all cases but because it would essentially end up as toggleHidden(element) everywhere instead, I decided to leave it as is
let gameWon = undefined;
let gameButton = document.getElementById("start")
let shootButton = document.getElementById("shoot")
let missileButton = document.getElementById("missile")
let runButton = document.getElementById("retreat")
let winScreen = document.getElementById("victory")
let loseScreen = document.getElementById("defeat")
let youStatScreen = document.getElementById("you-status")
let youShooterScreen = document.getElementById("you-shoot")
let theyStatScreen = document.getElementById("they-status")
let theyShooterScreen = document.getElementById("they-shoot")
gameButton.addEventListener("click", function(){startBattle()});
shootButton.addEventListener("click", function(){shootBattle()});
missileButton.addEventListener("click", function(){missileBattle()});
runButton.addEventListener("click", function(){runFromBattle()});
//12_16 to do: flexbox enemies, have point system, buy off points, maybe boss, maybe make pretty
