class Producer {
    constructor(buyCost, multiplierCost, costScaling, multiplierScaling, baseProduction, multiplier, amount) {
        this.buyCost = buyCost;
        this.multiplierCost = multiplierCost;
        this.costScaling = costScaling;
        this.multiplierScaling = multiplierScaling;
        this.baseProduction = baseProduction;
        this.multiplier = multiplier;
        this.amount = amount;
    }

    buy() {
        if (money >= this.buyCost) {
            changeMoney(-this.buyCost);
            this.buyCost = Math.round(this.buyCost * this.costScaling);
            this.amount++;
            return true;
        } else {
            return false;
        }
    }

    upgrade() {
        if (money >= this.multiplierCost) {
            changeMoney(-this.multiplierCost);
            this.multiplierCost = Math.round(this.multiplierCost * this.costScaling);
            this.multiplier *= this.multiplierScaling;
            return true;
        } else {
            return false;
        }
    }

    getAmount() {
        return this.amount;
    }

    getBuyCost() {
        return this.buyCost;
    }
        
    getMultiplierCost() {
        return this.multiplierCost;
    }

    reset(buyCost, multiplierCost, costScaling, multiplierScaling, baseProduction, multiplier, amount) {
        this.buyCost = buyCost;
        this.multiplierCost = multiplierCost;
        this.costScaling = costScaling;
        this.multiplierScaling = multiplierScaling;
        this.baseProduction = baseProduction;
        this.multiplier = multiplier;
        this.amount = amount;
    }



    harvest() {
        changeFlowers(Math.round(this.amount * this.baseProduction * this.multiplier));
    }
}

let money = 0;
let flowers = 0;
let gardener = new Producer(50, 50, 1.2, 1.2, 1, 1, 0);
let prestigeCount = 0;


function buyGardener() {

    if (gardener.buy()) {
        document.querySelector("#gardenerBuy > h2").innerHTML = `gardener \n (${gardener.getAmount()})`;
        document.querySelector("#gardenerBuy > #count").innerHTML = `(${gardener.getAmount()})`;
        document.querySelector("#gardenerBuy > #cost").innerHTML = '$'+`${gardener.getBuyCost()}`;
    } else {
        alert("You can't afford a gardener right now!");
    }

    if(gardener.getAmount() > 0) {
        window.setInterval(() => gardener.harvest(), 1000);
    }
}

function increaseMultiplier(multiplier) {
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




// 1 to 1 conversion babyyyyy
function flowerToMoney() {
    changeMoney(flowers);
    changeFlowers(-flowers);
    console.log("$"+money);
}

//changes flower count by a given value
function changeFlowers(amount) {
    flowers += amount;
    document.getElementById("flower_display").innerHTML = "Flowers: " + flowers;
}

//changes money count by a given value
function changeMoney(amount) {
    money += amount;
    document.getElementById("dollar_display").innerHTML = "Money: " + money;
}
  
function prestige() {
    money = 0
    flowers = 0
    gardener.reset(50, 50, 1.2, 1.2, 1, 1, 0);
    prestigeCount += 1
    console.log("prestige count: " + prestigeCount)
}
