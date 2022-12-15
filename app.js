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
        this.fleet.push(enemyShip)
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
let enemyFleetHulls = document.querySelectorAll(".enemy .enemy_hull")
let enemyFleetImgSrcArray = document.querySelectorAll(".enemy img")
for (let i = 0;i < enemyFleetHulls.length; i++){
    enemyFleetHulls[i].innerText = enemyFleet.fleet[i].hull
}
//This displays the USS hull and each enemy's hull

//The following startBattle function had the game run in loops which didn't allow html to update, but it technically runs the game, just with no real feedback beyond possible console prompts.
// const startBattle = () => {
//     let gameWon = true
//     let retreat = false
//     let enemy = enemyFleet.fleet
//    //this is for shortening the following
//     for (let i = 0; i < enemy.length; i++){
//         if(ussShip.hull < 1){
//             break
//         }
//         while(enemy[i].hull > 0){
//             let response = window.prompt("would you like to continue? type no to stop", "yes")
//             //defaulting yes is to help the player understand the default action, but they can type anything as long as it isn't no
//             if (response == null){
//                 //this is to catch pressing the cancel button instead of submitting
//             }
        
//             else if (response.toLowerCase() == ("no")){
//                console.log("retreating")
//                 retreat = true
//                 break
//             }
//             console.log("shooting enemy")
//             ussShip.shootShip(enemy[i])
//             for (let i = 0;i < enemyFleetHulls.length; i++){
//                 enemyFleetHulls[i].innerText = enemyFleet.fleet[i].hull
//                 if (+enemyFleetHulls[i].innerText < 0){
//                     enemyFleetHulls[i].innerText = 0
//                     //if the hull is less than 0, it displays as 0
//                 }
//             }
//                 //this updates the health of the enemy ships
//             if (enemy[i].hull < 1){
//                 break
//             }
//             enemy[i].shootShip(ussShip)
//             ussShipHull.innerText = ussShip.hull
//                 //this updates the health of the USS Ship
//             if (ussShip.hull < 1){
//                 gameWon = false;
//                 break
//             }
//         }
//         if (gameWon == false || retreat == true){
//             break
//         }
//     }
//     if (gameWon == false || retreat == true){
//         console.log("game lost")
//     } else {
//         console.log("game won!")
//     }

// }
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
    console.clear()
}
let i = 0;
const shootBattle = () => {
    runButton.className = "hidden";
    theyShooterScreen.className = "hidden";
    theyStatScreen.className = "hidden";
    let enemy = enemyFleet.fleet;
    if(ussShip.hull < 1){
        gameWon = false
    }
    console.log("shooting enemy ship")
    youShooterScreen.className=""
    youShooterScreen.innerText="shooting enemy ship"
    if (i >= enemy.length){
        i = 0
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
        i++
        runButton.className = "";
        if (i >= enemy.length){
            gameWon = true
        }
        } else {
            console.log("enemy is shooting")
            theyShooterScreen.className = "";
            theyStatScreen.className = "";
            theyShooterScreen.innerText="enemy is shooting"
            theyStatScreen.innerText = enemy[i].shootShip(ussShip) + " damage taken";
            ussShipHull.innerText = ussShip.hull
                //this updates the health of the USS Ship
            if (ussShip.hull < 1){
                gameWon = false;
            }
        }
    if (gameWon == true){
        winScreen.className="";
        gameButton.className = "";
        shootButton.className = "hidden";
        runButton.className = "hidden";
    } else if (gameWon == false){
        loseScreen.className="";
        gameButton.className = "";
        shootButton.className = "hidden";
        runButton.className = "hidden";
    }
}

const runFromBattle = () => {
    gameWon = false
    loseScreen.className="";
    gameButton.className = "";
    shootButton.className = "hidden";
    runButton.className = "hidden";
}
//With all the toggling of the class "hidden" I thought I'd make some kind of command to cover all cases but because it would essentially end up as toggleHidden(element) everywhere instead, I decided to leave it as is
let gameWon = undefined;
let gameButton = document.getElementById("start")
let shootButton = document.getElementById("shoot")
let runButton = document.getElementById("retreat")
let winScreen = document.getElementById("victory")
let loseScreen = document.getElementById("defeat")
let youStatScreen = document.getElementById("you-status")
let youShooterScreen = document.getElementById("you-shoot")
let theyStatScreen = document.getElementById("they-status")
let theyShooterScreen = document.getElementById("they-shoot")
gameButton.addEventListener("click", function(){startBattle()});
shootButton.addEventListener("click", function(){shootBattle()});
runButton.addEventListener("click", function(){runFromBattle()});
//12_16 to do: flexbox enemies, have point system, buy off points, maybe boss, maybe make pretty
