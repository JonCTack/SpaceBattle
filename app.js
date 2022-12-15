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

let ussShipHull = document.querySelector("#USS_Ship #USS_Hull")
ussShipHull.innerText = ussShip.hull
let enemyFleetContain = document.querySelectorAll(".enemy .enemy_hull")
for (let i = 0;i < enemyFleetContain.length; i++){
    enemyFleetContain[i].innerText = enemyFleet.fleet[i].hull
}

const startBattle = () => {
    let gameWon = true
    let retreat = false
    let enemy = enemyFleet.fleet
    for (let i = 0; i < enemy.length; i++){
        if(ussShip.hull < 1){
            break
        }
        while(enemy[i].hull > 0){
            let response = window.prompt("would you like to continue? type no to stop", "yes")
            if (response == null){
            }
            else if (response.toLowerCase() == ("no" || "stop")){
               console.log("retreating")
                retreat = true
                break
            }
            console.log("shooting enemy")
            ussShip.shootShip(enemy[i])
            for (let i = 0;i < enemyFleetContain.length; i++){
                enemyFleetContain[i].innerText = enemyFleet.fleet[i].hull
            }
            if (enemy[i].hull < 1){
                break
            }
            enemy[i].shootShip(ussShip)
            ussShipHull.innerText = ussShip.hull
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
