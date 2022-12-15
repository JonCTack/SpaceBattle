class Ship {
    constructor(hull, firepower, accuracy){
        this.hull = hull;
        this.firepower = firepower;
        this.accuracy = accuracy;
    }
    shootShip(target){
        if(Math.random() < this.accuracy){
            target.hull -= this.firepower;
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
let enemyFleetContain = document.querySelectorAll(".enemy .enemy_hull")
for (let i = 0;i < enemyFleetContain.length; i++){
    enemyFleetContain[i].innerText = enemyFleet.fleet[i].hull
}
//This displays the USS hull and each enemy's hull
const startBattle = () => {
    let gameWon = true
    let retreat = false
    let enemy = enemyFleet.fleet
    //this is for shortening the following
    for (let i = 0; i < enemy.length; i++){
        if(ussShip.hull < 1){
            break
        }
        while(enemy[i].hull > 0){
            let response = window.prompt("would you like to continue? type no to stop", "yes")
            //defaulting yes is to help the player understand the default action, but they can type anything as long as it isn't no
            if (response == null){
                //this is to catch pressing the cancel button instead of submitting
            }
        
            else if (response.toLowerCase() == ("no")){
               console.log("retreating")
                retreat = true
                break
            }
            console.log("shooting enemy")
            ussShip.shootShip(enemy[i])
            for (let i = 0;i < enemyFleetContain.length; i++){
                enemyFleetContain[i].innerText = enemyFleet.fleet[i].hull
                if (+enemyFleetContain[i].innerText < 0){
                    enemyFleetContain[i].innerText = 0
                    //if the hull is less than 0, it displays as 0
                }
            }
                //this updates the health of the enemy ships
            if (enemy[i].hull < 1){
                break
            }
            enemy[i].shootShip(ussShip)
            ussShipHull.innerText = ussShip.hull
                //this updates the health of the USS Ship
            if (ussShip.hull < 1){
                gameWon = false;
                break
            }
        }
        if (gameWon == false || retreat == true){
            break
        }
    }
    if (gameWon == false || retreat == true){
        console.log("game lost")
    } else {
        console.log("game won!")
    }

}

let gameButton = document.getElementById("start")
gameButton.addEventListener("click", function(){startBattle()});
