class Producer {
    constructor(buyCost, multiplierCost, costScaling, multiplierScaling, baseProduction, amount, multiplier) {
        this.buyCost = buyCost;
        this.multiplier = multiplierCost;
        this.costScaling = costScaling;
        this.multiplierScaling = multiplierScaling;
        this.baseProduction = baseProduction;
        this.amount = amount;
        this.multiplier = multiplier;
    }

    buy() {
        if (money >= this.buyCost) {
            money -= this.buyCost;
            this.buyCost *= this.costScaling;
            this.amount++;
            return true;
        } else {
            return false;
        }
    }

    upgrade() {
        if (money >= this.multiplierCost) {
            money -= this.multiplierCost;
            this.upgradeCost *= this.costScaling;
            this.multiplier *= this.multiplierScaling;
            return true;
        } else {
            return false;
        }
    }

    getAmount() {
        return this.amount;
    }
    
    harvest() {
        flowers += this.amount * this.baseProduction * this.multiplier;
    }
}


let money = 0;
let flowers = 0;
<<<<<<< HEAD
let gardener = new Producer(50, 50, 1.2, 1.2, 1, 1, 1);
=======
let gardenerCount = 0;
let prestigeCount = 0;
let gardenerCost = 100;
>>>>>>> origin/main

function buyGardener() {
    if (gardener.getAmount() === 0) {
        window.setInterval(gardenersGardening, 1000);
    }

    //TODO: implement an actual cost once flowers are obtainable
<<<<<<< HEAD
    if (gardener.buy()) {
        document.querySelector("#gardenerBuy > h2").innerHTML = `gardener \n (${gardener.getAmount()})`;
=======
    if (money >= gardenerCost) {
        gardenerCount++;
        document.querySelector("#gardenerBuy > #count").innerHTML = `(${gardenerCount})`;
        money -= gardenerCost;
        gardenerCost = Math.round(gardenerCost * 1.25);
        document.querySelector("#gardenerBuy > #cost").innerHTML = '$'+`${gardenerCost}`;

>>>>>>> origin/main
    } else {
        alert("You can't afford a gardener right now!");
    }
}

function increaseMultiplier(multiplier) {
    // if you want to add anothe
    switch (multiplier) {
        case 'gardener':
            if (gardener.upgrade()) {
                return;
            } else {
                alert("You can't afford a gardener upgrade.");
            }
            break;
    }
}


function gardenersGardening(){
<<<<<<< HEAD
    gardener.harvest();
=======
    changeFlowers(gardenerCount);
>>>>>>> origin/main
    console.log(flowers);
}

function test(text) {
    window.setInterval(gardenersGardening, 1000);
    document.querySelector("#gardenerBuy > h2").innerHTML = `gardener \n (${gardener.getAmount()})`;
    console.log(flowers);
}

// 1 to 1 conversion babyyyyy
function flowerToMoney() {
    changeMoney(flowers);
    changeFlowers(-flowers);
    console.log("$"+money);
}
<<<<<<< HEAD
=======

//changes flower count by a given value
function changeFlowers(amount) {
    flowers += amount;
    document.getElementById("flower_display").innerHTML = "Flowers: " + flowers;
}

//changes money count by a given value
function changeMoney(amount) {
    money += amount;
    document.getElementById("money_display").innerHTML = "Money: " + money;
}
  
function prestige() {
    money = 0
    flowers = 0
    gardenerCount = 0
    prestigeCount += 1
    console.log("prestige count: " + prestigeCount)
}
>>>>>>> origin/main
