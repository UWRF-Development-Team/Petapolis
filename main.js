class Producer {
    /**
    buyCost is the amount it cost, in dollars, to buy the next producer
    multiplierCost is the amount it cost, in dollars, to buy the next multiplier upgrade
    costScaling is how quickly buyCost and multiplierCost increase
    It is currently a fixed value, but I think we should change it to scale exponentially in the future
    multiplierScaling is how quickly the multiplier grows
    not sure if this is needed, but I thought it should be included just in case
    baseProduction is how much the producer produces per producer before the multiplier
    */

    constructor(buyCost, multiplierCost, costScaling, multiplierScaling, baseProduction, multiplier, amount) {
        this.buyCost = buyCost;
        this.multiplierCost = multiplierCost;
        this.costScaling = costScaling;
        this.multiplierScaling = multiplierScaling;
        this.baseProduction = baseProduction;
        this.multiplier = multiplier;
        this.amount = amount;
    }

    // used to buy a new producer
    buy() {
        if (money >= this.buyCost) {
            addMoney(-this.buyCost);
            this.buyCost = Math.round(this.buyCost * this.costScaling);
            this.amount++;
            return true;
        } else {
            return false;
        }
    }

    // this buys an increase to the multiplier
    upgrade() {
        if (money >= this.multiplierCost) {
            addMoney(-this.multiplierCost);
            this.multiplierCost = Math.round(this.multiplierCost * this.costScaling);
            this.multiplier *= this.multiplierScaling;
            return true;
        } else {
            return false;
        }
    }

    // returns the amount of producers owned
    getAmount() {
        return this.amount;
    }

    // returns how much it cost to buy the next producer
    getBuyCost() {
        return this.buyCost;
    }

    // returns how much is cost to increase the multiplier again
    getMultiplierCost() {
        return this.multiplierCost;
    }

    // increases flowers based on # of producers, their base production, and the multiplier
    harvest() {
        addFlowers(Math.round(this.amount * this.baseProduction * this.multiplier));
    }
}

let money = 0;
let trowel = new Producer(50, 10000000000, 1.2, 1.2, 1, 1, 1);
let flowers = 0;
let gardener = new Producer(50, 50, 1.2, 1.2, 1, 1, 0);
let prestigeCount = 0;

// takes the name of the producer and changes the cost and count in the html file
function refreshShop(producer) {
    switch (producer) {
        case 'gardener':
            document.querySelector("#gardenerBuy > #gardenerCount").innerHTML = `(${gardener.getAmount()})`;
            document.querySelector("#gardenerBuy > #gardenerCost").innerHTML = '$'+`${gardener.getBuyCost()}`;
            break;
        case 'trowel':
            document.querySelector("#trowelBuy > #trowelCount").innerHTML = `(${trowel.getAmount()})`;
            document.querySelector("#trowelBuy > #trowelCost").innerHTML = '$'+`${trowel.getBuyCost()}`;
            break;
    }
}

// takes the name of the producer and buys one
function buy(producer) {
    switch (producer) {
        case 'gardener':
            if (gardener.buy()) {
                if (gardener.getAmount() === 1) {
                    window.setInterval(() => gardener.harvest(), 1000);
                }
                refreshShop('gardener');
            } else {
                alert("You can't afford a gardener right now!");
            }
            break;
        case 'trowel':
            if (trowel.buy()) {
                refreshShop('trowel');
            } else {
                alert("You can't afford a trowel right now!");
            }
            break;
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
    addMoney(flowers);
    addFlowers(-flowers);
    console.log("$"+money);
}

function setFlowers(amount) {
    flowers = amount;
    document.getElementById("flower_display").innerHTML = "Flowers: " + flowers;
}

//increases flower count by a given value
function addFlowers(amount) {
    flowers += amount;
    document.getElementById("flower_display").innerHTML = "Flowers: " + flowers;
}

function setMoney(amount) {
    money = amount;
    document.getElementById("dollar_display").innerHTML = "Money: " + money;
}

//increases money count by a given value
function addMoney(amount) {
    money += amount;
    document.getElementById("dollar_display").innerHTML = "Money: " + money;
}

//resets game state
function prestige() {
    console.log(flowers);
    if (flowers < 1000000){
        alert("You can't prestige!! Reach 1,000,000 flowers to prestige.");
        return;
    }
    setMoney(0);
    setFlowers(0);
    gardener = new Producer(50, 50, 1.2, 1.2, 1, 1, 0);
    trowel = new Producer(50, 10000000000, 1.2, 1.2, 1, 1, 2);
    refreshShop('gardener');
    refreshShop('trowel');
    prestigeCount += 1;
    alert("You are now prestige " + prestigeCount + "!");
}
