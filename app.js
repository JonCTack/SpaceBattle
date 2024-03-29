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
            return 0
        }
        //the returns allow us to call the method in a string, allowing us to dynamically access the firepower of enemy ships for the status screens
    }
    missileShip(target){
        if (gamePoints>4){
            if(Math.random() < (this.accuracy)*1.3){
                target.hull -= (this.firepower)*2;
                let missileDamage = (this.firepower)*2
                console.log(`a missile strike for ${missileDamage}`)
                return missileDamage
            } else {
                console.log("a miss.")
                return 0
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
let ussShipImg = document.querySelector("#USS_Ship img")

let enemyFleetHulls = document.querySelectorAll(".enemy .enemy_hull")
let enemyFleetImgSrcArray = document.querySelectorAll(".enemy img")
for (let i = 0;i < enemyFleetHulls.length; i++){
    enemyFleetHulls[i].innerText = enemyFleet.fleet[i].hull
}
//This displays the USS hull and each enemy's hull
if(confirm("Space Battle! 6 alien ships have arrived above earth and you must defend it!\
 Get started with the start game button and try to survive. The longer you go, the more points you get! \
 One on kill and one on round completion. You can also use 5 points to shoot a missile that will deal double damage, more likely to hit and if you miss only your target shoots!"
 )){}
 //This simply explains the game, has no other use
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
        ussShipImg.src = "./images/USS_Ship.png"
        for (let i = 0;i < enemyFleetHulls.length; i++){
            enemyFleetHulls[i].innerText = enemyFleet.fleet[i].hull
            enemyFleetImgSrcArray[i].src = "./images/enemy_ship.png"
            enemyFleetImgSrcArray[i].style = ""
        };
    }
    gameButton.className = "hidden";
    shootButton.className = "";
    runButton.className = "";
    if(gamePoints > 4 ){
     missileButton.className = "";
    }
    ussPoints.innerText = gamePoints
    console.clear()
    console.log(gamePoints)
}
let i = 0;
let damageDealt = undefined
const shootBattle = () => {
    ussShipImg.style = ""
    runButton.className = "hidden";
    theyShooterScreen.className = "hidden";
    theyStatScreen.className = "hidden";
    let enemy = enemyFleet.fleet;
    if(ussShip.hull < 1){
        ussShipImg.src = "./images/USS_Ship_dead.png"
        gameWon = false
        i = 0
        //this fixes bugs in edges cases such as ensuring if we lost we start at ship one next game and we can't continue the game if we lost our health
    }
    console.log("shooting enemy ship")
    if(soundPlay == true){
        laserSound.load();
        laserSound.play();}
    youShooterScreen.className=""
    youShooterScreen.innerText="Shooting enemy ship with laser..."
    if (i >= enemy.length){
        i = 0
        //in the case of a game restart after a win, this ensures that you aren't targeting the first ship
    }
    youStatScreen.className=""
    damageDealt = ussShip.shootShip(enemy[i])
    if (damageDealt > 0){
        enemyFleetImgSrcArray[i].style = "animation-name: damaged; animation-duration: .1s;"
    } else {
        enemyFleetImgSrcArray[i].style = ""
    }
    youStatScreen.innerText = damageDealt + " damage dealt";
    for (let i = 0;i < enemyFleetHulls.length; i++){
        enemyFleetHulls[i].innerText = enemyFleet.fleet[i].hull
    }
    //this updates the health of the enemy ships
    if (enemy[i].hull < 1){
        enemyFleetImgSrcArray[i].src = "./images/enemy_ship_dead.png"
        if(soundPlay == true){
            destroyedSound.load();
            destroyedSound.play();}
        i++;
        gamePoints++;
        ussPoints.innerText = gamePoints;
        runButton.className = "";
        if (i >= enemy.length){
            gameWon = true;
        }
        } else {
            console.log("all enemies are shooting")
            if(soundPlay == true){
                enemyLaserSound.load();
                enemyLaserSound.play();}
            theyShooterScreen.className = "";
            theyStatScreen.className = "";
            theyShooterScreen.innerText="All enemies are shooting...";
            hullBefore = ussShip.hull
            enemy.forEach(el => {
                    if(el.hull > 0 && Math.random() > .6){el.shootShip(ussShip)
                    } else {console.log("a miss.")}
                })
            damageDealt = hullBefore - ussShip.hull
            theyStatScreen.innerText = damageDealt + " damage taken";
            if (damageDealt > 0){
                ussShipImg.style = "animation-name: damaged; animation-duration: .1s;"
            } else {
                ussShipImg.style = ""
            }
            //this has all ships potentially shoot and then logs the damage difference, or, how much was taken
            ussShipHull.innerText = ussShip.hull;
                //this updates the health of the USS Ship
            if (ussShip.hull < 1){
                ussShipImg.src = "./images/USS_Ship_dead.png"
                gameWon = false;
                if(soundPlay == true){
                    destroyedSound.load();
                    destroyedSound.play();}
                i = 0
            }
        }
     if(gamePoints > 4 ){
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
    ussShipImg.style = ""
    runButton.className = "hidden";
    theyShooterScreen.className = "hidden";
    theyStatScreen.className = "hidden";
    let enemy = enemyFleet.fleet;
    if(ussShip.hull < 1){
        ussShipImg.src = "./images/USS_Ship_dead.png"
        gameWon = false
        i = 0
        //this fixes bugs in edges cases such as ensuring if we lost we start at ship one next game and we can't continue the game if we lost our health
    }
    console.log("shooting missile at enemy ship")
    youShooterScreen.className="";
    youShooterScreen.innerText="Shooting enemy ship with missile...";
    if(soundPlay == true){
        missileSound.load();
        missileSound.play();}
    if (i >= enemy.length){
        i = 0
        //in the case of a game restart after a win, this ensures that you aren't targeting the first ship
    }
    youStatScreen.className=""
    damageDealt = ussShip.missileShip(enemy[i])
    if (damageDealt > 0){
        enemyFleetImgSrcArray[i].style = "animation-name: damaged; animation-duration: .1s;"
    } else {
        enemyFleetImgSrcArray[i].style = ""
    }
    youStatScreen.innerText = damageDealt + " damage dealt";
    gamePoints -= 5
    ussPoints.innerText = gamePoints
    for (let i = 0;i < enemyFleetHulls.length; i++){
        enemyFleetHulls[i].innerText = enemyFleet.fleet[i].hull
    }
    //this updates the health of the enemy ships
    if (enemy[i].hull < 1){
        enemyFleetImgSrcArray[i].src = "./images/enemy_ship_dead.png"
        if(soundPlay == true){
            destroyedSound.load();
            destroyedSound.play();}
        i++;
        gamePoints++;
        ussPoints.innerText = gamePoints;
        runButton.className = "";
        if (i >= enemy.length){
            gameWon = true;
        }
        } else {
            console.log("one enemy is shooting")
            theyShooterScreen.className = "";
            theyStatScreen.className = "";
            theyShooterScreen.innerText="Targeted enemy is shooting...";
            if(soundPlay == true){
                enemyLaserSound.load();
                enemyLaserSound.play();}
            damageDealt = enemy[i].shootShip(ussShip)
            theyStatScreen.innerText = damageDealt + " damage taken";
            if (damageDealt > 0){
                ussShipImg.style = "animation-name: damaged; animation-duration: .1s;"
            } else {
                ussShipImg.style = ""
            }
            ussShipHull.innerText = ussShip.hull;
                //this updates the health of the USS Ship
            if (ussShip.hull < 1){
                ussShipImg.src = "./images/USS_Ship_dead.png"
                gameWon = false;
                if(soundPlay == true){
                    destroyedSound.load();
                    destroyedSound.play();}
                i = 0
            }
        }
     if(gamePoints > 4 ){
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
    if(confirm("Are you sure you want to retreat? You will instantly go to the defeat screen.")){
    gameWon = false
    loseScreen.className="";
    gameButton.className = "";
    shootButton.className = "hidden";
    runButton.className = "hidden";
    missileButton.className = "hidden";
    gamePoints = 0;
    i = 0;
    }
}

const soundToggle = () => {
    if (soundPlay == true){
        soundPlay = false;
        soundButton.innerText = "Sound Off"
        soundButton.style = "background-color: gray"
    } else {
        soundPlay = true;
        soundButton.innerText = "Sound On"
        soundButton.style = "background-color: lightgray"
    }
}
//With all the toggling of the class "hidden" I thought I'd make some kind of command to cover all cases but because it would essentially end up as toggleHidden(element) everywhere instead, I decided to leave it as is
//I also had some thought of making a create ships command that would allow random, varied input but I've had issues getting the flexibility of it to not only work here in js but reflect well in the html/css
//I could have made a shoot function that took the firing type instead of essentially copy pasting the code for laser and lightly modifying it for missile. A lesson for future projects even if it probably would only save me something like 30 lines of code
let gameWon = undefined;
let soundPlay = true;
//these are the clickable buttons in the html
let gameButton = document.getElementById("start")
let shootButton = document.getElementById("shoot")
let missileButton = document.getElementById("missile")
let runButton = document.getElementById("retreat")
let soundButton = document.getElementById("soundToggle")
//these are divs I put information in to inform the player of what is happening
let winScreen = document.getElementById("victory")
let loseScreen = document.getElementById("defeat")
let youStatScreen = document.getElementById("you-status")
let youShooterScreen = document.getElementById("you-shoot")
let theyStatScreen = document.getElementById("they-status")
let theyShooterScreen = document.getElementById("they-shoot")
//The following allow me to play audio embedded in the html that both inform and sound cool
let laserSound = document.getElementById("laserSound")
let enemyLaserSound = document.getElementById("enemyLaserSound")
let missileSound = document.getElementById("missileSound")
let destroyedSound = document.getElementById("deathSound")
gameButton.addEventListener("click", function(){startBattle()});
shootButton.addEventListener("click", function(){shootBattle()});
missileButton.addEventListener("click", function(){missileBattle()});
runButton.addEventListener("click", function(){runFromBattle()});
soundButton.addEventListener("click", function(){soundToggle()})